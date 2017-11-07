app
  .factory('propertyservice',function($http,$q,lapiBaseLocation){
  return {
    getmemberspentdate:function(memberId){
      ///membercenter/getmemberdeta/
      var defer = $q.defer();
      var url = lapiBaseLocation+"/membercenter/getmemberdeta/"+memberId;
      $http({
        method:'get',
        url:url
      }).success(function(data){
        defer.resolve(data);
      }).error(function(data){
        defer.reject(data);
      });
      return defer.promise;
    }
  }
});
