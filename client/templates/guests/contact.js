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
		
	},
	noAdmin:function(){
		hd=Roles.getRolesForUser(Meteor.userId()).length;
		adminRole=0;
		if(hd!=0){
			for (var i=0; i<hd; i++){
			if(Roles.getRolesForUser(Meteor.userId())=='admin'){
			adminRole=1;
		    }
		};
		if (adminRole=1){
			return true;
		}else{
			return false;
		}
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
		Meteor.call('removeAdminRole',userId1);
		//Meteor.call('toRoleAdmin',userId1,false);
	    };
    console.log(userId1);
	   
	}
});