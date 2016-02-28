Meteor.startup(function () {
    // code to run on server at startup
    if (Publications.find().count() === 0) {
    	var protopubs = [
        {
  	    	"authors": [{
  		        "lastName": "Chesbrough",
  		        "firstName": "Henry W."
  		    }, {
  		        "lastName": "Appleyard",
  		        "firstName": "Melissa M."
  		    	}],
  		    "title": "Open innovation and strategy",
  		    "outlet": "California management review, 50 (1)",
  		    "year": "2007",
  		   	"abstract": "No Abstract ...",
          "type": "pp"
  			},
  			{
  			"authors": [{
  		        "lastName": "Whittington",
  		        "firstName": "Richard"
  		    }, {
  		        "lastName": "Cailluet",
  		        "firstName": "Ludovic "
  		    }, {
              "lastName": "Douglas",
              "firstName": "Basak Yakis "
          }],
  		    "title": "Opening strategy: Evolution of a precarious profession",
  		    "outlet": "British Journal of Management, 22 (3)",
  		    "year": "2011",
  		   	"abstract": "No Abstract ...",
          "type": "pp"
  	   },
       {
       "authors": [{
              "lastName": "Stieger",
              "firstName": "D."
          }, {
              "lastName": "Matzler",
              "firstName": "K."
          }, {
              "lastName": "Chatterjee",
              "firstName": "S."
          }, {
              "lastName": "Ladstaetter-Fussenegger",
              "firstName": "F."
          }],
          "title": "Democratizing Strategy",
          "outlet": "California Management Review, 54 (4)",
          "year": "2012",
          "abstract": "No Abstract ...",
          "type": "pp"
       },
       {
       "authors": [{
              "lastName": "Dobusch",
              "firstName": "Leonhard"
          }, {
              "lastName": "Kapeller",
              "firstName": "Jakob"
          }],
          "title": "Open Strategy between Crowd and Community: Lessons from Wikimedia and Creative Commons",
          "outlet": "Working Paper",
          "year": "2013",
          "abstract": "No Abstract ...",
          "type": "wp"
       }
     ]

    	_.each(protopubs, function(doc) {
    	  Publications.insert(doc);
    	})

    	console.log("Publication edited");
    }

    if (NewsEvents.find().count() === 0) {
    	var protoNE = 
    	[{
		    "title": "EGOS 2015 reminder: Open Organizations for an Open Society?",
		    "description": "Open Organizations for an Open Society? Practicing Openness in Innovation, Strategy and Beyond; Convenors: Leonhard Dobusch, Freie Universität Berlin, Georg von Krogh, ETH Zurich, Switzerland, Richard Whittington, Oxford University, Link to website: : http://bit.ly/EGOS15Open",
		    "type": "event",
		    "createdAt": new Date ()   	
			},
			{
		    "title": "A Dummy News",
		    "description": "Lorem ipsum dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut Management",
		    "type": "news",
		   	"createdAt": new Date ()
	   },
     {
        "title": "A Dummy News",
        "description": "Lorem ipsum dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut Management",
        "type": "news",
        "createdAt": new Date ()
     },
     {
        "title": "A Dummy Event",
        "description": "Lorem ipsum dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut Management",
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