angular.module('categories.bookmarks', [
	'categories.bookmarks.create',
	'categories.bookmarks.edit',
	'app.models.categories',
	'app.models.bookmarks'
])

.config(['$stateProvider',function($stateProvider) {
	$stateProvider
		.state('app.categories.bookmarks', {
			url: 'categories/:category',
			views: {
				'bookmarks@': {
					templateUrl: 'app/categories/bookmarks/bookmarks.html',
					controller: 'BookmarksListCtrl as bookmarksListCtrl'
				}
			}
		})
}])

.controller('BookmarksListCtrl', ['$stateParams', 'BookmarksModel', 'CategoriesModel', function($stateParams,BookmarksModel, CategoriesModel){

	var bookmarksListCtrl = this;

	CategoriesModel.setCurrentCategory($stateParams.category);

	BookmarksModel.getBookmarks()
		.then(function(bookmarks){
			bookmarksListCtrl.bookmarks = bookmarks;
		});

	bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
	bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;

}]);