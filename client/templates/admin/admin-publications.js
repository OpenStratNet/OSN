Template.adminPublications.events({
	'submit form': function (evt, temp) {
		evt.preventDefault();
		Publications.insert({
			title: $('#title').val(),
			authors: [$('#authors').val()],
			year: $('#year').val(),
			type: $('input[name=outlet-type]:checked').val(),
			abstract: $('#abstract').val(),
			createdAt: new Date ()
		});

		$('#title').val('');
		$('#authors').val('');
		$('#year').val('');
		$('#abstract').val('');
		$("input:radio").removeAttr("checked");

		console.log("done");
	}
});