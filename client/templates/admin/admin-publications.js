attachmentIdVar = new ReactiveVar(false);

Tracker.autorun(function () {
  console.log("The choice is: " + Session.get("outletChoice"));
  console.log("attachmentIdVar: " + attachmentIdVar.get());
});

Template.adminPublications.onCreated(function() {
  Session.set('inputsAuthors', []); // on page load, no inputs
  Session.set('inputsEditors', []); // on page load, no inputs
  Session.setDefault("outletChoice","");
});

Template.adminPublications.onRendered(function() {
  $(document).ready(function() {
    $('#abstract').summernote({
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
});


Template.adminPublications.helpers({
	ppSelected: function () {
		if (Session.get("outletChoice") === "pp") {
			return true;
		};
	},
	bkSelected: function () {
		if (Session.get("outletChoice") === "bk") {
			return true;
		};
	},
	bcSelected: function () {
		if (Session.get("outletChoice") === "bc") {
			return true;
		};
	},
	inputsAuthors: function () {
    return Session.get('inputsAuthors');
  },
  inputsEditors: function () {
    return Session.get('inputsEditors');
  }
});

Template.adminPublications.events({
	'change .js-radios': function (evt, temp) {
		evt.preventDefault();
		if ($('input[name=outlet-type]:checked').val() === "wp") {
			Session.set("outletChoice", "wp");
		} else if ($('input[name=outlet-type]:checked').val() === "pp") {
			Session.set("outletChoice", "pp");
		} else if ($('input[name=outlet-type]:checked').val() === "bk") {
			Session.set("outletChoice", "bk");
		} else if ($('input[name=outlet-type]:checked').val() === "bc") {
			Session.set("outletChoice", "bc");
		}
	},
	'click #js-addAuthors': function () {
    var inputsAuthors = Session.get('inputsAuthors');
    var uniqidFirst = Math.floor(Math.random() * 100000); // Give a unique ID so you can pull _this_ input when you click remove
    var uniqidLast = Math.floor(Math.random() * 100000);
    inputsAuthors.push({uniqidFirst: uniqidFirst, valueFirst: "", uniqidLast: uniqidLast, valueLast: ""});
    Session.set('inputsAuthors', inputsAuthors);
	},
	'click #js-addEditors': function () {
    var inputsEditors = Session.get('inputsEditors');
    var uniqidFirst = Math.ceil(Math.random() * 100000); // Give a unique ID so you can pull _this_ input when you click remove
    var uniqidLast = Math.floor(Math.random() * 100000);
    inputsEditors.push({uniqidFirst: uniqidFirst, valueFirst: "", uniqidLast: uniqidLast, valueLast: ""});
    Session.set('inputsEditors', inputsEditors);
	},
  'change #attachment': function(event, temp) {
    var attachment = event.target.files[0];

    // Insert the image into the database
    // getting the image ID for use in the course object
    var attachmentObject = Attachments.insert(attachment);

    // The image id is stored in the image object
    var attachmentId = attachmentObject._id;

    // Create a reactive var to be used when the course is added
    if (attachmentId) {
      attachmentIdVar = new ReactiveVar(attachmentId);
    }
  },
	'submit form': function (evt, temp) {
		evt.preventDefault();
    // store outlet option for adding into the DB
    var selectedOutlet = "";

    if (Session.get("outletChoice") === "pp") {
      selectedOutlet = "Published Paper";
    }
    else if (Session.get("outletChoice") === "bk") {
      selectedOutlet = "Book";
    }
    else if (Session.get("outletChoice") === "bc") {
      selectedOutlet = "Book Chapter";
    }
    else {
      selectedOutlet = "Working Paper";
    }

    // temp necessary for attachments
    var temp = {};
    if (attachmentIdVar.get()) {
      temp.attachmentId = attachmentIdVar.get();
    }

		var newAuthors = [];
    // make a field full name field for the easysearch package
    var newAuthorsFullName = [];
		inputsAuthors = Session.get('inputsAuthors');
		_.each(inputsAuthors, function(input) {
      newAuthors.push({firstName: $('#' + input.uniqidFirst).val(), lastName: $('#' + input.uniqidLast).val()});
      newAuthorsFullName.push($('#' + input.uniqidFirst).val() + ' ' + $('#' + input.uniqidLast).val());
		});

		var newEditors = [];
    // make a field full name field for the easysearch package
    var newEditorsFullName = [];
		inputsEditors = Session.get('inputsEditors');
		_.each(inputsEditors, function(input) {
		  newEditors.push({firstName: $('#' + input.uniqidFirst).val(), lastName: $('#' + input.uniqidLast).val()});
      newEditorsFullName.push($('#' + input.uniqidFirst).val() + ' ' + $('#' + input.uniqidLast).val());
		});

		// add the first (i.e, default) author to the array
		newAuthors.unshift({firstName: $('#firstAuName').val(), lastName: $('#lastAuName').val()});
    newAuthorsFullName.unshift($('#firstAuName').val() + ' ' + $('#lastAuName').val());
		newEditors.unshift({firstName: $('#firstEdName').val(), lastName: $('#lastEdName').val()});
    newEditorsFullName.unshift($('#firstAuName').val() + ' ' + $('#lastAuName').val());

    Meteor.call('NewsEvents.insert', {
      title: "A New Publication Added to Bibliography",
      description: "The publication \"" + $('#title').val() + "\" was added to the bibliography. ",
      type: "news",
      createdAt: moment().format('ddd, DD MMM YYYY hh:mm:ss'),
      publishedAt: moment().format('ddd, DD MMM YYYY hh:mm:ss'),
      publishedRawFormat: new Date(),
      keywords: ["publication"]
    });

		Meteor.call('Publications.insert', {
			title: $('#title').val(),
			//authors: [$('#authors').val()],
      fullNameAuthors: newAuthorsFullName,
			authors: newAuthors,
      fullNameEditors: newEditorsFullName,
			editors: newEditors,
			year: $('#year').val(),
      link: $('#link').val(),
			type: $('input[name=outlet-type]:checked').val(),
			abstract: $('#abstract').summernote('code'),
      outlet: selectedOutlet,

			// Published Paper (pp)
			journal: $('#journal').val(),
			// Published Paper (pp) or Book Chapter (bc)
			pages: $('#pages').val(),

			// Book (bk) or Book Chapter (bc)
			publisher: $('#publisher').val(),
			location: $('#location').val(),

      attachmentId: temp.attachmentId,
			createdAt: new Date ()
		});
        //Fire the email to all subscriptors
		var publication = '<header><img src="http://openstrategynetwork.com/img/osn_logoneu.png"></header><body style="background:#0B676E;color:#FFFFFF"><center>' +'<h1>New publication uploaded to our platform!</h1>'+ '<h2>Title: '+$('#title').val()+'</h2>' + '<h2>Abstract:</h2>'+'<h3>'+$('#abstract').summernote('code')+'</h3></center></body>';
            for (i = 0; i < Subscribers.find().count(); i++) {
            var email_ = Subscribers.find().fetch()[i].email;
	            Meteor.call('sendEmail',
	                         email_, //To
                            'Open Strategy Network <violetta.splitter@business.uzh.ch>', //from
                            'New publication in Open Strategy Network', //subject
                             publication+'<footer style="background:#CCCCCC;color:black;"><center><h4>To unsubscribe to our notifications go to <a href='+Meteor.absoluteUrl()+'unsubscribe?='+email_+'>http://openstrategynetwork.com/unsubscribe</a></h4><center></footer>');
            }

		$('#addPub')[0].reset();
		$('#abstract').summernote('code', '');

		// $('#title').val('');
		// $('#authors').val('');
		// $('#year').val('');
		// $('#abstract').val('');
		// $("input:radio").removeAttr("checked");

		Bert.alert("Publication added to bibliography.");
	}
});
