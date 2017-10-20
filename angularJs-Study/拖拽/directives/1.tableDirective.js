//封装类似于ng-model的指令
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
app.directive('myModel', myModel);