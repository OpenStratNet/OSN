profilePicEdit = new ReactiveVar(false);

pictureUrl = new ReactiveVar(false);

Template.profileSettings.onRendered(function() {
	// if scrolling is necessary $("html, body").animate({ scrollTop: 0 });
  window.scrollTo(0, 0);
  $('[data-toggle="tooltip"]').tooltip();
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
    console.log("test");
    var image = event.target.files[0];
    // Insert the image into the database
    // getting the image ID for use in the course object
    var imageObject = ProfilePic.insert(image);
    filesCollection.on('uploaded', function (fileObj) {
      // do something
    });

    // The image id is stored in the image object
    var imageId = imageObject._id;

    // Trying to teceive the url
    var imageUrl = imageObject.url({store: "profilePic"});

    // double check with console.log
    Meteor.setTimeout(function () {
        console.log("Url " + imageUrl);
      }, 3 * 1000);

    // assign the reactive var to the imageId
    if (imageId) {
      profilePicEdit = new ReactiveVar(imageId);
    }
    // assign the second reactive var to the imageUrl
    if (imageUrl) {
      pictureUrl = new ReactiveVar(imageUrl);
    }
  },
  'submit form': function (evt, temp) {
    evt.preventDefault();
    var temp = {};
    // var temp.profile = {};

    // temp.profile.firstName = $('#fistname').val();
    // temp.profile.lastname = $('#lastname').val();

    // console.log("done");
    // Bert.alert("Changes saved.");
    // Meteor.users.update({_id: this._id}, {$set: {'profile.pictureID': profilePicEdit.curValue, 'profile.picture': pictureUrl.curValue}} );
    Meteor.users.update({_id: this._id}, {$set: temp} );
  }
});
