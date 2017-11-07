angular
	.module('managerApp')
	.factory('ordersPromotionApplyService', function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/orderspromotion';
		var baseUrl2 = constMapiLocation + '/goods';
		return {
			//详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/detail/' + id;
				$http({
					method: 'GET',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//商品促销的维护
			maintain: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/maintain/' + id;
				$http({
					method: 'PUT',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取商品促销列表
			find: function(parmValue, minTime, maxTime, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/new?parmValue=" + parmValue + "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//获取商品促销审核详情
			auditdetail: function(auditId) {
				var defer = $q.defer();
				var url = baseUrl + '/auditdetail/' + auditId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//添加商品促销审核
			add: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'POST',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取商品促销审核列表
			auditlist: function() {
				var defer = $q.defer();
				var url = baseUrl + '/auditlist';
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取商品促销详情
			detail: function(auditId) {
				var defer = $q.defer();
				var url = baseUrl + '/detail/' + auditId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取商品促销列表
			list: function(auditId) {
				var defer = $q.defer();
				var url = baseUrl + "/list?parmValue=" + parmValue + "&minTime=" + minTime + "&maxTime=" + maxTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//商品选择   /mapi/goods/onsalelist
			onsalelist: function(cateId, brandName, goodsInfoName, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl2 + "/onsalelist?cateId=" + cateId + "&brandName=" + brandName + "&goodsInfoName=" + goodsInfoName + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//分类信息
			findIdCate: function(id) {
				var defer = $q.defer();
				var url = baseUrl2 + '/categories' + '/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				});
				return defer.promise;
			},
			//分类信息  第一个下拉框
			findCate: function(type) {
				var defer = $q.defer();
				var url = baseUrl2 + '/categories?type=' + type;
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
			//保存选择的商品
			addproducts: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/addproducts';
				$http({
					method: 'POST',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//保存选择的商品修改货品促销价
			editpromotionprice: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/editpromotionprice';
				$http({
					method: 'PUT',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//修改基本促销信息
			edit: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/edit';
				$http({
					method: 'PUT',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//获取品牌的ID以及名称列表
			findgoodsbrands: function(brandName) {
				var defer = $q.defer();
				var url = baseUrl2 + '/findgoodsbrands?brandName=' + brandName;
				$http({
					method: 'GET',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//提交审核
			commit: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/commit/' + id;
				$http({
					method: 'PUT',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			}
		}
	})