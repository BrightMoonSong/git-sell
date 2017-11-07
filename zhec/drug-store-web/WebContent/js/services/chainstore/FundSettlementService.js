angular
	.module('managerApp')
	.factory('FundSettlementService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/settlement';
		var drugstoreschain = constMapiLocation + '/drugstoreschain';
		var drugstore = constMapiLocation + '/drugstore';
		return {
			//订单资金结算列表
			findinfos: function(pageNo, pageSize, parmValue, storeId, startTime, endTime) {
				var defer = $q.defer();
				var url = baseUrl + "/findinfos?pageNo=" + pageNo + "&pageSize=" + pageSize;
				if(parmValue) {
					url += "&parmValue=" + parmValue;
				} else if(parmValue === 0) {
					url += "&parmValue=" + parmValue;
				}
				if(storeId) {
					url += "&storeId=" + storeId;
				}
				if(startTime) {
					url += "&startTime=" + startTime;
				}
				if(endTime) {
					url += "&endTime=" + endTime;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//根据连锁店ID列出所有连锁店子药店列表
			drugstoreById: function(chainId) {
				var defer = $q.defer();
				var url = drugstore + '/findall?chainId=' + chainId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//所有连锁店列表
			drugfindall: function() {
				var defer = $q.defer();
				var url = drugstoreschain + '/findall';
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
		}
	});