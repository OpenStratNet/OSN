profilePicEdit = new ReactiveVar(false);

pictureUrl = new ReactiveVar(false);

Template.profileSettings.onRendered(function() {
	// if scrolling is necessary $("html, body").animate({ scrollTop: 0 });
  window.scrollTo(0, 0);
  $('[data-toggle="tooltip"]').tooltip();
  if(Session.get('signUpPicID')){
  Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('signUpPicID'), 'profile.picture': Session.get('signUpPicURL')}});
  }
});

Template.profileSettings.helpers({
	userData: function () {
		return Meteor.user();
	},
  profilePic: function() {
    if (Meteor.user().profile.picture) {
      return true;
    }
  },
  pictureID: function() {
    if (Meteor.user().profile.pictureID) {
      return true;
    }
  }
});

Template.profileSettings.events({
  'change .js-Profile': function(evt, temp) {
    console.log("changed pic");
    var image = event.target.files[0];
    // Insert the image into the database
    // getting the image ID for use in the course object
    var imageObject = ProfilePic.insert(image);
    // filesCollection.on('uploaded', function (fileObj) {
    //   // do something
    // });

    // The image id is stored in the image object
    var imageId = imageObject._id;
    // The url of the image
    var imageUrl = Meteor.absoluteUrl() +"cfs/files/profilePic/"+imageId;
	
    //Store the old picture ID and url in a session variable, if the changes are discard the profilePic return to the original.
	Session.set('oldPictureID', Meteor.user().profile.pictureID);
	Session.set('oldPictureURL',Meteor.user().profile.picture);
	//Store the new picture ID and url in a session variable
	Session.set('newPictureID', imageId);
	Session.set('newPictureURL',imageUrl);
    // double check with console.log
    Meteor.setTimeout(function () {
        console.log(imageUrl);
      }, 3 * 1000);
    //virtual update 
	Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('newPictureID'), 'profile.picture': Session.get('newPictureURL')}});
    // assign the reactive var to the imageId
    if (imageId) {
      profilePicEdit = new ReactiveVar(imageId);
    }
    // assign the second reactive var to the imageUrl
    if (imageUrl) {
      pictureUrl = new ReactiveVar(imageUrl);
    }
  },
  'click #discard': function(){
   //If the user don't want to keep changes in profile picture, the pic returns to original, this is necessary to give a review of the new pic.
	Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('oldPictureID'), 'profile.picture': Session.get('oldPictureURL')}});
  },
  'submit form': function (){
    //evt.preventDefault();
    //var temp = {};
    // var temp.profile = {};

    // temp.profile.firstName = $('#fistname').val();
    // temp.profile.lastname = $('#lastname').val();

    // console.log("done");
    // Bert.alert("Changes saved.");
    //Update the profile pic ID;
	Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('newPictureID'), 'profile.picture': Session.get('newPictureURL')}});
    // Meteor.users.update({_id: this._id}, {$set: temp} );
  }
});
