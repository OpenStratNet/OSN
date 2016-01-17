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

Meteor.startup(function () {
    // code to run on server at startup
    if (Publications.find().count() === 0) {
    	var protopubs = [{
	    	"authors": [{
		        "lastName": "Chodorow",
		        "firstName": "Kristina"
		    }, {
		        "lastName": "Dirolf",
		        "firstName": "Michael"
		    	}],
		    "title": "MongoDB: The Definitive Guide",
		    "outlet": "Journal of Informsation Systems",
		    "year": "1998",
		   	"abstract": "How does MongoDB help you... let's test it and see"
			},
			{
			"authors": [{
		        "lastName": "Seidl",
		        "firstName": "Dada"
		    }, {
		        "lastName": "Rahbaran",
		        "firstName": "Amir"
		    }],
		    "title": "Bricolage revisted",
		    "outlet": "Journal of Strategic Management",
		    "year": "2017",
		   	"abstract": "dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni"
	   }]

    	_.each(protopubs, function(doc) {
    	  Publications.insert(doc);
    	})

    	console.log("Publication edited");
    }

    if (!Meteor.users.findOne()){
      for (var i=1;i<9;i++){
        var email = "user"+i+"@test.com";
        var username = "user"+i;
        console.log("creating a user with password 'test123' and username/ email: " + email);
        Meteor.users.insert({profile:{username:username}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      }
    } 
  });
