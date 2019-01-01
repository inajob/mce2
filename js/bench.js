
$(function(){
        var canv = $('#canv');
	var start = new Date();
	var ctx = canv[0].getContext("2d"); 

        var fonts = new Fonts();
        
        var r = new Renderer(ctx, fonts, parseInt(canv[0].width));
        var p = new SimpleParser();
// === Prelude ===
        var prelude = (function () {/*
!sqrt = \(n){
  eval("Math","sqrt",n)
};
!sin = \(n){
  eval("Math","sin",n)
};
!cos = \(n){
  eval("Math","cos",n)
};
!floor = \(n){
  eval("Math","floor",n)
};

!save = \(){
  write("save");
  evalAllExtArgs();
  write("restore");
};
!lw = \(size){
  save(){
    write("lw " + size);
    evalAllExtArgs();
  };
};
!fs = \(c){
  save(){
    write("fs " + c);
    evalAllExtArgs();
  };
};
!ss = \(c){
  save(){
    write("ss " + c);
    evalAllExtArgs();
  };
};
!col = \(c){
  save(){
    write("ss " + c);
    write("fs " + c);
    evalAllExtArgs();
  };
};
!ssfs = \(c1,c2){
  save(){
    write("ss " + c1);
    write("fs " + c2);
    evalAllExtArgs();
  };
};
!rotate = \(t){
  save(){
    write("rotate " + t);
    evalAllExtArgs();
  };
};
!scale = \(w,h){
  if(not(h)){
    !h = w;
  };
  save(){
    write("scale " + w + " " + h);
    evalAllExtArgs();
  };
};
!shift = \(x,y){
  save(){
    write("shift " + x + " " + y);
    evalAllExtArgs();
  };
};
!outerFig = 1;
!fig = \(closed){
  write("beginPath");
  !outerFig = 0;
  evalAllExtArgs();
  !outerFig = 1;
  if(closed){
    write("closePath");
  };
  write("fill");
  write("stroke");
};
!clip = \(closed){
  write("beginPath");
  !outerFig = 0;
  evalAllExtArgs();
  !outerFig = 1;
  if(closed){
    write("closePath");
  };
  write("clip");
};

!autoFig = \(){
  if(outerFig){
    write("beginPath");
  };
  evalAllExtArgs();
  if(outerFig){
    write("closePath");
    write("fill");
    write("stroke");
  };
}
!rect = \(){
  autoFig(){
    write("moveTo -0.5 -0.5");
    write("lineTo 0.5 -0.5");
    write("lineTo 0.5 0.5");
    write("lineTo -0.5 0.5");
  };
};
!rrect = \(){
  autoFig(){
    write("moveTo -0.5 -0.5");
    write("lineTo -0.5 0.5");
    write("lineTo 0.5 0.5");
    write("lineTo 0.5 -0.5");
  };
};

!xy0 = \(x,y){
  write("moveTo " + x + " " + y);
}
!xy = \(x,y){
  write("lineTo " + x + " " + y);
}
!grid = \(xx,yy){
  !aa = 0;
  !bb = 0;
  loop(xx){
    !bb = 0;
    !aa = aa + 1;
    loop(yy){
      !bb = bb + 1;
      shift(aa - xx/2 - 0.5 ,bb - yy/2 - 0.5){
        evalAllExtArgs();
      }
    }
  }
};
!text = \(s){
  scale(0.1){
    write("fillText " + s);
    write("strokeText " + s);
  }
}
!fillText = \(s){
  write("fillText " + s);
}
!strokeText = \(s){
  write("strokeText " + s);
}
!rgb = \(r,g,b){"rgb(" + r + "," + g + "," + b + ")"};
!rgba = \(rr,gg,bb,aa){"rgba(" + rr + "," + gg + "," + bb + "," + aa + ")"};

!poly = \(n, p){
 !polya = 0;
 fig(1){
  loop(n){
   !polya = polya + 1;
   rotate((polya*p)/n * 2){
    write("lineTo 0 0.5");
   }
  }
 }
};

!font = \(name){
  save(){
    write("font " + name);
    evalAllExtArgs();
  }
}
!circle = \(){
 !polya = 0;
 !n = 8;
 !r2 = 0.5/cos(3.1415/n);
 autoFig(){
  write('moveTo 0.5 0')
  loop(n){
   !x1 = 0.5 * cos(3.1415 * 2 * (polya+1) / n);
   !y1 = 0.5 * sin(3.1415 * 2 * (polya+1) / n);
   !x2 = r2 * cos(3.1415 * 2 * polya / n + 3.1415 / n);
   !y2 = r2 * sin(3.1415 * 2 * polya / n + 3.1415 / n);
 
   write("quadTo " + x2 + " " + y2 + " " + x1 + " " + y1);
   !polya = polya + 1;
  }
 }
}

!rcircle = \(){
 !polya = 0;
 !n = 8;
 !r2 = 0.5/cos(3.1415/n);
 autoFig(){
  write('moveTo 0.5 0')
  loop(n){
   !x1 = 0.5 * cos(3.1415 * 2 * (n-polya-1) / n);
   !y1 = 0.5 * sin(3.1415 * 2 * (n-polya-1) / n);
   !x2 = r2 * cos(3.1415 * 2 * (n-polya) / n - 3.1415 / n);
   !y2 = r2 * sin(3.1415 * 2 * (n-polya) / n - 3.1415 / n);
 
   write("quadTo " + x2 + " " + y2 + " " + x1 + " " + y1);
   !polya = polya + 1;
  }
 }
}


                                    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
        var gCanvasSize = 400;
        function resize(width){
            var ew = 400;
            var cw = width - ew - 40;
            $('#edit').width(ew);

            $('#stage').width(cw);
            $('#stage').height(cw);

            $('#canv').width(cw);
            $('#canv').height(cw);

            $('#canv').attr('width',cw);
            $('#canv').attr('height',cw);

            gCanvasSize = cw;
        }
        var width = $(document).width();
        resize(width);

        var worker = null;
	var t = 0;

        var inputs = {};
	var externalVar = {};
	var externalVarFlag = false;
        function mkInputs(externalVar){
	  if(externalVarFlag == false)return;
          externalVarFlag = false;
	  $('#labels').empty();
	  inputs = {};
	  var elm;
	  for(var k in externalVar){
	    elm = $('<div>'); 
            elm.append($('<span>').text(externalVar[k].label));
            elm.append(inputs[k] = $('<input>').keyup(function(){
	      draw();
	    }));
	    elm.appendTo($('#labels'));
	  }
	}

	function getInputs(){
	  var ret = {};
	  for(var k in inputs){
            ret[k] = inputs[k].val();
	  }
	  return ret;
	}

        // キーアップで処理起動
        function draw(f){
	    //if(worker)worker.terminate();
            // ワーカー起動
	    if(worker == null){
              worker = new Worker('js/worker.js');
	    }
            var s = $('#text').val();
	    var externalVars = getInputs();
            //処理起動
            worker.postMessage({prelude:prelude, s:s, vars:{t:t}, externalVars: externalVars});
            var t2 = new Date();
            worker.onmessage = function(event){
                // 処理終了
                var sout = event.data.renderProgram;
		// 比較
		var flag = false;
                for(var x in event.data.externalVar){
		  if(!externalVar[x] || !event.data.externalVar[x] || externalVar[x].label != event.data.externalVar[x].label){
		  //console.log(externalVar[x],event.data.externalVar[x]);
		    flag = true;
		    break;
		  }
		}
		if(flag){
		  // global
		  console.log("externalVar");
                  externalVar = event.data.externalVar;
		  externalVarFlag = true;
		}

                var t3 = new Date();
                var out = p.parse(sout);
                var t4 = new Date();
                r.render(out, gCanvasSize);
                var t5 = new Date();
                var debug = "debug\n";
                //debug += 't2-t1:' + (t2.getTime() - t1.getTime()) + "\n";
                debug += 't3-t2:' + (t3.getTime() - t2.getTime()) + "\n";
                debug += 't4-t3:' + (t4.getTime() - t3.getTime()) + "\n";
                debug += 't5-t4:' + (t5.getTime() - t4.getTime()) + "\n";
                $('#debug').text(debug);
                //worker.terminate();
                //worker = null;
		if(f)f();
            };
	}
        $('#text').keyup(function(){
	    if(playFlag == false){
	      t = 0;
	      draw(function(){
	        mkInputs(externalVar);
	      });
	    }
        });

        var playFlag = false;
	var timer = null;
        
	function animationFrame(){
	  draw(function(){
	    t ++;
	    if(playFlag){
	      setTimeout(animationFrame,30);
	    }
	  });
	}

	function changeTab(n){
          $('#text-div').hide();
          $('#labels').hide();
          switch(n){
	    case 0:
              $('#text-div').show();
	      break;
            case 1:
              $('#labels').show();
	      break;
            default:
	      throw "error change tab";
	  }
	}
	changeTab(1);

	$('#variables-btn').click(function(){
	  changeTab(1);
	});
	$('#source-btn').click(function(){
	  changeTab(0);
	});


        // アニメーション再生
	$('#playbtn').click(function(){
	    t = 0;
	    if(playFlag == false){
              playFlag = true;
	      animationFrame();
	    }else{
              playFlag = false;
	    }
	});

});
