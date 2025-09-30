// 🎮 LIQUID GLASS PLAYGROUND - Live Configuratie Tool with Debug Features
// Voeg dit toe voor real-time parameter tweaking en uitgebreide debugging!

class LiquidGlassPlayground {
  constructor() {
    this.isVisible = false
    this.debugMode = true // Voor uitgebreide logging
    this.log("🎮 Playground initializing...")

    this.createControls()
    this.bindEvents()
    this.addKeyboardShortcut()
    this.initializeValues()
    this.setupDebugConsole()
  }

  log(message, data = null) {
    if (this.debugMode) {
      console.log(`🎮 Glass Playground: ${message}`, data || "")
    }
  }

  setupDebugConsole() {
    // Voeg debug info toe aan window object
    window.glassDebug = {
      getCurrentValues: () => this.getCurrentCSSValues(),
      testDirectUpdate: () => this.testDirectUpdate(),
      findNavbar: () => this.findNavbarElement(),
      logAllStyles: () => this.logAllStyles(),
    }

    this.log("Debug console available: window.glassDebug")
  }

  findNavbarElement() {
    const navbar = document.querySelector(".liquid-glass-navbar")
    this.log("Looking for navbar element:", navbar)

    if (!navbar) {
      this.log("❌ Navbar element not found! Checking alternatives...")
      const alternatives = [
        document.querySelector('[class*="liquid"]'),
        document.querySelector('[class*="glass"]'),
        document.querySelector("nav"),
        document.querySelector('[role="navigation"]'),
      ]

      alternatives.forEach((el, i) => {
        this.log(`Alternative ${i}:`, el)
      })
    }

    return navbar
  }

  getCurrentCSSValues() {
    const root = document.documentElement
    const computed = getComputedStyle(root)

    const values = {
      "--glass-blur-base":
        root.style.getPropertyValue("--glass-blur-base") || computed.getPropertyValue("--glass-blur-base"),
      "--glass-saturation":
        root.style.getPropertyValue("--glass-saturation") || computed.getPropertyValue("--glass-saturation"),
      "--glass-brightness":
        root.style.getPropertyValue("--glass-brightness") || computed.getPropertyValue("--glass-brightness"),
      "--glass-bg-opacity-start":
        root.style.getPropertyValue("--glass-bg-opacity-start") ||
        computed.getPropertyValue("--glass-bg-opacity-start"),
    }

    this.log("Current CSS values:", values)
    return values
  }

  testDirectUpdate() {
    this.log("🧪 Testing direct CSS update...")

    // Test 1: Direct root style update
    document.documentElement.style.setProperty("--glass-blur-base", "30px", "important")
    this.log("Test 1: Set blur to 30px on root")

    // Test 2: Direct navbar style update
    const navbar = this.findNavbarElement()
    if (navbar) {
      navbar.style.setProperty("--glass-blur-base", "30px", "important")
      this.log("Test 2: Set blur to 30px on navbar element")
    }

    // Test 3: Inject direct CSS rule
    this.injectDirectCSS("--glass-blur-base", "30px")
    this.log("Test 3: Injected direct CSS rule")

    setTimeout(() => {
      this.getCurrentCSSValues()
    }, 100)
  }

  injectDirectCSS(property, value) {
    // Verwijder oude debug style
    const oldStyle = document.getElementById("playground-debug-style")
    if (oldStyle) oldStyle.remove()

    // Maak nieuwe style met maximale specificiteit
    const style = document.createElement("style")
    style.id = "playground-debug-style"
    style.textContent = `
      /* PLAYGROUND DEBUG STYLES - MAXIMUM PRIORITY */
      html:root {
        ${property}: ${value} !important;
      }

      .liquid-glass-navbar {
        ${property}: ${value} !important;
      }

      .liquid-glass-navbar::after {
        backdrop-filter: blur(${value}) saturate(var(--glass-saturation, 160%)) brightness(var(--glass-brightness, 105%)) !important;
        -webkit-backdrop-filter: blur(${value}) saturate(var(--glass-saturation, 160%)) brightness(var(--glass-brightness, 105%)) !important;
      }

      /* Ook voor alle mogelijke navbar varianten */
      nav::after, [role="navigation"]::after, [class*="navbar"]::after {
        backdrop-filter: blur(${value}) saturate(160%) brightness(105%) !important;
        -webkit-backdrop-filter: blur(${value}) saturate(160%) brightness(105%) !important;
      }
    `

    document.head.appendChild(style)
    this.log(`Injected direct CSS for ${property}: ${value}`)
  }

