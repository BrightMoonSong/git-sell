app
.factory('memberservice',function($http,$q,lapiBaseLocation){
  return {

    //获取个人头像、资产
    findmemberproinfo:function(memberId){
      var defer = $q.defer();
      var url = lapiBaseLocation+"/membercenter/getmemberinfo/"+memberId;
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
    },
    findgoodsinleft:function(){
      ///membercenter/getmemberdeta/
      var defer = $q.defer();
      var url = lapiBaseLocation+"/mallcommendgoods/findwebcommendgoods?commendId=10&applyType=1&size=5";
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
    findgoodsindown:function(){
      ///membercenter/getmemberdeta/
      var defer = $q.defer();
      var url = lapiBaseLocation+"/mallcommendgoods/findwebcommendgoods?commendId=11&applyType=1&size=8";
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
    findordersnum:function(memberId){
      ///membercenter/getmemberdeta/
      var defer = $q.defer();
      var url = lapiBaseLocation+"/member/findordersnum?memberId="+memberId ;
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
