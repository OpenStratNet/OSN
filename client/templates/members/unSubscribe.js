Template.unSubscribe.onRendered(function() {
   console.log('unsubscribing');
});

Template.unSubscribe.helpers({
  unsubscribe: function(){
  Meteor.setTimeout(function(){
	  var email = window.location.search.split('=').pop();
      var id_ = subscribers.findOne({email: email})._id;
      subscribers.remove({_id: id_}); 
	  console.log('Unsubscribed');
  },3500);
  return false;
  }
});