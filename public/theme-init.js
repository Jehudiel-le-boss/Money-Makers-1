let theme;

try {
  theme = localStorage.getItem("money-makers-theme");
} catch (error) {
  if (!(error instanceof DOMException)) throw error;
  console.warn("Impossible de lire la préférence de thème.", error);
}

if (theme !== "light" && theme !== "dark") {
  theme = "dark";
}

document.documentElement.dataset.theme = theme;
