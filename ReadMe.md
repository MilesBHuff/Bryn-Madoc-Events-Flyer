# ReadMe
This is a small webapp that renders textual data as a pretty events schedule.

## Viewing
You need to run a webserver or disable CORS to run this application locally. Here is the simplest possible way to accomplish that on Windows:
1. Get Python from the Windows Store: https://apps.microsoft.com/detail/9PNRBTZXMB4Z
2. Execute `start.bat`.
3. Open [`http://localhost:8000`](http://localhost:8000) from a web browser.

## Customization
(This assumes you already followed the steps in "Usage".)
1. Edit `api/events.json`. Please leave fields blank if you do not know what to put in them.
2. Hard-refresh the webpage, wiping cache. (Ctrl+Shift+R)

## Export
(This will place a .PNG screenshot of the page into your Downloads folder.)
1. While viewing the page, press Ctrl+Shift+C and wait for a sidebar to load.
2. Press Ctrl+Shift+C again.
3. In the sidebar, hover your cursor over the top pane, which contains HTML code.
4. Scroll to the top in that pane.
5. Right-click `<div id="root">`.
6. Click "Screenshot Node".
