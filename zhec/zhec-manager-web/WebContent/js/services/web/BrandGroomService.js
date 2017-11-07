angular
    .module('managerApp')
    .factory('BrandGroomService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/web';
        return {
            //1页面加载展示所有广告位信息
            find:function(pageSize,pageNo,applyType,floorName){
                var defer = $q.defer();
                var url = baseUrl+"/findfloor?pageSize="+pageSize+"&pageNo="+pageNo+"&applyType="+applyType+"&floorName="+floorName;

                $http({
                    method:'get',
                    url:url
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //根据ID获取详情
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getfloorbyid?id=' + id;
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
            //获取品牌列表
            gets: function(brandName) {
                var defer = $q.defer();
                var url = baseUrl + '/findbrand?brandName='+brandName;
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
            //搜索
            seach: function(id) {
                var defer = $q.defer();
                var url = baseUrl + '/findcate';
                if (id !== null && id !== undefined && id !== '') {
                    url = url + "?id="+id;
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
            //提交保存品牌
            put: function(id,brandId,cateId,applyType) {
                var defer = $q.defer();

                var url = baseUrl + '/editfloor?id='+id+"&brandId="+brandId+"&cateId="+cateId+"&applyType="+applyType;
                $http({
                    method: 'put',
                    url: url,
                }).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                })
                return defer.promise;
            },




        }
    });
