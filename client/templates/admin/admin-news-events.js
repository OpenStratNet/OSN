imageIdVar = new ReactiveVar(false);
attachmentIdVar = new ReactiveVar(false);

Template.adminNewsEvents.onRendered(function() {
  $(document).ready(function() {
    $('#description').summernote({
    	height: 200,
    	toolbar: [
  	   // [groupName, [list of button]]
    	['style', ['style']],
       	['font', ['bold', 'italic', 'underline', 'clear']],
       	['fontname', ['fontname']],
       	['color', ['color']],
       	['para', ['ul', 'ol', 'paragraph']],
       	['height', ['height']],
       	['table', ['table']],
       	['insert', ['link', 'hr']], // 'picture', is tooked out
       	['view', ['fullscreen', 'codeview']],
       	['help', ['help']]
	    ]
    });
  });
    // Get an array of the existing tags
    var categoryOptions = Categories.find().fetch();
    // testing category options
    $('#selectCategory').selectize({
      plugins: ['remove_button'],
      delimiter: ',',
      persist: false,
      valueField: 'name',
      labelField: 'name',
      searchField: 'name',
      create: true,
      highlight: true,
      options: categoryOptions,
      onItemAdd: function (item) {
          // Check to see if tag exists in Tags collection
          // by querying the database for the tag name
          // and checking the length of the result
          var existingCategory = Categories.find({"name": item}).fetch().length;
          if (!existingCategory ) {
              // Add the tag to the Tags collection
              // TODO: figure out how to limit duplicate tags
              // e.g. 'Beans' and 'beans'
              // unless this is not an issue
              Categories.insert({"name": item});
          }
      }
    });

    // testing tag options

    // Get an array of the existing tags
    var tagOptions = Tags.find().fetch();

    $('#newsKeywords').selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        create: true,
        highlight: true,
        maxOptions: 5,
        options: tagOptions,
        onItemAdd: function (item) {
            // Check to see if tag exists in Tags collection
            // by querying the database for the tag name
            // and checking the length of the result
            var existingTag = Tags.find({"name": item}).fetch().length;
            if (!existingTag ) {
                // Add the tag to the Tags collection
                // TODO: figure out how to limit duplicate tags
                // e.g. 'Beans' and 'beans'
                // unless this is not an issue
                Tags.insert({"name": item});
            }
        }
    });
});

Template.adminNewsEvents.helpers({
  allCategories: function () {
    return Categories.find();
  }
});

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
		// getting the image ID for use in the news object
		var imageObject = Images.insert(image);

		// The image id is stored in the image object
		var imageId = imageObject._id

		// Create a reactive var to be used when the news is added
		if (imageId) {
			imageIdVar = new ReactiveVar(imageId);
		}
	},
  'change #coverImage': function(evt, temp) {
    /* FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err) throw err;
      });
    }); */

    var image = event.target.files[0];
    // Insert the image into the database
    // getting the image ID for use in the news object
    var imageObject = Images.insert(image);

    // The image id is stored in the image object
    var imageId = imageObject._id

    // Create a reactive var to be used when the news is added
    if (imageId) {
      imageIdVar = new ReactiveVar(imageId);
    }
  },
	'change #attachment': function(evt, template) {
    /* FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err) throw err;
      });
    }); */

		var attachment = event.target.files[0];

		// Insert the image into the database
		// getting the image ID for use in the news object
		var attachmentObject = Attachments.insert(attachment);

		// The image id is stored in the image object
		var attachmentId = attachmentObject._id

		// Create a reactive var to be used when the news is added
		if (attachmentId) {
			attachmentIdVar = new ReactiveVar(attachmentId);
		}
	},
	'submit form': function (evt, template) {
		evt.preventDefault();
    var patt = new RegExp("[a-zA-z]+");

    if ($('#title').val() === '' || patt.test($('#description').summernote('code')) === false||$('input[name=netype]:checked').is(':checked')===false) {
      Bert.alert("Title, description and type cannot be emtpy.");
    } else {
      var temp = {};
  		temp.title = $('#title').val();
  		temp.description = $('#description').summernote('code');

      if (template.find('#selectCategory').value !== '') {
        temp.category = template.find('#selectCategory').value;
      }

      if (template.find('#newsKeywords').value.split(',') !== '') {
        temp.keywords = template.find('#newsKeywords').value.split(',');
      }

  		temp.type = $('input[name=netype]:checked').val();
  		temp.createdAt = moment().format('ddd, DD MMM YYYY hh:mm:ss');
      // currently same as createdAt, this might change in the future
      temp.publishedAt = moment().format('ddd, DD MMM YYYY hh:mm:ss');
      temp.publishedRawFormat = new Date();

  		if (imageIdVar.get()) {
  			temp.coverImageId = imageIdVar.get();
  		}

  		if (attachmentIdVar.get()) {
  			temp.attachmentId = attachmentIdVar.get();
  		}

  		NewsEvents.insert(temp);
      Bert.alert("New entry added.");
    }

  	//Fire the email to all subscribers
  	var news = '<header><img src="http://openstrategynetwork.com/img/osn_logoneu.png"></header><body style="background:#0B676E;color:#FFFFFF"><center>' +'<h1>New entry in our platform</h1>'+ '<h2>'+temp.title+'</h2>' + '<h3>'+temp.description+'</h3></center></body>';
    for (i = 0; i < subscribers.find().count(); i++) {
    var email_ = subscribers.find().fetch()[i].email;
      Meteor.call('sendEmail',
      email_, //To
      'Open Strategy Network <violetta.splitter@business.uzh.ch>', //from
      'Open Strategy Network news', //subject
       news+'<footer style="background:#CCCCCC;color:black;"><center><h4>To unsubscribe to our notifications go to <a href='+Meteor.absoluteUrl()+'unsubscribe?='+email_+'>http://openstrategynetwork.com/unsubscribe</a></h4><center></footer>');
    }
  }
});
