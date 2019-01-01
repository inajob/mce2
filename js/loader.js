
$(function(){
	var documentType = $('#type').text();
	switch(documentType){
	case 'mce2':
	    $('<script>').attr('src','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js').appendTo($(document.body));
	    $('<script>').attr('src','../js/karuki-lib.js').appendTo($(document.body));
	    $('<script>').attr('src','../js/render.js?v2').appendTo($(document.body));
	    $('<script>').attr('src','../js/mce2.js').appendTo($(document.body));
	    break;

	}
	
    });
