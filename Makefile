all: style.css
	jade index.jade


%.css: %.less
	lessc $< > $@
