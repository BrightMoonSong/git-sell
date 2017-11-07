angular
	.module("managerApp")
	.factory("CarownerPendingService",function($q,$http,constMapiLocation){
		var baseUrl = constMapiLocation + '/carowner';
		var shipperBaseUrl = constMapiLocation + '/shipper';
		return{
			//待审核列表
			find:function(realName,phone,carLicenseNo,startTime,pageNo,pageSize){
				var defer = $q.defer();
				var url =baseUrl + '/pendingchecks?pageNo=' + pageNo + '&pageSize=' + pageSize;
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
			//车主审核
			check:function(carOwnerId, checkStatus, remark){
				var defer = $q.defer();
				var url = baseUrl + '/check?carOwnerId=' + carOwnerId + '&checkStatus=' + checkStatus;
				if(remark){
					url+="&remark=" +remark;
				}
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
				var url = shipperBaseUrl + '/pendingchecks?pageNo=' + pageNo + '&pageSize=' + pageSize;
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
			//审核
			shippercheck: function(shipperId, checkStatus, remark, settlementMethod) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/check?shipperId=' + shipperId + '&checkStatus=' + checkStatus;
				if(remark) {
					url += "&remark=" + remark;
				}
				if(settlementMethod) {
					url += "&settlementMethod=" + settlementMethod;
				}
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
