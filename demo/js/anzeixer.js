/*! anzeixer 2.1.0 15-06-2020 */

try{!function(){"use strict";function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}var e;void 0===window.CustomEvent?(e=document.createEvent("CustomEvent"),t.prototype=e.constructor.prototype):t.prototype=window.CustomEvent.prototype,window.CustomEvent=t,window.hasCustomEvents=!0}()}catch(t){window.hasCustomEvents=!1,void 0!==console&&"function"==typeof console.warn&&(console.warn("Error initializing CustomEvent polyfill - Anzeixer will not raise events"),console.warn(t))}var Anzeixer=function(){"use strict";function n(){try{return window.getComputedStyle(document.querySelector("body"),":after").getPropertyValue("content").replace(/["']/g,"")}catch(t){return console.error(t),"l landscape"}}var o=n(),t=["xs","s","m","l","xl"];function e(){var t,e=o;return e!==(o=n())&&window.hasCustomEvents&&(t=new window.CustomEvent("viewchange",{detail:{originalView:e,currentView:o}}),document.dispatchEvent(t)),o}function r(){return t.indexOf(o.split(" ")[0])}function i(){return r()<2}function s(){return 2===r()}function u(){return 2<r()}return window.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("resize",e,!1),{getView:n,getSizeIndex:r,isXSmall:function(){return 0===r()},isSmall:i,isMedium:s,isLarge:u,isXLarge:function(){return 4===r()},isPortrait:function(){return"portrait"===o.split(" ")[1]},isLandscape:function(){return"landscape"===o.split(" ")[1]},isDesktop:u,isTablet:s,isPhone:i}}();