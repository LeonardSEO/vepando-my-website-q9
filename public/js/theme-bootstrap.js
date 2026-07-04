(function () {
  // Vepando is a light-first brand: unlike a typical dev-tool product, the
  // site does not follow the visitor's OS colour scheme. Dark surfaces are
  // reserved for specific "console" components, not the whole page. Only an
  // explicit, user-chosen preference (once a toggle exists) overrides this.
  function getTheme() {
    try {
      var stored = localStorage.getItem("theme")
      if (stored === "light" || stored === "dark") return stored
    } catch (_e) {
      // localStorage can fail in privacy modes; fall back to the brand default.
    }

    return "light"
  }

  document.documentElement.setAttribute("data-theme", getTheme())
})()
