Session.setDefault('newsEventsViewMain', [ "news", "event" ]);
Session.setDefault('newsEventsSeeMore', "no");

Template.newsblock.helpers({
  newsEventsData: function () {
    if(Session.equals("newsEventsSeeMore","no")) {
       return NewsEvents.find({type: { $in: Session.get('newsEventsViewMain')}}, {sort: {createdAt: -1}, limit: 3});
    }
    else {
      return NewsEvents.find({type: { $in: Session.get('newsEventsViewMain')}}, {sort: {createdAt: -1}});
    }
  },
  imageExists: function () {
    // return NewsEvents.findOne({_id:this._id},{coverImageId: { $exists: true } });
    var event = NewsEvents.findOne( {_id:this._id} );
    if ( event && event.coverImageId ) {
      return true;
    } else {
      return false;
    }
},
  calcRow: function (index) {
      console.log(index);
      if(index % 3 === 0)
        this.newrow = true;
        else
        this.newrow = false;
      //return false;
  },
  beginningTag: function(){
      return '<div class="row text-left">';
  },
  closingTag: function(){
      return '</div>';
  }
});

Template.allNewsEvents.events({
  'click #js-seeAllMain': function (evt, tpl) {
    //Session.set('newsEventsView', '$or: [ { type: "news" }, { type: "event" } ]');
    Session.set('newsEventsViewMain', [ "news", "event" ]);
    $('#js-seeAllMain').addClass("active");
    $('#js-seeNewsMain').removeClass("active");
    $('#js-seeEventsMain').removeClass("active");
  },
  'click #js-seeNewsMain': function (evt, tpl) {
    //Session.set('newsEventsView', 'type: "news"');
    Session.set('newsEventsViewMain', ['news']);
    $('#js-seeNewsMain').addClass("active");
    $('#js-seeAllMain').removeClass("active");
    $('#js-seeEventsMain').removeClass("active");
  },
  'click #js-seeEventsMain': function (evt, tpl) {
    //Session.set('newsEventsView', 'type: "event"');
    Session.set('newsEventsViewMain', ['event']);
    $('#js-seeEventsMain').addClass("active");
    $('#js-seeAllMain').removeClass("active");
    $('#js-seeNewsMain').removeClass("active");
  },
  'click .js-seeMoreNE': function (evt, tpl) {
    evt.preventDefault();
    Session.set("newsEventsSeeMore", "yes");
  }
});
