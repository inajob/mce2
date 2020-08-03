$(function(){
  // レイアウト構築
  var title;
  $.ajax({
    type:"GET",
    url:"../template/layout.html",
    success: function(text){
      $('#body').hide();
      $('#user').hide();
      $('#type').hide();
      $('#lastupdate').hide();
      $(text).appendTo(document.body);

      $('#text').val($('#body').text());
      title = $('#title').text();
      user = $('#user').text();

      $('#favs').append($('<a href="http://b.hatena.ne.jp/entry/'+document.location.href+'" class="hatena-bookmark-button" data-hatena-bookmark-layout="simple" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>'))
      .append($('<a href="http://twitter.com/share" class="twitter-share-button" data-count="none" data-hashtags="MagicalCircleEngine" data-url="'+document.location.href+'">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>'))
      .append($('<iframe src="http://www.facebook.com/plugins/like.php?href='+document.location.href+'&amp;layout=button_count&amp;show_faces=true&amp;width=120&amp;action=like&amp;font&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:20px;" allowTransparency="true"></iframe>'))
	    ;


      // tw: 誰にでもつくので省略
      $('#title-div').text(user.replace(/^tw:/,'') + '  /  ' + title);
      init();
    }
  });

function savePng(tt,s,f){ // title,body,callback
    var param = {title:tt,body:s};
    $.ajax({
	    type:"POST",
		url: "../action.php?action=save_png",
		data:param,
		success:function(text){
		if(text=="[]"){
		    // not log in
		}else{
		    // log in
		    var e = $.parseJSON(text);
		    if(e['success']=="ok"){
			if(f)f();
		    }else{
		    }
		}
	    }
	});
}

function tweetPng(twit,s,f){ // title,body,callback
    var param = {tweet:twit,body:s};
    $.ajax({
	    type:"POST",
		url: "../action.php?action=twit_png",
		data:param,
		success:function(text){
		if(text=="[]"){
		    // not log in
		}else{
		    // log in
		    var e = $.parseJSON(text);
		    if(e['success']=="ok"){
			if(f)f();
		    }else{
		    }
		}
	    }
	});
}


  function init(){
function dumpDataURL(){
    var s = canv[0].toDataURL('image/png');
    console.log(s);
    return s.replace("data:image/png;base64,",""); // chop base64 header
}

// === Prelude ===
        var prelude = (function () {/*
!sqrt = \(n){
  eval("Math","sqrt",n)
};
!sin = \(n){
  eval("Math","sin",n * 3.1415 * 2)
};
!cos = \(n){
  eval("Math","cos",n * 3.1415 * 2)
};
!tan = \(n){
  eval("Math","tan",n * 3.1415 * 2)
};
!atan2 = \(y,x){
  eval("Math", "atan2", y, x)/(3.1415*2)
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
!dlw = \(size){
  save(){
    write("dlw " + size);
    evalAllExtArgs();
  };
};
!blur = \(size){
  save(){
    write("blur " + size);
    evalAllExtArgs();
  };
};
!bs = \(c){
  save(){
    write("bs " + c);
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
!cs = \(pos, col){
  write("cs " + pos + " " + col);
};
!rgrad = \(x0,y0,r0,x1,y1,r1){
  write("radialGrad " + x0 + " " + y0 + " " + r0 + " " + x1 + " " + y1 + " " + r1);
  evalAllExtArgs();
};
!lgrad = \(x0,y0,x1,y1){
  write("linearGrad " + x0 + " " + y0 + " " + x1 + " " + y1);
  evalAllExtArgs();
};
!fsgrad = \(){
  save(){
    evalExtArg(0);
    write("fsGrad");
    block("a"){
      !a = 1;
      loop(extArgsLength() - 1){
        evalExtArg(a);
        !a = a + 1;
      }
    }
  };
};
!ssgrad = \(){
  save(){
    evalExtArg(0);
    write("ssGrad");
    block("a"){
      !a = 1;
      loop(extArgsLength() - 1){
        evalExtArg(a);
        !a = a + 1;
      }
    }
  };
};
!skew = \(t,t2){
  save(){
    write("skew " + t + " " + t2);
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
!blockClip = \(closed){
  write("beginPath");
  !outerFig = 0;
  evalExtArg(0);
  !outerFig = 1;
  if(closed){
    write("closePath");
  };
  write("clip");
  evalExtArg(1);
  write("resetClip");
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
  block("aa","bb"){
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
  }
};

!flower = \(n){
  block("a"){
    !a = 0;
    loop(n){
      rotate(a/n*2){
        evalAllExtArgs();
      }
      !a = a + 1;
    }
  }
}

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
 block("ploya"){
   !polya = 0;
   autoFig(0){
    loop(n){
     !polya = polya + 1;
     rotate((polya*p)/n * 2){
      write("lineTo 0 0.5");
     }
    }
   }
 }
};

!apoly = \(mode,size){
 block("r2","a"){
  scale(0.3){
   !r2 = 1/cos(1/mode/2)
   fig(1){
    !a = 0
    write('moveTo ' + cos(-1/mode/2) + ' ' + sin(-1/mode/2))
    loop(mode){
     write('arcTo' + ' ' + r2*cos((a*2)/mode/2) + ' ' + r2*sin((a*2)/mode/2) + ' ' + cos((a*2+1)/mode/2) + ' ' + sin((a*2+1)/mode/2) + ' ' + size)
     !a = a + 1
    }
   }
  }
 }
}

!font = \(name){
  save(){
    write("font " + name);
    evalAllExtArgs();
  }
}
!circle = \(s){
 block("polyq","n","r2"){
  if(not(s)){
    !s = 1;
  }
  scale(s){
   !polya = 0;
   !n = 8;
   !r2 = 0.5/cos(1/n/2);
   autoFig(){
    write('moveTo 0.5 0')
    loop(n){
     !x1 = 0.5 * cos((polya+1) / n);
     !y1 = 0.5 * sin((polya+1) / n);
     !x2 = r2 * cos(polya / n + 1 / n / 2);
     !y2 = r2 * sin(polya / n + 1 / n / 2);
   
     write("quadTo " + x2 + " " + y2 + " " + x1 + " " + y1);
     !polya = polya + 1;
    }
   }
  }
 }
}

!rcircle = \(s){
 block("polyq","n","r2"){
  if(not(s)){
    !s = 1;
  }
  scale(s){
   !polya = 0;
   !n = 8;
   !r2 = 0.5/cos(1/n/2);
   autoFig(){
    write('moveTo 0.5 0')
    loop(n){
     !x1 = 0.5 * cos((n-polya-1) / n);
     !y1 = 0.5 * sin((n-polya-1) / n);
     !x2 = r2 * cos((n-polya) / n - 1 / n / 2);
     !y2 = r2 * sin((n-polya) / n - 1 / n / 2);
   
     write("quadTo " + x2 + " " + y2 + " " + x1 + " " + y1);
     !polya = polya + 1;
    }
   }
  }
 }
}


                                    */}).toString().match(/[^]*\/\*([^]*)\*\/;{0,1}\}$/)[1];

        // 初期化
        var canv = $('#canv');
	var start = new Date();
	var ctx = canv[0].getContext("2d"); 
	var mouseX = 0,mouseY = 0;

        var fonts = new Fonts();
        
        var r = new Renderer(ctx, fonts, parseInt(canv[0].width));
        var p = new SimpleParser();

        var gCanvasSize = 400;
        var isLogin = false;

	$('#canv').bind('mousemove',function(e){
		var pos = $('#canv').position();
		mouseX = ((e.pageX - pos.left)/gCanvasSize - 0.5) * 2;
		mouseY = ((e.pageY - pos.top)/gCanvasSize - 0.5) * 2;
	    });

        function resize(width){
            var ew = 400;
            var cw = width - ew - 40;
            $('#edit').width(ew);
            $('#edit').height(cw - 40);

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
	var hashVar = {};
	var externalVarFlag = true;

	// 変数フィールド初期化
        function mkInputs(externalVar){
	  if(externalVarFlag == false)return;
          externalVarFlag = false;
	  $('#labels').empty();
	  inputs = {};
	  var elm;
	  var v;
	  for(var k in externalVar){
	    elm = $('<div>').addClass("panel"); 
            elm.append($('<div>').text(externalVar[k].label));
	    v = externalVar[k].initial;
	    if(hashVar[k]){
	      v = hashVar[k];
	    }
            elm.append(inputs[k] = $('<input>').attr('value',v).keyup(function(){
	      playFlag = false;
              // 十分待ってから実行
              setTimeout(function(){
	        draw(function(){
                  // 必ず再開
	          playFlag = true;
                  animationFrame();
                });
                var serialize = JSON.stringify(getInputs());
	        document.location.hash = encodeURIComponent(serialize);
	        $('#serialize').empty();
	        $('#serialize').append(
	          $('<a>').attr('target','_blank').attr('href', "#" + encodeURIComponent(serialize)).text('この魔法陣へのリンク')
	        );
              },500);

	    }));
	    elm.appendTo($('#labels'));
	  }

          var q = $('#description').html();
	  q = q.replace('-- no description --','魔法陣');
	  q = q.replace(/<[^>]*>/g,' ');
	  var l = q.split(' ');
	  if(l.length > 1)q = l[1];
	  //console.log(q)
	  $.ajax({
	    url: 'http://web.inajob.tk/ad/amz.php?q=' + encodeURIComponent(q) + '&callback=?',
	    dataType:'jsonp',
	    success:function(o){
	      var i,elm;
              $('#ads').empty();
	      for(i = 0; i < o.length; i ++){
	        if(o[i].image){
	          elm = $('<div>');
		  elm.append(
		    $('<a>').attr('href',o[i].link[0]).attr('target','_blank').append(
		      $('<img>').attr('src',o[i].image[0])
		    )
		  );
		  elm.appendTo($('#ads'));
		}
	      }
	    }
	  });
	}

        // 変数フィールドから連想配列を作成
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
              worker = new Worker('../js/worker.js');
	    }
            var s = $('#text').val();
	    var externalVars = getInputs();

	                //処理起動
            worker.postMessage({prelude:prelude, s:s, vars:{t:t,mx:mouseX,my:mouseY}, externalVars: externalVars});
            var t2 = new Date();
	    worker.onerror = function(){
	      console.log('worker error');
	      worker = null;
	      if(f)f();
	    }
            worker.onmessage = function(event){
                // 処理終了
                var sout = event.data.renderProgram;
		var description = event.data.description;
		var debug = event.data.debug;
		//console.log(event.data.debug);
	        if(description.length != 0){
	          $('#description').html(description);
	        }else{
	          $('#description').text('-- no description --');
	        }

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
		  //console.log("externalVar");
                  externalVar = event.data.externalVar;
		  externalVarFlag = true;
		}

                var t3 = new Date();
                var out = p.parse(sout);
                var t4 = new Date();
		try{
                  r.render(out, gCanvasSize);
		}catch(e){
                 debug += e + '\n\n';
		}
                var t5 = new Date();
                //var debug = "debug\n";
                //debug += 't2-t1:' + (t2.getTime() - t1.getTime()) + "\n";
                debug += 'worker task:' + (t3.getTime() - t2.getTime()) + "\n";
                debug += 'render parser:' + (t4.getTime() - t3.getTime()) + "\n";
                debug += 'rendering:' + (t5.getTime() - t4.getTime()) + "\n";
                $('#debug').text(debug);
                //worker.terminate();
                //worker = null;
		if(f)f(out);
            };
	}

	function render(w, h){
	  var pf = playFlag;
	  playFlag = false;
	  // 十分待ってから実行
	  setTimeout(function(){
	    draw(function(out){
	      var canv = $('#render-canv');
	      canv.attr('width',w);
	      canv.attr('height',h);
	      canv.css('background-color','white');
	      var ctx = canv[0].getContext("2d"); 

	      var size = Math.max(w,h);
	      var r = new Renderer(ctx, fonts, size);
              r.render(out, w, h);
	      $('#render-link').empty();
	      $('#render-link').append($('<a>').attr('href',canv[0].toDataURL('image/png')).text('Download').attr('target','_blank'));
	      if(pf){
	        playFlag = pf;
                animationFrame();
	      }
	    });
	  },500);
	}
