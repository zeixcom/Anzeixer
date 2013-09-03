Anzeixer
========

Toolkit to Streamline View Definitions for Responsive Web Design


What Is Anzeixer?
-----------------

Anzeixer is a set of CSS and JavaScript snippets that lets you define threshold values of views once, saving time and reducing errors.


How to Use Anzeixer?
--------------------

**Define Views in CSS with @media Rules**
Define views that use media queries to apply CSS rules at specific breakpoints and give the views descriptive names. In addition to distinct views for smartphones, tablets and computers, you can also create views for portrait and landscape orientations and for various pixel densities.

```css
/**
 * Tablet
 */
@media screen and (min-width: 768px) and (max-width: 999px) {

  /* Anzeixer */
  body:after {
    content: 'tablet';
    background: #f90;
  }

}
```

**Show the Current View During Development**
During development, you need to know that the correct CSS rules are being applied and that the correct JavaScript is being run. Add the "dev" class to the &lt;body&gt; tag to enable an indicator at the bottom left corner which displays the name of the current view.

```html
  <body class="dev">
```

**Query the Current View with JavaScript**
You probably need for certain user interface behavior to change depending on the view. For example, you might replace tabs with an accordion on very narrow screens. By using JavaScript to query the current view from CSS instead of defining the threshold values a second time in JavaScript, you reduce complexity and the likelihood of errors.

```js
Anzeixer.getView();   // returns string
Anzeixer.isDesktop(); // returns boolean
Anzeixer.isTablet();  // returns boolean
Anzeixer.isPhone();   // returns boolean
```

**Improve Performance with Unified View Change Events**
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
