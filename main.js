(function() {
	[
		'lib/mousetrap/tests/libs/key-event.js',
		'peniquitous.js'
	].forEach(function(file) {
		var s = document.createElement('script');
		s.src = chrome.extension.getURL(file);
		s.onload = function() {
			this.parentNode.removeChild(this);
		};
		document.documentElement.appendChild(s);
	});
})();
