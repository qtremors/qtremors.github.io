(function () {
    try {
        // 1. Visual Theme (md, md3, oled)
        var theme = localStorage.getItem('style_mode') || 'md';
        var themes = ['md', 'md3', 'oled'];
        themes.forEach(function (t) {
            var el = document.getElementById('theme-' + t);
            if (el) el.disabled = (t !== theme);
        });
        document.body.setAttribute('data-style-mode', theme);

        // 2. Color Mode (system, light, dark)
        var pref = localStorage.getItem('theme_pref') || 'system';
        var mode = pref === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : pref;
        document.body.setAttribute('data-theme', mode);

        // 3. Scene Effect (fog, glass, none)
        var effect = localStorage.getItem('effect_mode') || 'none';
        var effects = ['fog', 'glass'];
        effects.forEach(function (e) {
            var el = document.getElementById('effect-' + e);
            if (el) el.disabled = (e !== effect);
        });

        // 4. Spotlight Effect (on, off)
        var spotlight = localStorage.getItem('spotlight_mode') || 'off';
        var spotlightEl = document.getElementById('effect-spotlight');
        if (spotlightEl) spotlightEl.disabled = (spotlight !== 'on');

        // 5. Hero Pattern (dots, grid, waves, none)
        var pattern = localStorage.getItem('pattern_mode') || 'none';
        var patterns = ['dots', 'grid', 'waves'];
        patterns.forEach(function (p) {
            var el = document.getElementById('pattern-' + p);
            if (el) el.disabled = (p !== pattern);
        });
    } catch (e) { }
})();
