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
const deepcopy = require('lodash.clonedeep')
const supported_languages = ["en", "fr"]
/*class Template {
	constructor (html, css) {
		this.html = fs.readFileSync(html, 'utf8')
		console.log("reading html...")
		this.css = fs.readFileSync(css, 'utf8')
		console.log("reading css...")
		this.md = null
		this.mdexists = false
		this.class = ""
	}
	async setMD(path) { 
		if (fs.existsSync(path)) {
			this.md = fs.readFileSync(path, 'utf8')
			console.log("reading MD at "+path)
			this.mdexists = true
		} else {
			this.md = fs.readFileSync("md/404.md", 'utf8')
			console.log("404")
			this.mdexists = false
		}
	}
	setClass(_class_) {
		this.class = _class_
	}
	getPage(response){
		if (!this.mdxists) {
			response.statusCode = 404
		}
		return this.html + "<style>" + this.css + "</style>" + "<div class=\"" + this.class + "\">"+markdown.toHTML(this.md)+"</div>"
	}
}

const page = new Template("html/tb.html", "css/style.css")*/

class HTMLElem {
	constructor(elem, attr, elem_cont) {
		this.elem = elem
		this.attr = Array[attr] //We want to keep this as an array at all times
		this.mid = elem_cont
	}
	add_attr(attr) {
		this.attr.push(attr)
	}
	set_attr(attr) {
		this.attr = Array[attr]
	}
	set_middle(middle) {
		this.mid = middle
	}
}

HTMElem.prototype.toString = function () {
}

class HTMLDoc {
	/* This class is designed to use the previously
	 * defined 'HTMLElem' class in order to construct
	 * the final document. Therefore, it expects
	 * these to be used in the head and in the body,
	 * so we treat them as array to allow us to
	 * manipulate them dynamically, adding and removing
	 * as needed and/or desired.
	 */
	constructor(head, body) {
		this.head = Array[head]
		this.body = Array[body]
	}
	get_css(css) {
	}
	set_head(head) {
		this.head = Array[head]
	}
	add_head(head) {
		this.head.push(head)
	}
	get_head(head) {
		//TODO: Create an iterative loop which can return a string seperated by spaces, not commas
	}
	set_body(body) {
		this.body = Array[body]
	}
	add_body(body) {
		this.body.push(body)
	}
	get_body(body) {
		//TODO: Same principle here
	}
	get_response() {
	}
}


server.on('request', (request, response) => {
	response.setHeader('Content-Type', 'text/html') 
	const blang = Intl.DateTimeFormat().resolvedOptions().locale.slice(0,2)
	if supported_languages.includes(blang) {
		const lang = blang
	} else {
		const lang = "en"
	}	//Defaults to English
	page.setClass("body")
  	if (request.url != '/') {
		page.setMD("md/"+request.url+"."+lang+".md")
	}
	else {
		page.setMD("md/index."+lang+".md")
	}
  	response.end(page.getPage(response))
})

server.listen(4000)
