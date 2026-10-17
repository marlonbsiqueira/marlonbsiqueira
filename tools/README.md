# Share card

`images/og-card.jpg` is the preview image shown when the portfolio link is shared
(LinkedIn, WhatsApp, Slack…). Its source is `tools/og-card.html`.

To change it: edit the HTML, open it in Chromium with a 1200×627 viewport, wait for
the fonts to load and save a JPEG screenshot (quality ~88) over `images/og-card.jpg`.

LinkedIn caches previews. After publishing a new image, use a **new file name** (and
update `og:image` / `twitter:image` in `index.html`), then refresh the preview at
https://www.linkedin.com/post-inspector/.
