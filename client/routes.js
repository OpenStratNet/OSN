Router.configure({
     layoutTemplate: 'ApplicationLayout',
     yieldTemplates: {
      navbar: {to: 'header'},
      footer: {to: 'footer'}
     }
 });

AccountsTemplates.configure({
    defaultLayout: 'myLayout',
});

Router.route('/', {
  name: 'home',
  template: 'newsEvents'
});

// *** ADMIN ROUTES ***

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

Router.route('/admin-publications-edit/:_id', {
  name: 'adminPublicationsEdit',
  data: function(){
    return Publications.findOne({_id: this.params._id});
  }
});

//admin members
Router.route('/admin-members-list', {
  name: 'adminMembersList'
});

// *** MEMBERS ROUTES ***

// bibliography
Router.route('/bibliography', {
  name: 'bibliography'
});

// specific publication
Router.route('/bibliography/:_id', {
  name: 'bibliographyPage',
  data: function(){
    return Publications.findOne({_id: this.params._id});
  }
});

Router.route('/members', {
  name: 'members'
});

Router.route('/profile-settings', {
  name: 'profileSettings'
});

// *** GUESTS ROUTES ***

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


// User Accounts
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp', {
  redirect: '/profile-settings'
});
// AccountsTemplates.configureRoute('verifyEmail');
