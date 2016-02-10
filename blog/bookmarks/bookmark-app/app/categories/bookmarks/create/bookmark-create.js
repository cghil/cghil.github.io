angular.module('categories.bookmarks.create', [
])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('app.categories.bookmarks.create', {
			url: '/bookmarks/create',
			templateUrl: 'app/categories/bookmarks/create/bookmark-create.html',
			controller: 'CreateBookmarkCtrl as createBookmarkCtrl'
		});
}])

.controller('CreateBookmarkCtrl', ['$state', 'BookmarksModel', '$stateParams', function($state, BookmarksModel, $stateParams){
		var createBookmarkCtrl = this;

		function returnToBookmarks(){
			$state.go('app.categories.bookmarks', {
				category: $stateParams.category
			})
		};

		function cancelCreating(){
			returnToBookmarks();
		};

		function createBookmark(){
			BookmarksModel.createBookmark(createBookmarkCtrl.newBookmark);
			returnToBookmarks();
		};

		function resetForm(){
			createBookmarkCtrl.newBookmark = {
				title: '',
				url: '',
				category: $stateParams.category
			};
		};

		createBookmarkCtrl.cancelCreating = cancelCreating;
		createBookmarkCtrl.createBookmark = createBookmark;

		resetForm();
}])