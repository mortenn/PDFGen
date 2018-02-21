all: lib www/bundle/js.gz www/bundle/css.gz www/fonts www/index.html.gz

lib:
	npm install

www/bundle/js.gz: \
	node_modules/angular/angular.js \
	node_modules/angular-resource/angular-resource.js \
	node_modules/@uirouter/angularjs/release/angular-ui-router.js \
	node_modules/jquery/dist/jquery.js \
	node_modules/popper.js/dist/umd/popper.js \
	node_modules/bootstrap/dist/js/bootstrap.js \
	node_modules/angular-local-storage/dist/angular-local-storage.js \
	node_modules/ng-file-upload/dist/ng-file-upload.js \
	app.js app/*.js
	uglifyjs --screw-ie8 $^ --source-map www/bundle/js.map --source-map-url /bundle/js.map -o www/bundle/js
	gzip -f www/bundle/js

www/bundle/css.gz: \
	node_modules/font-awesome/css/font-awesome.css \
	node_modules/angular/angular-csp.css \
	node_modules/bootstrap/dist/css/bootstrap.css
	cat $^ > www/bundle/css
	gzip -f www/bundle/css

www/fonts: FORCE
	for font in node_modules/font-awesome/fonts/*; do \
		target=www/fonts/$$(basename $$font); \
		install -D $$font $$target; \
		gzip -f $$target; \
	done

www/index.html.gz: view/*.html head.html foot.html
	cat head.html > www/index.html
	for t in view/*.html; do \
		echo '<script type="text/ng-template" id="'$$t'">' >> www/index.html; \
		cat $$t >> www/index.html; \
		echo '</script>' >> www/index.html; \
	done
	cat foot.html >> www/index.html
	gzip -f www/index.html

FORCE: