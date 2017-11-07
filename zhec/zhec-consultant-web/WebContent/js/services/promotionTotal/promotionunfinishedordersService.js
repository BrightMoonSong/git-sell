angular
    .module('managerApp')
    .factory('promotionunfinishedordersService', function($http, $q, constCapiLocation) {
        var baseUrl = constCapiLocation + '/consultantorder'; //各种基本路径****
        return {
        	find:function(pageSize,pageNo,orderType) {
                var defer = $q.defer();
                var url = baseUrl + '/findconsultantorder?pageSize='+pageSize+"&pageNo="+pageNo+"&orderType="+orderType;
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
        };
    });
