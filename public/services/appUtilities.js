(function() {
	var appUtilities = ['$http', function($http) {
		var resolveAppStatus = function(statusId) {
			switch (statusId) {
				case 1:
					return 'Submitted';
				case 2:
					return 'Approved';
				case 3:
					return 'Completed';
				case 4:
					return 'Finalized';
				case 5:
					return 'Rejected';
				default:
					return 'Not-Submitted';
			}
		};

		var resolveAppStatusMessage = function(statusId) {
			switch (statusId) {
				case 1:
					return 'Your Application is Pending Approval';
				case 2:
					return 'Your Application Has Been Approved!';
				case 3:
					return 'Your Application Has Been Completed!';
				case 4:
					return 'Your Application Has Been Finalized!';
				case 5:
					return 'Your Application Has Been Rejected, Here \
						    Are Some Things Your Can Do To Resolve This...';
				default:
					return 'Sorry There Is No Record Of This Application';
			}
		};

		return {
			resolveAppStatus: 		 resolveAppStatus,
			resolveAppStatusMessage: resolveAppStatusMessage
		};
	}];

	var module = angular.module('MyApp');
	module.factory('appUtilities', appUtilities);
}());