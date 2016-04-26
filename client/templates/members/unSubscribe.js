Template.unSubscribe.onRendered(function() {
  var email = window.location.search.split('=').pop();
  var id_ = subscribers.findOne({email: email})._id;
  subscribers.remove({_id: id_});
});