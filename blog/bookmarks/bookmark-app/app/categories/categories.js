angular.module('categories', [
    'app.models.categories'
])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('app.categories', {
			url: '/',
			views: {
				'categories@': {
					controller: 'CategoriesListCtrl as CategoriesListCtrl',
					templateUrl: 'app/categories/categories.html'
				}
			}
		})
}])