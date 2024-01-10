/**
 * Anzeixer
 *
 * @author Esther Brunner <esther.brunner@zeix.com>
 * @copyright 2013 – 2024 Zeix AG
 * @license Anzeixer.js may be freely distributed under MIT license
 */
window.Anzeixer = (() => {
    const mq = new Map();
    const breakpointSizes = new Set(['small', 'medium', 'large', 'xlarge']);
    let view;
    
    /**
     * Extract breakpoint values from CSS custom properties --breakpoint-[small|medium|large|xlarge]
     * 
     * @returns {Map<string, string>} map of breakpoint values
     */
    const getBreakpoints = () => {
        const breakpoints = new Map();
        const rootDeclarations = Array.from(document.styleSheets).map((styleSheet) => {
            try {
                return Array.from(styleSheet.cssRules).filter((rule) => rule.selectorText === ':root');
            } catch (e) {
                console.log(`Access to stylesheet ${styleSheet.href} is denied. Ignoring...`)
            }
        }).flat().map((rules) => rules.style);
        for (const size of breakpointSizes) {
            rootDeclarations.forEach((declaration) => {
                const value = declaration.getPropertyValue(`--breakpoint-${size}`);
                value && breakpoints.set(size, value);
            });
        };
        return breakpoints;
    }

    /**
     * Get the current view
     * 
     * @return {string} breakpoint key
     */
    const getView = () => {
        let newView = 'xsmall';
        for (const size of breakpointSizes) {
            if (mq.has(size) && mq.get(size).matches) newView = size;
        }
        return newView;
    };

    /**
     * Trigger custom 'viewchange' event
     *
     * @deprecated Anzeixer will not trigger a custom 'viewchange' event in future versions.
     * Add event listeners on MediaQueryList's 'change' event instead (available through the Anzeixer.mq map).
     * 
     * @param {MediaQueryListEvent} e native event
     * @param {string} oldView view before the change
     * 
     * @return {string} string from body:after CSS content property
     */
    const triggerViewChange = (e, oldView) => {
        const event = new window.CustomEvent('viewchange', {'detail': {
            'originalView': oldView,
            'currentView': view,
            'matches': e ? e.matches : undefined,
            'media': e ? e.media : undefined,
        }});
        document.dispatchEvent(event);
    }

    /**
     * Update current viewport size
     * 
     * @param {MediaQueryListEvent} e native event
     */
    const updateMedia = (e) => {
        const oldView = view;
        const newView = getView();

        if (oldView !== newView) {
            view = newView;
            triggerViewChange(e, oldView);
        }
    }

    mq.set('portrait', window.matchMedia('(orientation: portrait)'));
    mq.set('dark', window.matchMedia('(prefers-color-schme: dark)'));

    const breakpoints = getBreakpoints();
    for (const size of breakpointSizes) {
        if (breakpoints.has(size)) {
            const mql = window.matchMedia(`(min-width: ${breakpoints.get(size)})`);
            mql.addEventListener('change', updateMedia);
            mq.set(size, mql);
        }
    }

    window.addEventListener('DOMContentLoaded', updateMedia);
  
    /**
     * Convenience functions for view sizes
     *
     * @return {boolean} whether a size matches the current view
     */
    const isXSmall = () => view === 'xsmall';     // target smallest devices only
    const isSmall = () => view.includes('small'); // target all small devices
    const isMedium = () => view === 'medium';     // target medium devices only
    const isLarge = () => view.includes('large'); // target all large devices
    const isXLarge = () => view === 'xlarge';     // target largest devices only
  
    /**
     * Convenience functions for orientations
     * 
     * @deprecated Will be removed in future versions. Get Anzeixer.mq.get('portrait').matches instead.
     *
     * @return {boolean} whether the orientation matches the current view
     */
    const isPortrait = () => mq.get('portrait').matches;
    const isLandscape = () => !mq.get('portrait').matches;

    /**
     * Convenience functions for preferred color schme
     * 
     * @deprecated Will be removed in future versions. Get Anzeixer.mq.get('dark').matches instead.
     *
     * @return {boolean} whether a color scheme matches is preferred
     */
    const isDark = () => mq.get('dark').matches;
    const isLight = () => !mq.get('dark').matches;
  
    return {
        mq,
        getView,
        isXSmall,
        isSmall,
        isMedium,
        isLarge,
        isXLarge,
        isPortrait,
        isLandscape,
        isDark,
        isLight,
    };
  
})();
  