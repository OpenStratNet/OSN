profilePicEdit = new ReactiveVar(false);

pictureUrl = new ReactiveVar(false);

Template.profileSettings.onRendered(function() {
  // if scrolling is necessary $("html, body").animate({ scrollTop: 0 });
  window.scrollTo(0, 0);
  $('[data-toggle="tooltip"]').tooltip();
  if(Session.get('signUpPicID')){
  Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('signUpPicID')}});
  delete Session.keys['signUpPicID']
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
  "change input[type='file']": function(e, temp) {
	var image = new FS.File(e.target.files[0]);
    // Insert the image into the database
    // getting the image ID for use in the course object
    var imageObject = ProfilePic.insert(image);
    // filesCollection.on('uploaded', function (fileObj) {
    //   // do something
    // });

    // The image id is stored in the image object
    var imageId = imageObject._id;
	Session.set('imageId',imageId);
    // The url of the image
    var imageUrl = Meteor.absoluteUrl() +"cfs/files/profilePic/"+imageId;
	
	
    //Store the old picture ID in a session variable, if the changes are discard the profilePic return to the original.
	Session.set('oldPictureID', Meteor.user().profile.pictureID);
	//Store the new picture ID in a session variable
	Session.set('newPictureID', imageUrl);
	//If the user upload a picture for the first time
	if(!Meteor.user().profile.pictureID){
	document.getElementById("hiddenImage").style="display:block;"; //The image appears
	}
    //Uploading the picture to S3 bucket.
	document.getElementsByClassName("image")[0].src = Meteor.absoluteUrl()+"img/loading_bar.gif";
    //Cheking if the picture are ready on the S3 bucket.
	var checker = setInterval(function(){
		$.get(Session.get('newPictureID')).done(function () {
         document.getElementsByClassName("image")[0].src = Session.get('newPictureID');	//Update the image in client side
		 document.getElementById("uploadInput").style="display:none;"; //The file input button disappears
		 document.getElementById("discardButton").style="display:block;"; //The discard button appears
		 clearInterval(checker);
         }).fail(function () {
        })
	},3000);
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
   //Reset the preview to the old one and remove the picture from collection.
	document.getElementsByClassName("image")[0].src = Session.get('oldPictureID');
	document.getElementById("discardButton").style="display:none;"; //The discard button disappears
	document.getElementById("uploadInput").style="display:block;"; //The file input button appears
	if(!Meteor.user().profile.pictureID){
	document.getElementById("hiddenImage").style="display:none;"; //The image disappears
	}
	ProfilePic.remove({_id: Session.get('imageId')});
   //Delete the Session variables.
    delete Session.keys['imageId'];
    delete Session.keys['newPictureID'];
	delete Session.keys['oldPictureID'];
  },
  'submit form': function (){
    //evt.preventDefault();
    //var temp = {};
    // var temp.profile = {};

    // temp.profile.firstName = $('#fistname').val();
    // temp.profile.lastname = $('#lastname').val();

    // console.log("done");
    // Bert.alert("Changes saved.");
    //Update the profile pic ID if the user changed the picture
	if(Session.get('newPictureID')){
	Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('newPictureID')}});
	//Delete the Session variables.
    delete Session.keys['imageId'];
    delete Session.keys['newPictureID'];
	delete Session.keys['oldPictureID'];
	}

    // Meteor.users.update({_id: this._id}, {$set: temp} );
  }
});
