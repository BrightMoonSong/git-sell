function logicalProcesses($scope,$filter,objData,myTableId) {
	var table = {
		init: function() { //初始化
			$scope.headList = objData.headList;
			$scope.tableData = objData.tableData;
			$scope.sortData = objData.sortData;
			$scope.filterInput = {};
			$scope.stretch = this.stretch;
			$scope.onDropComplete = this.onDropComplete;
			$scope.filtrate = this.filtrate;
			$scope.sort = this.sort;
		},
		onDropComplete: function(index, obj, evt) { //拖拽排序方法
			var otherObj = $scope.headList[index];
			var otherIndex = $scope.headList.indexOf(obj);
			$scope.headList.splice(otherIndex, 1);
			$scope.headList.splice(index, 0, obj);
		},
		filtrate: function(value, code) { //列过滤方法
			$scope.tableData = objData.tableData;
			for(var index in $scope.tableData[0]) {
				console.log(index)
				if(code == index) {
					var str = '{"' + code + '":"' + value + '"}';
					$scope.tableData = $filter('filter')($scope.tableData, JSON.parse(str));
				}
			}
		},
		sort: function(row) { //列排序方法
			var sort = $scope.sortData[row];
			var val = sort + row;
			$scope.tableData = $filter('orderBy')($scope.tableData, val);
			if(sort == "+") {
				$scope.sortData[row] = "-"
			} else {
				$scope.sortData[row] = "+"
			}
		},
		stretch: function() { //列宽度调整方法
			var myTAbId = document.getElementById(myTableId);
			var tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题   
			var wData = {};
			var unset = myTAbId.rows[0].cells.length - $scope.headList.length; //不在headList遍历的列数
			for(var j = 0; j < myTAbId.rows[0].cells.length; j++) {
				myTAbId.rows[0].cells[j].index = j;
				if(unset - 1 < j) {
					myTAbId.rows[0].cells[j].onmousedown = function(event) {
						//记录单元格    
						tTD = this;
						if(event.offsetX > tTD.offsetWidth - 10) {
							tTD.mouseDown = true;
							tTD.oldX = event.clientX;
							tTD.oldWidth = tTD.offsetWidth;
						}
					};
					myTAbId.rows[0].cells[j].onmouseup = function(event) {
						//结束宽度调整   
						if(tTD == undefined) tTD = this;
						tTD.mouseDown = false;
						tTD.style.cursor = 'default';
						$scope.headList[this.index - unset].width = tTD.width;
					};
					myTAbId.rows[0].cells[j].onmousemove = function(event) {
						//更改鼠标样式   
						if(event.offsetX > this.offsetWidth - 10)
							this.style.cursor = 'col-resize';
						else
							this.style.cursor = 'default';
						//取出暂存的Table Cell   
						if(tTD == undefined) tTD = this;
						//调整宽度   
						if(tTD.mouseDown != null && tTD.mouseDown == true) {

							tTD.style.cursor = 'default';
							if(tTD.oldWidth + (event.clientX - tTD.oldX) > 0)
								tTD.width = tTD.oldWidth + (event.clientX - tTD.oldX);
							//调整列宽   
							// tTD.style.width = tTD.width;   
							tTD.style.cursor = 'col-resize';
							//调整该列中的每个Cell   
							myTAbId = tTD;
							while(myTAbId.tagName != 'TABLE') myTAbId = myTAbId.parentElement;
							for(var k = 0; k < myTAbId.rows.length; k++) {
								myTAbId.rows[k].cells[tTD.cellIndex].width = tTD.width;
							}
						}
					};
				}
			}
		}
	}
	table.init();
}