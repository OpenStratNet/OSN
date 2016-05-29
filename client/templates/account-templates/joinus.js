Template.joinUs.onRendered(function () {
  // if scrolling is necessary $("html, body").animate({ scrollTop: 0 });
  window.scrollTo(0, 0);
  // SCRIPT
    setInterval(function(){
        if(window.location.href.split('/').pop()=='joinus'){
	        var pswVal = $("[name='at-field-password']")[0].value;
            var pswValL = pswVal.length;
            var pswAVal = $("[name='at-field-password_again']")[0].value;
	        var pswAValL = pswAVal.length;
            if(pswVal==pswAVal && pswValL==6 && pswAValL==6){
	            $('.form-group:eq(15) .glyphicon.glyphicon-remove.form-control-feedback').removeClass('glyphicon-remove').addClass('glyphicon-ok').css("color","green");
	            $('.form-group:eq(15) .help-block').addClass('hide');
	            $("[name='at-field-password_again']").css({"border-style":"solid", "border-color":"green"})
            }else{
				$("[name='at-field-password_again']").css({"border-style":"", "border-color":""})
			}
        }	
    }, 10);
});

Template.joinUs.events({
  'click .js-scrollToForm': function (evt, tpl) {
    evt.preventDefault();
    $('html, body').animate({
        scrollTop: $('#js-scrollStop').offset().top - 35
    }, 2000);
  }
});
