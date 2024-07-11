$(function(){
	let menuActiveScrollTop = 0;
	$(".js_btn_menu").click(function(){
		$("#popMenu").fadeIn('fast')
		menuActiveScrollTop = $(document).scrollTop()
		$("body").css({
		   "overflow": "hidden",
		   "height" : $(window).height()
		})
		$(document).scrollTop(menuActiveScrollTop)
	})
	$("#popMenu .btn_close").click(function(){
		$("#popMenu").fadeOut('fast')
		$("body").css({
			 "overflow": "auto",
			 "height" : "auto"
		 })
		 $(document).scrollTop(menuActiveScrollTop)
	})
	
	$("#popMenu .menu_wrap li a.is-sub").click(function(e){
		e.preventDefault()
		e.stopPropagation()
		
		let category = $(this).siblings(".category");
		let obj = $(this)
		if($(this).hasClass("is-open")){
			obj.removeClass("is-open")
			category.stop().animate({
				height : 0
			})
		}else{
			obj.addClass("is-open")
			category.stop().animate({
				height : category.prop("scrollHeight")
			})
		}
		
	})
})