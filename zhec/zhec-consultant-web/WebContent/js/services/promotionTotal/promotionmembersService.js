angular
    .module('managerApp')
   .factory('promotionmembersService',function($http,$q,constCapiLocation){
        var baseUrl = constCapiLocation+'/recommend';
    return {
        //查询数据方法
        findmembers:function(membersName,userToken,currentPageNo,currentPageSize){
            var defer = $q.defer();
            var url = baseUrl+"/consultantmembers"+"?userToken="+userToken+"&pageNo="+currentPageNo+"&pageSize="+currentPageSize;
            if (membersName !== null && membersName !== undefined && membersName !== '') {
              url = url + "&content="+membersName;
          }
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
		getId:function(userToken){
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

        //根据id查询一条数据方法
        get:function(id){
            var defer = $q.defer();
            var url = baseUrl+'/consultantmembers/'+id+"?userToken="+userToken;
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
        //根据id查询一条数据方法
        getOrd:function(id,currentPageNo,currentPageSize){
            var defer = $q.defer();
            var url = baseUrl+'/consultantmemberorders/'+id+"?userToken="+userToken;
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
