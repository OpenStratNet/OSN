Meteor.startup(function () {
	Meteor.methods({
    'subscribers':function(){
		console.log(subscribers.find().count());
	},
	'sendEmail': function (to, from, subject, text) {
    // check([to, from, subject, text], [String]);
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: text
    });
    }
	});
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
          "abstract": "Crowdsourcing is typically associated with the incorporation of company-external stakeholders such as customers in the value creating process. This article proposes a framework for a company-internal application of crowdsourcing methods. It presents a set of five goals companies can pursue employing internal crowdsourcing. The practical approach of an Austrian medium-sized technology company is described in detail, including insights on software design and appropriate procedures.",
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
		    "lastmodifiedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss'),
        "publishedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss')  	
			},
			{
		    "title": "A Dummy News",
		    "description": "Lorem ipsum dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut Management",
		    "type": "news",
		   	"lastmodifiedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss'),
        "publishedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss')   
	   },
     {
        "title": "A Dummy News",
        "description": "Lorem ipsum dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut Management",
        "type": "news",
        "lastmodifiedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss'),
        "publishedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss')   
     },
     {
        "title": "A Dummy Event",
        "description": "Lorem ipsum dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut Management",
        "type": "event",
        "lastmodifiedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss'),
        "publishedAt": moment().format('ddd, DD MMM YYYY hh:mm:ss')   
     }]

    	_.each(protoNE, function(doc) {
    	  NewsEvents.insert(doc);
    	})

    	console.log("NewsEvents edited");
    }

    if (!Meteor.users.findOne()){
      // add a date field
      Meteor.users.before.insert(function (userId, doc) {
        doc.createdAt = new Date();
      });
      // first User
      var email1 = "amirrahbaran@hotmail.com";
      var firstName1 = "Amir", lastName1 = "Rahbaran", institution1 = "OEV", interests1 = "Crowdsourcing, Strategy", position1 = "BC", password1: "test123";
      console.log("creating " + firstName1 + "  with password 'test123' and  email: " + email1);
      Meteor.users.insert({profile:{firstName:firstName1, lastName:lastName1, institution: institution1, interests:interests1, position:position1, email: email1}, emails:[{address:email1}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      // second user
      var email2 = "amirrahbaran@hotmail_cool.com";
      var firstName2 = "Richard", lastName2 = "Whittington", institution2 = "Saïd Business School", interests2 = "Dimensions and types of openness in strategizing", position2 = "Professor", password2: "test123";
      console.log("creating " + firstName2 + "  with password 'test123' and  email: " + email2);
      Meteor.users.insert({profile:{firstName:firstName2, lastName:lastName2, institution: institution2, interests:interests2, position:position2, email: email2}, emails:[{address:email2}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      // third user
      var email3 = "amirrahbaran@hotmail_cool1.com";
      var firstName3 = "Julia", lastName3 = "Hautz", institution3 = "University of Innsbruck", interests3 = "Online innovation communities", position3 = "Assistant professor", password3: "test123";
      console.log("creating " + firstName3 + "  with password 'test123' and  email: " + email3);
      Meteor.users.insert({profile:{firstName:firstName3, lastName:lastName3, institution: institution3, interests:interests3, position:position3, email: email3}, emails:[{address:email3}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      // forth user
      var email4 = "amirrahbaran@hotmail__cool2.com";
      var firstName4 = "Violetta", lastName4 = "Splitter", institution4 = "University of Zurich", interests4 = "Power and knowledge in open strategizing", position4 = "Assistant professor", password4: "test123";
      console.log("creating " + firstName4 + "  with password 'test123' and  email: " + email4);
      Meteor.users.insert({profile:{firstName:firstName4, lastName:lastName4, institution: institution4, interests:interests4, position:position4, email: email4}, emails:[{address:email4}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      // fifth user
      var email5 = "amirrahbaran@hotmail__cool3.com";
      var firstName5 = "David", lastName5 = "Seidl", institution5 = "University of Zurich", interests5 = "Power and knowledge in open strategizing", position5 = "Professor", password5: "test123";
      console.log("creating " + firstName5 + "  with password 'test123' and  email: " + email5);
      Meteor.users.insert({profile:{firstName:firstName5, lastName:lastName5, institution: institution5, interests:interests5, position:position5, email: email5}, emails:[{address:email5}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
    } 
  });