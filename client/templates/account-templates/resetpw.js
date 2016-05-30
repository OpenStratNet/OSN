//Subscription to Meteor.users
Meteor.subscribe('users');
//Event managers
Template.PWforgot.events({
     'submit #forgotPassword': function(e){
		 e.preventDefault();
	     var userEmail = $('#email').val();
         var results= Meteor.users.find({"profile.email": userEmail}).count();
	         if(results){
			var userID= Meteor.users.find({"profile.email": userEmail}).fetch()[0]._id;
		    var newPassword = Math.floor(Math.random()*900000) + 100000;
			console.log(''+newPassword)
		     Meteor.call('updatePassword',userID,''+newPassword);
			 var news = '<header><img src="http://openstrategynetwork.com/img/osn_logoneu.png"></header><body style="background:#0B676E;color:#FFFFFF"><center><h1>SUCCESS IN PASSWORD RESET</h1><h3>Your new password is:  '+newPassword+'</h3></center></body>';
	         Meteor.call('sendEmail',
	             userEmail, //The email
                 'Open Strategy Network <violetta.splitter@business.uzh.ch>',
                 'Open Strategy Network Password Updated',
                 news+'<footer style="background:#CCCCCC;color:black;"><center><h4>Now you can access to our website <a href='+Meteor.absoluteUrl()+'>http://openstrategynetwork.com</a></h4></center></footer>'
			 );
			 }else{
		     Bert.alert("Invalid email");
			 }
	 }
})