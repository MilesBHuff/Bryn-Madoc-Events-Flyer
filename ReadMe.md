# ReadMe
This is a small webapp that renders textual data as a pretty schedule. This schedule can be exported as an image and as text; it can also be printed.

## Viewing
You need to run a webserver or disable CORS to run this application locally. Here are the simplest possible ways to accomplish that:

1. Download this project: https://github.com/MilesBHuff/Bryn-Madoc-Events-Flyer/archive/refs/heads/main.zip
2. Extract the files from the archive.
3. Open `index.html` in your favorite web browser.
4. (Optional) Press `F12` and click the "Console" tab to view the plaintext version of the schedule.

## Customization
(This assumes you already followed the steps in "Viewing".)

1. Edit `data.js`. Please leave fields blank if you do not know what to put in them.
2. Hard-refresh the webpage, wiping cache. (Ctrl+Shift+R)

## Export

1. While viewing the page, press Ctrl+Shift+C and wait for a sidebar to load.
2. Press Ctrl+Shift+C again.

* **Image**

  1. In the developer sidebar, hover your cursor over the top pane, which contains HTML code.
  2. Scroll to the top in that pane.
  3. Right-click `<div id="root">`.
  4. Click "Screenshot Node". (This will place a .PNG screenshot of the page into your Downloads folder.)

* **Text**

  1. Click the "Console" tab.
  2. Select and copy the plaintext version of the schedule.

## Architecture notes

* Data is in a `.js` file sourced from the HTML. This is ugly and not normally the correct way to architecture an app, but it allows users to run this without a webserver, which was a business requirement. Click [here](https://github.com/MilesBHuff/Bryn-Madoc-Events-Flyer/commit/7223f88c3d15ae223ef98ee636f387ba01a8309c) to view the application as it was before this change.
