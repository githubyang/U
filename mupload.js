/*------------------------------
 * js图片压缩上传
 * 依赖jpeg_encoder_basic.js(图片转换编码脚本,老外写的)
 * 2015.3.18 yang
 *-----------------------------*/
var U=(function(win){
  var URL=win.URL||win.webkitURL,
      userAgent=navigator.userAgent,
      config={
        w:400,
        quality:7,
        h:'',
        url:'/',
        async:true
      },
      callback,
      resize=function(img){
        var w=config.w,
            h=config.h,
            width=img.width,
            height=img.height,
            scale=width/height;
        if(w&&h){
          width=w;
          height=h;
        }else if(w){
          width=w;
          height=Math.ceil(w/scale);
        }else if(h){
          height=h;
          width=Math.ceil(w*scale);
        }
        return [width,height];
      },
      createBase64=function(file,fn){
        var src=URL.createObjectURL(file),
            IMG=new Image();
        console.log(src);
        IMG.src=src;
        IMG.onload=function(){
          var resizeArr=resize(this),
              canvas=document.createElement('canvas'),
              w=resizeArr[0],
              h=resizeArr[1],
              ctx=canvas.getContext('2d');
          canvas.width=w,
          canvas.height=h;
          ctx.drawImage(IMG,0,0,w,h);
          (/Android/i.test(userAgent))?(
            encode=new JPEGEncoder(),
            base64=encode.encode(ctx.getImageData(0,0,w,h),config.quality*100)
          ):(
            base64=canvas.toDataURL('image/jpeg',config.quality)
          );
          fn.call({base64:base64,w:w,h:h},callback);
          IMG=null;
        };
      };
  return {
    init:function(option){
      for(var i in option){
        config[i]=option[i];
      }
    },
    upload:function(file,fn){
      callback=fn;
      createBase64(file,function(fn){
        var obj=this,
            xhr=new XMLHttpRequest(),
            data='base64='+obj.base64+'&'+'len='+obj.base64.length,
            result;
        xhr.open('POST',config.url,config.async);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
        xhr.onreadystatechange=function(){
          (xhr.readyState===4&&xhr.status===200)&&(
            result=(new Function('return'+xhr.response))(),
            fn.call(result)
          );
        };
        xhr.send(data);
      });
    }
  };
}(window));
