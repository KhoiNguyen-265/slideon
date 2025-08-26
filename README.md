# slideon

**Slideon** is a lightweight vanilla JavaScript slider library for creating simple carousels/sliders without any external dependencies. Its goal is to be light, easy to integrate, customizable, and support autoplay, dot navigation, and control buttons.

---

## CDN (version v1.0.0)

Use it directly from jsDelivr CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/KhoiNguyen-265/slideon@v1.0.0/slideon.min.css">
<script src="https://cdn.jsdelivr.net/gh/KhoiNguyen-265/slideon@v1.0.0/slideon.min.js"></script>
```

---

## Features

* Pure JS + CSS, no external libraries.
* Loop support (cloning at edges) for smooth transitions.
* Auto-generated dot navigation.
* Default prev/next controls with option to bind custom buttons.
* Autoplay with hover pause support.
* Multiple items per view (`items` option).

---

## Quick start (CDN)

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/KhoiNguyen-265/slideon@v1.0.0/slideon.min.css">
</head>
<body>
  <div id="my-slider">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </div>

  <script src="https://cdn.jsdelivr.net/gh/KhoiNguyen-265/slideon@v1.0.0/slideon.min.js"></script>
  <script>
    const mySlider = new Slideon('#my-slider', {
      items: 1,
      autoplay: true,
      autoplayTimeout: 2500
    });
  </script>
</body>
</html>
```

---

## Local installation / GitHub repo

Include CSS and JS locally:

```html
<link rel="stylesheet" href="./src/slideon.css">
<script src="./src/slideon.js"></script>
```

Or install from GitHub (not published on npm yet):

```bash
npm install github:KhoiNguyen-265/slideon
```

---

## Options

Default options (from the source code):

```js
{
  items: 1,                // number of items visible per view
  speed: 300,              // transition duration (ms)
  loop: true,              // enable/disable looping with clones
  nav: true,               // show/hide dot navigation
  controls: true,          // show/hide prev/next controls
  controlsText: ['<','>'], // text for default prev/next buttons
  prevButton: null,        // selector for custom prev button
  nextButton: null,        // selector for custom next button
  slideBy: 1,              // steps to move per navigation, or 'page'
  autoplay: false,         // enable autoplay
  autoplayTimeout: 3000,   // delay between autoplay slides (ms)
  autoplayHoverPause: true // pause autoplay on hover
}
```

Note: `slideBy` can be a number (e.g. `2`) or `'page'` to move a whole set of items.

---

## API / Methods

```js
const s = new Slideon('#my-slider', {...});

// move manually
s.moveSLide(1);   // next
s.moveSLide(-1);  // previous

// autoplay (internal, but can be used manually)
s._startAutoplay();
s._stopAutoplay();
```

> Methods starting with `_` are considered private but are still callable if needed.

---

## Advanced examples

**Custom navigation buttons**

```html
<button class="slide-prev">Prev</button>
<button class="slide-next">Next</button>

<div id="my-slider"> ... </div>

<script>
  const mySlider = new Slideon('#my-slider', {
    prevButton: '.slide-prev',
    nextButton: '.slide-next',
    items: 1
  });
</script>
```

**Multiple items per view**

```js
new Slideon('#my-slider', { items: 3, slideBy: 'page' });
```

---

## CSS & Customization

The CSS is minimal (wrapper, track, slides, controls, nav, dots). You can override styles with your own CSS.

* `.slideon-wrapper`, `.slideon-content`, `.slideon-track`, `.slideon-slide`
* `.slideon-prev`, `.slideon-next`
* `.slideon-nav`, `.slideon-dot`, `.slideon-dot.active`

**Note**: When `loop` is enabled, cloned slides are added. If your slides contain unique IDs, they may be duplicated.

---

## Troubleshooting

* **`Slideon: Container "#foo" not found!`** → Check that the selector is correct and the container exists before calling `new Slideon()`.
* **Slides not resizing correctly** → Ensure slides are direct children of the container. CSS uses `flex-basis: calc(100% / items)`.
* **Autoplay not pausing on hover** → Make sure `autoplayHoverPause: true` is enabled and no JS errors are blocking event listeners.

---

## Demo

See `index.html` in the repo for a working demo using local files.

---

## Contributing

Contributions are welcome! PRs, issues, and improvements are appreciated. Some ideas:

* Swipe/touch support for mobile
* Callbacks/events on slide change
* Lazy-loading support for images

---

## License

Default: **MIT**.

---

## Changelog

* **v1.0.0**: Initial release — basic slider with loop, controls, nav, autoplay.

---

*This README was auto-generated based on `slideon.js`, `slideon.css`, and `index.html` demo.*
