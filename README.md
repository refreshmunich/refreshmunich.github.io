# Website (v2)

Release: July 2012

This is the Refreshmunich.com website, powered entirely via APIs. No CMS. We have open sourced it, so we can all learn and exchange. If you find a bug or can improve something, let us know!


## Conventions

### LESS/CSS

* files starting with "_", e.g. "_vars.less" are usu. internal building blocks. Stealing underscore naming conventions from other languages/frameworks e.g. Ruby/Rails.
* CSS class naming conventions generally follow @necolas’ practices. See [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) and [this gist](https://gist.github.com/1309546)
* All DOM elements used/referenced to in Javascript use the "js-" prefix, to cleanly separate presentation and functionality.

### Markup
* For large blocks of nested code, a comment often indicates a closing tag, e.g. <!--/#about-->
* Markup is de-coupled from Javascript and can be found in the script tags with type="js/template" for easy adjustments/customizations

## History

### Changes since v1

Originally many more worked on the site and in order to launch quickly, we took liberties and ignored some best practices. It was time to go back and fix that. More specifically:

* Meetups now more prominently featured. No more searching/digging for next date, address, etc.
* Responsive - for real. We now use a purposed and designed responsive layout.
* LESS is now compiled and not processed via javascript (never do this!)
* Twitter bios on hover are now 100%, no JS.
* Reorganized Javascript
* Greatly reduced number of HTTP requests
* Reduced number of JS plugins.

### Todo
* Make member bios work on iOS (right now only works with :hover)
* Bring back nice photo gallery


## License
Copyright (C) 2012 Refresh Munich

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT License - http://www.opensource.org/licenses/mit-license.php