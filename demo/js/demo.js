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

/**
 * Example for jQuery usage
 */
$(document).ready(function() {
  'use strict';

  $(document).bind('viewchange', function(e) {
    if ($('#use_jquery:checked').length) {
      $('#log').append('<li>jQuery: '+ e.detail.originalView + ' -> ' + e.detail.currentView + '</li>');
    }
  });
});
