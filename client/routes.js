Router.configure({
     layoutTemplate: 'ApplicationLayout'
 });

// specify the top level route, the page users see when they arrive at the site
Router.route('/', function() {
 this.render("navbar", {
     to: "header"
 });
 this.render("newsEvents", {
     to: "main"
 });
});

Router.route('/admin-news-events', {
	name: 'adminNewsEvents'
});

Router.route('/admin-publications', {
	name: 'adminPublications'
});

Router.route('/bibliography', {
	name: 'bibliography'
});

Router.route('/news-and-events/', {
	name: 'allNewsEvents'
});

Router.route('/news-and-events/:_id', {
	name: 'newsAndEventsPage',
	data: function(){
        return NewsEvents.findOne({_id: this.params._id});;
    }
});