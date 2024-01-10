/**
 * Listen to viewchange event
 */
document.addEventListener('viewchange', function(e) {
  'use strict';

  var li = document.createElement('li');
  var text = document.createTextNode(`${e.detail.originalView} -> ${e.detail.currentView} (${e.detail.media}: ${e.detail.matches})`);
  li.appendChild(text);
  document.getElementById('log').appendChild(li);
}, false);
