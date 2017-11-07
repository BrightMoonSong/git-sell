function runCarLine(n) {
  if(window.clearTimeoutNum == 1){
    return '';
  }
  var point;
  if (n === 1) {
    point = attrlineAll[attrlineAll.length - 1];
    setCarPositionByPoint(point, 1);
  } else {
    if (attrlineAll.length == attrline.length) {
      $('#btn-start-play').html('重新播放');
      $('#btn-continue-play').hide();
      // 隐藏暂停播放
      $('#btn-pause-play').hide();
      // 播放完毕
      $('#btn-start-play-starts').show();
      $('#btn-start-play-starts').html('播放完毕');
      try {
        window.clearTimeout(idsetTimeout);
      } catch (e) {
        //TODO handle the exception
      }
      return;
    }
    if ($('#btn-start-play').html() == '开始播放') {
      point = attrlineAll[0];
      window.attrline.push(point);
      $('#btn-start-play').html('重新播放');
      $('#btn-continue-play').hide();
      setCarPositionByPoint(point);
      window.idsetTimeout = window.setTimeout(runCarLine, playbackSpeedNum);
    }
    if ($('#btn-start-play').html() == '重新播放') {
      point = attrlineAll[attrline.length];
      window.attrline.push(point);
      setCarPositionByPoint(point);
      window.idsetTimeout = window.setTimeout(runCarLine, playbackSpeedNum);
    }
  }
}
//开始播放
function startPlay() {
  window.clearTimeoutNum = 2;
  playbackSpeed();
  window.attrline = [];
  // 展示暂停播放
  $('#btn-pause-play').show();
  $('#btn-pause-play').css({"background-color":"#1c84c6","border-color": '#1c84c6'});
  $('#btn-pause-play').attr("disabled",false);
  // 播放中
  $('#btn-start-play-starts').show();
  $('#btn-start-play-starts').html('播放中...');
  if ($('#btn-start-play').html() == '重新播放') {
    $('#btn-continue-play').hide();
    try {
      window.clearTimeout(idsetTimeout);
    } catch (e) {
      //TODO handle the exception
    }
    runCarLine();
  } else {
    window.idsetTimeout = '';
    //轨迹
    runCarLine();
  }
}
//暂停播放
function pausePlay() {
  // 暂停中...
  $('#btn-start-play-starts').show();
  $('#btn-start-play-starts').html('暂停中...');
  $('#btn-continue-play').show();
  $('#btn-pause-play').css({"background-color":"#ccc","border-color": '#ccc'});
  $('#btn-pause-play').attr("disabled",true);
  try {
    window.clearTimeout(idsetTimeout);
    window.clearTimeoutNum = 1;
  } catch (e) {
    //TODO handle the exception
  }
}

//继续播放
function continuePlay() {
  // 播放中...
  $('#btn-start-play-starts').show();
  $('#btn-start-play-starts').html('播放中...');
  window.clearTimeoutNum = 2;
  $('#btn-pause-play').css({"background-color":"#1c84c6","border-color": '#1c84c6'});
  $('#btn-pause-play').attr("disabled",false);
  $('#btn-continue-play').hide();
  var idsetTimeout = window.setTimeout(runCarLine, playbackSpeedNum);
  window.idsetTimeout = idsetTimeout;
}
//根据坐标显示小车位置
function setCarPositionByPoint(p, n) {
  var zuobiao = p.split('|');
  $('#longitude').html(zuobiao[0]);
  $('#latitude').html(zuobiao[1]);
  var geoc = new BMap.Geocoder();

  var point = new BMap.Point(zuobiao[0], zuobiao[1]); //定义一个中心点坐标

  geoc.getLocation(point, function(rs) { //获取地址
    var addComp = rs.addressComponents;
    if (addComp.street && addComp.streetNumber) {
      $('#address').html(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
    } else if (addComp.street && !addComp.streetNumber) {
      $('#address').html(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street);
    }else if(!addComp.street && !addComp.streetNumber){
      $('#address').html(addComp.province + ", " + addComp.city + ", " + addComp.district);
    }else{
      $('#address').html(addComp.province + ", " + addComp.city);
    }
    //$('#address').html(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
  });

  map.centerAndZoom(point, 16); //设定地图的中心点和坐标并将地图显示在地图容器中
  //addMapControl(); //向地图添加控件
  if (n === 1) {
    addPolyline();
  }

  if (attrline.length > 0) {
    var po1 = attrline[attrline.length - 1].split('|');
    var myP1 = new BMap.Point(po1[0], po1[1]);
    var myIcon = new BMap.Icon("img/baiduSmallImg/car.png", new BMap.Size(52, 44), { //小车图片
      imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
    });
    try {
      if (window.carMk == '') {
        window.carMk = new BMap.Marker(myP1, {
          icon: myIcon
        });
        map.addOverlay(carMk);
      }
    } catch (e) {
      //TODO handle the exception
    }
    carMk.setPosition(myP1);
  }
}
