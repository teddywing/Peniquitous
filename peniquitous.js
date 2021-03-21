// Copyright (c) 2015, 2021  Teddy Wing
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.


(function() {
	var key_codes = {
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
