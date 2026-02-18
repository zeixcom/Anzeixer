# Anzeixer has been Archieved

If you're looking for a substitute, take a look at the Le Truc ContextMedia Web Component, which does what Anzeixer did, but in a more configurable way, integratable via [Context Community Protocol](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md) with any descendant Web Components.

See: https://zeixcom.github.io/le-truc/examples.html#context-media

Le Truc gives you one of the fastest reactivity engines combined with Web Components that run anywhere, with just a thin layer that brings you all the guarantees of a modern, type-safe reactive system to enhance server-rendered HTML.

---

Anzeixer <img src="badge@2x.png" width="130" height="30">
========

Toolkit to Streamline View Definitions for Responsive Web Design


What Is Anzeixer?
-----------------

Anzeixer is a set of CSS and JavaScript snippets that lets you define threshold values of views once, saving time and reducing errors.


How to Use Anzeixer?
--------------------

### Define Views in CSS with @media Rules
Define views that use media queries to apply CSS rules at specific breakpoints and give the views descriptive names. In addition to distinct views for different device widths, you can also create views for portrait and landscape orientations and for various pixel densities.

```css
/**
 * Medium
 */
@media screen and (min-width: 768px) and (max-width: 999px) {

  body:after {
    content: 'm';
    background: #ffe6a0;
  }

}

@media screen and (min-width: 768px) and (max-width: 999px) and (orientation: portrait) {
  body:after { content: 'm portrait'; }
}

@media screen and (min-width: 768px) and (max-width: 999px) and (orientation: landscape) {
  body:after { content: 'm landscape'; }
}
```

### Show the Current View During Development
During development, you need to know that the correct CSS rules are being applied and that the correct JavaScript is being run. Add the "dev" class to the &lt;body&gt; tag to enable an indicator at the bottom left corner which displays the name of the current view.

```html
  <body class="dev">
```

### Query the Current View with JavaScript
You probably need for certain user interface behavior to change depending on the view. For example, you might replace tabs with an accordion on very narrow screens. By using JavaScript to query the current view from CSS instead of defining the threshold values a second time in JavaScript, you reduce complexity and the likelihood of errors.

```js
Anzeixer.getView();      // returns string -- CSS content property of body:after
Anzeixer.getSizeIndex(); // returns integer -- index of current view size

Anzeixer.isXSmall();     // returns boolean -- target smallest devices only (xs)
Anzeixer.isSmall();      // returns boolean -- target all small devices (xs and s)
Anzeixer.isMedium();     // returns boolean -- target medium devices only (m)
Anzeixer.isLarge();      // returns boolean -- target all large devices (l and xl)
Anzeixer.isXLarge();     // returns boolean -- target largest devices only (xl)

Anzeixer.isPortrait();   // returns boolean -- target portrait orientation
Anzeixer.isLandscape();  // returns boolean -- target landscape orientation
```

### Improve Performance with Unified View Change Events
On pages with a lot of JavaScript, having each script listen for the browser's "resize" events individually can impose a significant performance penalty. Many scripts don't need to know the specific viewport size, only which view is in use. Anzeixer can help by triggering a "viewchange" event only when a breakpoint threshold is crossed, letting your scripts ignore "resize" events they don't need.

```js
/**
 * listen to viewchange event
 */
document.addEventListener('viewchange', function(e){
  console.log(e.detail.originalView + ' -> ' + e.detail.currentView);
}, false);
```


Who's behind Anzeixer?
----------------------

Anzeixer is being developed by Zeix's user interface development team.

Anzeixer may be freely used under the MIT license.

Contact: Esther Brunner <esther.brunner@zeix.com>
