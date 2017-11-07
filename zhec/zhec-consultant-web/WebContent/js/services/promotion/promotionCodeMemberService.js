angular
    .module('managerApp')
   .factory('promotionCodeMemberService',function($http,$q,constCapiLocation){
        var baseUrl = constCapiLocation+'/recommend';
    return {
        //查询数据方法
        find:function(userToken){
            var defer = $q.defer();
            var url = constCapiLocation+"consultant/consultants?userToken="+userToken;
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
    }
})
