app
  .factory('propertyservice',function($http,$q){
  return {
    getmemberspentdate:function(memberId){
      ///membercenter/getmemberdeta/
      var defer = $q.defer();
      var url = constWapLapiLocation+"/membercenter/getmemberdeta/"+memberId;
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
    findmemberproinfo:function(memberId){
      var defer = $q.defer();
      var url = constWapLapiLocation+"/membercenter/getmemberinfo/"+memberId;
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
});
