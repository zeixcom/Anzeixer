/*! anzeixer 2.1.0 15-06-2020 */

try{!function(){"use strict";function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}var t;void 0===window.CustomEvent?(t=document.createEvent("CustomEvent"),e.prototype=t.constructor.prototype):e.prototype=window.CustomEvent.prototype,window.CustomEvent=e,window.hasCustomEvents=!0}()}catch(e){window.hasCustomEvents=!1,void 0!==console&&"function"==typeof console.warn&&(console.warn("Error initializing CustomEvent polyfill - Anzeixer will not raise events"),console.warn(e))}var Anzeixer=function(){"use strict";function n(){try{return window.getComputedStyle(document.querySelector("body"),":after").getPropertyValue("content").replace(/["']/g,"")}catch(e){return console.error(e),"l landscape"}}var o=n(),e=["xs","s","m","l","xl"];function t(){var e,t=o;return t!==(o=n())&&window.hasCustomEvents&&(e=new window.CustomEvent("viewchange",{detail:{originalView:t,currentView:o}}),document.dispatchEvent(e)),o}function r(){return e.indexOf(o.split(" ")[0])}function i(){return r()<2}function s(){return 2===r()}function u(){return 2<r()}return window.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("resize",t,!1),"undefined"!=typeof jQuery&&jQuery.event.props.push("detail"),{getView:n,getSizeIndex:r,isXSmall:function(){return 0===r()},isSmall:i,isMedium:s,isLarge:u,isXLarge:function(){return 4===r()},isPortrait:function(){return"portrait"===o.split(" ")[1]},isLandscape:function(){return"landscape"===o.split(" ")[1]},isDesktop:u,isTablet:s,isPhone:i}}();