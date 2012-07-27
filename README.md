# Version 2

This is a work in progress of the next version of the refreshmunich.com website

### Why change it?
Originally different people built different pieces of the site and in order to launch quickly, we took liberties and ignored some best practices.

Now it's time to go back and fix that.

## Goals
### Events
We need to feature events more prominently. This is the most interesting information.

### Responsive. For real.
* Many users find the website via Twitter and currently it is only hacked to look presentable on mobile.
* Use a fluid grid while we'reat it.

### Decrease page weight and load
* Reduce HTTP requests by removing less.js and precompilng and minifying css
* Minimize number of JS plugins and JS.
* Remove unncessary features, like rotating arrow. Too prominent (jng)

### Misc. Notes
* Replace current JS implementation of full Twitter bios on hover with CSS one. Had to do this anyway with the fluid grid. Performance was laggy on fast resizes.

* Tried jQuery Masonry but doesn't work well for fluid grids and responsive designs that adjust the grid at certain breakpoints. Even with CSS overrides, strange column wide gaps appeared.


## License 
Copyright (C) 2012 Refresh Munich

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT License - http://www.opensource.org/licenses/mit-license.php