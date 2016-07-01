Router.configure({
  layoutTemplate: 'ApplicationLayout',
  loadingTemplate: 'loading',
  yieldTemplates: {
  navbar: {to: 'header'},
  footer: {to: 'footer'},
  // logInWindow: {to: 'logIn'}
  }
});

AccountsTemplates.configure({
    defaultLayout: 'ApplicationLayout',
});

// Home route
Router.route('/', {
    name: 'home',
	template: 'newsEvents',
    waitOn: function(){
        return [
            Meteor.subscribe('newsevents'),
			Meteor.subscribe('categories'),
			Meteor.subscribe('tags'),
        ]
	},
    data: function(){
        return false
    },
});

// *** ADMIN ROUTES ***

// Admin news
Router.route('/admin-news-events', {
    name: 'adminNewsEvents',
    waitOn: function(){
        return [
            Meteor.subscribe('newsevents'),
			Meteor.subscribe('images'),

        ]
	},
    data: function(){
        return false
    },
});

// News and events admin list
Router.route('/admin-news-events-list/', {
    name: 'adminNewsEventsList',
    waitOn: function(){
        return [
            Meteor.subscribe('newsevents'),
        ]
	},
    data: function(){
        return false
    },
});

// Specific news and events edit
Router.route('/admin-news-events-edit/:_id', {
    name: 'adminNewsEventsEdit',
    waitOn: function(){
        return [
            Meteor.subscribe('newsevents'),
			Meteor.subscribe('images'),
			Meteor.subscribe('attachments'),
        ]
	},
    data: function(){
        return NewsEvents.findOne({_id: this.params._id});
    },
});

// Admin publications
Router.route('/admin-publications', {
    name: 'adminPublications',
	waitOn: function(){
        return [
            Meteor.subscribe('publications'),
			Meteor.subscribe('images'),
        ]
	},
    data: function(){
        return false;
    },
});

// Admin publications list
Router.route('/admin-publications-list/', {
    name: 'adminPublicationsList',
    waitOn: function(){
        return [
            Meteor.subscribe('publications'),
        ]
	},
    data: function(){
        return false;
    },
});

// Spicific publication edit
Router.route('/admin-publications-edit/:_id', {
  name: 'adminPublicationsEdit',
    waitOn: function(){
        return [
            Meteor.subscribe('publications'),
			Meteor.subscribe('attachments'),
			Meteor.subscribe('images'),
        ]
	},
    data: function(){
        return Publications.findOne({_id: this.params._id});
    },
	action : function () {
     if (this.ready()) this.render();
	     pubEntryComplete = Publications.findOne({_id: this.params._id}); //Create an object with the full
	    //Create an array with authors / editors
        existingAuthors = [];
	    existingEditors = []
	    //Fill the array with authors data
        if(pubEntryComplete.authors){
	        for (var i = 0; i < pubEntryComplete.authors.length; i++) {
                existingAuthors.push({valueFirst: pubEntryComplete.authors[i].firstName, valueLast: pubEntryComplete.authors[i].lastName});
            }
	    }
        //Fill the array with editors data
        if (pubEntryComplete.editors) {
            for (var i = 0; i < pubEntryComplete.editors.length; i++) {
                existingEditors.push({valueFirst: pubEntryComplete.editors[i].firstName, valueLast: pubEntryComplete.editors[i].lastName});
            }
        }
	    //Update Session variables
             Session.set("inputsExistingAuthors", existingAuthors);
            Session.set("inputsExistingEditors", existingEditors);
    },
});

// Admin members
Router.route('/admin-members-list', {
    name: 'adminMembersList',
    waitOn: function(){
        return [
            Meteor.subscribe('users')
        ]
    },
    data: function(){
        return false;
    },
});

// Member edit by admin
Router.route('/member-edit/:_id',{name:'memberEdit',
    waitOn: function(){
        return [
            Meteor.subscribe('users'),
			Meteor.subscribe('allSubscribers'),
        ]
	},
    data: function(){
	    tokenUser = Meteor.users.findOne({_id: this.params._id});
        return tokenUser;
    },
});

