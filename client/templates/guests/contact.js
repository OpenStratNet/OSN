Template.contact.helpers ({
	normalPic:function(){
		id=this._id;
		testPic=userContact.findOne({_id:id}).profile.picture;
		    if(testPic==undefined){
				return true;
			}else{
				return false;
			}
	},
	noPic:function(){
		id=this._id;
		findPics=userContact.findOne({_id:id}).profile.picture;
		findPicn=userContact.findOne({_id:id}).profile.pictureID;
		if(findPics==undefined && findPicn==undefined || findPics==undefined && findPicn==false){
			return true;
		}else{
			return false;
		}
		
	}
})


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
	var msj = confirm('¿Are you sure that you want to delete this contact from the list?');
	    if(msj==true){
	    //Meteor.users.remove({_id: userId1});
		Meteor.call('deleteContact',userId1);
	    };
    console.log(userId1);
	   
	}
});