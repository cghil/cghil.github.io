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

.controller('CategoriesListCtrl', ['CategoriesModel', function(CategoriesModel) {
    var categoriesListCtrl = this;
    CategoriesModel.getCategories()
        .then(function(result) {
            categoriesListCtrl.result = result;
            console.log(result)
        });
}])