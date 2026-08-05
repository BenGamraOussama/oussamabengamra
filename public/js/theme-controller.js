const themeController = () => {
  const html = document.querySelector("html");
  if (!html) {
    return;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    html.classList.remove("dark");
  } else if (savedTheme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.add("dark");
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.(".theme-controller");
    if (!button) {
      return;
    }

    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  });
};
