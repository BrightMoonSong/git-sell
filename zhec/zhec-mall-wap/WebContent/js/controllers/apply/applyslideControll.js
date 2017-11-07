//退货原因
var applyShowth= [{
			id: 1,
			value: "收到商品破损"
		}, {
			id: 2,
			value: "商品需要维修"
		}, {
			id: 3,
			value: "商品错发/漏发"
		}, {
			id: 4,
			value: "未按约定时间发货"
		}, {
			id: 5,
			value: "七天无理由退货"
		}, {
			id: 6,
			value: "商品质量问题"
		}, {
			id: 7,
			value: "收到商品与描述不符"
		}, {
			id: 8,
			value: "退运费"
		}, {
			id: 9,
			value: "发票问题"
		}, {
			id: 10,
			value: "其他"
		}]

var showBankDom = document.querySelector('#apply-show-th');
var bankIdDom = document.querySelector('#apply-show-yc');
showBankDom.addEventListener('click', function() {
	var bankId = showBankDom.dataset['id'];
	var bankName = showBankDom.dataset['value'];

	var bankSelect = new IosSelect(1, [applyShowth], {
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
