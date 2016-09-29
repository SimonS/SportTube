
var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		createPlaceHolderElement();
		getMedia().then(attachEvents);
	}
}, 10);
var mediaPlayer;

function createPlaceHolderElement() {
    require(['jquery-2.2'], function ($) {
        if (!document.getElementById('SportTubePlaceholder')) {
            $('body').append('<div id="SportTubePlaceholder"></div>')
    	}
    })
}

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

                        $('#SportTubePlaceholder').addClass('active')
                        playVideo(destVpid)
                    }
                })
            })
        });
        Promise.resolve(targets);
    })
}

function playVideo(pid) {
	window.require(['bump-3'], function(bmp) {
        var settings = {
            product: 'sport',
            responsive: true,
            autoplay: true,
            playlistObject: {
                items: [{
                    versionID: pid
                }]
            }
        };
        mediaPlayer = bmp('#SportTubePlaceholder').player(settings);
        mediaPlayer.load();
	});
}