function renderSvg(){
  var pf = playFlag;
  playFlag = false;
  // 十分待ってから実行
  setTimeout(function(){
    draw(function(out){
      // TODO: === use svg Renderer
      var r = new RendererSVG(fonts);
      r.render(out, 800);
      var svgText = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="-1,-1,2,2">' + r.svgData.join("\n")+ "</svg>"
      // =======
      $('#render-svg-link').empty();
      $('#render-svg-link').append($('<a>').attr('href','data:image/svg+xml,' + encodeURIComponent(svgText)).text('Download').attr('target','_blank'));
      //
      $('#render-svg-canv').empty();
      $('#render-svg-canv').html('<img src="' +
        'data:image/svg+xml;charset=utf-8,' + 
        ( encodeURIComponent('<?xml version="1.0" encoding="utf-8"?>\n' + svgText)) + '"/>');

      //$('#render-svg-canv').html(svgText);
      if(pf){
        playFlag = pf;
        animationFrame();
      }
    });
  },500);
}

        function update(){
	  t = 0;
	  draw(function(){
	    mkInputs(externalVar);
	  });
	}

        $('#text').keyup(function(){
	    if(playFlag == false){
	      update();
	      }
        });

        var playFlag = true;
	var timer = null;
	

	function animationFrame(){
	  if(timer != null){
	    clearTimeout(timer);
	  }
	  draw(function(){
	    mkInputs(externalVar);
	    t ++;
	    if(playFlag){
	      timer = setTimeout(animationFrame,1);
	    }
	  });
	}


	function changeTab(n){
    $('#text-div').hide();
    $('#labels-div').hide();
    $('#render-div').hide();
    $('#render-svg-div').hide();
    switch(n){
      case 0:
        $('#text-div').show();
        break;
      case 1:
        $('#labels-div').show();
        break;
      case 2:
        $('#render-div').show();
        break;
      case 3:
        $('#render-svg-div').show();
        break;

      default:
        throw "error change tab";
    }
	}

        if(document.location.hash){
	  var serializeHash = document.location.hash.slice(1);
	  //console.log(serializeHash);
	  var serializeObj = decodeURIComponent(serializeHash);
          serializeObj = JSON.parse(serializeObj);
	  hashVar = serializeObj;
	  //console.log(serializeObj);
	}

        /*
	update();
	setTimeout(function(){
	  update();
	}, 200); // externalVarがある場合は2回描画する必要がある
	*/
	/*
	WebFontConfig.active = (function(){
	  console.log("loaded reload");
	  update();
        });
	*/
	// 個別のactivateの最後に処理をしたい
	var renderTimer = null;
	WebFontConfig.fontactive = (function(f,d){
	  //
	  console.log("font active " + f + " " + d);
	  if(renderTimer != null){
	    clearTimeout(renderTimer);
	  }
	  renderTimer = setTimeout(function(){
	    renderTimer = null;
	    // アニメーション中はリロードはそちらに任せる
	    if(playFlag == false){
	      update();
	    }
	  },500);
	});
	changeTab(1);

        // UI 構築

        KARUKI.check(function(r){
	  //console.log(r);
	  switch(r.status){
	    case "logout":
              // logout now
              //
	      $('#savebtn').hide();
	      $('#forkbtn').hide();
	      $('#delbtn').hide();
	      $('#logoutbtn').hide();
	      break;
	    case "ok":
	      // login now
	      //
	      $('#loginbtn').hide();
              isLogin = true;
	      if(user == KARUKI.getUserId()){
                // 作者の場合
		//$('#forkbtn').hide();
	      }else{
                // 作者ではない場合
		$('#savebtn').hide();
	        $('#delbtn').hide();
	      }
	      break;
	    case "fail":
	      throw "fail";
	      break;
	    default:
	      throw "unknown status";
	  }
	});

        $('#savebtn').click(function(){
	  KARUKI.save(title, $('#text').val(),function(r){
	    switch(r.status){
              case 'ok':
		savePng(title,dumpDataURL());
	        alert("save ok");
	        break;
              case 'logout':
	        alert("logout now");
	        break;
	      case 'fail':
	        throw "server fail";
	        break;
	      default:
	        throw "unknown resoponse";
	    }
	  });
	});
        $('#forkbtn').click(function(){
	  var name = prompt("fork先の名前を入力してください\nすでに存在する名前を指定すると上書きします","new name");
	  if(!name){
	    alert("キャンセルしました");
	    return;
	  }
	  KARUKI.save(name, '// fork from ' + user +':'+ title + '\n' + $('#text').val(),function(r){
	    switch(r.status){
              case 'ok':
		savePng(name,dumpDataURL());
	        alert("save ok");
		document.location.href='./' + KARUKI.getUserId() + ':' + name + '.html';
	        break;
              case 'logout':
	        alert("logout now");
	        break;
	      case 'fail':
	        throw "server fail";
	        break;
	      default:
	        throw "unknown resoponse";
	    }
	  });
	});
        $('#delbtn').click(function(){
          if(!confirm('DELETE?')){
            return
          }
	  KARUKI.del(title, function(r){
	    switch(r.status){
              case 'ok':
	        alert("del ok");
		document.location.href='../mce2.html';
	        break;
              case 'logout':
	        alert("logout now");
	        break;
	      case 'fail':
	        throw "server fail";
	        break;
	      default:
	        throw "unknown resoponse";
	    }
	  });
	});


        $('#loginbtn').click(function(){
	  KARUKI.login();
	});
        $('#logoutbtn').click(function(){
	  KARUKI.logout();
	});

	$('#variables-btn').click(function(){
	  changeTab(1);
	});
	$('#source-btn').click(function(){
	  changeTab(0);
	});
	$('#render-btn').click(function(){
	  changeTab(2);
	});
	$('#render-svg-btn').click(function(){
	  changeTab(3);
	});


	$('#twit-btn').click(function(){
          if(isLogin){
	    var tweet;
            if(tweet = prompt('tweet', 'MCE2')){
	      if(tweet.length > 100){
	        alert("too long. abort.");
	      }else{
                tweetPng(tweet,dumpDataURL(),function(){
		  alert('twit!')
		});
	      }
            }
          }else{
            alert('please login');
          }
	});



        $('#render-exec-btn').click(function(){
	  var w = parseInt($('#render-width').val());
	  var h = parseInt($('#render-height').val());
	  render(w,h);
	});

	$('#render-select').change(function(){
	  var val = $(this).val();
	  var tmp = val.split(',');
          $('#render-width').val(tmp[0]);
          $('#render-height').val(tmp[1]);

	  var w = parseInt($('#render-width').val());
	  var h = parseInt($('#render-height').val());
	  render(w,h);
	});
        $('#render-svg-exec-btn').click(function(){
	  renderSvg();
	});


        // default animation on
	$('#playbtn').text('stop');
	animationFrame();
	
        // アニメーション再生
	$('#playbtn').click(function(){
	    t = 0;
	    if(playFlag == false){
	      $('#playbtn').text('stop');
              playFlag = true;
	      animationFrame();
	    }else{
	      $('#playbtn').text('start');
              playFlag = false;
	    }
	});
  }
});
