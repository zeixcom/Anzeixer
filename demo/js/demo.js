const anzeixer = Anzeixer();
console.log(anzeixer);

const appendLogLine = (string) => {
  const li = document.createElement('li');
  const text = document.createTextNode(string);
  li.appendChild(text);
  document.getElementById('log').appendChild(li);
};

/**
 * Listen to custom viewchange event
 */
document.addEventListener('viewchange', (e) => {
  appendLogLine(`Anzeixer viewchange: ${e.detail.originalView} -> ${e.detail.currentView} / ${e.detail.media}: ${e.detail.matches}`);
});

/**
 * Listen to orientation change
 */
anzeixer.mq.has('portrait') && anzeixer.mq.get('portrait').addEventListener('change', (e) => {
  appendLogLine(`MediaQueryList change: ${e.media}: ${e.matches}`);
});

/**
 * Listen to change of preferred color scheme
 */
anzeixer.mq.has('dark') && anzeixer.mq.get('dark').addEventListener('change', (e) => {
  appendLogLine(`MediaQueryList change: ${e.media}: ${e.matches}`);
});
