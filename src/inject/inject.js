if (self == top) {
	document.body.innerHTML = ''
    var iframe = document.createElement("iframe")
    iframe.src = window.location
    iframe.id = "st-frame"
    iframe.name = "frame"
	iframe.height = "100%"
	iframe.width = "100%"

    document.body.appendChild(iframe)
	var div = document.createElement("div")
    div.innerHTML = 'DIV'
    div.id = "st-video"

    document.body.appendChild(div)
}

function loadScript(href, callback) {
	var s = document.createElement('script')
	s.src = href
	s.onload = function() {
		this.parentNode.removeChild(this)
		if (callback) {
			callback()
		}
	}
	(document.head || document.documentElement).appendChild(s)
}

loadScript(chrome.extension.getURL('src/inject/sportTube.js'))
