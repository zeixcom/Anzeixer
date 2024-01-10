/**
 * Anzeixer
 *
 * @author Esther Brunner <esther.brunner@zeix.com>
 * @copyright 2013 – 2024 Zeix AG
 * @license Anzeixer.js may be freely distributed under MIT license
 * 
 * @param {Map<string, string> | undefined} mediaQueries
 * @param {string[] | undefined} breakpointNames CSS custom properties --breakpoint-{name} to get; will be included with min-width media query
 * @returns {Record<string, any>} Anzeixer object
 */
const Anzeixer = (
    mediaQueries = new Map([
        ['portrait', '(orientation: portrait)'],
        ['dark', '(prefers-color-scheme: dark)'],
    ]),
    breakpointNames = ['xsmall', 'small', 'medium', 'large', 'xlarge'],
) => {
    const smallestBreakpoint = breakpointNames[0];
    const breakpointSizes = new Set(breakpointNames.slice(1));

    let view;

    /**
     * Get the current view
     * 
     * @return {string} breakpoint key
     */
    const getView = () => {
        let newView = smallestBreakpoint;
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
    
    const mq = new Map();
    for (const [key, value] of mediaQueries.entries()) {
        mq.set(key, window.matchMedia(value));
    }
    for (const size of breakpointSizes) {
        const value = getComputedStyle(document.documentElement).getPropertyValue(`--breakpoint-${size}`);
        if (value) {
            const mql = window.matchMedia(`(min-width: ${value})`);
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
  
    return {
        mq,
        getView,
        isXSmall,
        isSmall,
        isMedium,
        isLarge,
        isXLarge
    };
  
};

// export default Anzeixer;
  