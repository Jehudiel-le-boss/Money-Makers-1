let theme;

try {
  theme = localStorage.getItem("money-makers-theme");
} catch (error) {
  if (!(error instanceof DOMException)) throw error;
  console.warn("Impossible de lire la préférence de thème.", error);
}

if (theme !== "light" && theme !== "dark") {
  theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

document.documentElement.dataset.theme = theme;
