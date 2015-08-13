/**
 * Custom event polyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent?redirectlocale=en-US&redirectslug=Web%2FAPI%2FEvent%2FCustomEvent#Browser_compatibility
 */
try {
  (function() {
    'use strict';

    function CustomEvent(event, params){
      params = params || {bubbles: false, cancelable: false, detail: undefined};
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    if (window.CustomEvent === undefined) {
      // Safari 5.1 (and most likely everything below) doesn't have window.CustomEvent
      // function for some reason. It does however create objects with that function as
      // a constructor through the document.createEvent function. So we're poryfilling
      // the polyfill. Yey for JavaScript :|
      var dummy = document.createEvent('CustomEvent');
      CustomEvent.prototype = dummy.constructor.prototype;
    } else {
      CustomEvent.prototype = window.CustomEvent.prototype;
    }

    window.CustomEvent = CustomEvent;
    window.hasCustomEvents = true;
  })();
} catch (ex) {
  // graceful degradation - if there is an unexpected error with the polyfill
  // for custom events, this makes sure that the behavior is still somewhat reasonable
  window.hasCustomEvents = false;
  if (console !== undefined && typeof(console.warn) === 'function') {
    console.warn('Error initializing CustomEvent polyfill - Anzeixer will not raise events');
    console.warn(ex);
  }
}

/**
 * Anzeixer
 * (c) 2013 - 2014 Zeix AG
 * Anzeixer.js may be freely distributed under the MIT license.
 */
var Anzeixer = (function() {
  'use strict';

  var view,
      viewIndex,
      viewArray = ['desktop', 'tablet', 'phone-landscape', 'phone-portrait'];

  // get the current view and trigger viewchange event if it changed since last query
  var getView = function() {
    var oldView = view,
        oldViewIndex = viewIndex;
    try {
      view = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, '');
      viewIndex = parseInt(window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/["']/g, ''));
    } catch (error){
      view = 'desktop';
      viewIndex = 0;
    }
    if (oldView !== view && window.hasCustomEvents) {
      var event = new window.CustomEvent('viewchange', {'detail': {
        'originalView': viewArray[oldViewIndex],
        'currentView': viewArray[viewIndex]
      }});
      document.dispatchEvent(event);
    }
    return viewIndex;
  };

  // split view names and return only the main part
  var mainView = function() {
    var parts = getView().split('-');
    return parts[0];
  };

  // listen to document ready and resize events
  window.addEventListener('DOMContentLoaded', getView, false);
  window.addEventListener('resize', getView, false);

  // add the detail property to jQuery event object
  if (typeof jQuery !== 'undefined') {
    jQuery.event.props.push('detail');
  }

  return {
    getView: getView,

    // convenience functions for common view names
    isDesktop: function() { return (viewIndex === 0); },
    isTablet: function() { return (viewIndex === 1); },
    isPhone: function() { return (viewIndex >= 2); }
  };

}());
