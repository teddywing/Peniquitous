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

IMPORTS := peniquitous.js lib/mousetrap/tests/libs/key-event.js
IMPORTS_BASENAME := $(notdir $(IMPORTS))

all: peniquitous.user.js

# peniquitous.user.js: peniquitous.js lib/mousetrap/tests/libs/key-event.js userscript-header.txt
# 	sed -e '1d' -e '$$d' \
# 		lib/mousetrap/tests/libs/key-event.js \
# 		> key-event.js
#
# 	cat \
# 		userscript-header.txt \
# 		key-event.js \
# 		peniquitous.js \
# 		> $@
#
# 	rm key-event.js

# build/?: $(IMPORTS)
# 	sed -e '/^(function/d' -e '$$d' file
#
# build/main.js: build/*.js

build:
	mkdir -p $@

build/key-event.js: lib/mousetrap/tests/libs/key-event.js | build
	sed -e '/^(function/d' -e '$$d' $< > $@

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

peniquitous.user.js: main.js peniquitous.js userscript-header.txt
	$(BROWSERIFY) \
		--outfile $@ \
		$<

	cat userscript-header.txt $@ > "$@.tmp"
	mv "$@.tmp" $@

.PHONY: clean
clean:
	rm -rf build
