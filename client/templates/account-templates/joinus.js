Template.joinUs.onRendered(function () {
 // SCRIPT
    setInterval(function(){
        if(window.location.href.split('/').pop()=='joinus'){
	        var pswVal = $("[name='at-field-password']")[0].value;
            var pswValL = pswVal.length;
            var pswAVal = $("[name='at-field-password_again']")[0].value;
	        var pswAValL = pswAVal.length;
            if(pswVal==pswAVal && pswValL>5 && pswAValL>5){
	            $('.form-group:eq(15) .glyphicon.glyphicon-remove.form-control-feedback').removeClass('glyphicon-remove').addClass('glyphicon-ok').css("color","green");
	            $('.form-group:eq(15) .help-block').addClass('hide');
	            $("[name='at-field-password_again']").css({"border-style":"solid", "border-color":"green"})
            }else{
				$("[name='at-field-password_again']").css({"border-style":"", "border-color":""});
				$('.form-group:eq(15) .glyphicon.glyphicon-remove.form-control-feedback').removeClass('glyphicon-ok').css("color","");
	            $('.form-group:eq(15) .help-block').removeClass('hide');
			}
        }
    }, 10);
});
Template.joinUs.helpers({
	afterLoad: function(){ //Fire the code when the page is full loaded.
	    Meteor.setTimeout(function(){ //Latency compensation 0.5sec
	    $('#preLoad').hide().show(5); //Display the html container when the back-end are ready.
	    return false;
    },10);
  },
});

// buggy joinus button deactivated
// Template.joinUs.events({
//   'click .js-scrollToForm': function (evt, tpl) {
//     evt.preventDefault();
//     $('html, body').animate({
//         scrollTop: $('#js-scrollStop').offset().top - 35
//     }, 2000);
//   }
// });
