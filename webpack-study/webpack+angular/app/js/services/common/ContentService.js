angular
	.module("app")
	.factory("ContentService", function($q, $http) {
		var baseUrl = constMapiLocation + '/order';
		console.log('ContentService');
		return 'ContentService';
	})