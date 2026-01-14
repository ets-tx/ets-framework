/**
 * ETS Framework v26.0α - Progressive Enhancements
 * @license MIT - https://github.com/ets-tx/ets-framework
 *
 * Core Features:
 * - Theme persistence (light/dark/high-contrast)
 * - Sidebar toggle
 * - Scroll spy for navigation
 * - Screen reader announcements
 * - Basic diagnostics
 *
 * Budget: ≤5KB
 */

(function() {
	'use strict';

	var d = document;
	var h = d.documentElement;
	var c = h.classList;

	// Storage helper with error handling
	var storage = {
		get: function(k) {
			try { return localStorage.getItem(k); }
			catch(e) { return null; }
		},
		set: function(k, v) {
			try { localStorage.setItem(k, v); }
			catch(e) {}
		},
		rm: function(k) {
			try { localStorage.removeItem(k); }
			catch(e) {}
		}
	};

	// Theme constants
	var THEME_KEY = 'ets-theme';
	var THEMES = ['light', 'dark', 'high-contrast'];

	// Scroll state tracking
	var isScrolled = false;
	var scrollTimer;

	function updateScrollState() {
		var scrolled = window.scrollY > 0;
		if (scrolled !== isScrolled) {
			isScrolled = scrolled;
			c.toggle('is-scrolled', scrolled);
		}
		c.add('is-scrolling');
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(function() {
			c.remove('is-scrolling');
		}, 150);
	}

	// Scroll spy for sidebar navigation
	var observer;
	var currentId;
	var navLinks = [];
	var clickLock = false;

	function updateActiveNav(id) {
		if (clickLock || id === currentId) return;
		currentId = id;
		navLinks.forEach(function(link) {
			var href = link.getAttribute('href');
			if (!href || href.charAt(0) !== '#') return;
			var targetId = href.slice(1);
			if (targetId === id || id.indexOf(targetId + '__') === 0 || id.indexOf(targetId + '_') === 0) {
				link.setAttribute('aria-current', 'page');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}

	// Theme management
	var themeLinks = [];

	function setTheme(theme) {
		if (THEMES.indexOf(theme) < 0) return;

		if (theme === 'light') {
			delete h.dataset.theme;
			storage.rm(THEME_KEY);
		} else {
			h.dataset.theme = theme;
			storage.set(THEME_KEY, theme);
		}

		// Update theme switcher buttons
		themeLinks.forEach(function(link) {
			var href = link.getAttribute('href');
			if (!href) return;
			var linkTheme = href.slice(1);
			if (linkTheme === theme) {
				link.setAttribute('aria-current', 'true');
			} else {
				link.removeAttribute('aria-current');
			}
		});

		// Dispatch custom event
		d.dispatchEvent(new CustomEvent('ets:theme-change', { detail: { theme: theme } }));
	}

	function getTheme() {
		return h.dataset.theme || 'light';
	}

	function clearThemeHash() {
		if (THEMES.indexOf(location.hash.slice(1)) > -1) {
			history.replaceState(null, '', location.pathname + location.search);
		}
	}

	// Sidebar toggle (desktop)
	function toggleSidebar() {
		var layout = d.querySelector('.app-layout');
		if (layout) {
			layout.classList.toggle('sidebar-collapsed');
			ETS.announce(layout.classList.contains('sidebar-collapsed') ? 'Sidebar collapsed' : 'Sidebar expanded');
		}
	}

	// Mobile menu toggle
	function toggleMobileMenu() {
		var layout = d.querySelector('.app-layout');
		if (layout) {
			var isOpen = layout.classList.toggle('mobile-menu-open');
			var btn = d.querySelector('[data-mobile-menu-toggle]');
			if (btn) {
				btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
				btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
			}
			ETS.announce(isOpen ? 'Menu opened' : 'Menu closed');

			// Close menu when clicking backdrop
			if (isOpen) {
				var closeOnBackdrop = function(e) {
					if (e.target === layout && layout.classList.contains('mobile-menu-open')) {
						toggleMobileMenu();
					}
				};
				layout.addEventListener('click', closeOnBackdrop, { once: true });
			}
		}
	}

	// User popup management
	var userPopupOpen = false;
	var userPopupTrigger = null;
	var userPopup = null;

	// Theme popup management
	var themePopup = null;
	var themePopupTrigger = null;
	var themePopupTimeout = null;
	var themePopupOpen = false;

	// Tooltip management
	var currentTooltip = null;

	// =========================================
	// GLOBAL VIEWPORT-AWARE POSITIONING SYSTEM
	// =========================================
	// Use for: popups, tooltips, dropdowns, etc.
	// Options:
	//   gap: spacing from trigger/viewport edge (default: 12)
	//   preferAbove: try to position above trigger first (default: true for bottom triggers)
	//   preferRight: try to position to right of trigger (default: false, true for collapsed sidebar)
	//   alignToTrigger: 'start' | 'center' | 'end' - horizontal alignment (default: 'start')
	//   maxHeight: constrain popup height (default: none)
	//   maxWidth: constrain popup width (default: none)

	function positionInViewport(popup, trigger, options) {
		options = options || {};
		var gap = options.gap !== undefined ? options.gap : 12;
		var alignToTrigger = options.alignToTrigger || 'start';

		var triggerRect = trigger.getBoundingClientRect();
		var viewportWidth = window.innerWidth;
		var viewportHeight = window.innerHeight;

		// Get actual popup dimensions (make visible briefly if needed)
		var wasHidden = popup.style.visibility === 'hidden' || !popup.offsetWidth;
		if (wasHidden) {
			popup.style.visibility = 'hidden';
			popup.style.display = 'block';
			popup.style.position = 'fixed';
		}
		var popupWidth = popup.offsetWidth || 240;
		var popupHeight = popup.offsetHeight || 200;

		// Apply max constraints if specified
		if (options.maxWidth && popupWidth > options.maxWidth) {
			popupWidth = options.maxWidth;
		}
		if (options.maxHeight && popupHeight > options.maxHeight) {
			popupHeight = options.maxHeight;
		}

		var left, top;
		var placement = { horizontal: 'left', vertical: 'below' };

		// Determine if trigger is in bottom half of viewport
		var triggerCenterY = triggerRect.top + triggerRect.height / 2;
		var isInBottomHalf = triggerCenterY > viewportHeight / 2;

		// Determine if we should prefer positioning to the right (collapsed sidebar)
		var preferRight = options.preferRight || (isCollapsed && isCollapsed());

		// HORIZONTAL POSITIONING
		if (preferRight) {
			// Position to the right of sidebar/trigger
			var sidebar = d.querySelector('.app-layout > aside');
			var sidebarRect = sidebar ? sidebar.getBoundingClientRect() : triggerRect;
			left = sidebarRect.right + gap;
			placement.horizontal = 'right';

			// Check if it fits to the right
			if (left + popupWidth > viewportWidth - gap) {
				// Try left of trigger
				left = triggerRect.left - popupWidth - gap;
				placement.horizontal = 'left';
				if (left < gap) {
					// Constrain to viewport
					left = gap;
				}
			}
		} else {
			// Align with trigger based on alignToTrigger option
			if (alignToTrigger === 'end') {
				left = triggerRect.right - popupWidth;
			} else if (alignToTrigger === 'center') {
				left = triggerRect.left + (triggerRect.width - popupWidth) / 2;
			} else {
				left = triggerRect.left;
			}

			// Horizontal bounds check
			if (left + popupWidth > viewportWidth - gap) {
				left = viewportWidth - popupWidth - gap;
			}
			if (left < gap) {
				left = gap;
			}
		}

		// VERTICAL POSITIONING
		var spaceAbove = triggerRect.top - gap;
		var spaceBelow = viewportHeight - triggerRect.bottom - gap;
		var preferAbove = options.preferAbove !== undefined ? options.preferAbove : isInBottomHalf;

		if (preferRight) {
			// For side-positioned popups, vertically center on trigger or align to bottom
			if (isInBottomHalf) {
				// Align popup bottom with trigger bottom
				top = triggerRect.bottom - popupHeight;
				if (top < gap) {
					top = gap;
				}
			} else {
				// Align popup top with trigger top
				top = triggerRect.top;
				if (top + popupHeight > viewportHeight - gap) {
					top = viewportHeight - popupHeight - gap;
				}
			}
			placement.vertical = 'aligned';
		} else if (preferAbove && spaceAbove >= popupHeight) {
			// Position above
			top = triggerRect.top - popupHeight - gap;
			placement.vertical = 'above';
		} else if (spaceBelow >= popupHeight) {
			// Position below
			top = triggerRect.bottom + gap;
			placement.vertical = 'below';
		} else if (spaceAbove > spaceBelow) {
			// More space above, constrain height if needed
			top = gap;
			if (options.maxHeight === undefined && spaceAbove < popupHeight) {
				popupHeight = spaceAbove;
			}
			placement.vertical = 'above-constrained';
		} else {
			// More space below, constrain height if needed
			top = triggerRect.bottom + gap;
			if (options.maxHeight === undefined && spaceBelow < popupHeight) {
				popupHeight = spaceBelow;
			}
			placement.vertical = 'below-constrained';
		}

		// Final bounds check
		if (top < gap) top = gap;
		if (top + popupHeight > viewportHeight - gap) {
			top = viewportHeight - popupHeight - gap;
		}

		// Build style string
		var styleStr = 'position: fixed !important;';
		styleStr += ' left: ' + Math.round(left) + 'px !important;';
		styleStr += ' top: ' + Math.round(top) + 'px !important;';
		styleStr += ' right: auto !important;';
		styleStr += ' bottom: auto !important;';

		if (options.maxHeight || placement.vertical.includes('constrained')) {
			styleStr += ' max-height: ' + Math.round(popupHeight) + 'px !important;';
			styleStr += ' overflow-y: auto !important;';
		}
		if (options.maxWidth) {
			styleStr += ' max-width: ' + Math.round(popupWidth) + 'px !important;';
		}

		popup.style.cssText = styleStr;

		// Set data attribute for CSS styling based on placement
		popup.setAttribute('data-placement', placement.vertical + '-' + placement.horizontal);

		return placement;
	}

	// Alias for backwards compatibility
	var positionPopupInViewport = positionInViewport;

	function openUserPopup() {
		if (!userPopup || !userPopupTrigger) return;
		userPopupOpen = true;

		// Position popup with viewport awareness BEFORE showing
		positionInViewport(userPopup, userPopupTrigger, {
			gap: 12,
			preferRight: isCollapsed(),
			alignToTrigger: 'start',
			maxHeight: window.innerHeight - 100 // Leave room for breathing
		});

		// Now show it
		userPopup.setAttribute('data-open', 'true');
		userPopupTrigger.setAttribute('aria-expanded', 'true');

		// Focus first menu item after animation starts
		requestAnimationFrame(function() {
			var firstItem = userPopup.querySelector('a, button');
			if (firstItem) firstItem.focus();
		});

		// Add click outside listener
		setTimeout(function() {
			d.addEventListener('click', closeUserPopupOnClickOutside);
			d.addEventListener('keydown', handleUserPopupKeydown);
		}, 0);
	}

	function closeUserPopup() {
		if (!userPopup || !userPopupTrigger) return;
		userPopupOpen = false;
		userPopup.removeAttribute('data-open');
		userPopupTrigger.setAttribute('aria-expanded', 'false');
		userPopupTrigger.focus();

		// Remove listeners
		d.removeEventListener('click', closeUserPopupOnClickOutside);
		d.removeEventListener('keydown', handleUserPopupKeydown);
	}

	function toggleUserPopup() {
		if (userPopupOpen) {
			closeUserPopup();
		} else {
			openUserPopup();
		}
	}

	function closeUserPopupOnClickOutside(e) {
		if (!userPopup || !userPopupTrigger) return;
		if (!userPopup.contains(e.target) && !userPopupTrigger.contains(e.target)) {
			closeUserPopup();
		}
	}

	function handleUserPopupKeydown(e) {
		if (e.key === 'Escape') {
			closeUserPopup();
		}
		// Arrow key navigation within popup
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			var items = [].slice.call(userPopup.querySelectorAll('a, button'));
			var currentIndex = items.indexOf(d.activeElement);
			var nextIndex;
			if (e.key === 'ArrowDown') {
				nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
			} else {
				nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
			}
			items[nextIndex].focus();
		}
	}

	// Theme popup management
	function createThemePopup() {
		if (themePopup) return;

		themePopup = d.createElement('div');
		themePopup.className = 'theme-popup';
		themePopup.setAttribute('role', 'menu');
		themePopup.setAttribute('aria-label', 'Theme options');

		var themeOptions = [
			{ id: 'light', name: 'Light', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' },
			{ id: 'dark', name: 'Dark', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' },
			{ id: 'high-contrast', name: 'High Contrast', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z"/></svg>' }
		];

		var currentTheme = getTheme();

		themeOptions.forEach(function(opt) {
			var btn = d.createElement('button');
			btn.className = 'theme-popup-option';
			btn.setAttribute('role', 'menuitem');
			btn.setAttribute('data-theme', opt.id);
			if (opt.id === currentTheme) {
				btn.setAttribute('aria-current', 'true');
			}
			btn.innerHTML = opt.icon + '<span>' + opt.name + '</span>';
			btn.addEventListener('click', function() {
				setTheme(opt.id);
				updateThemePopupState();
				closeThemePopup();
				ETS.announce('Theme changed to ' + opt.name);
			});
			themePopup.appendChild(btn);
		});

		d.body.appendChild(themePopup);
	}

	function updateThemePopupState() {
		if (!themePopup) return;
		var currentTheme = getTheme();
		var options = themePopup.querySelectorAll('.theme-popup-option');
		options.forEach(function(opt) {
			if (opt.getAttribute('data-theme') === currentTheme) {
				opt.setAttribute('aria-current', 'true');
			} else {
				opt.removeAttribute('aria-current');
			}
		});
	}

	function openThemePopup() {
		if (!themePopup || !themePopupTrigger) return;
		themePopupOpen = true;

		updateThemePopupState();

		// Position popup with global viewport-aware system
		positionInViewport(themePopup, themePopupTrigger, {
			gap: 12,
			preferRight: true, // Always to right for collapsed sidebar theme button
			alignToTrigger: 'start'
		});

		themePopup.classList.add('visible');

		// Add close listeners
		setTimeout(function() {
			d.addEventListener('click', closeThemePopupOnClickOutside);
			d.addEventListener('keydown', handleThemePopupKeydown);
		}, 0);
	}

	function closeThemePopup() {
		if (!themePopup) return;
		themePopupOpen = false;
		themePopup.classList.remove('visible');
		clearTimeout(themePopupTimeout);

		d.removeEventListener('click', closeThemePopupOnClickOutside);
		d.removeEventListener('keydown', handleThemePopupKeydown);
	}

	function closeThemePopupOnClickOutside(e) {
		if (!themePopup || !themePopupTrigger) return;
		if (!themePopup.contains(e.target) && !themePopupTrigger.contains(e.target)) {
			closeThemePopup();
		}
	}

	function handleThemePopupKeydown(e) {
		if (e.key === 'Escape') {
			closeThemePopup();
			if (themePopupTrigger) themePopupTrigger.focus();
		}
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			var items = [].slice.call(themePopup.querySelectorAll('button'));
			var currentIndex = items.indexOf(d.activeElement);
			var nextIndex;
			if (e.key === 'ArrowDown') {
				nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
			} else {
				nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
			}
			items[nextIndex].focus();
		}
	}

	// Sidebar tooltips (for collapsed state)
	function showTooltip(element, text) {
		hideTooltip();

		var sidebar = d.querySelector('.app-layout > aside');
		if (!sidebar) return;

		currentTooltip = d.createElement('div');
		currentTooltip.className = 'sidebar-tooltip';
		currentTooltip.textContent = text;
		d.body.appendChild(currentTooltip);

		// Use global positioning system for tooltips too
		var rect = element.getBoundingClientRect();
		var sidebarRect = sidebar.getBoundingClientRect();
		var viewportWidth = window.innerWidth;
		var viewportHeight = window.innerHeight;
		var gap = 12;

		// Get tooltip dimensions
		var tooltipWidth = currentTooltip.offsetWidth || 100;
		var tooltipHeight = currentTooltip.offsetHeight || 32;

		// Default: position to right of sidebar
		var left = sidebarRect.right + gap;
		var top = rect.top + (rect.height - tooltipHeight) / 2;

		// Check horizontal bounds
		if (left + tooltipWidth > viewportWidth - gap) {
			// Position to left of element instead
			left = rect.left - tooltipWidth - gap;
			currentTooltip.setAttribute('data-placement', 'left');
		} else {
			currentTooltip.setAttribute('data-placement', 'right');
		}

		// Check vertical bounds
		if (top < gap) {
			top = gap;
		}
		if (top + tooltipHeight > viewportHeight - gap) {
			top = viewportHeight - tooltipHeight - gap;
		}

		currentTooltip.style.left = Math.round(left) + 'px';
		currentTooltip.style.top = Math.round(top) + 'px';

		// Animate in
		requestAnimationFrame(function() {
			if (currentTooltip) {
				currentTooltip.classList.add('visible');
			}
		});
	}

	function hideTooltip() {
		if (currentTooltip) {
			currentTooltip.classList.remove('visible');
			var tooltipToRemove = currentTooltip;
			setTimeout(function() {
				if (tooltipToRemove && tooltipToRemove.parentNode) {
					tooltipToRemove.parentNode.removeChild(tooltipToRemove);
				}
			}, 150);
			currentTooltip = null;
		}
	}

	function isCollapsed() {
		var layout = d.querySelector('.app-layout');
		return layout && (layout.classList.contains('sidebar-collapsed') || window.innerWidth <= 1023);
	}

	// Screen reader announcements
	function announce(message, priority) {
		var announcer = d.getElementById('announcer');
		if (!announcer) {
			announcer = d.createElement('div');
			announcer.id = 'announcer';
			announcer.setAttribute('aria-live', priority === 'assertive' ? 'assertive' : 'polite');
			announcer.setAttribute('aria-atomic', 'true');
			d.body.appendChild(announcer);
		}
		// Clear and re-announce (ensures screen readers pick up repeated messages)
		announcer.textContent = '';
		setTimeout(function() {
			announcer.textContent = message;
		}, 100);
	}

	// Basic diagnostics
	var diagnostics = {
		errors: [],
		log: function(type, message, data) {
			var entry = {
				time: new Date().toISOString(),
				type: type,
				message: message,
				data: data
			};
			this.errors.push(entry);
			if (this.errors.length > 50) this.errors.shift();

			// Also log to console in dev
			if (console && console.log) {
				console.log('[ETS ' + type + ']', message, data || '');
			}
		},
		report: function() {
			return {
				version: ETS.version,
				theme: getTheme(),
				errors: this.errors.slice(),
				browser: navigator.userAgent,
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight
				}
			};
		}
	};

	// Global error handler
	window.addEventListener('error', function(e) {
		diagnostics.log('error', e.message, {
			filename: e.filename,
			line: e.lineno,
			col: e.colno
		});
	});

	// Public API
	window.ETS = {
		version: '26.0α',

		// Theme
		theme: {
			get: getTheme,
			set: setTheme,
			toggle: function() {
				var current = getTheme();
				var next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
				setTheme(next);
			},
			clear: function() { setTheme('light'); }
		},

		// Sidebar
		sidebar: {
			toggle: toggleSidebar,
			collapse: function() {
				var layout = d.querySelector('.app-layout');
				if (layout && !layout.classList.contains('sidebar-collapsed')) {
					toggleSidebar();
				}
			},
			expand: function() {
				var layout = d.querySelector('.app-layout');
				if (layout && layout.classList.contains('sidebar-collapsed')) {
					toggleSidebar();
				}
			}
		},

		// Mobile menu
		mobileMenu: {
			toggle: toggleMobileMenu,
			open: function() {
				var layout = d.querySelector('.app-layout');
				if (layout && !layout.classList.contains('mobile-menu-open')) {
					toggleMobileMenu();
				}
			},
			close: function() {
				var layout = d.querySelector('.app-layout');
				if (layout && layout.classList.contains('mobile-menu-open')) {
					toggleMobileMenu();
				}
			}
		},

		// User popup
		userPopup: {
			toggle: toggleUserPopup,
			open: openUserPopup,
			close: closeUserPopup
		},

		// Global viewport-aware positioning utility
		// Use for custom popups, dropdowns, tooltips, etc.
		// Options: { gap, preferAbove, preferRight, alignToTrigger, maxHeight, maxWidth }
		position: positionInViewport,

		// Accessibility
		announce: announce,

		// Diagnostics
		diagnostics: diagnostics,

		// Storage utility
		storage: storage,

		// Initialize
		init: function() {
			if (ETS._initialized) return;
			ETS._initialized = true;

			// Scroll state
			updateScrollState();
			window.addEventListener('scroll', updateScrollState, { passive: true });

			// Scroll spy setup
			var sections = d.querySelectorAll('section[id], article[id]');
			navLinks = [].slice.call(d.querySelectorAll('aside nav a[href^="#"]'));

			// Filter out theme links from nav links
			navLinks = navLinks.filter(function(link) {
				var href = link.getAttribute('href');
				return href && THEMES.indexOf(href.slice(1)) < 0;
			});

			if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
				observer = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting) {
							updateActiveNav(entry.target.id);
						}
					});
				}, { rootMargin: '-20% 0px -80% 0px' });

				[].forEach.call(sections, function(section) {
					observer.observe(section);
				});
			}

			// Nav link click handling
			navLinks.forEach(function(link) {
				link.addEventListener('click', function() {
					clickLock = true;
					navLinks.forEach(function(l) { l.removeAttribute('aria-current'); });
					link.setAttribute('aria-current', 'page');
					setTimeout(function() { clickLock = false; }, 1000);
				});
			});

			// Theme links setup
			themeLinks = [].slice.call(d.querySelectorAll('a[href="#light"], a[href="#dark"], a[href="#high-contrast"]'));
			themeLinks.forEach(function(link) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					setTheme(link.getAttribute('href').slice(1));
					clearThemeHash();
				});
			});

			// Set initial theme button state
			var currentTheme = getTheme();
			themeLinks.forEach(function(link) {
				var href = link.getAttribute('href');
				if (href && href.slice(1) === currentTheme) {
					link.setAttribute('aria-current', 'true');
				}
			});

			// Sidebar toggle buttons
			d.querySelectorAll('[data-sidebar-toggle]').forEach(function(btn) {
				btn.addEventListener('click', toggleSidebar);
			});

			// Mobile menu toggle buttons
			d.querySelectorAll('[data-mobile-menu-toggle]').forEach(function(btn) {
				btn.addEventListener('click', toggleMobileMenu);
			});

			// Close mobile menu when nav link clicked
			d.querySelectorAll('.app-layout > aside nav a').forEach(function(link) {
				link.addEventListener('click', function() {
					var layout = d.querySelector('.app-layout');
					if (layout && layout.classList.contains('mobile-menu-open')) {
						toggleMobileMenu();
					}
				});
			});

			// User popup setup
			userPopupTrigger = d.querySelector('[data-user-popup-toggle]');
			userPopup = d.querySelector('.user-popup');
			var userPopupTimeout = null;

			if (userPopupTrigger && userPopup) {
				// Show on hover with delay
				userPopupTrigger.addEventListener('mouseenter', function() {
					userPopupTimeout = setTimeout(function() {
						openUserPopup();
					}, 200);
				});

				userPopupTrigger.addEventListener('mouseleave', function() {
					clearTimeout(userPopupTimeout);
					// Don't close immediately if mouse moves to popup
					setTimeout(function() {
						if (userPopup && !userPopup.matches(':hover') && !userPopupTrigger.matches(':hover')) {
							closeUserPopup();
						}
					}, 100);
				});

				// Also close when leaving popup
				userPopup.addEventListener('mouseleave', function() {
					setTimeout(function() {
						if (!userPopupTrigger.matches(':hover') && !userPopup.matches(':hover')) {
							closeUserPopup();
						}
					}, 100);
				});

				// Keep popup open when hovering over it
				userPopup.addEventListener('mouseenter', function() {
					clearTimeout(userPopupTimeout);
				});

				// Also support click to toggle
				userPopupTrigger.addEventListener('click', function(e) {
					e.preventDefault();
					toggleUserPopup();
				});
			}

			// Theme popup for collapsed sidebar
			themePopupTrigger = d.querySelector('.theme-toggle-collapsed');
			if (themePopupTrigger) {
				createThemePopup();

				// Show on hover with delay
				themePopupTrigger.addEventListener('mouseenter', function() {
					if (!isCollapsed()) return;
					themePopupTimeout = setTimeout(function() {
						openThemePopup();
					}, 200);
				});

				themePopupTrigger.addEventListener('mouseleave', function() {
					clearTimeout(themePopupTimeout);
					// Don't close immediately if mouse moves to popup
					setTimeout(function() {
						if (themePopup && !themePopup.matches(':hover') && !themePopupTrigger.matches(':hover')) {
							closeThemePopup();
						}
					}, 100);
				});

				// Also close when leaving popup
				if (themePopup) {
					themePopup.addEventListener('mouseleave', function() {
						setTimeout(function() {
							if (!themePopupTrigger.matches(':hover') && !themePopup.matches(':hover')) {
								closeThemePopup();
							}
						}, 100);
					});
				}

				// Show on click
				themePopupTrigger.addEventListener('click', function(e) {
					e.preventDefault();
					if (isCollapsed()) {
						if (themePopupOpen) {
							closeThemePopup();
						} else {
							clearTimeout(themePopupTimeout);
							openThemePopup();
						}
					} else {
						// In expanded state, cycle themes
						ETS.theme.toggle();
						var theme = getTheme();
						var themeNames = { light: 'Light', dark: 'Dark', 'high-contrast': 'High Contrast' };
						ETS.announce('Theme changed to ' + themeNames[theme]);
					}
				});
			}

			// Sidebar tooltips for collapsed nav items (not for items with popups)
			var navItems = d.querySelectorAll('.app-layout > aside .aside-content nav a');
			navItems.forEach(function(item) {
				item.addEventListener('mouseenter', function() {
					if (!isCollapsed()) return;
					var text = item.querySelector('span');
					if (text) {
						showTooltip(item, text.textContent);
					}
				});

				item.addEventListener('mouseleave', function() {
					hideTooltip();
				});
			});

			// Note: User trigger and theme toggle don't need tooltips - they have hover popups

			// Clear theme hash if present
			clearThemeHash();

			diagnostics.log('info', 'ETS Framework initialized');
		}
	};

	// Auto-initialize
	if (d.readyState === 'loading') {
		d.addEventListener('DOMContentLoaded', ETS.init);
	} else {
		ETS.init();
	}

})();
