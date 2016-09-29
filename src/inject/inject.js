chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			getMedia().then(attachEvents);
		}
	}, 10);
});

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

			console.log(target);
		});
	});

	Promise.resolve(targets);
}
