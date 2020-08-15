    $(function(){
    function close_layer(){
        $(".layer_bottom_img").animate({bottom:'-100px'},2000);
  
      }
 
          $('.layer_bottom_img').removeClass('hide');
          $('.layer_bottom_img').animate({bottom:0},2000);

      $(".dh_closed_wd_bottom").click(function(){
        close_layer();
      })
      $(".dh_closed_wd_bottom,.dh_alink_m").click(function(){
          $(".layer_bottom_img").animate({bottom:'-100px'},2000);
		     var $this = $(this),
		              tjname = $this.attr('data-tjname'),
		              tjnameArr = tjname.split(',');
		      if(!tjname){
		          return;
		      }
		      var  scope = dhLog;
		      scope.sendActiveLog({
		          firstCtg: tjnameArr[0] || 'null',
		          secondCtg: tjnameArr[1] || 'null',
		          thirdCtg: tjnameArr[2] || 'null',
		          linkName: tjnameArr[3] || 'null',
		          linkIdx: 0,
		          linkUrl: $this.attr('href')|| $this.attr('data-url')
		      });
      });
    });
