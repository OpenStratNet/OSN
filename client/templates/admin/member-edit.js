//ReactiveVar init
profilePicEdit = new ReactiveVar(false);
pictureUrl = new ReactiveVar(false);
settingsTab = new ReactiveVar("personal");
//Member edit on Rendered
Template.memberEdit.onRendered(function () {
  // if scrolling is necessary $("html, body").animate({ scrollTop: 0 });
  window.scrollTo(0, 0);
  $('[data-toggle="tooltip"]').tooltip();
});
//Member edit helpers
Template.memberEdit.helpers({
  setPersonal: function () {
    if (settingsTab.get() === "personal") {
      return true;
    };
  }
});
//Member edit personal helpers
Template.memberEditPersonal.helpers({
  subscribed: function () {
	  var userId = window.location.href.split('/').pop();
	  var user = Meteor.users.findOne({_id: userId});
    if (Subscribers.find({email: user.profile.email}).count() > 0) {
      return true;
    } else {
      return false;
    }
  },
  userData: function () {
	   var userId = window.location.href.split('/').pop();
	   var user = Meteor.users.findOne({_id: userId})
    return user;
  },
  profilePic: function () {
	  var userId = window.location.href.split('/').pop();
	  var user = Meteor.users.findOne({_id: userId});
    if (user.profile.picture) {
      return true;
    }
  },
  pictureID: function () {
	  var userId = window.location.href.split('/').pop();
	  var user = Meteor.users.findOne({_id: userId});
    if (user.profile.pictureID) {
      return true;
    }
  }
});
//Member edit social helpers
Template.memberEditSocial.helpers({
  userData: function () {
	   var userId = window.location.href.split('/').pop();
	   var user = Meteor.users.findOne({_id: userId});
    return user;
  }
});

