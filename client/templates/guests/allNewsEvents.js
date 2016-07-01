Session.setDefault('newsEventsViewMain', [ "news", "event" ]);
// set see more to yes, change later to no (when more is uplaoded)
Session.setDefault('newsEventsSeeMore', "yes");

Template.newsblock.helpers({
  newsEventsData: function () {
    if(Session.equals("newsEventsSeeMore","no")) {
       all = NewsEvents.find({type: { $in: Session.get('newsEventsViewMain')}}, {sort: {publishedRawFormat: -1}, limit: 3}).fetch();
    }
    else {
      all = NewsEvents.find({type: { $in: Session.get('newsEventsViewMain')}}, {sort: {publishedRawFormat: -1}}).fetch();
    }
    chunks = [];
    size = 3
    while (all.length > 3) {
        chunks.push({ row: all.slice(0, 3)});
        all = all.slice(3);
    }
    chunks.push({row: all});
    return chunks;
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
  // clickedAll: function () {
  //   if(Session.equals("newsEventsSeeMore","no")) {
  //     return true;
  //   }
  // }
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
