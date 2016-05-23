UI.registerHelper('linkExists', function(){
  return (this.link) ? true : false;
});

UI.registerHelper('attachmentExists', function(){
  return (this.attachmentId) ? true : false;
});

UI.registerHelper('imageExists', function(){
  return (this.coverImageId) ? true : false;
});

// necessary as entries without keywords, are still stored in the DB as [""]
UI.registerHelper('keywordsExist', function(){
  var eventKeywords = NewsEvents.findOne( {_id:this._id} );
  if( eventKeywords && eventKeywords.keywords && eventKeywords.keywords[0] !== "" ) {
   return true;
 } else {
   return false;
 }
});
