angular
	.module("managerApp")
	.factory("CarownerNotService",function($q,$http,constMapiLocation){
		var baseUrl = constMapiLocation + '/carowner';
		var shipperBaseUrl = constMapiLocation + '/shipper';

		return{
			//审核未通过列表
			find:function(realName,phone,carLicenseNo,startTime,pageNo,pageSize){
				var defer = $q.defer();
				var url =baseUrl + '/notpasschecks?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(realName){
					url+="&realName=" + realName ;
				}
				if(phone){
					url+="&phone=" + phone ;
				}
				if(carLicenseNo){
					url+="&carLicenseNo=" + carLicenseNo ;
				}
				if(startTime){
					url+="&startTime=" + startTime ;
				}
				$http({
					method:'get',
					url:url
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				})
				return defer.promise;
			},
			//车主详情
			detail:function(carOwnerId){
				var defer = $q.defer();
				var url = baseUrl + '/get/' + carOwnerId;
				$http({
					method:'get',
					url:url
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				})
				return defer.promise;
			},
			//删除
			detel:function(carOwnerId,status){
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + carOwnerId +'?status=' + status;
				$http({
					method:'put',
					url:url
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				})
				return defer.promise;
			},
			//车主详情
			seach:function(carOwnerId,pageNo,pageSize){
				var defer = $q.defer();
				var url = baseUrl + '/checks?carOwnerId=' + carOwnerId + '&pageNo='+ pageNo + '&pageSize=' + pageSize;
				$http({
					method:'get',
					url:url
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				})
				return defer.promise;
			},
			// huozhu
			//待审核列表
			shipperfind: function(realName, phone, startTime, pageNo, pageSize) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/notpasschecks?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(realName) {
					url += "&realName=" + realName;
				}
				if(phone) {
					url += "&phone=" + phone;
				}
				if(startTime) {
					url += "&startTime=" + startTime;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//详情
			shipperdetail: function(id) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/get/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//详情
			shipperenable: function(id,status) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/updatestatus/' + id + '?status=' + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//货主审核
			shipperseach:function(shipperId,pageNo,pageSize){
				var defer = $q.defer();
				var url = shipperBaseUrl + '/checks?shipperId=' + shipperId + '&pageNo='+ pageNo + '&pageSize=' + pageSize;
				$http({
					method:'get',
					url:url
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				})
				return defer.promise;
			}
		}
	})
