#!/bin/node
/* Webilangue - Gabriel Bauer (@ToCodeABluejay)
 * 
 *Copyright (c) 2021 Gabriel Bauer (@ToCodeABluejay)
 *
 *Permission is hereby granted, free of charge, to any person obtaining a copy
 *of this software and associated documentation files (the "Software"), to deal
 *in the Software without restriction, including without limitation the rights
 *to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *copies of the Software, and to permit persons to whom the Software is
 *furnished to do so, subject to the following conditions:
 *
 *The above copyright notice and this permission notice shall be included in all
 *copies or substantial portions of the Software.
 *
 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *SOFTWARE.
 */

const server = require('http').createServer()
const markdown = require( "markdown" ).markdown

const fs = require('fs')


server.on('request', (request, response) => {
	response.setHeader('Content-Type', 'text/html') 
	var page = fs.readFileSync("html/tb.html", 'utf8')
	console.log("reading html...")
	page+= "<style>"+fs.readFileSync("css/style.css", 'utf8')+"</style>"
	console.log("reading css...")
	const lang = Intl.DateTimeFormat().resolvedOptions().locale
  
	if (request.url === '/') {
		response.write(page)
	}
	else if (request.url === '/coucou') {
		page+=markdown.toHTML('#Hello world!')
		response.write(page)
		console.log("end")
	}
	response.end()
})

server.listen(4000)