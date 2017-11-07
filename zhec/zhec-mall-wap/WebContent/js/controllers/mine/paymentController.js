//退货原因
var payment = [{
	id: 1,
	value: "微信"
}, {
	id: 2,
	value: "支付宝"
}, {
	id: 3,
	value: "白条"
}]

var showBankDom = document.querySelector('#payment-id');
var bankIdDom = document.querySelector('#payment-id');
showBankDom.addEventListener('click', function() {
	var bankId = showBankDom.dataset['id'];
	var bankName = showBankDom.dataset['value'];

	var bankSelect = new IosSelect(1, [payment], {
		container: '.containerSubmitOrder',
		title: '支付方式',
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
