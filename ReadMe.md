# ReadMe
This is a small webapp that renders textual data as a pretty schedule.

## Viewing
You need to run a webserver or disable CORS to run this application locally. Here are the simplest possible ways to accomplish that:

1. Install Python. On Windows, go here: https://apps.microsoft.com/detail/9PNRBTZXMB4Z. On OS X, go here: https://www.python.org/downloads/macos. On Linux, it should be pre-installed. If you are on any other OS, you don't need instructions; you know what you're doing.
2. Download this project: https://github.com/MilesBHuff/Bryn-Madoc-Events-Flyer/archive/refs/heads/main.zip
3. Execute `start.bat` if on Windows, or `start.bash` if you are on any other OS.
4. Open [`http://localhost:8000`](http://localhost:8000) from a web browser.
5. (Optional) Press `F12` and click the "Console" tab to view the plaintext version of the schedule.

## Customization
(This assumes you already followed the steps in "Usage".)

1. Edit `api/events.json`. Please leave fields blank if you do not know what to put in them.
2. Hard-refresh the webpage, wiping cache. (Ctrl+Shift+R)

## Export

1. While viewing the page, press Ctrl+Shift+C and wait for a sidebar to load.
2. Press Ctrl+Shift+C again.

### Image
(This will place a .PNG screenshot of the page into your Downloads folder.)

3. In the developer sidebar, hover your cursor over the top pane, which contains HTML code.
4. Scroll to the top in that pane.
5. Right-click `<div id="root">`.
6. Click "Screenshot Node".

### Text

3. Click the "Console" tab.
4. Select and copy the plaintext version of the schedule.
