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


// var key_event = require('./lib/mousetrap/tests/libs/key-event.js');
// var peniquitous = require('./peniquitous');

function key_event () {
	$KEY_EVENT
}

function peniquitous () {
	$PENIQUITOUS
}

(function() {
	[
		key_event,
		peniquitous
	].forEach(function(script) {
		console.log('peniquitous', script);
		var s = document.createElement('script');
		s.appendChild(
			document.createTextNode('(' + script + ')();')
		);
		// s.src = chrome.extension.getURL(file);
		// s.onload = function() {
		// 	this.parentNode.removeChild(this);
		// };
		document.documentElement.appendChild(s);
	});
})();
