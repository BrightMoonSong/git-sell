//['明细', '药品', '保健品', '医疗器械', '其他']
var data = [{
		'id': '10001',
		'value': '明细'
	},
	{
		'id': '10002',
		'value': '药品'
	},
	{
		'id': '10003',
		'value': '保健品'
	},
	{
		'id': '10004',
		'value': '医疗器械'
	},
	{
		'id': '10005',
		'value': '其他'
	}
];

var showBankDom = document.querySelector('#showBank1');
var bankIdDom = document.querySelector('#bankId1');
showBankDom.addEventListener('click', function() {
	var bankId = showBankDom.dataset['id'];
	var bankName = showBankDom.dataset['value'];

	var bankSelect = new IosSelect(1, [data], {
		container: '.containerSubmitOrder',
		title: '发票内容',
		itemHeight: 50,
		itemShowCount: 3,
		oneLevelId: bankId,
		callback: function(selectOneObj) {
			bankIdDom.value = selectOneObj.id;
			showBankDom.innerHTML = selectOneObj.value;
			showBankDom.dataset['id'] = selectOneObj.id;
			showBankDom.dataset['value'] = selectOneObj.value;
		}
	});
});
//['个人', '单位']
var dataTitle = [{
		'id': '20001',
		'type': '1',
		'value': '个人'
	},
	{
		'id': '20002',
		'type': '2',
		'value': '单位'
	}
];
var showTitleTypeDom = document.querySelector('#titleType1');
var titleTypeIdDom = document.querySelector('#titleTypeId1');
showTitleTypeDom.addEventListener('click', function() {
	var bankId = showTitleTypeDom.dataset['id'];
	var bankName = showTitleTypeDom.dataset['value'];
	// document.getElementById("titleTypeId1").value = 1
	var bankSelect = new IosSelect(1, [dataTitle], {
		container: '.containerSubmitOrderTitle',
		title: '发票抬头',
		itemHeight: 50,
		itemShowCount: 3,
		oneLevelId: bankId,
		callback: function(selectOneObj) {	
			titleTypeIdDom.value = selectOneObj.type;
			showTitleTypeDom.innerHTML = selectOneObj.value;
			showTitleTypeDom.dataset['id'] = selectOneObj.id;
			showTitleTypeDom.dataset['value'] = selectOneObj.value;
			if(selectOneObj.value == "单位"){
				document.getElementById("bill_input").style.display=""; 
			}else{
				document.getElementById("bill_input").style.display="none"; 
			}
		}
	});
});