# Website (v3)

Release: April 2013

We've switched to using the [Jeykll](https://github.com/mojombo/jekyll) site generated used for github pages to better manage our events calendar.

### Conventions

##### LESS/CSS

* files starting with `_`, e.g. `_vars.less` are usually internal building blocks. Stealing underscore naming conventions from other languages/frameworks e.g. Ruby/Rails.
* CSS class naming conventions generally follow @necolas' practices. See [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) and [this gist](https://gist.github.com/1309546)
* All DOM elements used/referenced to in Javascript use the `js-` prefix, to cleanly separate presentation and functionality.

##### Markup
* For large blocks of nested code, a comment often indicates a closing tag, e.g. `<!--/#about-->`
* Markup is de-coupled from Javascript and can be found in the script tags with `type="js/template"` for easy adjustments/customizations

## History

### Version 3.0

* Website now powered by [Jekyll](https://github.com/mojombo/jekyll), site generator used for github pages.
* Cleaned up branches and added tags to master branch to mark older versions.

### Version 2.0

The v2.0 Refreshmunich.com website was powered entirely via APIs. No CMS.

#### Changes since v1

Originally many more worked on the site and in order to launch quickly, we took liberties and ignored some best practices. It was time to go back and fix that. More specifically:

* Meetups now more prominently featured. No more searching/digging for next date, address, etc.
* Responsive - for real. We now use a purposed and designed responsive layout.
* LESS is now compiled and not processed via javascript (never do this!)
* Twitter bios on hover are now 100%, no JS.
* Reorganized Javascript
* Greatly reduced number of HTTP requests
* Reduced number of JS plugins.


## License
Copyright (C) 2012 Refresh Munich

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT License - http://www.opensource.org/licenses/mit-license.php