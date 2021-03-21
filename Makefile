# Copyright (c) 2021  Teddy Wing
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <https://www.gnu.org/licenses/>.


BROWSERIFY := ./node_modules/.bin/browserify

all: peniquitous.user.js

peniquitous.user.js: peniquitous.js lib/mousetrap/tests/libs/key-event.js userscript-header.txt
	sed -e '1d' -e '$$d' \
		lib/mousetrap/tests/libs/key-event.js \
		> key-event.js

	cat \
		userscript-header.txt \
		key-event.js \
		peniquitous.js \
		> $@

	rm key-event.js
