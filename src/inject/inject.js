chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			createPlaceHolderElement();
			getMedia().then(attachEvents);
		}
	}, 10);
});

function createPlaceHolderElement() {
	if (!document.getElementById('SportTubePlaceholder')) {
		$('body').append('<div id="SportTubePlaceholder"></div>')
	}
}

function getMedia() {
	return Promise.resolve(Array.from(
		document.querySelectorAll('.gelicon--play'))
			.map(el => el.closest('article'))
			.filter(el => !!el)
			.map(el => el.querySelector('a')));
}

function attachEvents(targets) {
	targets.forEach(function(target) {
		target.addEventListener('click', e => {
			e.preventDefault();
			$('#SportTubePlaceholder').load(`${target.href} .sp-media-asset--lead .sp-media-asset__smp`, res => {
				const destVpid = $('#SportTubePlaceholder .sp-media-asset__smp').data('media-vpid');
				$('#SportTubePlaceholder').html(destVpid);
			})
		});
	});
	Promise.resolve(targets);
}
