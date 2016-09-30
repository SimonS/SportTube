var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval)
		getMedia().then(attachEvents)
	}
}, 10), mediaPlayer

function getMedia() {
	return Promise.resolve(Array.from(
		document.querySelectorAll('.gelicon--play'))
			.map(el => el.closest('article'))
			.filter(el => !!el)
			.map(el => el.querySelector('a')))
}

function attachEvents(targets) {
    require(['jquery-2.2'], function ($) {
        targets.forEach(function(target) {
            target.addEventListener('click', e => {
                e.preventDefault()
                $.ajax({
                    url: target.href,
                    dataType: 'html',
                    success: function (e) {
                        const destVpid = $($.parseHTML(e).filter(el => el.id == 'sport-container')[0])
                            .find('.sp-media-asset--lead .sp-media-asset__smp')
                            .data('media-vpid')

                        parent.postMessage({type: "sportTube", value: destVpid},"http://www.bbc.co.uk")
                    }
                })
            })
        })
    })
}

function playVideo(pid) {
	window.require(['bump-3', 'jquery-2.2'], function(bmp, $) {
        var settings = {
            product: 'sport',
            responsive: true,
            autoplay: true,
            playlistObject: {
                items: [{
                    versionID: pid
                }]
            }
        }
        $('#st-video').addClass('active')

        mediaPlayer = bmp('#st-video').player(settings)
        mediaPlayer.load()
	})
}

if (self === top) { // we're in the parent, listen and react to messages
    window.addEventListener('message', function (e) {
        if (e.data.type === "sportTube") {
            playVideo(e.data.value)
        }
    })
}
