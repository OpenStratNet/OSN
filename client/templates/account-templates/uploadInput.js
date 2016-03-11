profilePicEdit = new ReactiveVar(false);

Template.uploadInput.events({
  'click .js-Profile': function (evt, tmp) {
    //evt.preventDefault();
    console.log("test");
  },
  'change .js-Profile': function(evt, temp) {
    var image = event.target.files[0];
    // Insert the image into the database
    // getting the image ID for use in the course object
    var imageObject = ProfilePic.insert(image);

    // The image id is stored in the image object
    var imageId = imageObject._id;

    var imageUrl = imageObject.url({store: "profilePic"});
    Meteor.setTimeout(function () {
        console.log("Url " + imageUrl);
      }, 3 * 1000);

    // Create a reactive var to be used when the course is added
    if (imageId) {
      profilePicEdit = new ReactiveVar(imageId);
    }
    // if (imageUrl) {
    //   pictureUrl = new ReactiveVar(imageUrl);
    // }
  },  
  'submit form': function (evt, temp) {
    evt.preventDefault();

    // temp.title = $('#title').val();
    // temp.description = $('#description').summernote('code');
    // temp.type = $('input[name=netype]:checked').val();
    // temp.createdAt = new Date();

    // if (profilePicEdit.get()) {
    //   temp.pictureID = profilePicEdit.get();
    // }

    Meteor.users.update({_id: this._id}, {$set: {'profile.pictureID': profilePicEdit.curValue}} );
  }
});