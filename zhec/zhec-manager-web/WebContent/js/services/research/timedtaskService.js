angular
    .module('managerApp')
    .factory('timedtaskService',function($http,$q){
        var baseUrl= constManagerLocation;
        return {
            //������� У����Ч�ڣ�ÿ���賿ִ�У��жϹ�����Ч���Ƿ���ڣ�����ڣ��޸Ĺ���״̬Ϊ�ѹ���
            consultant1:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/1?id="+id;
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
            //�ٽ���Ч�����ѣ�ÿ��ִ�У�������Ч�ڵ���ǰ30�졢10�졢3�����������һ��
            consultant2:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/2?id="+id;
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
            //��������״̬�Զ�ȷ�ϣ�ÿ��ִ�У���������״̬Ϊ��ת�˳���5�죬�Զ���Ϊ��ȷ��
            consultant3:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/3?id="+id;
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
            //�Զ�ֹͣ�������̣�ÿ��ĩ����������գ��Զ��Ѵ��������������̸�Ϊ������ͨ��
            consultant4:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/consultant/4?id="+id;
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
        //�������  ȡ��24Сʱδ֧���Ĺ��ڶ���
            order1:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/1?id="+id;
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
            //�ѷ�������30��δ�������Զ���Ϊ���ջ����������ʱ���15�졪������������Ϊ������������>30�죬ÿ��ִ��һ�Σ�
            order2:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/2?id="+id;
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
            //���ջ�����15���Զ���Ϊ�Ѱ�ȫ����(ÿ��ִ��)
            order3:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/3?id="+id;
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
            //�Ѱ�ȫ�����ж��˻���ʶ�ֶ�Ϊ���˻����˻���ɣ���Ϊ�����㶩��(ÿ��ִ��)
            order4:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/4?id="+id;
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
            //�����㶩��ִ�н������������״̬��Ϊ����ɶ�����ÿ��ִ�У�
            order5:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/5?id="+id;
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
            //������˵�7����δ�������Զ���Ϊ����ֹ�˵�(ÿ��ִ��)
            order6:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/6?id="+id;
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
            //�ѷ����˵�30����δ�յ������Զ���Ϊ����ֹ�˵�(ÿ��ִ��)
            order7:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/7?id="+id;
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
            //��ѯ�����˻����Ӷ����������Ӷ������˻��������Ƿ�ȫ����ɻ�����ֹ�����ȫ����ɻ���ֹ�����޸��Ӷ���״̬(ÿ��ִ��)
            order8:function(id){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/test/8?id="+id;
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
            //�������http�ӿ�
            //��goods_info���е�index_statusΪ0����ӵ�ES�������У�����index_status״̬��0�ĳ�1
            http1:function(){
                var defer = $q.defer();
                var url = baseUrl+"/test/search/1";
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
            //��goods_info���е�index_statusΪ3�Ĵ�ES��������ɾ��������index_status״̬��3�ĳ�2
            http2:function(){
                var defer = $q.defer();
                var url = baseUrl+"/test/search/2";
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
            //У�����
            //1У���û������֡�����
            verify1:function(){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/verifytest/1";
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
            //2У��������
            verify2:function(){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/verifytest/2";
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
            //3У����
            verify3:function(){
                var defer = $q.defer();
                var url = baseUrl+"/tapi/verifytest/3";
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



