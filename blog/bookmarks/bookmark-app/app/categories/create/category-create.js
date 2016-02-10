angular.module('categories.create', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('app.categories.create', {
            url: 'categories/create',
            views: {
                'create@app.categories': {
                    templateUrl: 'app/categories/create/category-create.html',
                    controller: 'CreateCategoryCtrl as createCategoryCtrl'
                }
            }
        });
}])

.controller('CreateCategoryCtrl', ['$state', '$stateParams', "CategoriesModel", function($state, $stateParams, CategoriesModel) {
    var createCategoryCtrl = this;

    function returnToCategoriesPage() {
        $state.go('app.categories', {},  {reload: true});
    };

    function cancelCreating() {
        returnToCategoriesPage();
    };

    function resetForm() {
        createCategoryCtrl.newCategory = {
            name: ''
        };
    };

    function createCategory() {
        CategoriesModel.createCategory(createCategoryCtrl.newCategory);
        returnToCategoriesPage();
    };

    // when controller loads we reset the form for new category
    resetForm();

    createCategoryCtrl.cancelCreating = cancelCreating;
   	createCategoryCtrl.createCategory = createCategory;

}])