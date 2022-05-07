{jshead}

// Defaults and examples are listed at the end of the user script.
let Remove_Clutter = true, // Removes some clutter + wider page
DisableComments = false, // Disables comments
AutoScroll = true, // Automatically scrolls on page load
Scroll_Amount = 202, // Scroll amount for "Top" button.
debug = false;

const fltCSS = `{fltCSS}`; // Stylesheet

// Userscript Code
{code}

/**
* Defaults:
*
* Remove_Clutter = true // Removes some clutter + wider page
* DisableComments = false,
* AutoScroll = true,
* Scroll_Amount = 202 // Set to 0 disables auto scroll AND "Top" button
* btn_CSS = `
#cmt-btn,
#top-btn {
  display: none;
  top: 90%;
  font-weight: bold;
  width: auto;
  min-height: 5px;
  margin: 0 3px;
  padding: 10px 15px;
  text-transform: uppercase;
  text-align: center;
  position: fixed;
  z-index: 10000 !important;
}
#cmt-btn {
  left: 1%;
}
#top-btn {
  right: 1%;
}`
*/

 /**
* Example = {
* -right: 1%;
* +left: 0%; "Top" will be moved to bottom left
* The !important is needed for any color changes due to button matching site style.
* +color: red !important; "Top" will have red text
* +border: 2px solid #000 !important; "Top" will have black border with 2px width
* ...}
*/