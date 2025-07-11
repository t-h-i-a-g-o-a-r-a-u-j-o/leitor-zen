document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DA UI ---
    const body = document.body;
    const themeToggleButton = document.getElementById('themeToggleButton');
    const increaseFontBtn = document.getElementById('increaseFontBtn');
    const decreaseFontBtn = document.getElementById('decreaseFontBtn');
    const fontToggleBtn = document.getElementById('fontToggleBtn');

    // --- LÓGICA DE TEMAS ---
    const themes = ['claro', 'escuro', 'sepia'];
    let currentThemeIndex = 0;

    function applyTheme(themeName) {
        // Remove todas as classes de tema do body
        themes.forEach(t => body.classList.remove(t));
        // Adiciona a classe do tema atual (se não for o claro, que é o padrão)
        if (themeName !== 'claro') {
            body.classList.add(themeName);
        }
        updateThemeIcon(themeName);
        localStorage.setItem('theme', themeName);
        currentThemeIndex = themes.indexOf(themeName);
    }

    function updateThemeIcon(themeName) {
        const icons = {
            claro: 'fa-sun',
            escuro: 'fa-moon',
            sepia: 'fa-book-open'
        };
        themeToggleButton.innerHTML = `<i class="fas ${icons[themeName]}"></i>`;
    }

    themeToggleButton.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(themes[currentThemeIndex]);
    });

    // --- LÓGICA DE TAMANHO DA FONTE ---
    const fontSizes = ['font-sm', 'font-normal', 'font-lg', 'font-xl'];
    let currentSizeIndex = 1; // 'font-normal' é o padrão

    function applyFontSize(sizeClassName) {
        fontSizes.forEach(s => body.classList.remove(s));
        if (sizeClassName !== 'font-normal') {
            body.classList.add(sizeClassName);
        }
        localStorage.setItem('font_size', sizeClassName);
        currentSizeIndex = fontSizes.indexOf(sizeClassName);
    }

    increaseFontBtn.addEventListener('click', () => {
        if (currentSizeIndex < fontSizes.length - 1) {
            currentSizeIndex++;
            applyFontSize(fontSizes[currentSizeIndex]);
        }
    });

    decreaseFontBtn.addEventListener('click', () => {
        if (currentSizeIndex > 0) {
            currentSizeIndex--;
            applyFontSize(fontSizes[currentSizeIndex]);
        }
    });

    // --- LÓGICA DE TIPO DE FONTE ---
    function applyFontFamily(isSerif) {
        if (isSerif) {
            body.classList.add('font-serif');
        } else {
            body.classList.remove('font-serif');
        }
        localStorage.setItem('font_family', isSerif ? 'serif' : 'sans-serif');
    }

    fontToggleBtn.addEventListener('click', () => {
        applyFontFamily(!body.classList.contains('font-serif'));
    });

    // --- INICIALIZAÇÃO ---
    function loadSavedPreferences() {
        // Carrega tema salvo ou detecta o do sistema
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('escuro');
        } else {
            applyTheme('claro');
        }

        // Carrega tamanho de fonte salvo
        const savedFontSize = localStorage.getItem('font_size');
        if (savedFontSize) {
            applyFontSize(savedFontSize);
        }

        // Carrega tipo de fonte salvo
        const savedFontFamily = localStorage.getItem('font_family');
        if (savedFontFamily === 'serif') {
            applyFontFamily(true);
        }
    }

    loadSavedPreferences();
});