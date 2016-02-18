Tracker.autorun(function () {
  console.log("The choice is: " + Session.get("outletChoice"));
});

Template.adminPublications.onCreated(function() {
  Session.set('inputs', []); // on page load, no inputs
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
	inputs: function () {
    return Session.get('inputs');
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
		} else {
			Session.set("outletChoice", "bc");
		}		
	},
	'click #add-input': function () {
    var inputs = Session.get('inputs');
    var uniqid = Math.floor(Math.random() * 100000); // Give a unique ID so you can pull _this_ input when you click remove
    inputs.push({uniqid: uniqid, value: ""});
    Session.set('inputs', inputs);
  	},
	'submit form': function (evt, temp) {
		evt.preventDefault();
		var newAuthors = [];
		inputs = Session.get('inputs');
		_.each(inputs, function(input) { 
		  newAuthors.push($('#' + input.uniqid).val());
		});

		// add the first (i.e, default) author to the array
		newAuthors.unshift($('#firstAuthor').val()); 

		Publications.insert({
			title: $('#title').val(),
			//authors: [$('#authors').val()],
			authors: newAuthors,
			year: $('#year').val(),
			type: $('input[name=outlet-type]:checked').val(),
			abstract: $('#abstract').summernote('code'),

			// Published Paper (pp)
			journal: $('#journal').val(),
			pages: $('#pages').val(),

			// Book (bk)
			publisher: $('#publisher').val(),
			location: $('#location').val(),

			createdAt: new Date ()
		});

		$('#addPub')[0].reset();
		$('#abstract').summernote('code', '');

		// $('#title').val('');
		// $('#authors').val('');
		// $('#year').val('');
		// $('#abstract').val('');
		// $("input:radio").removeAttr("checked");

		console.log("done");
	}
});
