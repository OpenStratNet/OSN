profilePicEdit = new ReactiveVar(false);

Template.uploadInput.events({
  'click .js-Profile': function (evt, tmp) {
    //evt.preventDefault();
    console.log("test");
  },
  "change input[type='file']": function(e, temp) {
	var image = new FS.File(e.target.files[0]);
    //var image = event.target.files[0];
    // Insert the image into the database
    // getting the image ID for use in the course object
    var imageObject = ProfilePic.insert(image);
    // The image id is stored in the image object
    var imageId = imageObject._id;
	// The image URL constructed from the absolute URL of the project
    var imageUrl = Meteor.absoluteUrl() +"cfs/files/profilePic/"+imageId;
	// The file name
	var imageName = imageObject.original.name;
	//Store the new picture ID and url in a session variable
	Session.set('signUpPicID', imageUrl);
	//Check by console
    Meteor.setTimeout(function () {
        console.log("Url " + imageUrl);
      }, 3 * 1000);
   
	document.getElementById("hiddenName").style="display:block;"; //Uploading...
	document.getElementById("uploadInput").style="display:none;"; //The file input button disappears

	//function that check if the url of the image is available
	var checker = setInterval(function(){
		$.get(Session.get('signUpPicID')).done(function () {
		 //when the url are "done", the template reacts to this HTML code:
         document.getElementById("hiddenName").innerHTML='<div class="form-group fileUpload btn btn-default btn-block btn-icon btn-file-upload">'+imageName+'<span><i class="fa fa-pencil-square-o"></i></span><input type="file" class="upload js-Profile" placeholder="Upload a Picture"/></div>';
		 clearInterval(checker);
		 //Bert alert as required
		 Bert.alert('File uploaded');
         }).fail(function () {
        })
	},3000); //Interval of 3 seconds to check the url status, (for slow conections this might take between 3-12 secs)
	
    if (imageId) {
      profilePicEdit = new ReactiveVar(imageId);
    }
    // if (imageUrl) {
    //   pictureUrl = new ReactiveVar(imageUrl);
    // }
  },  
  'submit form': function () {
 
    console.log('submit');
    // temp.title = $('#title').val();
    // temp.description = $('#description').summernote('code');
    // temp.type = $('input[name=netype]:checked').val();
    // temp.createdAt = new Date();

    // if (profilePicEdit.get()) {
    //   temp.pictureID = profilePicEdit.get();
    // }
  //Meteor.setTimeout(function(){Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.pictureID': Session.get('signUpPicID'), 'profile.picture': Session.get('signUpPicURL')}})}, 3000);
    
  }
});