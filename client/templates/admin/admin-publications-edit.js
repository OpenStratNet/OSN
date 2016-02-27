Template.adminPublicationsEdit.onRendered(function() {
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

Template.adminPublicationsEdit.helpers({
  pubEntry: function () {
    return Publications.findOne({_id: this._id});
  },
  imageExists: function () {
    return Publications.findOne({coverImageId: { $exists: true } });
  },
  attachmentExists: function () {
    return Publications.findOne({attachmentId: { $exists: true } });
  }
  // summernoteText: function() {
  //  var newsEventsEntry = NewsEvents.find({_id: this._id}); //, {description: "$('#description').summernote('code')"});
  //  var descriptionContent = newsEventsEntry.description;
  //  return $('#description').summernote('code', descriptionContent);
  //  console.log("db: " + newsEventsEntry);
  //  console.log("description: " + descriptionContent);
  //}
});