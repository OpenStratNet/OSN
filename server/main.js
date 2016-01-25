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
    consumerKey: 'tD8dqHGHovKH5BVN1V2RRetsn',
    secret: ' NDo8B1CrAnelbniSqfihjMrCzbVJX42804RBZBpcNH7PxKrfZm',
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
    // user.profile.institution = options.institution.profile;
    // user.institution = options.institution;
  } else {
    user.profile = {};
  }

  if (options.email) {
      Meteor.setTimeout(function () {
        Accounts.sendVerificationEmail(user._id);
      }, 2 * 1000);
    }

  //pass over api-service-values to the profile

  if (user.services.facebook) {
    user.profile.first_name = user.services.facebook.first_name;
    user.profile.last_name = user.services.facebook.last_name;
    user.profile.gender = user.services.facebook.gender;
  }

  if (user.services.linkedin) {
    user.profile.name = user.services.linked.firstName + ' ' + user.services.linked.lastName;
  }

  return user;
});