// *** MEMBERS ROUTES ***

// Bibliography
Router.route('/bibliography', {
    name: 'bibliography',
	waitOn: function(){
        return [
            Meteor.subscribe('publications'),
			Meteor.subscribe('attachments'),
        ]
    },
    data: function(){
        return false;
    },
});

// Specific publication
Router.route('/bibliography/:_id', {
    name: 'bibliographyPage',
    waitOn: function(){
        return [
            Meteor.subscribe('publications'),
			Meteor.subscribe('attachments'),
			Meteor.subscribe('images'),
        ]
    },
    data: function(){
        return Publications.findOne({_id: this.params._id});
    },
});

// Members
Router.route('/members', {
    name: 'members',
    waitOn: function(){
        return [
            Meteor.subscribe('users')
        ]
    },
    data: function(){
        return false;
    },
});

// Profile settings
Router.route('/profile-settings', {
  name: 'profileSettings',
  waitOn: function(){
        return [
            Meteor.subscribe('users')
        ]
  },
  data: function(){
    return false;
  },
});

// Forget password
Router.route('/password-forgot', {
  name: 'PWforgot',
  waitOn: function(){
        return [
            Meteor.subscribe('users')
        ]
  },
  data: function(){
    return false;
  },
});

// Unsubscribe
Router.route('/unsubscribe', {
  name: 'unSubscribe',
  waitOn: function(){
        return [
            Meteor.subscribe('users'),
			Meteor.subscribe('allSubscribers')
        ]
  },
  data: function(){
    return false;
  },
});

// *** GUESTS ROUTES ***

// All news and events
Router.route('/news-and-events', {
  name: 'allNewsEvents',
  waitOn: function(){
        return [
            Meteor.subscribe('newsevents'),
			Meteor.subscribe('images'),

        ]
  },
  data: function(){
    return false;
  },
});

// Contact information
Router.route('/contact', {name: 'contact',
    waitOn: function(){
        return [
            Meteor.subscribe('allusers'),
            Meteor.subscribe('alluserContact'),
        ]
	},
    data: function(){
		   return{
		   toUserContact:userContact.find(),
		   }
	},
});

// About us
Router.route('/about-us', {
    name: 'aboutUs',
    waitOn: function(){
        return [
            Meteor.subscribe('alluserContact'),
			Meteor.subscribe('categories'),
			Meteor.subscribe('tags'),
        ]
    },
    data: function(){
        return {false};
    },
    action:function(){
	   if(this.ready){this.render();}
    }
});

// Specific news and events
Router.route('/news-and-events/:_id', {
    name: 'newsAndEventsPage',
    waitOn: function(){
        return [
            Meteor.subscribe('newsevents'),
			Meteor.subscribe('images'),
			Meteor.subscribe('categories'),
			Meteor.subscribe('tags'),
        ]
	},
    data: function(){
    return NewsEvents.findOne({_id: this.params._id});
    },
});

// Map join us
Router.map(function() {
    this.route('joinUs', {
        path: '/joinus',
		waitOn: function() {
           return [
            Meteor.subscribe('allusers'),
			Meteor.subscribe('allSubscribers'),
            ]
       },
    });
});
// User Accounts
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPW',
  path: '/forgot-password',
  template: 'forgotPW',
  layoutTemplate: 'ApplicationLayout',
});
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp', {
  redirect: '/profile-settings'
});
AccountsTemplates.configureRoute('verifyEmail', {
  onAfterAction: function () {
      Bert.alert("Email address validated. Thank you.");
    }
});
// Tracker
Tracker.autorun(function () {
 var current = Router.current();
 Tracker.afterFlush(function () {
  // If the menu is currently open, collapse it.
  if ($('.navbar .navbar-collapse.collapse.in').length > 0) {
   $('.navbar .navbar-toggle').click();
  }
 });
});
