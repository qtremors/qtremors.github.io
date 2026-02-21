window.Tremors = window.Tremors || {};
window.Tremors.components = {
    injectDropdownMenu: function(basePath = '') {
        const container = document.querySelector('.dropdown-container');
        if (!container || document.getElementById('main-dropdown')) return;
        
        const html = `
            <div class="dropdown-card" id="main-dropdown">
                <button class="dropdown-item" id="btn-nav-tui" title="A minimal lightweight TUI version of this page">
                    <img src="${basePath}assets/alien.svg" class="dropdown-icon" alt="TUI Icon">
                    <span class="dropdown-title">TUI Version</span>
                </button>

                <hr class="menu-separator">

                <button class="dropdown-item" id="btn-nav-history" title="View project evolution timeline">
                    <img src="${basePath}assets/history.png" class="dropdown-icon" alt="History Icon">
                    <span class="dropdown-title">Time Machine</span>
                </button>

                <hr class="menu-separator">

                <div class="dropdown-section">
                    <button class="dropdown-item" id="open-settings-btn" title="Open appearance settings">
                        <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon" width="20" height="20"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                            </path>
                        </svg>
                        <span class="dropdown-title">Appearance</span>
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);

        // Attach event listeners for dropdown buttons
        const tuiBtn = document.getElementById('btn-nav-tui');
        if (tuiBtn) {
            tuiBtn.addEventListener('click', () => {
                location.href = basePath + 'tui.html';
            });
        }
        
        const historyBtn = document.getElementById('btn-nav-history');
        if (historyBtn) {
            historyBtn.addEventListener('click', () => {
                location.href = basePath + 'system/history.html';
            });
        }
    },

    injectSettingsModal: function() {
        if (document.getElementById('settings-modal')) return;
        // Only inject if there's a button to open it (to avoid injecting in TUI pages, etc.)
        if (!document.getElementById('open-settings-btn')) return;
        
        const html = `
    <div id="settings-modal" class="modal-backdrop" aria-hidden="true">
        <div class="modal-card">
            <header class="modal-header">
                <h3>Appearance</h3>
                <button id="close-settings-btn" class="icon-button" aria-label="Close settings">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </header>

            <div class="modal-body">
                <div class="setting-group">
                    <label class="setting-label">Color Mode</label>
                    <div class="segmented-control">
                        <button class="segment-btn" data-set-mode="system">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                            <span>System</span>
                        </button>
                        <button class="segment-btn" data-set-mode="light">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <span>Light</span>
                        </button>
                        <button class="segment-btn" data-set-mode="dark">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            <span>Dark</span>
                        </button>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label">Visual Theme</label>
                    <div class="theme-grid">
                        <button class="theme-card" data-set-theme="md">
                            <div class="theme-preview md-preview"></div>
                            <span>MD</span>
                        </button>
                        <button class="theme-card" data-set-theme="md3">
                            <div class="theme-preview md3-preview"></div>
                            <span>MD3</span>
                        </button>
                        <button class="theme-card" data-set-theme="oled">
                            <div class="theme-preview oled-preview"></div>
                            <span>OLED</span>
                        </button>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label">Scene Effect</label>
                    <div class="segmented-control">
                        <button class="segment-btn" data-set-effect="fog">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M3 8h18M3 12h18M3 16h12"></path>
                            </svg>
                            <span>Fog</span>
                        </button>
                        <button class="segment-btn" data-set-effect="glass">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                            </svg>
                            <span>Glass</span>
                        </button>
                        <button class="segment-btn" data-set-effect="none">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                            </svg>
                            <span>None</span>
                        </button>
                    </div>
                </div>

                <div class="setting-group" id="spotlight-setting-group">
                    <label class="setting-label">Spotlight Effect</label>
                    <div class="toggle-row">
                        <span class="toggle-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path
                                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42">
                                </path>
                            </svg>
                            Cursor spotlight (Hero & Skills)
                        </span>
                        <button class="toggle-switch" data-set-spotlight="toggle" aria-label="Toggle spotlight">
                            <span class="toggle-slider"></span>
                        </button>
                    </div>
                </div>

                <div class="setting-group" id="pattern-setting-group">
                    <label class="setting-label">Hero Background</label>
                    <div class="segmented-control">
                        <button class="segment-btn" data-set-pattern="dots">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="4" cy="4" r="2" />
                                <circle cx="12" cy="4" r="2" />
                                <circle cx="20" cy="4" r="2" />
                                <circle cx="4" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="20" cy="12" r="2" />
                                <circle cx="4" cy="20" r="2" />
                                <circle cx="12" cy="20" r="2" />
                                <circle cx="20" cy="20" r="2" />
                            </svg>
                            <span>Dots</span>
                        </button>
                        <button class="segment-btn" data-set-pattern="grid">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                            </svg>
                            <span>Grid</span>
                        </button>
                        <button class="segment-btn" data-set-pattern="waves">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                                <path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                                <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                            </svg>
                            <span>Waves</span>
                        </button>
                        <button class="segment-btn" data-set-pattern="none">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                            </svg>
                            <span>None</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        
        // Hide spotlight/pattern on non-index pages
        if (location.pathname.indexOf('index.html') === -1 && location.pathname !== '/' && !location.pathname.endsWith('/qtremors.github.io/')) {
            const spotlightGrp = document.getElementById('spotlight-setting-group');
            const patternGrp = document.getElementById('pattern-setting-group');
            if (spotlightGrp) spotlightGrp.style.display = 'none';
            if (patternGrp) patternGrp.style.display = 'none';
        }
    }
};

(function() {
    const basePath = window.TREMORS_BASE_PATH || '';
    if (window.TREMORS_INJECT_DROPDOWN !== false) {
        window.Tremors.components.injectDropdownMenu(basePath);
    }
    if (window.TREMORS_INJECT_MODAL !== false) {
        window.Tremors.components.injectSettingsModal();
    }
})();
