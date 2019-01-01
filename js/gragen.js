// script
$(function(){
// init
	// singleton type square
	function Ts(){
	    var fonts = ['Sans-Serif'];
	    var timer;
	    var reload = false;
	    function activateTypeSquare(){
		$('#font_pool').empty();
		
		for(var i=0; i < fonts.length; i++){
		    console.log(fonts[i]);
		    if(fonts[i]=="Sans-Serif")continue;
		    $('#font_pool').append($('<div>').css('font-family',fonts[i][0]).text(fonts[i][1]))
			}
		if(timer)clearTimeout(timer);
		timer = setTimeout(function(){
			var o;
			var flag=true;
			for(var x in window){
			    if(x.indexOf("Ts_") == 0){
				o = eval(x);
				flag = false;
			    }
			}
			if(flag){
			    $('<script>').attr('src','http://typesquare.com/accessor/script/typesquare.js?7UD6477K1ek%3D')
			    .appendTo($(document.body));
			    setTimeout(function(){
				    for(var x in window){
					if(x.indexOf("Ts_") == 0){
					    o = eval(x);
					    flag = false;
					}
				    }
				    console.log(o);
				    o.ready();
				},100);
			}else{
			    o.ready();
			    console.log(fonts);
			}
		    },300);
	    }
	    function fontAdd(fn){
		if(fn.length==0)return;
		//if(fn instanceof Array)return;
		
		var flag = false;
		for(var i=0;i<fonts.length;i++){
		    if(fonts[i][0] == fn[0] && fonts[i][1] == fn[1])return;
		    if(fonts[i][0] == fn[0]){
			for(var j = 0; j < fn[1].length; j ++){
			    
			    if(fonts[i][1].indexOf(fn[1][j])==-1){
				console.log("add char" + fn[1][j]);
				fonts[i][1] += fn[1][j];
				flag = true;
			    }else{
				flag = true;
			    }
			}
		    }
		}
		if(!flag){
		    fonts.push(fn);
		}
		
	    }

	    var obj = {};
	    obj.activate = activateTypeSquare;
	    obj.fontAdd = fontAdd;
	    return obj;
	}
	var ts = Ts();
	
	setTimeout(function(){
		ts.fontAdd(['Shin Go Futoline','aabああ']);
		ts.fontAdd(['Shin Maru Go Emboss','いい']);
		ts.fontAdd(['Shin Go Futoline','cああbいvうえおa']);
		ts.activate();
	    },1000);




});
