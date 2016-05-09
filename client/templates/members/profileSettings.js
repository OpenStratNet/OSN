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
  },
  subscribed: function(){
	  if(subscribers.find({email: Meteor.user().profile.email}).count() >0){
		  return true;
	  }else{
		  return false;
	  }
  }
});

Template.profileSettings.events({
  'change .js-Profile': function(e, temp) {
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
	//Image uploaded token
	Session.set('changes',true);

    //Store the old picture ID in a session variable, if the changes are discard the profilePic return to the original.
	Session.set('oldPictureID', Meteor.user().profile.pictureID);
	//Store the new picture ID in a session variable
	Session.set('newPictureID', imageUrl);
	//If the user upload a picture for the first time
	if(!Meteor.user().profile.pictureID){
	//The image appears
	$('#hiddenImage').show();
	}
    //Uploading the picture to S3 bucket.
    $('.image').attr("src", Meteor.absoluteUrl()+"img/loading_bar.png")
	$('.image').height('150px');
	$('.image').width('150px');
	$('.image').show();
	//The file input manager disappears
	$('#uploadInputFile').hide();

    //Cheking if the picture are ready on the S3 bucket.
	var checker = setInterval(function(){
		$.get(Session.get('newPictureID')).done(function () {
		 $('.image').attr("src", Session.get('newPictureID'));
		 $('#uploadInput').css({position: 'absolute', marginLeft: "70x"});
		 $('#uploadInput').show();
		 $('#discardButton').css({position: 'absolute', marginLeft: "112px"});
		 $('#discardButton').show();
		 clearInterval(checker);
         }).fail(function () {
        })
	},4500);
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
   //changes
   Session.set('changes',true);
   //If the user don't want to keep changes in profile picture, the pic returns to original, this is necessary to give a review of the new pic.
   //Reset the preview to the old one and remove the picture from collection.
    if(Session.get('oldPictureID')){
	$('.image').attr("src", Session.get('oldPictureID'));
	delete Session.keys['oldPictureID'];
	}else{
	//The image disappears
	$('.image').hide();
	//The discard button disappears
	$('#discardButton').hide();
    //The edit input button disappears
	$('#uploadInput').hide();
	//The file input manager appears
	$('#uploadInputFile').show();
	Session.set('newPictureID', false);
	}

	if(!Meteor.user().profile.pictureID){
	//The image disappears
	$('#hiddenImage').hide();
	}
	ProfilePic.remove({_id: Session.get('imageId')});
   //Delete the Session variables.
    delete Session.keys['imageId'];
  },
  'submit form': function (evt){
    evt.preventDefault();
    var temp = {};

    temp.firstName = $('#firstname').val();
    // temp.profile.lastname = $('#lastname').val();

    // console.log("done");
    // if changes
	if(Session.get('changes')){
    //Update the profile pic ID if the user changed the picture
	  if(Session.get('newPictureID')){
	  if(Session.get('imageId')){
	  	Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('newPictureID')}});
	  }else{
	  	Meteor.users.update({_id: Meteor.userId()}, {$set: {
        'profile.pictureID': Session.get('oldPictureID'),
        'profile.firstName': $('#firstname').val()
      }
      });
	  }

	//Delete the Session variables.
      delete Session.keys['imageId'];
      delete Session.keys['newPictureID'];
	  delete Session.keys['oldPictureID'];
	  delete Session.keys['changes'];
	  }else{
	  Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': false}});
	//Delete the Session variables.
      delete Session.keys['imageId'];
      delete Session.keys['newPictureID'];
	  delete Session.keys['oldPictureID'];
	  delete Session.keys['changes'];
	  }
	}
    // merge with above update to mongoDB
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      "profile.firstName" : $('#firstname').val(),
      "profile.lastName" : $('#lastname').val(),
      "profile.institution" : $('#institution').val(),
      "profile.interests" : $('#interests').val(),
      "profile.position" : $('#position').val(),
      "profile.email" : $('#email').val(),
      }
    });

    // if the user changed his email his new email should be in the subscribers collection
    // if (subscribers.findOne({email: Meteor.user().profile.email}).email === $('#email').val()) {
    //   console.log("same");
    // } else if (!subscribers.find({email: Meteor.user().profile.email}).count() > 0) {
    //   console.log("different");
    // }

    if (subscribers.find({email: Meteor.user().profile.email}).count() > 0
      && subscribers.findOne({email: Meteor.user().profile.email}).email !== $('#email').val()) {
      // subscribers.insert({email: $('#email').val()});
      subscribers.insert({email: Meteor.user().profile.email});
    }

    Bert.alert("Changes saved.");
    // Meteor.users.update({_id: this._id}, {$set: temp} );
  },
  'click #unsubscribe': function(){
	 //Remove email from the subscribers collection
	 subscribers.remove({_id: subscribers.findOne({email: Meteor.user().profile.email})._id})
  },
  'click #subscribe': function(){
	 //Insert email to the subscribers collection
	 subscribers.insert({email: Meteor.user().profile.email});
  }
});
