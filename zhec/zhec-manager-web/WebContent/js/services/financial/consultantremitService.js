/**
 * ϵͳ�û�service����
 */
angular
    .module('managerApp')
    .factory('consultantremitService', function($http, $q, constMapiLocation) {
        var baseUrl = constMapiLocation + '/consultant';
        return {
            //��ѯ��ݷ���
            find: function(pageSize, pageNo,consultantsName) {
                var defer = $q.defer();
                var url = baseUrl + "/findconsultantsremit?pageSize=" + pageSize + "&pageNo=" + pageNo  + "&consultantsName=" + consultantsName;
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
            //���id��ѯһ����ݷ���
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
            //ȷ������
            put: function(res) {
                var defer = $q.defer();
                var url = baseUrl + "/editconsultantsremit";
                $http({
                    method: 'post',
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

