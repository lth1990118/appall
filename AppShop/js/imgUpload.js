mui('#picture').on('tap', '.mui-popover-action li>a', function() {
	var a = this,
		parent;
	//根据点击按钮，反推当前是哪个actionsheet
	for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
		if (parent.classList.contains('mui-popover-action')) {
			break;
		}
	}
	//关闭actionsheet
	mui('#' + parent.id).popover('toggle');
	//拍照选择头像
	if (a.getAttribute('tag') == "camera") {
		getCameraPic();
// 		var cmr = plus.camera.getCamera();
// 		cmr.captureImage(function(path) {
// 			mui.toast('保存照片到系统相册：');
// 			plus.gallery.save(path, function() {
// 				mui.toast('保存成功:' + path);
// 			}, function(e) {
// 				mui.toast('保存失败: ' + JSON.stringify(e));
// 			});
// 		}, function(e) {
// 			mui.toast('取消拍照');
// 		}, {
// 			filename: '_doc/gallery/',
// 			index: 1
// 		});
	}
	//从相册中选择头像
	else if (a.getAttribute('tag') == "picture") {
		getLocalPic();
// 		plus.gallery.pick(function(e) {
// 			for (var i in e.files) {
// 				mui.toast(e.files[i]);
// 			}
// 		}, function(e) {
// 			mui.toast('取消选择图片');
// 		}, {
// 			filter: 'image',
// 			multiple: true,
// 			maximum: 1,
// 			system: false,
// 			onmaxed: function() {
// 				plus.nativeUI.alert('只能选择1张图片');
// 			}
// 		});
	}
});
function getCameraPic(){
	var mobileCamera=plus.camera.getCamera(); 
            mobileCamera.captureImage(function(e){ 
                plus.io.resolveLocalFileSystemURL(e,function(entry){ 
                    var path=entry.toLocalURL()+'?version='+new Date().getTime(); 
                    uploadHeadImg(path); 
                    console.log(path); 
                },function(err){ 
                    console.log("读取拍照文件错误"); 
                }); 
            },function(e){ 
                console.log("er",err); 
            },function(){ 
                filename:'_doc/head.png'; 
            }); 
}
function getLocalPic(){
	plus.gallery.pick(function(a) {  
                plus.io.resolveLocalFileSystemURL(a, function(entry) {  
                    plus.io.resolveLocalFileSystemURL("_doc/", function(root) {  
                        root.getFile("head.png", {}, function(file) {  
                            //文件已存在  
                            file.remove(function() {  
                                console.log("file remove success");  
                                entry.copyTo(root, 'head.png', function(e) {  
                                        var e = e.fullPath + "?version=" + new Date().getTime();  
                                        uploadHeadImg(e); /*上传图片*/  
                                        //变更大图预览的src  
                                        //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现  
                                    },  
                                    function(e) {  
                                        console.log('copy image fail:' + e.message);  
                                    });  
                            }, function() {  
                                console.log("delete image fail:" + e.message);  
                            });  
                        }, function() {  
                            //文件不存在  
                            entry.copyTo(root, 'head.png', function(e) {  
                                    var path = e.fullPath + "?version=" + new Date().getTime();  
                                    uploadHeadImg(path); /*上传图片*/  
                                },  
                                function(e) {  
                                    console.log('copy image fail:' + e.message);  
                                });  
                        });  
                    }, function(e) {  
                        console.log("get _www folder fail");  
                    })  
                }, function(e) {  
                    console.log("读取拍照文件错误：" + e.message);  
                });  
            }, function(a) {}, {  
                filter: "image"  
            });  
}

    //上传图片 
        function uploadHeadImg(imgPath){ 
            //选中图片之后，头像当前的照片变为选择的照片 
            var mainImg=document.getElementById('head-img'); 
            mainImg.src=imgPath; 
            console.log(mainImg.src);
            var images=new Image(); 
            images.src=imgPath; 
            var imgData=getBase64Image(images); 
            mui.ajax(config.urlPic,{  //第一个参数是接口名 
                data:{ 
                    'imgDatas':imgData 
                }, 
                dataType:'json',//服务器返回json格式数据 
                type:'post',//HTTP请求类型 
                timeout:10000,//超时时间设置为10秒； 
                success:function(data){ 
                    if(data.status=='1'){ 
                        mui.alert('上传成功！'); 
                    } 
                }, 
                error:function(xhr,type,errorThrown){                    
                    mui.toast('服务器异常');                     
                } 
            }); 
        }
		 //压缩图片转成base64 
        function getBase64Image(img){ 
           var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
            var dataURL = canvas.toDataURL("image/" + ext);
            return dataURL;
        }

