angular
	.module("managerApp")
	.factory("FundsService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/funds';
		return {
			//结算订单列表
			find: function(scope, userId, contractType, settlementStatus, isOwn, startTimeStr, endTimeStr, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/settlementorders?pageNo=' + pageNo +' &pageSize=' +pageSize;
				if(scope) {
					url += "&scope=" + scope;
				}
				if(userId) {
					url += "&userId=" + userId;
				}
				if(contractType) {
					url += "&contractType=" + contractType;
				}
				if(settlementStatus) {
					url += "&settlementStatus=" + settlementStatus;
				}

				if(isOwn) {
					url += "&isOwn=" + isOwn;
				}
				if(startTimeStr) {
					url += "&startTimeStr=" + startTimeStr;
				}
				if(endTimeStr) {
					url += "&endTimeStr=" + endTimeStr;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			seach:function(scope,phone	){
				var defer =$q.defer();
				if(!scope){
					scope="";
				}
				var url  = baseUrl +'/users?scope=' + scope;
				if(phone){
					url+="&phone=" +phone 
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}
		}
	})