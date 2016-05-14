imageIdVarEdit = new ReactiveVar(false);
attachmentIdVarEdit = new ReactiveVar(false);
Meteor.subscribe('alltags'); //Subscribe to the tags collection
Meteor.subscribe('allcategories'); //Subscribe to the categories collection

  // whole document of News & Events
  // var newsEventsEntry = NewsEvents.findOne({_id: this._id}); //, {description: "$('#description').summernote('code')"});
  // var descriptionContent = newsEventsEntry.description;
  // $('#description').summernote('code', descriptionContent);

  // console.log("db: " + newsEventsEntry);
  // console.log("description: " + descriptionContent);


Template.adminNewsEventsEdit.helpers({
  newsEventsEntry: function () {
    return NewsEvents.findOne({_id: this._id});
  },
  currentTags: function(){ //This helper will find the tags asociated to the current newsEventsEntry.
	  currentNE = NewsEvents.findOne({_id: this._id}); //Find the newsEventsEntry
	  currentTag = currentNE.keywords; //Return the array of tags
	  tagsNumber = currentTag.length; //Return the number of tags asociated to this
	  if(tagsNumber){
		stringConstructor = currentTag[0];
	  for (var i=1; i<tagsNumber; i++){
	    stringConstructor = stringConstructor + ',' + currentTag[i]; //Construct a string of tags
	  };
	  return stringConstructor;
	  }else{
		  return false;
	  }
  },
  afterLoad: function(){ //Fire the code when the page is full loaded.
	Meteor.setTimeout(function(){ //Latency compensation 0.8sec
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
	// Get an array of the existing categories
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
        var existingCategory = Categories.find({"name": item.toLowerCase()}).fetch().length; //Find the category in lower case
        if (!existingCategory ) {
          // Add the tag to the Tags collection
          Categories.insert({"name": item.toLowerCase()}); //Stores the category always in lower case.
        }
      }
    });
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
            var existingTag = Tags.find({"name": item.toLowerCase()}).fetch().length; //Find the tags in lower case.
            if (!existingTag ) {
                // Add the tag to the Tags collection
                Tags.insert({"name": item.toLowerCase()}); //Tags scored in lower case.
            }
        }
    });
	$('#preLoad').show(); //Display the html container when the back-end are ready.
	return false;
    },800);
   },
    prefillCategory: function(){ //This helper will find the category of the current News Events and prefill it in selectize.
	  currentNE_ = NewsEvents.findOne({_id: this._id}); //Find the current News Events entry.
	  currentCat = currentNE_.category; //Find the category.
	  Meteor.setTimeout(function(){ //this function will delay the changes in the <select> input until the DOM are ready.
	  $('#selectCategory')[0].selectize.setValue(currentCat); //Make changes in the <select> tag via selectize functions.
	  },1200);
	  return false;
    },
});

Template.adminNewsEventsEdit.events({
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
			imageIdVarEdit = new ReactiveVar(imageId);
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
			attachmentIdVarEdit = new ReactiveVar(attachmentId);
		}
	},
	// 'click #js-delete-image': function (evt, temo) {
	// 	evt.preventDefault();

	// 	var deleteConfirmation = confirm('Really delete this entry?');

	// 	if (deleteConfirmation) {
	// 		NewsEvents.update({_id: this._id}, {$unset: {coverImageId: ""}});
	// 		Images.remove({_id: this.coverImageId});
	// 		imageIdVarEdit.set(false);
	// 	};
	// },
	// 'click #js-delete-attachment': function (evt, temo) {
	// 	evt.preventDefault();

	// 	var deleteConfirmation = confirm('Really delete this entry?');

	// 	if (deleteConfirmation) {
	// 		NewsEvents.update({_id: this._id}, {$unset: {attachmentId: ""}});
	// 		Attachments.remove({_id: this.attachmentId});
	// 		attachmentIdVarEdit.set(false);
	// 	};
	// },
	'submit form': function (evt, temp) {
		//evt.preventDefault();

		var temp = {};
		temp.title = $('#title').val();
		temp.description = $('#description').summernote('code');
		temp.type = $('input[name=netype]:checked').val();
		temp.category = $('#selectCategory')[0].value.toLowerCase(); // category are stored
        temp.keywords = $('#newsKeywords')[0].value.toLowerCase().split(','); //new keywords are stored.
		// when last time modified
        temp.modifiedAt = moment().format('ddd, DD MMM YYYY hh:mm:ss');

		if (imageIdVarEdit.get()) {
			temp.coverImageId = imageIdVarEdit.get();
		}

		if (attachmentIdVarEdit.get()) {
			temp.attachmentId = attachmentIdVarEdit.get();
		}

		Meteor.call('NewsEvents.update', this._id,temp);
		//Just for testing.
		NewsEvents.update({_id: this._id}, {$set: temp});

	}
});
