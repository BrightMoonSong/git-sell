angular
    .module('managerApp')
    .factory('GoodsDisableService', function ($q, $http, constMapiLocation) {
        var baseUrl = constMapiLocation + '/goods';
        return {
            //查询数据
            find: function (infoName , pageSize, pageNo) {
                var defer = $q.defer();
                var url = baseUrl + "/finddisablegoods?infoName=" + infoName  + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data)
                })
                return defer.promise;
            },
			//修改商品状态        启用
			enabled: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/enablegoodsbyid";
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}
        }
    })