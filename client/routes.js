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

// admins routes

// admin news
Router.route('/admin-news-events', {
	name: 'adminNewsEvents'
});

Router.route('/admin-news-events-list/', {
	name: 'adminNewsEventsList'
});

Router.route('/admin-news-events-edit/:_id', {
	name: 'adminNewsEventsEdit',
	data: function(){
        return NewsEvents.findOne({_id: this.params._id});
    }
});

//admin publications
Router.route('/admin-publications', {
	name: 'adminPublications'
});

Router.route('/admin-publications-list/', {
	name: 'adminPublicationsList'
});

Router.route('/admin-publications-list/:_id', {
	name: 'adminPublicationsEdit',
	data: function(){
        return Publications.findOne({_id: this.params._id});
    }
});

// members routes
Router.route('/bibliography', {
	name: 'bibliography'
});


// guests routes 
Router.route('/news-and-events/', {
	name: 'allNewsEvents'
});

Router.route('/news-and-events/:_id', {
	name: 'newsAndEventsPage',
	data: function(){
        return NewsEvents.findOne({_id: this.params._id});
    }
});