(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {
    var KeyEvent = function(data, type) {
        this.keyCode = 'keyCode' in data ? data.keyCode : 0;
        this.charCode = 'charCode' in data ? data.charCode : 0;

        var modifiers = 'modifiers' in data ? data.modifiers : [];

        this.ctrlKey = false;
        this.metaKey = false;
        this.altKey = false;
        this.shiftKey = false;

        for (var i = 0; i < modifiers.length; i++) {
            this[modifiers[i] + 'Key'] = true;
        }

        this.type = type || 'keypress';
    };

    KeyEvent.prototype.toNative = function() {
        var event = document.createEventObject ? document.createEventObject() : document.createEvent('Events');

        if (event.initEvent) {
            event.initEvent(this.type, true, true);
        }

        event.keyCode = this.keyCode;
        event.which = this.charCode || this.keyCode;
        event.shiftKey = this.shiftKey;
        event.metaKey = this.metaKey;
        event.altKey = this.altKey;
        event.ctrlKey = this.ctrlKey;

        return event;
    };

    KeyEvent.prototype.fire = function(element) {
        var event = this.toNative();
        if (element.dispatchEvent) {
            element.dispatchEvent(event);
            return;
        }

        element.fireEvent('on' + this.type, event);
    };

    // simulates complete key event as if the user pressed the key in the browser
    // triggers a keydown, then a keypress, then a keyup
    KeyEvent.simulate = function(charCode, keyCode, modifiers, element, repeat) {
        if (modifiers === undefined) {
            modifiers = [];
        }

        if (element === undefined) {
            element = document;
        }

        if (repeat === undefined) {
            repeat = 1;
        }

        var modifierToKeyCode = {
            'shift': 16,
            'ctrl': 17,
            'alt': 18,
            'meta': 91
        };

        // if the key is a modifier then take it out of the regular
        // keypress/keydown
        if (keyCode == 16 || keyCode == 17 || keyCode == 18 || keyCode == 91) {
            repeat = 0;
        }

        var modifiersToInclude = [];
        var keyEvents = [];

        // modifiers would go down first
        for (var i = 0; i < modifiers.length; i++) {
            modifiersToInclude.push(modifiers[i]);
            keyEvents.push(new KeyEvent({
                charCode: 0,
                keyCode: modifierToKeyCode[modifiers[i]],
                modifiers: modifiersToInclude
            }, 'keydown'));
        }

        // @todo factor in duration for these
        while (repeat > 0) {
            keyEvents.push(new KeyEvent({
                charCode: 0,
                keyCode: keyCode,
                modifiers: modifiersToInclude
            }, 'keydown'));

            keyEvents.push(new KeyEvent({
                charCode: charCode,
                keyCode: charCode,
                modifiers: modifiersToInclude
            }, 'keypress'));

            repeat--;
        }

        keyEvents.push(new KeyEvent({
            charCode: 0,
            keyCode: keyCode,
            modifiers: modifiersToInclude
        }, 'keyup'));

        // now lift up the modifier keys
        for (i = 0; i < modifiersToInclude.length; i++) {
            var modifierKeyCode = modifierToKeyCode[modifiersToInclude[i]];
            modifiersToInclude.splice(i, 1);
            keyEvents.push(new KeyEvent({
                charCode: 0,
                keyCode: modifierKeyCode,
                modifiers: modifiersToInclude
            }, 'keyup'));
        }

        for (i = 0; i < keyEvents.length; i++) {
            // console.log('firing', keyEvents[i].type, keyEvents[i].keyCode, keyEvents[i].charCode);
            keyEvents[i].fire(element);
        }
    };

    window.KeyEvent = KeyEvent;
}) ();

},{}],2:[function(require,module,exports){
// Copyright (c) 2015  Teddy Wing
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


require('./lib/mousetrap/tests/libs/key-event.js');
require('./peniquitous');

// (function() {
// 	[
// 		'lib/mousetrap/tests/libs/key-event.js',
// 		'peniquitous.js'
// 	].forEach(function(file) {
// 		var s = document.createElement('script');
// 		s.src = chrome.extension.getURL(file);
// 		s.onload = function() {
// 			this.parentNode.removeChild(this);
// 		};
// 		document.documentElement.appendChild(s);
// 	});
// })();

},{"./lib/mousetrap/tests/libs/key-event.js":1,"./peniquitous":3}],3:[function(require,module,exports){
// Copyright (c) 2015  Teddy Wing
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

},{}]},{},[2]);