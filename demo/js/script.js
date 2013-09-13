/**
 * listen to viewchange event
 */
document.addEventListener('viewchange', function(e){
  var li = document.createElement('li');
  var text = document.createTextNode(e.detail.originalView + ' -> ' + e.detail.currentView);
  li.appendChild(text);
  document.getElementById('log').appendChild(li);
}, false);