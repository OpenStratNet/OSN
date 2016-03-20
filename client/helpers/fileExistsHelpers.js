UI.registerHelper('attachmentExists', function(){
  return (this.attachmentId) ? true : false;
});

UI.registerHelper('imageExists', function(){
  return (this.coverImageId) ? true : false;
});

