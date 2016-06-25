// Facebook OAuth configuration

if (ServiceConfiguration.configurations.find({
    service: 'facebook'
  }).count() === 0) {
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1500708243571026',
    secret: 'b10ee6994af8939f1c115ef17474371d',
    loginStyle: 'popup'
  });
}

// Twitter OAuth configuration

if (ServiceConfiguration.configurations.find({
    service: 'twitter'
  }).count() === 0) {
  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'tJJweEId9awHlUneBpXmahwNY',
    secret: 'kzHXK8kWrCK7QSBzoAMMlp9mwTjZAJZLofqDKjD2IYvmjSP3S9',
    loginStyle: 'popup'
  });
}

// Google OAuth configuration

if (ServiceConfiguration.configurations.find({
    service: 'google'
  }).count() === 0) {
  ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: '1009110627731-2bi6i78d9huq5gn4md4b5vp767jis15m.apps.googleusercontent.com',
    secret: 'a111bjM1IQJxt6hZdlNgydqh',
    loginStyle: 'popup'
  });
}

// Linked OAuth configuration

if (ServiceConfiguration.configurations.find({
    service: 'linkedin'
  }).count() === 0) {
  ServiceConfiguration.configurations.insert({
    service: 'linkedin',
    clientId: '77j0gw7okzkz6r',
    secret: 'IvRdBdBUBu6PI6Ew',
    loginStyle: 'popup'
  });
}

Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    user.profile = options.profile;
    user.profile.fullName = options.profile.firstName + ' ' + options.profile.lastName;
    user.profile.email = options.email;
	Subscribers.insert({email: user.profile.email}); //Insert the email on the Subscribers collection for the first time.

  } else {
    user.profile = {};
  }

// Alternative to useraccounts package: send verfication email manually
  /*if (options.email) {
      Meteor.setTimeout(function () {
        Accounts.sendVerificationEmail(user._id);
      }, 2 * 1000);
    }*/

  //pass over api-service-values to the profile

  if (user.services.facebook) {
    // Meteor.users.before.insert(function (userId, doc) {
    //   doc.emails[{address: email}] = user.services.facebook.email;
    //   console.log("createdBefore");
    // });
    user.profile.firstName = user.services.facebook.first_name;
    user.profile.lastName = user.services.facebook.last_name;
	  user.profile.fullName = user.services.facebook.first_name + ' ' + user.services.facebook.last_name;
    user.profile.gender = user.services.facebook.gender;
    user.profile.email = user.services.facebook.email;
    user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
	Subscribers.insert({email: user.profile.email}); //Insert the email on the Subscribers collection for the first time.
    // Meteor.users.after.insert(function (userId, doc) {
    //   user.emails[address] = user.services.facebook.email;
    //   console.log("createdAfter");
    // });

  }

  if (user.services.google) {
    user.profile.firstName = user.services.google.given_name;
    user.profile.lastName = user.services.google.family_name;
	  user.profile.fullName = user.services.google.given_name + ' ' + user.services.google.family_name;
    user.profile.gender = user.services.google.gender;
    user.profile.email = user.services.google.email;
    user.profile.picture = user.services.google.picture;
	Subscribers.insert({email: user.profile.email}); //Insert the email on the Subscribers collection for the first time.
  }

  if (user.services.twitter) {
    // user.profile.firstName = user.services.twitter.name;
    user.profile.screenName = user.services.twitter.screenName;
    user.profile.picture = user.services.twitter.profile_image_url

    // Get the first part of the screen name if screen name consists of at least two parts
    var fullScreenName = user.services.twitter.screenName;

    if (fullScreenName.indexOf(' ') === -1 && fullScreenName.indexOf('_') === -1) {
      user.profile.firstName  = fullScreenName;
    }
    else if (fullScreenName.indexOf(' ') >= 0) {
      user.profile.firstName  = fullScreenName.substring(0, fullScreenName.indexOf(' '));
    }
    else if (fullScreenName.indexOf('_') >= 0) {
      user.profile.firstName  = fullScreenName.substring(0, fullScreenName.indexOf('_'));
    }
  }

  if (user.services.linkedin) {
    user.profile.firstName = user.services.linkedin.firstName;
    user.profile.lastName = user.services.linkedin.lastName;
    user.profile.fullName = user.services.linkedin.firstName + ' ' + user.services.linkedin.lastName;
    user.profile.email = user.services.linkedin.emailAddress;
    user.profile.picture = user.services.linkedin.pictureUrl;
	Subscribers.insert({email: user.profile.email}); //Insert the email on the Subscribers collection for the first time.
  }

  return user;
});
