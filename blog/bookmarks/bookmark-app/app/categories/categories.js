angular.module('categories', [
    'app.models.categories',
    'categories.create'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('app.categories', {
            url: '/',
            views: {
                'categories@': {
                    controller: 'CategoriesListCtrl as categoriesListCtrl',
                    templateUrl: 'app/categories/categories.html'
                },
                'bookmarks@': {
                    controller: 'BookmarksListCtrl as bookmarksListCtrl',
                    templateUrl: 'app/categories/bookmarks/bookmarks.html'
                }
            }
        })

}])

.controller('CategoriesListCtrl', ['CategoriesModel', function(CategoriesModel) {
    var categoriesListCtrl = this;

    CategoriesModel.getCategories()
        .then(function(result) {
            categoriesListCtrl.categories = result;
        });
}]);