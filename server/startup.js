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

    if (NewsEvents.find().count() === 0) {
    	var protoNE = 
    	[{
		    "title": "MongoDB: The Definitive Guide",
		    "description": "Journal  Strategic Management How does MongoDB help you... let's test it and see of Informsation Systems",
		    "type": "news",
		    "createdAt": new Date ()   	
			},
			{
		    "title": "Bricolage revisted",
		    "description": "Journal of dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut Management",
		    "type": "event",
		   	"createdAt": new Date ()
	   }]

    	_.each(protoNE, function(doc) {
    	  NewsEvents.insert(doc);
    	})

    	console.log("NewsEvents edited");
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