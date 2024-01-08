/**
 * Anzeixer
 *
 * @author Esther Brunner <esther.brunner@zeix.com>
 * @copyright 2013 – 2024 Zeix AG
 * @license Anzeixer.js may be freely distributed under MIT license
 */
var Anzeixer = (function() {
  'use strict';

  /**
   * Get the current view
   * @return {string} string from body:after CSS content property
   */
  var getView = function() {
    try {
      return window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, '');
    } catch(exception) {
      console.error(exception);
      return 'l landscape'; // assume 1024px wide landscape screen if computed style query fails
    }
  };

  var view = getView(),
      sizes = ['xs', 's', 'm', 'l', 'xl'];

  /**
   * Get the current view and trigger viewchange event if it changed since last query
   *
   * @return {string} string from body:after CSS content property
   */
  function triggerViewChange() {
    var oldView = view;
    view = getView();

    if (oldView !== view && window.hasCustomEvents) {
      var event = new window.CustomEvent('viewchange', {'detail': {
        'originalView': oldView,
        'currentView': view
      }});
      document.dispatchEvent(event);
    }

    return view;
  }

  /**
   * Get index of the current view size
   *
   * @return {integer} zero-based index of sizes array
   */
  var getSizeIndex = function() {
    return sizes.indexOf(view.split(' ')[0]);
  };

  /**
   * Convenience functions for view sizes
   *
   * @return {boolean} whether a size matches the current view
   */
  var isXSmall = function() { return (getSizeIndex() === 0); }; // target smallest devices only
  var isSmall = function() { return (getSizeIndex() < 2); };    // target all small devices
  var isMedium = function() { return (getSizeIndex() === 2); }; // target medium devices only
  var isLarge = function() { return (getSizeIndex() > 2); };    // target all large devices
  var isXLarge = function() { return (getSizeIndex() === 4); }; // target largest devices only

  /**
   * Convenience functions for view orientations
   *
   * @return {boolean} whether a orientation matches the current view
   */
  var isPortrait = function() { return view.split(' ')[1] === 'portrait'; };
  var isLandscape = function() { return view.split(' ')[1] === 'landscape'; };

  // listen to document ready and resize events
  window.addEventListener('DOMContentLoaded', triggerViewChange, false);
  window.addEventListener('resize', triggerViewChange, false);

  return {
    getView: getView,
    getSizeIndex: getSizeIndex,
    isXSmall: isXSmall,
    isSmall: isSmall,
    isMedium: isMedium,
    isLarge: isLarge,
    isXLarge: isXLarge,
    isPortrait: isPortrait,
    isLandscape: isLandscape,
  };

}());
