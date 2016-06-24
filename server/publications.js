Meteor.publish('publications', function () {
  return Publications.find();
});

Meteor.publish('newsevents', function () {
  return NewsEvents.find();
});

Meteor.publish('tags', function () {
  return Tags.find();
});

Meteor.publish('categories', function () {
  return Categories.find();
});

Meteor.publish('images', function () {
  return Images.find();
});

Meteor.publish('attachments', function () {
  return Attachments.find();
});

Meteor.publish('profilePic', function () {
  return ProfilePic.find();
});

Meteor.publish('users', function () {
  return Meteor.users.find();
});
//Allow rules
Meteor.users.allow({
        "update": function (userId, doc) {
            return true; 
        }
    });
Meteor.users.allow({
        "remove": function (userId, doc) {
            return true; 
        }
    });
Meteor.users.allow({
        "insert": function (userId, doc) {
            return true; 
        }
    });

//Some publications for the implemented solutions.
Meteor.publish('allSubscribers',function(){
	return Subscribers.find();
});

Meteor.publish('alluserContact',function(){
	return userContact.find();
});

Meteor.publish('allusers',function(){
	return Meteor.users.find();
});

Meteor.publish('alltags',function(){
	return Tags.find();
});

Meteor.publish('allcategories',function(){
	return Categories.find();
});

