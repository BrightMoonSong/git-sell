function submitorderIosSelectContent(data) { //发票内容
	//['明细', '药品', '保健品', '医疗器械', '其他']
	var showBankDom = document.querySelector('#showBank');
	var bankIdDom = document.querySelector('#bankId');
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
}

function submitorderIosSelectTitle(data) { //发票内容
	//['个人', '单位']
	var showTitleTypeDom = document.querySelector('#titleType');
	var titleTypeIdDom = document.querySelector('#titleTypeId');
	showTitleTypeDom.addEventListener('click', function() {
		var bankId = showTitleTypeDom.dataset['id'];
		var bankName = showTitleTypeDom.dataset['value'];

		var bankSelect = new IosSelect(1, [data], {
			container: '.containerSubmitOrderTitle',
			title: '发票抬头',
			itemHeight: 50,
			itemShowCount: 3,
			oneLevelId: bankId,
			callback: function(selectOneObj) {
				titleTypeIdDom.value = selectOneObj.id;
				showTitleTypeDom.innerHTML = selectOneObj.value;
				showTitleTypeDom.dataset['id'] = selectOneObj.id;
				showTitleTypeDom.dataset['value'] = selectOneObj.value;
				if(selectOneObj.value == "单位") {
					document.getElementById("bill_input").style.display = "";
				} else {
					document.getElementById("bill_input").style.display = "none";
				}
			}
		});
	});
}