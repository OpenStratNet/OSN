//client only code
Template.test.onCreated(function() {
  Session.set('inputs', []); // on page load, no inputs
});

Template.test.helpers({
  inputs: function () {
    return Session.get('inputs');
  }
});

Template.test.events({
  'click #add-input': function () {
    var inputs = Session.get('inputs');
    var uniqid = Math.floor(Math.random() * 100); // Give a unique ID so you can pull _this_ input when you click remove
    inputs.push({uniqid: uniqid, value: ""});
    Session.set('inputs', inputs);
  },
  'submit': function (evt, temp) {
    evt.preventDefault();
    var newAuthors = [];
    inputs = Session.get('inputs');
    _.each(inputs, function(input) { 
      newAuthors.push($('#' + input.uniqid).val());
    });

    Meteor.call('Publications.insert', { authors: newAuthors });
  }
});

Template.input.onDestroyed(function() { 
  inputs = Session.get('inputs');
  _.each(inputs, function(input) { 
    $('#' + input.uniqid).val(input.value);
  });
});

Template.input.events({
  'click .remove-input': function() { 
    var uniqid = Template.instance().$('.test-input').attr('uniqid');
    var inputs = Session.get('inputs');
    _.each(inputs, function(input) { 
      input.value = $('#' + input.uniqid).val()
    });
    
    inputs = _.reject(inputs, function(x) { return x.uniqid == uniqid; });
    
    Session.set('inputs', inputs);
  }
});
