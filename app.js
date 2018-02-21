'use strict';
angular.module('pdfgen', ['ui.router','ngResource','LocalStorageModule','ngFileUpload'])
	.run([
		'$rootScope', '$stateParams', '$state',
		function($rootScope, $stateParams, $state)
		{
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		}
	])
	.config([
		'$compileProvider', '$stateProvider', '$urlServiceProvider', 'localStorageServiceProvider',
		function($compile, $state, $urlService, localStorageService)
		{
			$compile.debugInfoEnabled(false);
			$state.state('generator', {url:'/', component:'generator'});
			$urlService.rules.otherwise('/');
			localStorageService.setPrefix('pdfgen');
		}
	])
;