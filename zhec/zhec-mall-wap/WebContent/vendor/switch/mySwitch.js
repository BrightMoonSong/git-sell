
/**
 * 滑动开关
 */
var switches = {};
var switchConfig = {
	'demo-default-1': {},
	'demo-size-1': {
		size: 'small'
	},
	'demo-size-2': {
		size: 'default'
	},
	'demo-size-3': {
		size: 'large'
	},
	'demo-checked-1': {
		checked: false
	},
	'demo-checked-2': {
		checked: true
	},
	'demo-text-1': {
		showText: true,
		onText: 'O',
		offText: 'X'
	},
	'demo-color-1': {
		onSwitchColor: '#34B363',
		offSwitchColor: '#D6B3A3',
		onJackColor: '#1453B3',
		offJackColor: '#A4B363'
	},
	'demo-disabled-1': {
		checked: true,
		disabled: true
	},
	'demo-api-1': {},
	'demo-destroy-1': {},
	'demo-remove-1': {}
};

Object.keys(switchConfig).forEach(function(key) {
	switches[key] = new Switch(document.querySelector('.' + key), switchConfig[key]);
});

/*function switchHandle(key, event) {
	switches[key][event]();
}
hljs.initHighlightingOnLoad();*/