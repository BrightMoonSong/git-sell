//['明细', '药品', '保健品', '医疗器械', '其他']
function returncomp(data) {
	for(var i=0;i<data.length;i++){
		data[i].value = data[i].name;
	}
	var datacompany = data;
	var showBankDom = document.querySelector('#showctract');
	var bankIdDom = document.querySelector('#showctractId');
	showBankDom.addEventListener('click', function() {
		var showctractId = showBankDom.dataset['id'];
		var showctractName = showBankDom.dataset['value'];

		var bankSelect = new IosSelect(1, [datacompany], {
			container: '.returncompany',
			title: '物流公司',
			itemHeight: 50,
			itemShowCount: 3,
			oneLevelId: showctractId,
			callback: function(selectOneObj) {
				bankIdDom.value = selectOneObj.id;
				showBankDom.innerHTML = selectOneObj.name;
				showBankDom.dataset['id'] = selectOneObj.id;
				showBankDom.dataset['value'] = selectOneObj.name;
			}
		});
	});
}