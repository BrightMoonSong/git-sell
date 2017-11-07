app.factory('registerService', function ($q, $http) {
   baseUrl = constWapLapiLocation + '/memberregister';
    return {
        //判断手机是否已注册
        get: function (mobile) {
            var defer = $q.defer();
            var url = baseUrl + "/ifmobile/" + mobile;
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
        //获取验证码
        put: function (mobile) {
            var defer = $q.defer();
            //var url = baseUrl + "/sendsmscode?mobile=" + mobile + "&type=" + type;
            var url = baseUrl + "/sendsmscode?mobile=" + mobile;
            $http({
                method: 'post',
                url: url
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        },
        post: function (registerMessage) {
            var defer = $q.defer();
            var url = baseUrl + "/addmember";
            $http({
                method: 'post',
                url: url,
                data:registerMessage
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data)
            })
            return defer.promise;
        }
    }
})
