var wgtVer = null;

function plusReady() { // 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		wgtVer = inf.version;
		console.log(wgtVer);
	});
}
//休眠方法
var ver;

function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

mui.plusReady(function() {
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		var ver = inf.version;
		console.log(ver);
		//             var url= severUlr+'version/gainApkVersion';
		//             var client;
		var ua = navigator.userAgent.toLowerCase();
		if (/iphone|ipad|ipod/.test(ua)) { //苹果手机            
			$.ajax({
				type: "get",
				dataType: 'json',
				url: "https://itunes.apple.com/lookup?id=111030274", //获取当前上架APPStore版本信息
				data: {
					id: 111030274 //APP唯一标识ID
				},
				contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
				success: function(data) {
					console.log("jsjsjsjs" + json2string(data));
					$.each(data, function(i, norms) {
						$.each(norms, function(key, value) {
							$.each(value, function(j, normItem) {
								if (j == "version") {
									if (normItem > ver) {
										alert("发现新版本:V" + normItem);
										document.location.href = 'https://itunes.apple.com/cn/app/san-gu-hui/id111030274?mt=8'; //上新APPStore下载地址
									}
								}
							});
						});
					});
					return;
				}
			});
		} else if (/android/.test(ua)) {
			console.log("android install");
			//plus.runtime.install('http://192.168.0.103/source/H5E99AC74_0427205805.apk')
			
			var data = {
				"ReqKey": "basoft_ws",
				"ReqPwd": "basoft_wspwd",
				"ReqSys": config.reqSys,
				"ReqType": "GetLastVersion",
				"ReqData": null
			};
			var jq = jQuery.noConflict();
			jq.ajax({
				async: true, //表示请求是否异步处理
				timeout: 50000,
				type: "post", //请求类型
				url: config.url, //请求的 URL地址
				data: JSON.stringify(data),
				contentType: "application/json",
				dataType: "json", //返回的数据类型
				success: function(data) {
					if (data.RetFlag < 0) {
						mui.toast(data.RetInfo);
					} else {
						var option = data.RetData[0];
						var version=option.version;
						var pathApk=option.path;
						if(ver<version){
							mui("#popover").popover("toggle");
							var dtask = plus.downloader.createDownload(pathApk, {}, function(
								d, status) {
								console.log("install task");
								console.log(status);
								if (status == 200) {
									plus.nativeUI.toast("正在准备环境，请稍后！");
									sleep(1000);
									var path = d.filename; //下载apk
									plus.runtime.install(path); // 自动安装apk文件
								} else {
									alert('版本更新失败:' + status);
								}
							});
							dtask.start();
						}
					}
				},
				error: function(data) {
					console.log(JSON.stringify(data));
				}
			});
		}
	});

});
