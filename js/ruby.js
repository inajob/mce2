$(function(){
  function init(){
        // 初期化
        var canv = $('#canv');
	var start = new Date();
	var ctx = canv[0].getContext("2d"); 
	var mouseX = 0,mouseY = 0;

        var fonts = new Fonts();
        
        var r = new Renderer(ctx, fonts, parseInt(canv[0].width));
        var p = new SimpleParser();

        var gCanvasSize = 400;

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
	    url: 'http://inajob.no-ip.org:10080/ad/amz.php?q=' + encodeURIComponent(q) + '&callback=?',
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
          var s = $('#text').val();
	  //var externalVars = getInputs();
          // todo: パーサー起動
	  var parser = new RubyEngine.Parser();
	  var ruby = new RubyEngine.Interpreter();
	  var out = "";
	  ruby.writeStdout = function(st){ out+=st; }
	  ruby.run(parser.parse(s));
          console.log(out);


          var t2 = new Date();
          // 処理終了
          var sout = out;
	  var description ="";
	  var debug = ""; 
	  //console.log(event.data.debug);
	  if(description.length != 0){
	    $('#description').html(description);
	  }else{
	    $('#description').text('-- no description --');
	  }

	  // 比較
	  var flag = false;
	  /*
          for(var x in event.data.externalVar){
	    if(!externalVar[x] || !event.data.externalVar[x] || externalVar[x].label != event.data.externalVar[x].label){
	    //console.log(externalVar[x],event.data.externalVar[x]);
	      flag = true;
	      break;
	    }
	  }
	  */
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

	  if(f)f(out);
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

        var playFlag = false;
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

	// 個別のactivateの最後に処理をしたい
	var renderTimer = null;
	WebFontConfig.fontactive = (function(f,d){
	  //
	  //console.log("font active " + f + " " + d);
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
  }
  init();
});
