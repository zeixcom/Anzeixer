/**
 * listen to viewchange event
 */
document.addEventListener('viewchange', function(e){
  var p = document.createElement('p');
  var text = document.createTextNode(e.detail.originalView + ' -> ' + e.detail.currentView);
  p.appendChild(text);
  document.getElementById('content').appendChild(p);
}, false);