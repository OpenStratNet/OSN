//Meteor Methods.
Meteor.methods({
	//Contacts
    'insertContact': function (contact) {
      userContact.insert(contact);
    },
    'deleteContact': function (contact) {
      userContact.remove({_id: contact});
    },
    'updateUserContact': function (id, contact) {
      userContact.update({_id: id}, {$set: {profile: contact}});
    },
	//Roles
	'toRoleAdmin':function(user){
		Roles.addUsersToRoles(user, 'admin');
	},
	'removeAdminRole':function(user){
		Roles.removeUsersFromRoles(user, 'admin');
	},
	//Users
	'updateEmail':function(id,email){
		Meteor.users.update({_id:id},{$set:{'emails.0.address':email}})
	},
    'updateUser': function (id, profile) {
      Meteor.users.update({_id: id}, {$set: {profile: profile}});
    },
	'updatePassword': function(userId,password){
	  Accounts.setPassword(userId, password, {logout: false});
	},
	//Manage tags and categories
    'insertTag': function (tagname) {
      Tags.insert({"name": tagname});
    },
    'insertCategory': function (categoryname) {
      Categories.insert({"name": categoryname});
    },
	//Send emails
    'sendEmail': function (to, from, subject, text) {
      // check([to, from, subject, text], [String]);
      this.unblock();
      Email.send({
        to: to,
        from: from,
        subject: subject,
        html: text
      });
    },
	//Manage subscriptions
	'Subscribers.insert': function (email) {
        if (this.userId) {
            Subscribers.insert(email);
        }
    },
    'Subscribers.remove': function (id) {
        if (this.userId) {
            Subscribers.remove(id);
        }
    },
    'Subscribers.update': function (id, email) {
        if (this.userId) {
            Subscribers.update(id, email);
        }
    }
  });