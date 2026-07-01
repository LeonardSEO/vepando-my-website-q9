(function () {
  function getTheme() {
    try {
      var stored = localStorage.getItem("theme")
      if (stored === "light" || stored === "dark") return stored
    } catch (_e) {
      // localStorage can fail in privacy modes; fall back to system theme.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  document.documentElement.setAttribute("data-theme", getTheme())
})()
