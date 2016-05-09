UI.registerHelper('attachmentExists', function(){
  return (this.attachmentId) ? true : false;
});

UI.registerHelper('imageExists', function(){
  return (this.coverImageId) ? true : false;
});

// necessary as entries without keywords, are still stored in the DB as [""]
UI.registerHelper('keywordsExist', function(){
  var eventKeywords = NewsEvents.findOne( {_id:this._id} );
  if( eventKeywords && eventKeywords.keywords[0] === "" ) {
   return false;
 } else {
   return true;
 }
});
