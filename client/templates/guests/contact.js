Template.contact.onRendered(function() {
   Meteor.subscribe('alluserContact') //Manage a userContact list
});


// the code work using modals to manage the search and add the user 
//to the contact template 

Template.contact.events({
  'click #add': function(e) {
    e.preventDefault();
    
    $('#userContactModal').modal('show');
  },
  'submit #test': function(e){
	e.preventDefault();
	userId2 = $(e.target).find('[name=userContactId]').val();
    Session.set('contactId', userId2);
	console.log(userId2);
    $('#editContactModal').modal('show');
  },
  'submit #eliminarUsuario':function(e){
		 e.preventDefault();
    userId1 = $(e.target).find('[name=userId]').val();
	var msj = confirm('¿Are you shure that you want to delete this contact from the list?');
	    if(msj==true){
	    //Meteor.users.remove({_id: userId1});
		Meteor.call('deleteContact',userId1);
	    };
    console.log(userId1);
	   
	}
});