/**
 * Anzeixer
 * (c) 2013 Zeix AG
 * Anzeixer.js may be freely distributed under the MIT license.
 */
var Anzeixer = (function(){
  var view;
  
  // get the current view and trigger viewchange event if it changed since last query
  var getView = function(){
    var oldView = view;
    try {
      view = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, '');
    } catch (error){
      view = 'desktop';
    }
    if (oldView !== view){
      var event = new CustomEvent('viewchange', {'detail': {
        'originalView': oldView,
        'currentView': view
      }});
      document.dispatchEvent(event);
    }
    return view;
  };
  
  // split view names and return only the main part
  var mainView = function(){
    var parts = getView().split('-');
    return parts[0];
  };
  
  // listen to document ready and resize events
  window.addEventListener('DOMContentLoaded', getView, false);
  window.addEventListener('resize', getView, false);
  
  return {
    getView: getView,
    
    // convenience functions for common view names
    isDesktop: function(){ return (mainView() === 'desktop'); },
    isTablet: function(){ return (mainView() === 'tablet'); },
    isPhone: function(){ return (mainView() === 'phone'); }
  };
  
}());