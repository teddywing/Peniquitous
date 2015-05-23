(function() {
	// Additional types:
	//   * email
	//   * number
	//   * search
	//   * tel
	//   * url
	var all_inputs = document.querySelectorAll('input[type="text"]');

	for (var i = 0; i < all_inputs.length; i++) {
		all_inputs[i].addEventListener('focus', function() {
			// Bind keyboard event
		});
	}
})();
