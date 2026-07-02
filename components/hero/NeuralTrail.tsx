"use client"

import { useEffect, useRef, useState } from "react"
import type { RefObject } from "react"

type TrailNode = {
  kind: "trail"
  id: number
  x: number
  y: number
  vx: number
  vy: number
  createdAt: number
  ttl: number
  size: number
}

type AmbientNode = {
  kind: "ambient"
  id: number
  xFrac: number
  yFrac: number
  phase: number
  freq: number
  amplitude: number
  size: number
  ix: number
  iy: number
}

type RenderNode = {
  x: number
  y: number
  size: number
  alpha: number
}

type PointerState = {
  active: boolean
  x: number
  y: number
  mode: "mouse" | "touch"
}

type NeuralTrailProps = {
  containerRef: RefObject<HTMLElement | null>
  /**
   * When true, a fixed set of nodes drifts continuously (a gentle sine
   * "dance") even with no pointer activity, and reacts to real mouse
   * movement with a directional push — used for pages that want a
   * living backdrop rather than a pure cursor-trail effect.
   */
  ambient?: boolean
  ambientCount?: number
  connectionRadius?: number
}

const BRAND_HEX = "#8C6121"
const BRAND_RGB = "140, 97, 33"
const MAX_TRAIL_NODES = 80
const MOUSE_EMIT_INTERVAL_MS = 24
const TOUCH_EMIT_INTERVAL_MS = 40
const NODE_TTL_MS = 2400
const JITTER_SPEED = 6
const NODE_SIZE_MIN = 1.5
const NODE_SIZE_MAX = 2.5
const AMBIENT_SIZE_MIN = 1.6
const AMBIENT_SIZE_MAX = 3
const PUSH_RADIUS = 170
const PUSH_STRENGTH = 0.9
const MAX_IMPULSE = 46

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function NeuralTrail({
  containerRef,
  ambient = false,
  ambientCount = 28,
  connectionRadius = 120,
}: NeuralTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailNodesRef = useRef<TrailNode[]>([])
  const ambientNodesRef = useRef<AmbientNode[]>([])
  const pointerRef = useRef<PointerState>({
    active: false,
    x: 0,
    y: 0,
    mode: "mouse",
  })
  const animationFrameRef = useRef<number | null>(null)
  const runningRef = useRef(false)
  const lastEmitAtRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const nextNodeIdRef = useRef(0)
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 })
  const [motionAllowed, setMotionAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setMotionAllowed(!mediaQuery.matches)

    updateMotionPreference()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference)
      return () => mediaQuery.removeEventListener("change", updateMotionPreference)
    }

    mediaQuery.addListener(updateMotionPreference)
    return () => mediaQuery.removeListener(updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!motionAllowed) {
      trailNodesRef.current = []
      ambientNodesRef.current = []
      return
    }

    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) {
      return
    }

    const context = canvas.getContext("2d")

    if (!context) {
      return
    }

    if (ambient) {
      ambientNodesRef.current = Array.from({ length: ambientCount }, (_, index) => ({
        kind: "ambient",
        id: index,
        xFrac: randomBetween(0.04, 0.96),
        yFrac: randomBetween(0.06, 0.94),
        phase: randomBetween(0, Math.PI * 2),
        freq: randomBetween(0.25, 0.6),
        amplitude: randomBetween(14, 34),
        size: randomBetween(AMBIENT_SIZE_MIN, AMBIENT_SIZE_MAX),
        ix: 0,
        iy: 0,
      }))
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      sizeRef.current = { width, height, dpr }
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)
    }

    const emitTrailNode = (timestamp: number, mode: PointerState["mode"]) => {
      const emitInterval = mode === "touch" ? TOUCH_EMIT_INTERVAL_MS : MOUSE_EMIT_INTERVAL_MS

      if (timestamp - lastEmitAtRef.current < emitInterval) {
        return
      }

      const { x, y } = pointerRef.current

      trailNodesRef.current.push({
        kind: "trail",
        id: nextNodeIdRef.current++,
        x,
        y,
        vx: randomBetween(-JITTER_SPEED, JITTER_SPEED),
        vy: randomBetween(-JITTER_SPEED, JITTER_SPEED),
        createdAt: timestamp,
        ttl: NODE_TTL_MS,
        size: randomBetween(NODE_SIZE_MIN, NODE_SIZE_MAX),
      })

      if (trailNodesRef.current.length > MAX_TRAIL_NODES) {
        trailNodesRef.current.splice(0, trailNodesRef.current.length - MAX_TRAIL_NODES)
      }

      lastEmitAtRef.current = timestamp
    }

    // Nudges nearby ambient anchors along the pointer's movement direction —
    // the "reacts to movement" ripple. Mouse-only (needs movementX/Y).
    const pushAmbientNodes = (clientX: number, clientY: number, movementX: number, movementY: number) => {
      if (!ambient || (movementX === 0 && movementY === 0)) {
        return
      }

      const { width, height } = sizeRef.current
      const rect = container.getBoundingClientRect()
      const localX = clamp(clientX - rect.left, 0, width)
      const localY = clamp(clientY - rect.top, 0, height)
      const speed = clamp(Math.hypot(movementX, movementY), 0, 60)
      const dirX = movementX / (speed || 1)
      const dirY = movementY / (speed || 1)

      for (const anchor of ambientNodesRef.current) {
        const ax = anchor.xFrac * width
        const ay = anchor.yFrac * height
        const distance = Math.hypot(ax - localX, ay - localY)

        if (distance > PUSH_RADIUS) {
          continue
        }

        const factor = (1 - distance / PUSH_RADIUS) * speed * PUSH_STRENGTH
        anchor.ix = clamp(anchor.ix + dirX * factor, -MAX_IMPULSE, MAX_IMPULSE)
        anchor.iy = clamp(anchor.iy + dirY * factor, -MAX_IMPULSE, MAX_IMPULSE)
      }
    }

    const ensureRunning = () => {
      if (runningRef.current || document.hidden) {
        return
      }

      runningRef.current = true
      lastFrameTimeRef.current = 0
      animationFrameRef.current = window.requestAnimationFrame(drawFrame)
    }

    const stopLoop = () => {
      runningRef.current = false

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }

    const updatePointer = (clientX: number, clientY: number, mode: PointerState["mode"]) => {
      const rect = container.getBoundingClientRect()

      pointerRef.current = {
        active: true,
        x: clamp(clientX - rect.left, 0, rect.width),
        y: clamp(clientY - rect.top, 0, rect.height),
        mode,
      }

      emitTrailNode(performance.now(), mode)
      ensureRunning()
    }

    const handleMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY, "mouse")
      pushAmbientNodes(event.clientX, event.clientY, event.movementX, event.movementY)
    }

    const handleMouseLeave = () => {
      pointerRef.current.active = false
    }

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]

      if (!touch) {
        return
      }

      updatePointer(touch.clientX, touch.clientY, "touch")
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]

      if (!touch) {
        return
      }

      updatePointer(touch.clientX, touch.clientY, "touch")
    }

    const handleTouchEnd = () => {
      pointerRef.current.active = false
    }

    const passiveTouch = { passive: true } as const

    const drawFrame = (timestamp: number) => {
      const { width, height } = sizeRef.current
      const deltaSeconds = lastFrameTimeRef.current
        ? Math.min((timestamp - lastFrameTimeRef.current) / 1000, 0.05)
        : 0.016

      lastFrameTimeRef.current = timestamp

      context.clearRect(0, 0, width, height)

      const activeTrailNodes: TrailNode[] = []

      for (const node of trailNodesRef.current) {
        const age = timestamp - node.createdAt

        if (age >= node.ttl) {
          continue
        }

        node.vx = clamp(node.vx + randomBetween(-8, 8) * deltaSeconds, -JITTER_SPEED, JITTER_SPEED)
        node.vy = clamp(node.vy + randomBetween(-8, 8) * deltaSeconds, -JITTER_SPEED, JITTER_SPEED)
        node.x = clamp(node.x + node.vx * deltaSeconds, 0, width)
        node.y = clamp(node.y + node.vy * deltaSeconds, 0, height)

        activeTrailNodes.push(node)
      }

      trailNodesRef.current = activeTrailNodes

      // Idle stop only applies when there's nothing ambient to keep
      // drawing — with ambient mode on, the loop just keeps dancing.
      if (!ambient && activeTrailNodes.length === 0 && !pointerRef.current.active) {
        runningRef.current = false
        animationFrameRef.current = null
        return
      }

      const renderNodes: RenderNode[] = []
      const tSeconds = timestamp / 1000

      for (const anchor of ambientNodesRef.current) {
        const decay = Math.exp(-deltaSeconds * 3.2)
        anchor.ix *= decay
        anchor.iy *= decay

        const baseX = anchor.xFrac * width
        const baseY = anchor.yFrac * height + Math.sin(tSeconds * anchor.freq + anchor.phase) * anchor.amplitude
        const x = clamp(baseX + anchor.ix, 0, width)
        const y = clamp(baseY + anchor.iy, 0, height)
        const shimmer = 0.4 + 0.18 * Math.sin(tSeconds * anchor.freq * 1.7 + anchor.phase)

        renderNodes.push({ x, y, size: anchor.size, alpha: shimmer })
      }

      for (const node of activeTrailNodes) {
        const life = 1 - (timestamp - node.createdAt) / node.ttl
        renderNodes.push({ x: node.x, y: node.y, size: node.size, alpha: life * 0.9 })
      }

      context.save()
      context.lineCap = "round"

      for (let index = 0; index < renderNodes.length; index += 1) {
        const source = renderNodes[index]

        for (let compareIndex = index + 1; compareIndex < renderNodes.length; compareIndex += 1) {
          const target = renderNodes[compareIndex]
          const dx = source.x - target.x
          const dy = source.y - target.y
          const distance = Math.hypot(dx, dy)

          if (distance > connectionRadius) {
            continue
          }

          const distanceAlpha = 1 - distance / connectionRadius
          const alpha = distanceAlpha * Math.min(source.alpha, target.alpha) * 0.55

          if (alpha <= 0.01) {
            continue
          }

          const proximity = 1 - distance / connectionRadius

          context.beginPath()
          context.strokeStyle = `rgba(${BRAND_RGB}, ${alpha})`
          context.lineWidth = 0.6 + proximity * 0.6
          context.moveTo(source.x, source.y)
          context.lineTo(target.x, target.y)
          context.stroke()
        }
      }

      context.restore()

      for (const node of renderNodes) {
        if (node.alpha <= 0.01) {
          continue
        }

        context.beginPath()
        context.shadowBlur = 8
        context.shadowColor = BRAND_HEX
        context.fillStyle = `rgba(${BRAND_RGB}, ${node.alpha})`
        context.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        context.fill()
      }

      context.shadowBlur = 0

      if (runningRef.current) {
        animationFrameRef.current = window.requestAnimationFrame(drawFrame)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop()
      } else if (ambient || trailNodesRef.current.length > 0 || pointerRef.current.active) {
        ensureRunning()
      }
    }

    resizeCanvas()

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })

    resizeObserver.observe(container)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("touchstart", handleTouchStart, passiveTouch)
    container.addEventListener("touchmove", handleTouchMove, passiveTouch)
    container.addEventListener("touchend", handleTouchEnd, passiveTouch)
    container.addEventListener("touchcancel", handleTouchEnd, passiveTouch)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    if (ambient) {
      ensureRunning()
    }

    return () => {
      stopLoop()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      resizeObserver.disconnect()
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
      container.removeEventListener("touchcancel", handleTouchEnd)
      context.clearRect(0, 0, sizeRef.current.width, sizeRef.current.height)
      trailNodesRef.current = []
      ambientNodesRef.current = []
      lastEmitAtRef.current = 0
      lastFrameTimeRef.current = 0
      pointerRef.current.active = false
    }
  }, [containerRef, motionAllowed, ambient, ambientCount, connectionRadius])

  if (motionAllowed !== true) {
    return null
  }

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
