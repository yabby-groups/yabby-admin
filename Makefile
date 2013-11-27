all: images/style.css js/main.js index.html


%.css: %.less
	lessc $< > $@

%.js: %.coffee
	coffee -c $<

%.html: %.jade
	jade $<
