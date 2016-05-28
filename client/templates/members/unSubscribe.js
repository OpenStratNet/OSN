Template.unSubscribe.onRendered(function() {
   Meteor.subscribe('allSubscribers') //Manage a subscription to the collection
});

Template.unSubscribe.helpers({
  unsubscribe: function(){
  Meteor.setTimeout(function(){
	  var email = window.location.search.split('=').pop();
      var id_ = subscribers.findOne({email: email})._id;
      Meteor.call('unsubscribe',id_) //Remove the email from the server making a call to a method
	  console.log(email+' '+'Unsubscribed');
  },3500);
  return false;
  }
});