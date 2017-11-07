angular
    .module('managerApp')
    .factory('GoodsBrandService', function ($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goodsbrand';
        return {
            //查询数据
            find: function (parmvalue, pageSize, pageNo) {
                var defer = $q.defer();
                var url ;
                if(parmvalue){
                url = baseUrl + "/findinfos?parmValue="+ parmvalue  +"&pageSize="+ pageSize +"&pageNo="  + pageNo;
                }else{
                	url = baseUrl + "/findinfos?pageSize="+ pageSize +"&pageNo="  + pageNo;
                }
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                })
                return defer.promise;
            },
            //根据id查询一条数据方法
            get: function (id) {
                var defer = $q.defer();
                var url = baseUrl + '/getinfo/' + id;
                $http({
                    method: 'get',
                    url: url
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                })
                return defer.promise;
            },
            //修改数据
            edit: function (brand) {
                var defer = $q.defer();
                var url = baseUrl + '/updateinfo';
                $http({
                    method: 'put',
                    url: url,
                    data: brand
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                })
                return defer.promise;
            },
            //新增数据
            add: function (brand) {
                var defer = $q.defer();
                var url = baseUrl + '/addinfo';
                $http({
                    method: 'post',
                    url: url,
                    data: brand
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
			//删除数据
			delete: function(id,status){
				var defer =$q.defer();
				var url = baseUrl+'/updatestatus/'+id+"?status="+status;
				$http({
					method:'put',
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