Template.memberEdit.events({
  'click #js-seePersonal': function () {
    settingsTab.set("personal");
    $('#js-seePersonal').addClass("active");
    $('#js-seeSocial').removeClass("active");
  },
  'click #js-seeSocial': function () {
    settingsTab.set("social");
    $('#js-seeSocial').addClass("active");
    $('#js-seePersonal').removeClass("active");
  },
  'change .js-Profile': function (e, temp) {
    var userId = window.location.href.split('/').pop();
	var user = Meteor.users.findOne({_id: userId});
    var image = new FS.File(e.target.files[0]);
    // Insert the image into the database
    // getting the image ID for use in the course object
    var imageObject = ProfilePic.insert(image);
    // The image id is stored in the image object
    var imageId = imageObject._id;
    Session.set('imageId', imageId);
    // The url of the image
    var imageUrl = Meteor.absoluteUrl() + "cfs/files/profilePic/" + imageId;
    //Image uploaded token
    Session.set('changes', true);
    //Store the old picture ID in a session variable, if the changes are discard the profilePic return to the original.
    Session.set('oldPictureID', user.profile.pictureID);
    //Store the new picture ID in a session variable
    Session.set('newPictureID', imageUrl);
    //If the user upload a picture for the first time
    if (!user.profile.pictureID) {
      //The image appears
      $('#hiddenImage').show();
    }
    //Uploading the picture to S3 bucket.
    $('.image').attr("src", Meteor.absoluteUrl() + "img/loading_bar.png")
    $('.image').height('150px');
    $('.image').width('150px');
    $('.image').show();
    //The file input manager disappears
    $('#uploadInputFile').hide();

    //Cheking if the picture are ready on the S3 bucket.
    var checker = setInterval(function () {
      $.get(Session.get('newPictureID')).done(function () {
        $('.image').attr("src", Session.get('newPictureID'));
        $('#uploadInput').css({position: 'absolute', marginLeft: "70x"});
        $('#uploadInput').show();
        $('#discardButton').css({position: 'absolute', marginLeft: "112px"});
        $('#discardButton').show();
        clearInterval(checker);
      }).fail(function () {
      })
    }, 4500);
    // assign the reactive var to the imageId
    if (imageId) {
      profilePicEdit = new ReactiveVar(imageId);
    }
    // assign the second reactive var to the imageUrl
    if (imageUrl) {
      pictureUrl = new ReactiveVar(imageUrl);
    }

  },
  'click #discard': function () {
	var userId = window.location.href.split('/').pop();
	var user = Meteor.users.findOne({_id: userId});
    //changes
    Session.set('changes', true);
    //If the user don't want to keep changes in profile picture, the pic returns to original, this is necessary to give a review of the new pic.
    //Reset the preview to the old one and remove the picture from collection.
    if (Session.get('oldPictureID')) {
      $('.image').attr("src", Session.get('oldPictureID'));
      delete Session.keys['oldPictureID'];
    } else {
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
    if (!user.profile.pictureID) {
      //The image disappears
      $('#hiddenImage').hide();
    }
    Meteor.call('ProfilePic.remove', {_id: Session.get('imageId')});
    //Delete the Session variables.
    delete Session.keys['imageId'];
  },
  'submit form': function (evt) {
    evt.preventDefault();
	   var userId = window.location.href.split('/').pop();
	   var user = Meteor.users.findOne({_id: userId});
    var temp = {};

    temp.firstName = $('#firstname').val();
    // temp.profile.lastname = $('#lastname').val();
    currentEmail = user.profile.email;
    // if changes
    if (Session.get('changes')) {
      //Update the profile pic ID if the user changed the picture
      if (Session.get('newPictureID')) {
        if (Session.get('imageId')) {
          Meteor.users.update({_id: userId}, {$set: {'profile.pictureID': Session.get('newPictureID')}});
        } else {
          Meteor.users.update({_id: userId}, {
            $set: {
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
      } else {
        Meteor.users.update({_id: userId}, {$set: {'profile.pictureID': false}});
        //Delete the Session variables.
        delete Session.keys['imageId'];
        delete Session.keys['newPictureID'];
        delete Session.keys['oldPictureID'];
        delete Session.keys['changes'];
      }
    }
    //Subscribers collection updates if the email changed.
    if (Subscribers.find({email: currentEmail}).count() > 0
      && Subscribers.findOne({email: currentEmail}).email != $('#email').val()) {
      Meteor.call('Subscribers.insert', {email: $('#email').val()});
      Meteor.call('Subscribers.remove', {_id: Subscribers.findOne({email: currentEmail})._id})
    }

    // TODO: merge with above update to mongoDB
    Meteor.users.update({_id: userId}, {
      $set: {
        // from personal settings
        "profile.firstName": $('#firstname').val(),
        "profile.lastName": $('#lastname').val(),
        "profile.name": $('#firstname').val() + ' ' + $('#lastname').val(),
        "profile.institution": $('#institution').val(),
        "profile.interests": $('#interests').val(),
        "profile.position": $('#position').val(),
        "profile.email": $('#email').val(),

        //from social settings
        "profile.website": $('#website').val(),
        "profile.blog": $('#blog').val(),
        "profile.twitter": $('#twitter').val(),
        "profile.linkedin": $('#linkedin').val(),
        "profile.facebook": $('#facebook').val()
      }
    });

    Bert.alert("Changes saved.");
  },
  'click #unsubscribe': function () {
	  var userId = window.location.href.split('/').pop();
	  var user = Meteor.users.findOne({_id: userId});
    //Remove email from the Subscribers collection
    Meteor.call('Subscribers.remove', {_id: Subscribers.findOne({email: user.profile.email})._id})
  },
  'click #subscribe': function () {
	  var userId = window.location.href.split('/').pop();
	  var user = Meteor.users.findOne({_id: userId});
    //Insert email to the Subscribers collection
    Meteor.call('Subscribers.insert', {email: user.profile.email});
  }
});
