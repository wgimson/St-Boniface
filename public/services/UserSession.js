(function() {
	var userSession = function() {
		// PRIVATE
		var user = {};

		// PUBLIC 
		var getUserSession = function() {
			return user;
		}

		var setUserLoginInfo = function(userData) {
			user.UserName = userData.UName,
			user.Password = userData.Pass,
			user.FormKey = userData.FormKey,
			user.IsAdmin = userData.IsAdmin;
		};

		var clearUserSession = function() {
			user = {};
		}

		return {
			getUserSession: getUserSession,
			setUserLoginInfo: setUserLoginInfo,
			clearUserSession: clearUserSession
		};
	};


	var app = angular.module('MyApp');
	app.factory('userSession', userSession);
}());