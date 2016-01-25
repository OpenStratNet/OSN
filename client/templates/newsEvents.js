Session.setDefault('newsEventsView', 'newsEventsView');

Template.newsEvents.helpers({
  newsEventsData: function () {
    // return NewsEvents.find({Session.get('newsEventsView')}, {sort: {createdAt: -1}, limit: 3});
    return NewsEvents.find({type: { $in: Session.get('newsEventsView')}}, {sort: {createdAt: -1}, limit: 3});
  }
});

Template.newsEvents.events({
	'click #js-seeAll': function (evt, tpl) {
		//Session.set('newsEventsView', '$or: [ { type: "news" }, { type: "event" } ]');
		Session.set('newsEventsView', [ "news", "event" ]);
	},
	'click #js-seeNews': function (evt, tpl) {
		//Session.set('newsEventsView', 'type: "news"');
		Session.set('newsEventsView', ['news']);
	},
	'click #js-seeEvents': function (evt, tpl) {
		//Session.set('newsEventsView', 'type: "event"');
		Session.set('newsEventsView', ['event']);
	}
});