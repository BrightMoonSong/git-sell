/**
 * 系统用户controller定义
 */
function SysSearchController($scope, $http, $q, SysSearchService) {
	$scope.searchResult = ""; //当前操作的数据id
	$scope.goodsId = 0; //当前操作的数据id
	$scope.goodsSearch = {};
	$scope.goodsInfo = "";

	/**
	 * 创建商品索引
	 */
	$scope.createGoodsIndex = function() {
			var defer = $q.defer();
			SysSearchService.creategoodsindex($scope.goodsSearch).then(
				function(result) {
					$scope.searchResult = JSON.stringify(result.data, null, 4);
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
			return defer.promise;
		}
		/**
		 * 获取商品索引
		 */
	$scope.getGoodsIndex = function() {
			var defer = $q.defer();
			SysSearchService.getgoodsindex($scope.goodsId).then(
				function(result) {
					$scope.searchResult = JSON.stringify(result.data, null, 4);
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
			return defer.promise;
		}
		/**
		 * 删除索引测试
		 */
	$scope.deleteGoodsIndex = function() {
			var defer = $q.defer();
			SysSearchService.deletegoodsindex($scope.goodsId).then(
				function(result) {
					$scope.searchResult = JSON.stringify(result.data, null, 4);
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
			return defer.promise;
		}
		/**
		 * 搜索商品索引
		 */
	$scope.queryGoodsIndex = function() {
			var defer = $q.defer();
			SysSearchService.querygoodsindex($scope.goodsInfo).then(
				function(result) {
					$scope.searchResult = JSON.stringify(result.data, null, 4);
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				})
			return defer.promise;
		}
		/**
		 * 创建索引测试（测试）
		 */
	$scope.createGoodsIndexTest = function() {
		var defer = $q.defer();
		SysSearchService.creategoodsindextest().then(
			function(result) {
				$scope.searchResult = JSON.stringify(result.data, null, 4);
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	/**
	 * 获取索引测试（测试）
	 */
	$scope.getGoodsIndexTest = function() {
		var defer = $q.defer();
		SysSearchService.getgoodsindextest().then(
			function(result) {
				$scope.searchResult = JSON.stringify(result.data, null, 4);
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}

	/**
	 * 删除索引测试（测试）
	 */
	$scope.deleteGoodsIndexTest = function() {
		var defer = $q.defer();
		SysSearchService.deletegoodsindextest().then(
			function(result) {
				$scope.searchResult = JSON.stringify(result.data, null, 4);
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}
}

angular
	.module('managerApp')
	.controller('SysSearchController', SysSearchController)