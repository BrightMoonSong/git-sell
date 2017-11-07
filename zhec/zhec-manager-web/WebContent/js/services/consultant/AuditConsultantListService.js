/**
 * 系统用户service定义
 */
angular
	.module('managerApp')
	.factory('AuditConsultantListService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/consultantnew';
		return {
			//查询数据方法
			find: function(pageSize, pageNo, auditStatus, consultantsName) {
				var defer = $q.defer();
				var url = baseUrl + "/findconsultantsaudit?pageSize=" + pageSize + "&pageNo=" + pageNo + "&auditStatus=" + auditStatus + "&consultantsName=" + consultantsName;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//根据id查询一条数据方法
			get: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/findconsultantsfiles?id=' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//开始审核
			put: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/editconsultantsaudit?id='+res.id+"&consultantsId="+res.consultantsId+"&auditStatus="+res.auditStatus+"&validityTime="+res.validityTime+"&auditId="+res.auditId+"&auditName="+res.auditName+"&remark="+res.remark;
				$http({
					method: 'put',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}



		}
	});
