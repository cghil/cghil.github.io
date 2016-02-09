angular.module('categories.bookmarks.edit', [
])

.config(['$stateProvider',function($stateProvider) {
	$stateProvider
		.state('app.categories.bookmarks.edit', {
			url: '/bookmarks/:bookmarkId/edit',
			templateUrl: 'app/categories/bookmarks/edit/bookmark-edit.html',
			controller: 'EditBookmarkCtrl as editBookmarkCtrl'
		})
}])

.controller('EditBookmarkCtrl', ['$state', '$stateParams', 'BookmarkModel', function($state, $stateParams, BookmarkModel){
	var editBookmarkCtrl = this;

	function returnToBookmarks(){
		$state.go('app.categories.bookmarks', {
			category: $stateParams.category
		})
	};

	function updateBookmark(){
		// we are copying the editBookmark
		editBookmarkCtrl.bookmark = angular.copy(editBookmarkCtrl.editedBookmark);
		
	}
}])