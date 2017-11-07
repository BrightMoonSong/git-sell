angular
  .module("managerApp")
  .factory("AppCollapseService",function ($q,$http,constMapiLocation) {
    var baseUrl = constMapiLocation + '/log';
    return{
      //APP崩溃日志记录列表
      find:function(platform,scope,phoneBrands,phoneModel,versionName,versionCode,userId,phone,startTimeStr,endTimeStr,pageNo,pageSize){
        var defer = $q.defer();
        var url = baseUrl + '/findcollapse?pageNo=' + pageNo + '&pageSize=' + pageSize;
        if(platform){
          url+='&platform=' + platform;
        }
        if(scope){
          url+='&scope=' + scope;
        }
        if(phoneBrands){
          url+='&phoneBrands=' + phoneBrands;
        }
        if(phoneModel){
          url+='&phoneModel=' + phoneModel;
        }
        if(versionName){
          url+='&versionName=' + versionName;
        }
        if(versionCode){
          url+='&versionCode=' +versionCode ;
        }
        if(userId){
          url+='&userId=' +userId ;
        }
        if(phone){
          url+='&phone=' + phone;
        }
        if(startTimeStr){
          url+='&startTimeStr=' + startTimeStr;
        }
        if(endTimeStr){
          url+='&endTimeStr=' + endTimeStr;
        }
        $http({
          method:'get',
          url:url
        }).success(function(data){
          defer.resolve(data)
        }).error(function(data){
          defer.reject(data)
        })
        return defer.promise;
      },
      //APP崩溃日志记录详情
      detail:function(logId){
        var defer = $q.defer();
        var url = baseUrl + '/getcollapse?logId=' + logId;
        $http({
          method:'get',
          url:url
        }).success(function(data){
          defer.resolve(data)
        }).error(function(data){
          defer.reject(data)
        })
        return defer.promise;

      },
      //删除异常日志记录
      delete:function(logId){
        var defer = $q.defer();
        var url = baseUrl + '/deletecollapse?logId=' + logId;
        $http({
          method:'delete',
          url:url
        }).success(function(data){
          defer.resolve(data)
        }).error(function(data){
          defer.reject(data)
        })
        return defer.promise;

      },
      //批量删除APP崩溃日志记录
      deleteall:function(startTimeStr,endTimeStr){
        var defer = $q.defer();
        var url = baseUrl + '/deletecollapsebatch?startTimeStr=' +startTimeStr + '&endTimeStr=' + endTimeStr;
        $http({
          method:'delete',
          url:url
        }).success(function(data){
          defer.resolve(data)
        }).error(function(data){
          defer.reject(data)
        })
        return defer.promise;

      }
    }
  })
