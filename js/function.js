/*
    getClass(className)  获取类名
    className   指定的类名
*/


function getClass(className,range){
	var range=range?range:document;
	if(range.getElementsByClasssName){
		return  range.getElementsByClassName(className);
	}else{
		var all=range.getElementsByTagName("*");
		var newarr=[];
		for(var i=0;i<all.length;i++){
			if(checkClass(all[i],className)){
				newarr.push(all[i])
			}
		}
		return newarr;
	}
}

/*
      checkClass(obj,classname)
      obj  当前元素
      classname  指定的classname
*/
function checkClass(obj,classname){
	var arrC=obj.className.split(" ");
	for(var i=0;i<arrC.length;i++){
		if(arrC[i]==classname){
			return true
			}
	}
	return false;

}

/*
    获取元素文本
    getConent (obj,[val])
    obj 对象
    [val]  内容
*/

function getContent(obj,val){
	if(obj.textContent){
		if(val==undefined){
			return obj.textContent
		}else{
			obj.textContent=val;
		}
	}else{
		if(val==undefined){
			return obj.innerText;
		}else{
			obj.innerText=val;
		}
	}
}

/*
   getStyle(obj,a)  获取样式
   obj  指定的对象
   a     属性
   属性不能用.，要用[],因为如果用.，系统会默认为它自身的属性，
*/
function getStyle(obj,a){
	if(obj.currentStyle){
     return obj.currentStyle[a];
	}else{
		return getComputedStyle(obj,null)[a];
	}
}

/*
   $(#one/.one/div/<div>)
   selecter   参数
*/
function $(selecter,ranges){
  //判断字符串还是函数
  if(typeof selecter=="string"){
	//selecter是个字符串，检查字符串的第一个字符
	//返回在指定位置的字符 （charAt(位置)）
	//定义一个变量first等于字符串的第一个字符
	var ranges=ranges?ranges:document;
	var first=selecter.charAt(0);
	//判断第一个字符
	if(first=="."){
		//引用前面封装好的getClass(className)函数
		//.one 截取.后的字符（substring(start,end)）
		return getClass(selecter.substring(1),ranges);
	}else if(first=="#"){
		return document.getElementById(selecter.substring(1));
		//正则
	}else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
		return ranges.getElementsByTagName(selecter)
	}else if(/^<[a-z][a-z1-6]{0,10}>$/.test(selecter)){   /*判断第一个字符是否是div标签*/
    return document.createElement(selecter.slice(1,-1))
	}
 }else if(typeof selecter=="function"){
  addEvent(window,"load",selecter);
 }
}
                 /*var a=$(".two");    {范围}
                 console.log(a.length)
                   如果是id则为
                   var a=$(".two");
                   console.log(a)
                 */



      // 获取对象的元素节点
      // getChilds( obj,type)
      // obj  父元素
      // type   true  获取元素里面的元素节点和有意义的文本
      //        false  只获取元素里面的元素节点
function getChilds(obj,type){
  var type=type?type:false
  var childs=obj.childNodes;
  var temp=[];
  if (type===false){
  	for (var i = 0; i < childs.length; i++){
  		if(childs[i].nodeType==1){  /*判断节点的数值为1 即为元素节点*/
  			temp.push(childs[i]);
  	    }
    }
  }else if(type===true){
     for (var i = 0; i < childs.length; i++) {
       if(childs[i].nodeType==1||(childs[i].nodeType==3 && !(/^\s+$/.test(childs[i].nodeValue)))){
     	  temp.push(childs[i])
       }
     }
  }return temp;
}
	

 // 获得第一个子节点

 function getFirst(obj){
 	return getChilds(obj)[0];

 }
 // 获得最后一个子节点

function  getLast(obj){

  return getChilds(obj)[getChilds[obj].length-1]
}

function getNum(obj,num){
  return getChilds(obj)[num];
}

    // getNext(obj,type)
    // type  true  识别有意义的文本
    //       false  忽略文本
  
function getNext(obj,type){
	var type=type?type:false;
    var next=obj.childNodes;
    if(type===false){
    	if(!next){
    		return false;
    	}
    	while(next.nodeType==3||next.nodeType==8){    /*文本节点 和注释节点*/
    		next=next.nextSibling;
    		if(!next){
    		return false;
    	   }
    	}
    }else if(type===true){
    	if(!next){
    		return false;
    	}
    	while((next.nodeType==3&&/^\s+$/.text(next.nodeValue))||next.nodeType==8){
    		next=next.nextSibling;
    		if(!next){
    		return false;
    	    }
    	}
    }
    return next;
} 
    // insertAfter(obj,next,type)
    // obj 要插入的元素
    // next 要插入的位置
    // type  true  识别有意义的文本
    //      false  忽略文本

function insertAfter(obj,next,type){
	var type=type?type:false;
	var pos=getNext(next,type);
	var parent=next.parentNode;
	if(!pos){      /*判断下一个元素*/
		parent.appendChild(obj);
	}else{
		parent.insertBefore(obj,pos);
	}
}


/*inner  插入之前的节点 
div    要插入的元素*/

// function insertAfter(inner,div){
// 	var a=inner.parentNode;
// 	var childs=getChilds(a);
// 	for(var i=0;i<childs.length;i++){
// 		if(childs[i]==inner){
// 			var index=i;
// 			break;
// 		}
// 	}
// 	var after=childs[index+1];
// 	out.insertBefore(div,after)
// }


// 添加事件
// addEvent(obj,type,fn)
// obj 对象
// type 事件的类型
// fn 函数体
function addEvent(obj,type,fn){
  if(obj.addEventListener){
   obj.addEventListener(type,fn,false)
  }else if(obj.attachEvent){
    obj.attachEvent("on"+type,fn)
  }
}

function removeEvent(obj,type,fn){
  if(obj.addEventListener){
   obj.removeEventListener(type,fn,false)
  }else if(obj.attachEvent){
    obj.detachEvent("on"+type,fn)
  }
}