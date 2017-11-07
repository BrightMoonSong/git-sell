/**
 * Created by shy on 2016/11/24.
 */
/**
 * ϵͳ�û�service����
 */

angular
    .module('managerApp')
    .factory('SysRoleService',function($http,$q,constCapiLocation){
        var baseUrl= constCapiLocation + '/sys/sysrole';
        return {
            //��ѯ��ݷ���
            find:function(name,pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl+"?name="+name+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
            //���id��ѯһ����ݷ���
            get:function(id){
                var defer = $q.defer();
                var url = baseUrl+'/'+id;
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
            //�޸����
            edit:function(sysuser){
                var defer = $q.defer();
                var url = baseUrl;
                $http({
                    method:'put',
                    url:url,
                    data:sysuser
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //�������
            add:function(sysuser){
                var defer = $q.defer();
                var url = baseUrl;
                $http({
                    method:'post',
                    url:url,
                    data:sysuser
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            }
        }
    });