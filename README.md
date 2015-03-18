# U
前端图片本地压缩上传
依赖[jpeg_encoder_basic.js](https://github.com/owencm/javascript-jpeg-encoder/blob/master/jpeg_encoder_basic.js)(图片转换编码脚本)

# API

```javascrippt
// 初始化上传
U.init({
	w:400,//图片压缩的宽 默认为400
	quality:7,//图片压缩的精度 默认为7 1-10可选
	h:'',//图片压缩的高 默认为空 如果缺省 图片压缩将以宽为基准进行等比压缩
	url:'./upload.php',//上传的路径 默认为当前目录
	async:true//图片上传时是否异步 默认为异步
});

// 调用上传的方法进行上传
U.upload(file,function(){
	console.log(this);// this为后台返回的数据
});

// 使用
;(function(){
  var elem=document.querySelector('input');// 选择上传按钮
  // 按钮事件
  elem.onchange=function(){
  	// 初始化上传 指定上传地址其余的参数使用默认
  	U.init({
    	url:'/m/mupload/upload.php'
  	});
  	U.upload(this.files[0],function(){
  		// 图片上传回调函数
  		console.log(this);//this是后台返回来的数据
  	});
  }
```