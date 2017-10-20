console.log('page1/1.js');
require("angular")
require("!style-loader!css-loader!../../css/style.css");

$("body").append("<div>hello world</div>");
var app = angular.module('myApp', []);
			app.controller('myctr', myctr)
				.directive('myModel', myModel);

			function myctr($scope) {
				$scope.$watch('firstVal', function(newVal, oldVal) {
					console.log(newVal, oldVal);
				},true);
				//监听键盘
				function keyUp(e) {
					var currKey = 0,
						e = e || event;
					currKey = e.keyCode || e.which || e.charCode;
					var keyName = String.fromCharCode(currKey);
					console.log("按键码: " + currKey + " 字符: " + keyName);
					//$scope.firstVal = currKey;
					$scope.$apply();
				}
				document.onkeyup = keyUp;
			}

			function myModel() {
				return {
					//链接函数
					//element-->jQ的对象;attr-->元素上属性的集合
					link: function(scope, element, attr) {
						//1，当input value发生变化的时候修改scope上对应的属性
						element.on('keyup', function() {
							console.log('1')
							scope[attr['myModel']] = element.val();
							//强行进行脏值检查
							scope.$apply();
						});
						//2，当模型变化时设置input  value值
						scope.$watch(attr['myModel'], function(newVal) {
							element.val(newVal);
						});
					}
				};
			}
