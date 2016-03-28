UI.registerHelper('noPicture', function(){
  var currUser = Meteor.users.findOne( {_id:this._id} );
  if (!currUser.profile.picture && !currUser.profile.pictureID)  {
    return true;
  } else {
    return false;
  }
});
