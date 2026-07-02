"use client"

import { useEffect, useRef, useState } from "react"
import type { RefObject } from "react"

type Node = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  createdAt: number
  ttl: number
  size: number
}

type PointerState = {
  active: boolean
  x: number
  y: number
  mode: "mouse" | "touch"
}

type NeuralTrailProps = {
  containerRef: RefObject<HTMLElement | null>
}

const BRAND_HEX = "#8C6121"
const BRAND_RGB = "140, 97, 33"
const MAX_NODES = 80
const MOUSE_EMIT_INTERVAL_MS = 24
const TOUCH_EMIT_INTERVAL_MS = 40
const NODE_TTL_MS = 2400
const CONNECTION_RADIUS = 120
const JITTER_SPEED = 6
const NODE_SIZE_MIN = 1.5
const NODE_SIZE_MAX = 2.5

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function NeuralTrail({ containerRef }: NeuralTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
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
      nodesRef.current = []
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

    const emitNode = (timestamp: number, mode: PointerState["mode"]) => {
      const emitInterval = mode === "touch" ? TOUCH_EMIT_INTERVAL_MS : MOUSE_EMIT_INTERVAL_MS

      if (timestamp - lastEmitAtRef.current < emitInterval) {
        return
      }

      const { x, y } = pointerRef.current

      nodesRef.current.push({
        id: nextNodeIdRef.current++,
        x,
        y,
        vx: randomBetween(-JITTER_SPEED, JITTER_SPEED),
        vy: randomBetween(-JITTER_SPEED, JITTER_SPEED),
        createdAt: timestamp,
        ttl: NODE_TTL_MS,
        size: randomBetween(NODE_SIZE_MIN, NODE_SIZE_MAX),
      })

      if (nodesRef.current.length > MAX_NODES) {
        nodesRef.current.splice(0, nodesRef.current.length - MAX_NODES)
      }

      lastEmitAtRef.current = timestamp
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

      emitNode(performance.now(), mode)
      ensureRunning()
    }

    const handleMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY, "mouse")
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

      const activeNodes: Node[] = []

      for (const node of nodesRef.current) {
        const age = timestamp - node.createdAt

        if (age >= node.ttl) {
          continue
        }

        node.vx = clamp(node.vx + randomBetween(-8, 8) * deltaSeconds, -JITTER_SPEED, JITTER_SPEED)
        node.vy = clamp(node.vy + randomBetween(-8, 8) * deltaSeconds, -JITTER_SPEED, JITTER_SPEED)
        node.x = clamp(node.x + node.vx * deltaSeconds, 0, width)
        node.y = clamp(node.y + node.vy * deltaSeconds, 0, height)

        activeNodes.push(node)
      }

      nodesRef.current = activeNodes

      // Idle stop: no nodes left and no active pointer means nothing to draw,
      // so release the animation frame loop until the next pointer event.
      if (activeNodes.length === 0 && !pointerRef.current.active) {
        runningRef.current = false
        animationFrameRef.current = null
        return
      }

      context.save()
      context.lineCap = "round"

      for (let index = 0; index < activeNodes.length; index += 1) {
        const source = activeNodes[index]
        const sourceLife = 1 - (timestamp - source.createdAt) / source.ttl

        for (let compareIndex = index + 1; compareIndex < activeNodes.length; compareIndex += 1) {
          const target = activeNodes[compareIndex]
          const dx = source.x - target.x
          const dy = source.y - target.y
          const distance = Math.hypot(dx, dy)

          if (distance > CONNECTION_RADIUS) {
            continue
          }

          const targetLife = 1 - (timestamp - target.createdAt) / target.ttl
          const distanceAlpha = 1 - distance / CONNECTION_RADIUS
          const alpha = distanceAlpha * Math.min(sourceLife, targetLife) * 0.55

          if (alpha <= 0.01) {
            continue
          }

          const proximity = 1 - distance / CONNECTION_RADIUS

          context.beginPath()
          context.strokeStyle = `rgba(${BRAND_RGB}, ${alpha})`
          context.lineWidth = 0.6 + proximity * 0.6
          context.moveTo(source.x, source.y)
          context.lineTo(target.x, target.y)
          context.stroke()
        }
      }

      context.restore()

      for (const node of activeNodes) {
        const life = 1 - (timestamp - node.createdAt) / node.ttl
        const nodeAlpha = life * 0.9

        if (nodeAlpha <= 0.01) {
          continue
        }

        context.beginPath()
        context.shadowBlur = 8
        context.shadowColor = BRAND_HEX
        context.fillStyle = `rgba(${BRAND_RGB}, ${nodeAlpha})`
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
      } else if (nodesRef.current.length > 0 || pointerRef.current.active) {
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
      nodesRef.current = []
      lastEmitAtRef.current = 0
      lastFrameTimeRef.current = 0
      pointerRef.current.active = false
    }
  }, [containerRef, motionAllowed])

  if (motionAllowed !== true) {
    return null
  }

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
