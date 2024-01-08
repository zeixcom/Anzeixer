/**
 * Listen to viewchange event
 */
document.addEventListener('viewchange', function(e) {
  'use strict';

  var li = document.createElement('li');
  var text = document.createTextNode('Vanilla JS: ' + e.detail.originalView + ' -> ' + e.detail.currentView);
  li.appendChild(text);
  document.getElementById('log').appendChild(li);
}, false);