  logAllStyles() {
    const navbar = this.findNavbarElement()
    if (navbar) {
      const computed = getComputedStyle(navbar)
      const pseudoAfter = getComputedStyle(navbar, "::after")

      this.log("Navbar computed styles:", {
        backdropFilter: computed.backdropFilter,
        webkitBackdropFilter: computed.webkitBackdropFilter,
        background: computed.background,
        border: computed.border,
      })

      this.log("Navbar ::after pseudo styles:", {
        backdropFilter: pseudoAfter.backdropFilter,
        webkitBackdropFilter: pseudoAfter.webkitBackdropFilter,
      })
    }
  }

  createControls() {
    const panel = document.createElement("div")
    panel.id = "glass-playground"
    panel.style.cssText = `
      position: fixed;
      top: 80px;
      right: -340px;
      width: 320px;
      max-height: 85vh;
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(20px);
      color: white;
      padding: 20px;
      border-radius: 15px 0 0 15px;
      z-index: 10000;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-size: 12px;
      overflow-y: auto;
      transition: right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
    `

    panel.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3 style="margin: 0; color: #4F46E5; font-size: 14px; font-weight: 600;">🎮 Glass Playground DEBUG</h3>
        <button id="close-playground" style="background: none; border: none; color: #888; cursor: pointer; font-size: 16px;">×</button>
      </div>

      <!-- DEBUG SECTION -->
      <div class="debug-section" style="background: #1a1a1a; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
        <h4 style="color: #ff6b6b; font-size: 11px; margin: 0 0 8px 0;">🐛 DEBUG TOOLS</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
          <button onclick="glassPlayground.testDirectUpdate()" class="debug-btn">Test Update</button>
          <button onclick="glassPlayground.findNavbarElement()" class="debug-btn">Find Navbar</button>
          <button onclick="glassPlayground.getCurrentCSSValues()" class="debug-btn">Get Values</button>
          <button onclick="glassPlayground.logAllStyles()" class="debug-btn">Log Styles</button>
        </div>
        <div id="debug-output" style="margin-top: 8px; font-size: 10px; color: #888; max-height: 60px; overflow-y: auto;"></div>
      </div>

      <div class="control-section">
        <h4 style="color: #10B981; font-size: 11px; margin: 15px 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">🔥 DIRECT BLUR TEST</h4>

        <div class="control-group">
          <label>Blur (DIRECT): <span id="blur-value">14px</span></label>
          <input type="range" id="blur-slider" min="5" max="50" value="14" style="width: 100%; margin: 5px 0;">
          <div style="font-size: 10px; color: #666;">Should see immediate effect!</div>
        </div>

        <div class="control-group">
          <label>Saturation: <span id="saturation-value">160%</span></label>
          <input type="range" id="saturation-slider" min="100" max="300" value="160" style="width: 100%; margin: 5px 0;">
        </div>

        <div class="control-group">
          <label>Opacity: <span id="opacity-value">0.28</span></label>
          <input type="range" id="opacity-slider" min="0.05" max="0.8" step="0.01" value="0.28" style="width: 100%; margin: 5px 0;">
        </div>
      </div>

      <div class="preset-section" style="margin-top: 20px;">
        <h4 style="color: #06B6D4; font-size: 11px; margin: 15px 0 8px 0;">⚡ EXTREME TESTS</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <button onclick="glassPlayground.extremeTest('blur')" class="preset-btn">MEGA BLUR</button>
          <button onclick="glassPlayground.extremeTest('clear')" class="preset-btn">CRYSTAL</button>
          <button onclick="glassPlayground.extremeTest('neon')" class="preset-btn">NEON</button>
          <button onclick="glassPlayground.extremeTest('reset')" class="preset-btn">RESET</button>
        </div>
      </div>

      <div style="margin-top: 15px; padding: 10px; background: #2a2a2a; border-radius: 6px; font-size: 10px;">
        <div>🎯 <strong>Expected:</strong> Navbar should change instantly</div>
        <div>🔍 <strong>Check:</strong> Console for debug logs</div>
        <div>⌨️ <strong>Shortcut:</strong> Press G to toggle</div>
      </div>
    `

    // Add styles for debug buttons
    const style = document.createElement("style")
    style.textContent = `
      .debug-btn {
        padding: 4px 6px;
        background: #333;
        color: #ff6b6b;
        border: 1px solid #555;
        border-radius: 3px;
        cursor: pointer;
        font-size: 9px;
        transition: all 0.2s;
      }
      .debug-btn:hover {
        background: #444;
        border-color: #ff6b6b;
      }
      .preset-btn {
        padding: 6px 8px;
        background: #374151;
        color: white;
        border: 1px solid #4B5563;
        border-radius: 4px;
        cursor: pointer;
        font-size: 10px;
        transition: all 0.2s;
      }
      .preset-btn:hover {
        background: #4B5563;
        border-color: #6B7280;
      }
      #glass-playground::-webkit-scrollbar {
        width: 6px;
      }
      #glass-playground::-webkit-scrollbar-track {
        background: #1F2937;
      }
      #glass-playground::-webkit-scrollbar-thumb {
        background: #4B5563;
        border-radius: 3px;
      }
    `
    document.head.appendChild(style)
    document.body.appendChild(panel)

    this.log("✅ Controls created")
  }

  initializeValues() {
    setTimeout(() => {
      this.log("🔄 Initializing values...")
      this.findNavbarElement()
      this.getCurrentCSSValues()
      this.updateControlsFromCurrentCSS()
    }, 100)
  }

  updateControlsFromCurrentCSS() {
    this.log("🔄 Updating controls from CSS...")
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)

    // Helper functie om waarden te extraheren
    const getValue = (prop, fallback) => {
      const value = root.style.getPropertyValue(prop) || computedStyle.getPropertyValue(prop) || fallback
      return value.replace("px", "").replace("%", "").trim()
    }

    // Update alle controls met huidige waarden
    const controls = [
      { slider: "blur-slider", display: "blur-value", prop: "--glass-blur-base", suffix: "px", fallback: "14" },
      {
        slider: "saturation-slider",
        display: "saturation-value",
        prop: "--glass-saturation",
        suffix: "%",
        fallback: "160",
      },
      {
        slider: "brightness-slider",
        display: "brightness-value",
        prop: "--glass-brightness",
        suffix: "%",
        fallback: "105",
      },
      {
        slider: "opacity-slider",
        display: "opacity-value",
        prop: "--glass-bg-opacity-start",
        suffix: "",
        fallback: "0.28",
      },
      { slider: "border-slider", display: "border-value", prop: "--glass-border-opacity", suffix: "", fallback: "0.5" },
      {
        slider: "highlight-slider",
        display: "highlight-value",
        prop: "--highlight-top-intensity",
        suffix: "",
        fallback: "0.7",
      },
      { slider: "glow-slider", display: "glow-value", prop: "--inner-glow-intensity", suffix: "", fallback: "0.6" },
    ]

    controls.forEach(({ slider, display, prop, suffix, fallback }) => {
      const value = getValue(prop, fallback)
      const sliderEl = document.getElementById(slider)
      const displayEl = document.getElementById(display)

      if (sliderEl && displayEl) {
        sliderEl.value = value
        displayEl.textContent = value + suffix
      }
    })
  }

  bindEvents() {
    this.log("🔗 Binding events...")

    // Close button
    document.getElementById("close-playground").addEventListener("click", () => {
      this.hide()
    })

    // BLUR CONTROL - ULTRA DIRECT VERSION
    document.getElementById("blur-slider").addEventListener("input", (e) => {
      const value = e.target.value + "px"
      this.log(`🔥 BLUR SLIDER MOVED TO: ${value}`)

      // Method 1: Root CSS variable
      document.documentElement.style.setProperty("--glass-blur-base", value, "important")

      // Method 2: Direct CSS injection
      this.injectDirectCSS("--glass-blur-base", value)

      // Method 3: Direct navbar targeting
      const navbar = this.findNavbarElement()
      if (navbar) {
        // Direct backdrop-filter op het element
        navbar.style.setProperty("backdrop-filter", `blur(${value}) saturate(160%) brightness(105%)`, "important")
        navbar.style.setProperty(
          "-webkit-backdrop-filter",
          `blur(${value}) saturate(160%) brightness(105%)`,
          "important",
        )

        // Ook op pseudo-elementen via CSS
        this.injectPseudoElementCSS(value)
      }

      // Update display
      document.getElementById("blur-value").textContent = value

      this.log(`✅ Applied blur: ${value} via multiple methods`)
    })

    // Saturation control
    document.getElementById("saturation-slider").addEventListener("input", (e) => {
      const value = e.target.value + "%"
      this.log(`🎨 SATURATION: ${value}`)

      this.updateAllMethods("--glass-saturation", value)
      document.getElementById("saturation-value").textContent = value
    })

    // Opacity control
    document.getElementById("opacity-slider").addEventListener("input", (e) => {
      const value = e.target.value
      this.log(`👻 OPACITY: ${value}`)

      this.updateAllMethods("--glass-bg-opacity-start", value)
      document.getElementById("opacity-value").textContent = value
    })
  }

  injectPseudoElementCSS(blurValue) {
    const pseudoStyle = document.getElementById("pseudo-element-style")
    if (pseudoStyle) pseudoStyle.remove()

    const style = document.createElement("style")
    style.id = "pseudo-element-style"
    style.textContent = `
      .liquid-glass-navbar::after {
        backdrop-filter: blur(${blurValue}) saturate(var(--glass-saturation, 160%)) brightness(var(--glass-brightness, 105%)) !important;
        -webkit-backdrop-filter: blur(${blurValue}) saturate(var(--glass-saturation, 160%)) brightness(var(--glass-brightness, 105%)) !important;
      }

      /* Ook voor alle mogelijke navbar varianten */
      nav::after, [role="navigation"]::after, [class*="navbar"]::after {
        backdrop-filter: blur(${blurValue}) saturate(160%) brightness(105%) !important;
        -webkit-backdrop-filter: blur(${blurValue}) saturate(160%) brightness(105%) !important;
      }
    `

    document.head.appendChild(style)
    this.log(`🎯 Injected pseudo-element CSS with blur: ${blurValue}`)
  }

  updateAllMethods(property, value) {
    // Method 1: Root CSS variable
    document.documentElement.style.setProperty(property, value, "important")

    // Method 2: Direct CSS injection
    this.injectDirectCSS(property, value)

    // Method 3: Navbar element direct
    const navbar = this.findNavbarElement()
    if (navbar) {
      navbar.style.setProperty(property, value, "important")
    }

    this.log(`🔄 Updated ${property} to ${value} via all methods`)
  }

  extremeTest(type) {
    this.log(`🚀 EXTREME TEST: ${type}`)

    switch (type) {
      case "blur":
        this.log("🌪️ MEGA BLUR TEST - Should be VERY blurry!")
        document.getElementById("blur-slider").value = 40
        this.injectDirectCSS("--glass-blur-base", "40px")
        this.injectPseudoElementCSS("40px")
        document.getElementById("blur-value").textContent = "40px"
        break

      case "clear":
        this.log("💎 CRYSTAL CLEAR TEST")
        document.getElementById("blur-slider").value = 5
        document.getElementById("opacity-slider").value = 0.1
        this.injectDirectCSS("--glass-blur-base", "5px")
        this.injectDirectCSS("--glass-bg-opacity-start", "0.1")
        this.injectPseudoElementCSS("5px")
        document.getElementById("blur-value").textContent = "5px"
        document.getElementById("opacity-value").textContent = "0.1"
        break

      case "neon":
        this.log("🌈 NEON TEST")
        document.getElementById("saturation-slider").value = 300
        this.injectDirectCSS("--glass-saturation", "300%")
        document.getElementById("saturation-value").textContent = "300%"
        break

      case "reset":
        this.log("🔄 RESET TEST")
        document.getElementById("blur-slider").value = 14
        document.getElementById("saturation-slider").value = 160
        document.getElementById("opacity-slider").value = 0.28
        this.injectDirectCSS("--glass-blur-base", "14px")
        this.injectDirectCSS("--glass-saturation", "160%")
        this.injectDirectCSS("--glass-bg-opacity-start", "0.28")
        this.injectPseudoElementCSS("14px")
        document.getElementById("blur-value").textContent = "14px"
        document.getElementById("saturation-value").textContent = "160%"
        document.getElementById("opacity-value").textContent = "0.28"
        break
    }
  }

  addKeyboardShortcut() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "g" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) {
          e.preventDefault()
          this.toggle()
        }
      }
    })
  }

  show() {
    const panel = document.getElementById("glass-playground")
    panel.style.right = "0px"
    this.isVisible = true
    this.log("📱 Playground opened")
  }

  hide() {
    const panel = document.getElementById("glass-playground")
    panel.style.right = "-340px"
    this.isVisible = false
    this.log("📱 Playground closed")
  }

  toggle() {
    if (this.isVisible) {
      this.hide()
    } else {
      this.show()
    }
  }
}

// Auto-initialize met debug logging
console.log("🎮 Glass Playground script loaded")

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("🎮 DOM loaded, initializing playground...")
    setTimeout(() => {
      window.glassPlayground = new LiquidGlassPlayground()
      console.log("🎮 Playground ready! Press G to open, check window.glassDebug for tools")
    }, 300)
  })
} else {
  console.log("🎮 DOM already loaded, initializing playground...")
  setTimeout(() => {
    window.glassPlayground = new LiquidGlassPlayground()
    console.log("🎮 Playground ready! Press G to open, check window.glassDebug for tools")
  }, 300)
}
