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

	model.getBookmarkById = function(bookmarkId){
		var deferred = $q.defer();
		
		if(bookmarks){
			deferred.resolve(findBookmark(bookmarkId));
		} else {
			model.getBookmarks().then(function(){
				deferred.resolve(findBookmark(bookmarkId));
			})
		}

		return deferred.promise;
	};

	model.updateBookmark = function(bookmark){
		// this returns a index
		var index = _.findIndex(bookmarks, function(b){
			return b.id == bookmark.id;
		});

		bookmarks[index] = bookmark;
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