angular.module('app', [
	'ngAnimate',
	'ui.router',
	'categories',
	'categories.bookmarks'
])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('app', {
				url: '', // navigate to the index.html
				abstract: true
			})
		;

		$urlRouterProvider.otherwise('/');
	}])

;