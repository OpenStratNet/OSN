imageIdVar = new ReactiveVar(false);
attachmentIdVar = new ReactiveVar(false);

Template.adminNewsEvents.events({
	'change #coverImage': function(evt, temp) {
    /* FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err) throw err;
      });
    }); */

		var image = event.target.files[0];
		// Insert the image into the database
		// getting the image ID for use in the course object
		var imageObject = Images.insert(image);

		// The image id is stored in the image object
		var imageId = imageObject._id

		// Create a reactive var to be used when the course is added
		if (imageId) {
			imageIdVar = new ReactiveVar(imageId);
		}
	},
	'change #attachment': function(evt, temp) {
    /* FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err) throw err;
      });
    }); */

		var attachment = event.target.files[0];

		// Insert the image into the database
		// getting the image ID for use in the course object
		var attachmentObject = Attachments.insert(attachment);

		// The image id is stored in the image object
		var attachmentId = attachmentObject._id

		// Create a reactive var to be used when the course is added
		if (attachmentId) {
			attachmentIdVar = new ReactiveVar(attachmentId);
		}	
	},
	'submit form': function (evt, temp) {
		//evt.preventDefault();

		var temp = {};
		temp.title = $('#title').val();
		temp.description = $('#description').val();
		temp.type = $('input[name=netype]:checked').val();
		temp.createdAt = new Date ();

		if (imageIdVar.get()) {
			temp.coverImageId = imageIdVar.get();
		}

		if (attachmentIdVar.get()) {
			temp.attachmentId = attachmentIdVar.get();
		}
		
		NewsEvents.insert(temp);
	}
});