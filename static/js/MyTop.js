
$(function() {
	$(window).scroll(function(){
		var scrolltop=$(this).scrollTop();
		if(scrolltop>=200){
			$("#MyBackTop_item").show();
		}else{
			$("#MyBackTop_item").hide();
		}
	});
	$("#MyBackTop").click(function(){
		$("html,body").animate({scrollTop: 0}, 500);
	});
	$(".qr").hover(function(){
		$(".qr-popup").show();
	},function(){
		$(".qr-popup").hide();
	});
});