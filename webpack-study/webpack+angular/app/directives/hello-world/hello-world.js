module.exports = function(ngModule) {
	ngModule.directive('helloWorld', helloWorldFn); //定义指令，对应页面中的<hello-world></hello-world>
	require('./hello-world.scss');

	function helloWorldFn() {
		return {
			restrict: 'E', //元素(element)
			scope: {},
			template: require('./hello-world.html'), //模板
			//templateUrl: 'directives/hello-world/hello-world.html',
			controllerAs: 'vm', // <=> $scope.vm = {greeting: '你好，我是卡哥'}
			controller: function() {
				var vm = this;
				vm.greeting = '你好，我是卡哥，很高兴见到你';
			}
		}
	}
}