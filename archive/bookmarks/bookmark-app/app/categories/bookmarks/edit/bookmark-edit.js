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

.controller('EditBookmarkCtrl', ['$state', '$stateParams', 'BookmarksModel', function($state, $stateParams, BookmarksModel){
	var editBookmarkCtrl = this;

	function returnToBookmarks(){
		$state.go('app.categories.bookmarks', {
			category: $stateParams.category
		})
	};

	function updateBookmark(){
		// we are copying the editBookmark
		editBookmarkCtrl.bookmark = angular.copy(editBookmarkCtrl.editedBookmark);
		BookmarksModel.updateBookmark(editBookmarkCtrl.editedBookmark);
		returnToBookmarks();
	};

	function cancelEditing(){
		returnToBookmarks();
	};

	BookmarksModel.getBookmarkById($stateParams.bookmarkId)
		.then(function(bookmark){
			if (bookmark){
				editBookmarkCtrl.bookmark = bookmark;
				editBookmarkCtrl.editedBookmark = angular.copy(editBookmarkCtrl.bookmark);
			} else {
				returnToBookmarks();
			}
		})

	editBookmarkCtrl.cancelEditing = cancelEditing;
	editBookmarkCtrl.updateBookmark = updateBookmark;


}])