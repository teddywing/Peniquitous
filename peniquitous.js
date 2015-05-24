(function() {
	// Additional types:
	//   * email
	//   * number
	//   * search
	//   * tel
	//   * url
	var all_inputs = document.querySelectorAll('input[type="text"]');

	for (var i = 0; i < all_inputs.length; i++) {
		all_inputs[i].addEventListener('keyup', function(e) {
			if (e.ctrlKey && e.keyCode === 80) {
				KeyEvent.simulate(0, 38, [], e.target);
			}
			else if (e.ctrlKey && e.keyCode === 78) {
				KeyEvent.simulate(0, 40, [], e.target);
			}
		});
	}
	
	window.setTimeout(function() {
		KeyEvent.simulate(0, 40, [], document.getElementById('lst-ib'));
		console.log('fired');
	}, 6000);
})();
