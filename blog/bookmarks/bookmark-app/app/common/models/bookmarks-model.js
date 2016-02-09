angular.module('app.models.bookmarks', [
])

.service('BookmarksModel', ['$http', '$q', function($http, $q){
	var model = this,
		URLS = { FETCH: 'data/bookmarks.json'},
		bookmarks;

	function extract(result){
		return result.data;
	};

	function cacheBookmarks(result){
		bookmarks = extract(result);
		return bookmarks;
	};

	function findBookmark(bookmarkId){
		return _.find(bookmarks, function(bookmark){
			return bookmark.id === parseInt(bookmarkId, 10);
		})
	};

	model.getBookmarks = function(bookmark){
		return (bookmarks) ? $q.when(bookmarks) : $http.get(URLS.FETCH).then(cacheBookmarks);
	};

	model.createBookmark = function(bookmark){
		var lastIndex = bookmarks[bookmarks.length -1].id;
		bookmark.id = lastIndex + 1;
		bookmarks.push(bookmark);
	};

	model.deleteBookmark = function(bookmark){
		_.remove(bookmarks, function(b){
			return b.id == bookmark.id;
		})
	};

}])