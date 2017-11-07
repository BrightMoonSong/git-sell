/**
 * Excel初始化根据提供的表头，将不在表头中的数据删除
 * @param {Object} arry
 * @param {Object} headList
 */
function initExcelDataOnHead(arry, headList) {
	var arryHeadList = [];
	headList.forEach(function(val, index) {
		arryHeadList.push(val.code);
	})
	var arryDataList = [];
	arry.forEach(function(val, index) {
		var obj = {};
		for(var index in val) {
			if(arryHeadList.contains(index)) {
				obj[index] = val[index];
			}
		}
		arryDataList.push(obj);
	})
	return arryDataList;
}
/**
 * json转Excel
 * @param {Object} JSONData 数据
 * @param {Object} FileName Excel文件名字
 * @param {Object} ShowLabel 表头  (不传暂时，用key)
 */
function JSONToExcelConvertor(JSONData, FileName, ShowLabel) {
	//先转化json  
	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

	var excel = '<table>';

	//设置表头  
	var row = "<tr>";
	if(ShowLabel) {
		for(var i = 0, l = ShowLabel.length; i < l; i++) {
			if(ShowLabel[i].code == "myOperation") {
				continue;
			}
			row += "<td>" + ShowLabel[i].value + '</td>';
		}
		arrData = initExcelDataOnHead(arrData, ShowLabel);
	} else {
		for(var index in arrData[0]) {
			if(index == "$$hashKey") {
				continue;
			}
			if(index == "myOperation") {
				continue;
			}
			row += "<td>" + index + '</td>';
		}
	}

	//换行  
	excel += row + "</tr>";

	//设置数据  ---注意与表头对应数据
	for(var i = 0; i < arrData.length; i++) {
		var row = "<tr>";
	//	ShowLabel.forEach(function(val, num) {
		for(var j = 0; j < ShowLabel.length; j++) {
			if(ShowLabel[j].code == "myOperation") {
				continue;
			}
			for(var index in arrData[i]) {
				if(index == ShowLabel[j].code) {
					row += '<td>' + arrData[i][index] + '</td>';
				}
			}
		}
	//	})
		excel += row + "</tr>";
	}

	excel += "</table>";

	var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
	excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
	excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
	excelFile += '; charset=UTF-8">';
	excelFile += "<head>";
	excelFile += "<!--[if gte mso 9]>";
	excelFile += "<xml>";
	excelFile += "<x:ExcelWorkbook>";
	excelFile += "<x:ExcelWorksheets>";
	excelFile += "<x:ExcelWorksheet>";
	excelFile += "<x:Name>";
	excelFile += "{worksheet}";
	excelFile += "</x:Name>";
	excelFile += "<x:WorksheetOptions>";
	excelFile += "<x:DisplayGridlines/>";
	excelFile += "</x:WorksheetOptions>";
	excelFile += "</x:ExcelWorksheet>";
	excelFile += "</x:ExcelWorksheets>";
	excelFile += "</x:ExcelWorkbook>";
	excelFile += "</xml>";
	excelFile += "<![endif]-->";
	excelFile += "</head>";
	excelFile += "<body>";
	excelFile += excel;
	excelFile += "</body>";
	excelFile += "</html>";

	var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

	var link = document.createElement("a");
	link.href = uri;

	link.style = "visibility:hidden";
	if(FileName) {
		link.download = FileName + ".xls";
	} else {
		link.download = "excel_" + new Date().getTime() + ".xls";
	}

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}