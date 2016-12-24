imageIdVar = new ReactiveVar(false);
attachmentIdVar = new ReactiveVar(false);
Meteor.subscribe('tags'); //Subscribe to the tags collection
Meteor.subscribe('categories'); //Subscribe to the categories collection

Template.adminNewsEvents.helpers({
  allCategories: function () {
    return Categories.find();
  },
  afterLoad: function(){ //Fire the code when the page is full loaded.
	Meteor.setTimeout(function(){ //Latency compensation 0.5sec
    $('#description').summernote({
      callbacks: {
        onPaste: function (e) {
            var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
            e.preventDefault();
            document.execCommand('insertText', false, bufferText);
            console.log("pasted!");
        }
      },
    	height: 200,
    	toolbar: [
  	   // [groupName, [list of button]]
    	['style', ['style']],
       	['font', ['bold', 'italic', 'underline', 'clear']],
       	//['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
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
              Meteor.call('insertCategory',item.toLowerCase()); //Stores the category always in lower case.
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
                // TODO: figure out how to limit duplicate tags
                // e.g. 'Beans' and 'beans'
                // unless this is not an issue
                Meteor.call('insertTag',item.toLowerCase()); //Tags scored in lower case.
            }
        }
    });
	$('#preLoad').show(); //Display the html container when the back-end are ready.
	return false;
    },500);
	}
});

Template.adminNewsEvents.events({
  'change #coverImage': function(event, temp) {
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
    var imageId = imageObject._id;

    // Create a reactive var to be used when the news is added
    if (imageId) {
      imageIdVar = new ReactiveVar(imageId);
    }
  },
	'change #attachment': function(event, template) {
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
		var attachmentId = attachmentObject._id;

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
      temp.cleanDescription = $('#description').summernote('code').replace(/<\/?[^>]+(>|$)|(&nbsp;)|(&amp;)/g, "");

      if (template.find('#selectCategory').value !== '') {
        temp.category = template.find('#selectCategory').value;
      }

      if (template.find('#newsKeywords').value.split(',') !== '') {
        temp.keywords = template.find('#newsKeywords').value.split(',');
      }

  		temp.type = $('input[name=netype]:checked').val();
  		temp.createdAt = moment().format('ddd, DD MMM YYYY hh:mm:ss ZZ');
      // currently same as createdAt, this might change in the future
      temp.publishedAt = moment().format('ddd, DD MMM YYYY hh:mm:ss ZZ');
      temp.publishedRawFormat = new Date();

  		if (imageIdVar.get()) {
  			temp.coverImageId = imageIdVar.get();
  		}

  		if (attachmentIdVar.get()) {
  			temp.attachmentId = attachmentIdVar.get();
  		}

      Meteor.call('NewsEvents.insert', temp, function (err, result) {
        if(!err) {
          // assuming that `result` will be the _id of the inserted object!!
          var link = result;
          //Fire the email to all Subscribers
          var news = '<header><img src="http://openstrategynetwork.com/img/osn_logoneu.png"></header><body style="background:#0B676E;color:#FFFFFF"><center>' +'<a style:"text-decoration: none !important;" href='+Meteor.absoluteUrl()+'news-and-events/'+link+'><h1>New entry in our platform</h1></a>'+ '<h2>'+temp.title+'</h2>' + '<h3>'+temp.cleanDescription+'</h3></center></body>';
          for (i = 0; i < Subscribers.find().count(); i++) {
            var email_ = Subscribers.find().fetch()[i].email;
            Meteor.call('sendEmail',
            email_, //To
            'Open Strategy Network <violetta.splitter@business.uzh.ch>', //from
            'Open Strategy Network News and Events', //subject
             news +
             '<footer style="background:#CCCCCC;color:black;"><center><h4>To see all news go to <a href='+Meteor.absoluteUrl()+'news-and-events'+'>http://openstrategynetwork.com/news-and-events</a></h4><center><center><h4>To unsubscribe to our notifications go to <a href='+Meteor.absoluteUrl()+'unsubscribe?='+email_+'>http://openstrategynetwork.com/unsubscribe</a></h4><center></footer>');
             Bert.alert("New entry added.");
          }
        } else {
          Bert.alert(err);
        }
      });
    }
   }
});
