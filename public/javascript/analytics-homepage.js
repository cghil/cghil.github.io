// Custom Tracking Events

var analytics = analytics || {};

analytics.mouseOverTracker = (function(){
	// private variables and functions
	var $viz = $('#viz'),
		timer;

	var setTimer = function(callback){
		timer = window.setTimeout(callback, 500)
	};

	var clearTimer = function(){
		window.clearTimeout(timer);
	};

	var playingWithGraph = function(){

		function logIt(){
			woopra.track('interact_with_skills_graph', {
				url: window.location.pathname,
				title: document.title
			})
		};

		function vizMouseout(){
			$viz.mouseout(function(){
				clearTimer();
			});
		};

		$viz.mouseover(function(){
			setTimer(logIt);
			vizMouseout();
		});
		
	};

	return { 
		launchOnPlayWithGraph: function(){
			playingWithGraph();
		}
	}
})();

// analytics.scrollTracker = (function(){
// 	// private variables and functions
// 	var $window = $(window),
// 		$codeProject = $("#code-projects");

// 	var $codeProjectScrollOver = function(){
// 		$window.scroll(function(){
			
// 			var projectTop = $codeProject.offset().top,
// 				windowHeight = $window.height(),
// 				distanceFromWindowTop = $window.scrollTop();

// 			if (distanceFromWindowTop > (projectTop - windowHeight)){
// 				console.log('launch the scroll observer');
// 			}

// 		})
// 	}

// 	var codeProjectObserver = function(){
// 		$codeProjectScrollOver();
// 	};

// 	return {
// 		launchScrollTrackerAnalytics: function(){
// 			codeProjectObserver();
// 		}
// 	}

// })();

// analytics.scrollTracker.launchScrollTrackerAnalytics();
analytics.mouseOverTracker.launchOnPlayWithGraph();