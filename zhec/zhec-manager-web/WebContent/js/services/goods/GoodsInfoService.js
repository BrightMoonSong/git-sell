/**
 * 系统用户service定义
 */

angular
	.module('managerApp')
	.factory('GoodsInfoService', function($http, $q, constMapiLocation) {
		var baseUrl = constMapiLocation + '/goods';
		return {
			//查询数据方法
			find: function(goodsInfoName, pageSize, pageNo) {
				var defer = $q.defer();
				var url = baseUrl + "/goodsinfo?goodsInfoName=" + goodsInfoName + "&pageSize=" + pageSize + "&pageNo=" + pageNo;
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
				var url = baseUrl + '/goodsinfo/' + id;
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
			//修改数据
			edit: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/goodsinfo";
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
			},
			//新增数据
			add: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/goodsinfo';
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
			},
			//分类信息
			findCate: function(type) {
				var defer = $q.defer();
				var url = baseUrl + '/categories';
				$http({
					method: 'get',
					url: url + "?type=" + type
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//分类信息
			findIdCate: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/categories' + '/' + id;
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
			//根据规格查询规格属性-----------------------------
			findSpecOne: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/specifications/" + id;
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
			//提交货品信息数据
			editProduct: function(res, goodsId) {
				var defer = $q.defer();
				var url = baseUrl + "/goodsinfo/product?goodsId=" + goodsId;
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
			},
			//提交图片信息数据
			editImage: function(res) {
					var defer = $q.defer();
					var url = baseUrl + '/goodsinfo/image';
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
				/*,
							//根据分类ID查找属性列表
							findType: function(id) {
								var defer = $q.defer();
								var url = baseUrl + '/goodsinfo/findtypebycate?categoryId=' + id;
								$http({
									method: 'get',
									url: url
								}).success(function(data) {
									defer.resolve(data);
								}).error(function(data) {
									defer.reject(data);
								});
								return defer.promise;
							}*/
				,
			//查询某个类型属性的所有信息
			findoneType: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/goodstypes" + '/' + id;
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
			//类型属性
			editType: function(selectList) {
				var defer = $q.defer();
				var url = baseUrl + "/goodsinfo/type";
				$http({
					method: 'put',
					url: url,
					data: selectList
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//根据分类ID查找品牌列表
			getBrandsByCate: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/findgoodsbrands';
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
			//根据商品ID查找商品类型属性
			findinfoattrs: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/goodsinfo/findinfoattrs?goodsId=' + id;
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
			//修改商品描述和说明书信息
			description: function(res) {
				var defer = $q.defer();
				var url = baseUrl + "/goodsinfo/description";
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
			},
			//提交商品信息
			submit: function(id) {
				var defer = $q.defer();
				var url = baseUrl + "/submit/" + id;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//获取规格列表
			allspecs: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/allspecs';
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
			//获取可用归类列表
			availableclassifies: function() {
				var defer = $q.defer();
				var url = baseUrl + '/availableclassifies';
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
			//查找归类下的属性信息
			findprops: function(classifyId) {
				var defer = $q.defer();
				var url = baseUrl + '/findprops?classifyId=' + classifyId;
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
			//查找商品属性信息
			findgoodsprops: function(goodsId) {
				var defer = $q.defer();
				var url = baseUrl + '/findgoodsprops?goodsId=' + goodsId;
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
			//修改商品属性信息   保存
			editprops: function(res) {
				var defer = $q.defer();
				var url = baseUrl + '/editprops';
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
			},
			//根据ID检索属性信息
			prop: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/prop/' + id;
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
			//查找需要上传主图的规格信息
			findneedimagespecs: function(goodsId) {
				var defer = $q.defer();
				var url = baseUrl + '/findneedimagespecs?goodsId=' + goodsId;
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
			//上传货品主图
			updatemasterimage: function(specAttrId, imagePath,goodsId) {
				var defer = $q.defer();
				var url = baseUrl + '/updatemasterimage?specAttrId=' + specAttrId + '&imagePath=' + imagePath +'&goodsId=' + goodsId;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			},
			//查找所有的属性信息   获取属性列表
			proplist: function(attrType, parmValue) {
				var defer = $q.defer();
				var url = baseUrl + '/proplist';
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				});
				return defer.promise;
			}

		}
	});