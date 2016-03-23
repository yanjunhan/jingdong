window.onload=function(){
	var win=$(".banner1")[0];
	var imgs=$("a",win);
	var lis=$("li",win);
	var num=0;
	 
  	var t=setInterval(move,1500);
	// 改变当前下标	
	win.onmouseover=function(){
		clearInterval(t);
	}
	win.onmouseout=function(){
		clearInterval(t);
		t=setInterval(move,1500);
	}
  function move(){
		num++;
		if(num==imgs.length){
			num=0;
		}
		// 所有的层级降低
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.zIndex=0;
			lis[i].className="";
			// lis[i].style.background="#fff";
		}/*当前的层级调高*/
		imgs[num].style.zIndex=3;
		lis[num].className="hot";
       // lis[i].style.background="red";
	}
	for(var i=0;i<imgs.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			num=this.index;
			for(var j=0;j<imgs.length;j++){
				imgs[j].style.zIndex=0;
				lis[j].className="";
			}
			imgs[this.index].style.zIndex=3;
			lis[this.index].className="hot";
			

		}
	}
            /*for(var i=0;i<imgs.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            num=this.index;
            for(var i=0;i<imgs.length;i++){
                imgs[i].style.zIndex=0;
                lis[i].className="";
            }
            imgs[this.index].style.zIndex=3;
            lis[this.index].className="hot";

        }
    }*/
  

}

