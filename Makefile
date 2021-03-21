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


IMPORTS := peniquitous.js node_modules/mousetrap/tests/libs/key-event.js
IMPORTS_BASENAME := $(notdir $(IMPORTS))

all: peniquitous.user.js

build:
	mkdir -p $@

build/key-event.js: node_modules/mousetrap/tests/libs/key-event.js \
node_modules/mousetrap/LICENSE \
| build
	sed -e '/^(function/d' -e '$$d' $< > $@
	cat node_modules/mousetrap/LICENSE $@ > $@.tmp
	mv $@.tmp $@

build/peniquitous.js: peniquitous.js | build
	sed -e '/^(function/d' -e '$$d' $< > $@

build/main.js: main.js.in $(addprefix build/,$(IMPORTS_BASENAME))
	sed \
		-e '/\$$KEY_EVENT/r build/key-event.js' \
		-e '/\$$KEY_EVENT/d' \
		-e '/\$$PENIQUITOUS/r build/peniquitous.js' \
		-e '/\$$PENIQUITOUS/d' \
		$< \
		> $@

peniquitous.user.js: build/main.js userscript-header.txt
	cat userscript-header.txt build/main.js > $@

.PHONY: clean
clean:
	rm -rf build
