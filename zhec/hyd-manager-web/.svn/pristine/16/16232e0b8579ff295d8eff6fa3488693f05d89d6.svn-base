angular
	.module("managerApp")
	.factory("AuthFunctionService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/function';
		return {
			//一级菜单查询
			onefind: function(pageNo, pageSize, name, scope) {
				var defer = $q.defer();
				var url = baseUrl + '/findfirstlevelmenu?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(name) {
					url += "&name=" + name;
				}
				if(scope) {
					url += "&scope=" + scope;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//新增一级菜单
			oneadd: function(authfun) {
				var defer = $q.defer();
				var url = baseUrl + '/addfirstlevelmenu';
				$http({
					method: 'post',
					url: url,
					data: authfun
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//二级菜单查询
			twofind: function(pageNo, pageSize, parentId, name, scope) {
				var defer = $q.defer();
				var url = baseUrl + '/findsecondarymenu?pageNo=' + pageNo + '&pageSize=' + pageSize + '&parentId=' + parentId + '&name=' + name + '&scope=' + scope;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//新增二级菜单
			twoadd: function(authfun) {
				var defer = $q.defer();
				var url = baseUrl + '/addsecondarymenu';
				$http({
					method: 'post',
					url: url,
					data: authfun
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//二级联动-1
			twofindOne: function(scope) {
				var defer = $q.defer();
				if(scope){
					var url = baseUrl + '/findallfirstlevelmenu?scope='+scope;
				}else{
					var url = baseUrl + '/findallfirstlevelmenu';
				}
				
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//二级联动-2
			twofinded: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/findallsecondarymenu/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//功能点查询
			pointfind: function(pageNo, pageSize, parentId, name, code, scope) {
				var defer = $q.defer();
				var url = baseUrl + '/findfunctions?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(parentId){
					url+="&parentId=" + parentId;
				}
				if(name){
					url+="&name=" + name;
				}
				if(code){
					url+="&code=" + code;
				}
				if(scope){
					url+="&scope=" + scope;
				}
				
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//新增功能点菜单
			pointadd: function(authfun) {
				var defer = $q.defer();
				var url = baseUrl + '/addfunction';
				$http({
					method: 'post',
					url: url,
					data: authfun
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//功能点详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},

			//修改功能点
			edit: function(authfun) {
				var defer = $q.defer();
				var url = baseUrl + '/update'
				$http({
					method: 'put',
					url: url,
					data: authfun
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启禁用功能点
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + "?status=" + status
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data)
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}

		}
	})