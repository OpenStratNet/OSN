Router.configure({
     layoutTemplate: 'ApplicationLayout',
     yieldTemplates: {
     	navbar: {to: 'header'}
     }
 });

AccountsTemplates.configure({
    defaultLayout: 'myLayout',
});

Router.route('/', {
  name: 'home',
  template: 'newsEvents'
});

// *** admins routes ***

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

// *** members routes ***

// bibliography
Router.route('/bibliography', {
	name: 'bibliography'
});

Router.route('/bibliography1', {
    name: 'bibliography1'
});

// *** guests routes ***

 // all news and events
Router.route('/news-and-events', {
  name: 'allNewsEvents'
});

Router.route('/contact', {
  name: 'contact'
});


// specific news and events
Router.route('/news-and-events/:_id', {
	name: 'newsAndEventsPage',
	data: function(){
        return NewsEvents.findOne({_id: this.params._id});
    }
});


// ---
Router.map(function() {
    this.route('joinUs', {
        path: '/joinus',
    });
});