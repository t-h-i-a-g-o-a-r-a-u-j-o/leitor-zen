document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     ELEMENTOS
  ========================================================= */

  const body = document.body;

  const article = document.getElementById("readerArticle");

  const readingProgressBar = document.getElementById("readingProgressBar");

  const readingTime = document.getElementById("readingTime");

  const focusModeBtn = document.getElementById("focusModeBtn");

  const settingsToggleBtn = document.getElementById("settingsToggleBtn");

  const settingsPanel = document.getElementById("settingsPanel");

  const closeSettingsBtn = document.getElementById("closeSettingsBtn");

  const themeButtons = document.querySelectorAll(".theme-btn");

  const decreaseFontBtn = document.getElementById("decreaseFontBtn");

  const increaseFontBtn = document.getElementById("increaseFontBtn");

  const fontSizeValue = document.getElementById("fontSizeValue");

  const fontFamilyButtons = document.querySelectorAll(".font-family-btn");

  const lineHeightRange = document.getElementById("lineHeightRange");

  const lineHeightValue = document.getElementById("lineHeightValue");

  const contentWidthRange = document.getElementById("contentWidthRange");

  const contentWidthValue = document.getElementById("contentWidthValue");

  const resetPreferencesBtn = document.getElementById("resetPreferencesBtn");

  const backToTopBtn = document.getElementById("backToTopBtn");

  /* =========================================================
     CONFIGURAÇÕES
  ========================================================= */

  const STORAGE_KEY = "leitorZenPreferences";

  const DEFAULT_PREFERENCES = {
    theme: "light",
    fontSize: 100,
    fontFamily: "sans",
    lineHeight: 1.8,
    contentWidth: 720,
  };

  const MIN_FONT_SIZE = 85;
  const MAX_FONT_SIZE = 135;
  const FONT_STEP = 5;

  let preferences = {
    ...DEFAULT_PREFERENCES,
  };

  /* =========================================================
     LOCAL STORAGE
  ========================================================= */

  function savePreferences() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }

  function loadPreferences() {
    const savedPreferences = localStorage.getItem(STORAGE_KEY);

    if (!savedPreferences) {
      return;
    }

    try {
      const parsedPreferences = JSON.parse(savedPreferences);

      preferences = {
        ...DEFAULT_PREFERENCES,
        ...parsedPreferences,
      };
    } catch (error) {
      console.error("Não foi possível carregar as preferências:", error);

      preferences = {
        ...DEFAULT_PREFERENCES,
      };
    }
  }

  /* =========================================================
     TEMA
  ========================================================= */

  function applyTheme(theme, shouldSave = true) {
    body.classList.remove("theme-light", "theme-sepia", "theme-dark");

    if (theme === "sepia") {
      body.classList.add("theme-sepia");
    }

    if (theme === "dark") {
      body.classList.add("theme-dark");
    }

    preferences.theme = theme;

    themeButtons.forEach((button) => {
      const isActive = button.dataset.theme === theme;

      button.classList.toggle("active", isActive);

      button.setAttribute("aria-pressed", String(isActive));
    });

    if (shouldSave) {
      savePreferences();
    }
  }

  /* =========================================================
     TAMANHO DO TEXTO
  ========================================================= */

  function applyFontSize(size, shouldSave = true) {
    const safeSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, size));

    preferences.fontSize = safeSize;

    const remValue = safeSize / 100;

    document.documentElement.style.setProperty(
      "--reader-font-size",
      `${remValue}rem`,
    );

    fontSizeValue.textContent = `${safeSize}%`;

    decreaseFontBtn.disabled = safeSize <= MIN_FONT_SIZE;
    increaseFontBtn.disabled = safeSize >= MAX_FONT_SIZE;

    if (shouldSave) {
      savePreferences();
    }
  }

  /* =========================================================
     TIPO DE FONTE
  ========================================================= */

  function applyFontFamily(fontFamily, shouldSave = true) {
    preferences.fontFamily = fontFamily;

    body.classList.toggle("font-serif", fontFamily === "serif");

    fontFamilyButtons.forEach((button) => {
      const isActive = button.dataset.font === fontFamily;

      button.classList.toggle("active", isActive);

      button.setAttribute("aria-pressed", String(isActive));
    });

    if (shouldSave) {
      savePreferences();
    }
  }

  /* =========================================================
     ESPAÇAMENTO ENTRE LINHAS
  ========================================================= */

  function applyLineHeight(value, shouldSave = true) {
    const numericValue = Number(value);

    preferences.lineHeight = numericValue;

    document.documentElement.style.setProperty(
      "--reader-line-height",
      numericValue,
    );

    lineHeightRange.value = numericValue;

    lineHeightValue.textContent = numericValue.toFixed(1);

    if (shouldSave) {
      savePreferences();
    }
  }

  /* =========================================================
     LARGURA DO TEXTO
  ========================================================= */

  function applyContentWidth(value, shouldSave = true) {
    const numericValue = Number(value);

    preferences.contentWidth = numericValue;

    document.documentElement.style.setProperty(
      "--reader-width",
      `${numericValue}px`,
    );

    contentWidthRange.value = numericValue;

    contentWidthValue.textContent = `${numericValue}px`;

    if (shouldSave) {
      savePreferences();
    }
  }

  /* =========================================================
     APLICAR TODAS AS PREFERÊNCIAS
  ========================================================= */

  function applyPreferences() {
    applyTheme(preferences.theme, false);

    applyFontSize(preferences.fontSize, false);

    applyFontFamily(preferences.fontFamily, false);

    applyLineHeight(preferences.lineHeight, false);

    applyContentWidth(preferences.contentWidth, false);
  }

  /* =========================================================
     PAINEL DE CONFIGURAÇÕES
  ========================================================= */

  function openSettings() {
    settingsPanel.hidden = false;

    settingsToggleBtn.setAttribute("aria-expanded", "true");
  }

  function closeSettings() {
    settingsPanel.hidden = true;

    settingsToggleBtn.setAttribute("aria-expanded", "false");
  }

  function toggleSettings() {
    if (settingsPanel.hidden) {
      openSettings();
    } else {
      closeSettings();
    }
  }

  /* =========================================================
     MODO FOCO
  ========================================================= */

  function toggleFocusMode() {
    const isFocusMode = body.classList.toggle("focus-mode");

    focusModeBtn.setAttribute("aria-pressed", String(isFocusMode));

    focusModeBtn.setAttribute(
      "aria-label",
      isFocusMode ? "Desativar modo foco" : "Ativar modo foco",
    );

    focusModeBtn.title = isFocusMode ? "Sair do modo foco" : "Modo foco";

    const icon = focusModeBtn.querySelector("i");

    icon.className = isFocusMode
      ? "fa-solid fa-compress"
      : "fa-solid fa-expand";

    closeSettings();
  }

  /* =========================================================
     TEMPO ESTIMADO DE LEITURA
  ========================================================= */

  function calculateReadingTime() {
    if (!article) {
      return;
    }

    const text = article.innerText.trim();

    const words = text.split(/\s+/).filter(Boolean);

    const WORDS_PER_MINUTE = 200;

    const minutes = Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));

    readingTime.textContent = `${minutes} min de leitura`;
  }

  /* =========================================================
     PROGRESSO DE LEITURA
  ========================================================= */

  function updateReadingProgress() {
    const documentElement = document.documentElement;

    const scrollTop = window.scrollY || documentElement.scrollTop;

    const scrollHeight = documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    const safeProgress = Math.max(0, Math.min(100, progress));

    readingProgressBar.style.width = `${safeProgress}%`;
  }

  /* =========================================================
     BOTÃO VOLTAR AO TOPO
  ========================================================= */

  function updateBackToTopButton() {
    const shouldShow = window.scrollY > 500;

    backToTopBtn.classList.toggle("visible", shouldShow);
  }

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     RESTAURAR PADRÃO
  ========================================================= */

  function resetPreferences() {
    preferences = {
      ...DEFAULT_PREFERENCES,
    };

    applyPreferences();

    savePreferences();
  }

  /* =========================================================
     EVENTOS DOS TEMAS
  ========================================================= */

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.theme);
    });
  });

  /* =========================================================
     EVENTOS DO TAMANHO DE FONTE
  ========================================================= */

  increaseFontBtn.addEventListener("click", () => {
    applyFontSize(preferences.fontSize + FONT_STEP);
  });

  decreaseFontBtn.addEventListener("click", () => {
    applyFontSize(preferences.fontSize - FONT_STEP);
  });

  /* =========================================================
     EVENTOS DE TIPO DE FONTE
  ========================================================= */

  fontFamilyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFontFamily(button.dataset.font);
    });
  });

  /* =========================================================
     EVENTOS DOS SLIDERS
  ========================================================= */

  lineHeightRange.addEventListener("input", () => {
    applyLineHeight(lineHeightRange.value);
  });

  contentWidthRange.addEventListener("input", () => {
    applyContentWidth(contentWidthRange.value);
  });

  /* =========================================================
     CONFIGURAÇÕES
  ========================================================= */

  settingsToggleBtn.addEventListener("click", toggleSettings);

  closeSettingsBtn.addEventListener("click", closeSettings);

  /* =========================================================
     MODO FOCO
  ========================================================= */

  focusModeBtn.addEventListener("click", toggleFocusMode);

  /* =========================================================
     RESTAURAR
  ========================================================= */

  resetPreferencesBtn.addEventListener("click", resetPreferences);

  /* =========================================================
     VOLTAR AO TOPO
  ========================================================= */

  backToTopBtn.addEventListener("click", backToTop);

  /* =========================================================
     SCROLL
  ========================================================= */

  window.addEventListener(
    "scroll",
    () => {
      updateReadingProgress();
      updateBackToTopButton();
    },
    {
      passive: true,
    },
  );

  /* =========================================================
     REDIMENSIONAMENTO
  ========================================================= */

  window.addEventListener("resize", () => {
    updateReadingProgress();
  });

  /* =========================================================
     ESC
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (!settingsPanel.hidden) {
      closeSettings();
      return;
    }

    if (body.classList.contains("focus-mode")) {
      toggleFocusMode();
    }
  });

  /* =========================================================
     FECHAR PAINEL CLICANDO FORA
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (settingsPanel.hidden) {
      return;
    }

    const clickedInsidePanel = settingsPanel.contains(event.target);

    const clickedToggle = settingsToggleBtn.contains(event.target);

    if (!clickedInsidePanel && !clickedToggle) {
      closeSettings();
    }
  });

  /* =========================================================
     INICIALIZAÇÃO
  ========================================================= */

  function initialize() {
    loadPreferences();

    applyPreferences();

    calculateReadingTime();

    updateReadingProgress();

    updateBackToTopButton();
  }

  initialize();
});
