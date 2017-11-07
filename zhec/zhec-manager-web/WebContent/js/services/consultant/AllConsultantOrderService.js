
/**
 * ϵͳ�û�service����
 */
angular
    .module('managerApp')
    .factory('AllConsultantOrderService',function($http,$q,constMapiLocation){
        var baseUrl= constMapiLocation + '/consultantorder';
        return {
            //��ѯ��ݷ���
            find:function(parmValue,minTime,maxTime,pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl+"/consultants?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
                var url = baseUrl+'/consultants/'+id;
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
            //��ѯ�������ݷ���
            findnotAudit:function(parmValue,minTime,maxTime,pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl + '/pendingconsultants' +"?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
            //��ѯ�������ݷ���
            findAudit:function(parmValue,minTime,maxTime,pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl + '/auditconsultants' +"?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
            //��ѯδͨ�������ݷ���
            findnotpass:function(parmValue,minTime,maxTime,pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl + '/notpassconsultants' +"?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
            //��ѯδͨ�������ݷ���
            findpass:function(parmValue,minTime,maxTime,pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl + '/passconsultants' +"?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
            //��ʼ���
            auditstart:function(consultantMessage){
                var defer = $q.defer();
                var url = baseUrl + '/auditstart'
                $http({
                    method:'put',
                    url:url,
                    data:consultantMessage
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //���ͨ��
            auditpass:function(consultantMessage){
                var defer = $q.defer();
                var url = baseUrl + '/auditpass'
                $http({
                    method:'put',
                    url:url,
                    data:consultantMessage
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //��˲�ͨ��
            auditnotpass:function(consultantMessage){
                var defer = $q.defer();
                var url = baseUrl + '/auditnotpass'
                $http({
                    method:'put',
                    url:url,
                    data:consultantMessage
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },

            //��������
            enable:function(id){
                var defer = $q.defer();
                $http({
                    method:'put',
                    url:baseUrl + '/enableconsultant/'+id
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //���ʽ���
            disable:function(id){
                var defer = $q.defer();
                $http({
                    method:'put',
                    url:baseUrl + '/disableconsultant/'+id
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //�������
            add:function(consultantList){
                var defer = $q.defer();
                var url = baseUrl;
                $http({
                    method:'post',
                    url:url + '/consultants',
                    data:consultantList
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //�޸����
            edit:function(consultantList){
                var defer = $q.defer();
                var url = baseUrl;
                $http({
                    method:'put',
                    url:url + '/consultants',
                    data:consultantList
                }).success(function(data){
                    defer.resolve(data);
                }).error(function(data){
                    defer.reject(data);
                });
                return defer.promise;
            },
            //�Ƽ�����
            promptionOrders:function(parmValue,minTime,maxTime,pageSize,pageNo,type){
                var defer = $q.defer();
                var url = baseUrl + '/recommendorders' +"?parmValue="+parmValue+"&minTime="+minTime+"&maxTime="+maxTime+"&pageSize="+pageSize+"&pageNo="+pageNo+"&type="+type;
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
            //�Ƽ���Ա
            findrecommendmembers:function(parmValue,pageSize,pageNo){
                var defer = $q.defer();
                var url = baseUrl + "/findconsultants?consultantsName="+parmValue+"&pageSize="+pageSize+"&pageNo="+pageNo;
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
            //�Ƽ���Ա
            findorderNumSearch:function(pageNo,pageSize,id){
                var defer = $q.defer();
                var url = baseUrl + "/findconsultantsorder?orderType=1"+"&pageSize="+pageSize+"&pageNo="+pageNo+"&id="+id;
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