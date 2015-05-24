(function() {
	key_codes = {
		p: 80,
		n: 78,
		UP_ARROW: 38,
		DOWN_ARROW: 40
	};

	// Additional types:
	//   * email
	//   * number
	//   * tel
	//   * url
	var all_inputs = document.querySelectorAll('input[type="text"], input[type="search"]');

	for (var i = 0; i < all_inputs.length; i++) {
		all_inputs[i].addEventListener('keyup', function(e) {
			if (e.ctrlKey && e.keyCode === key_codes.p) {
				KeyEvent.simulate(0, key_codes.UP_ARROW, [], e.target);
			}
			else if (e.ctrlKey && e.keyCode === key_codes.n) {
				KeyEvent.simulate(0, key_codes.DOWN_ARROW, [], e.target);
			}
		});
	}
})();
