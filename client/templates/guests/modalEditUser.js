Template.modalEditUser.helpers ({
	edit:function(){
		id=Session.get('contactId');
		return userContact.findOne({_id:id});
	}
});

Template.modalEditUser.events ({
	'click #submitContact':function(e){
		e.preventDefault();
		id=Session.get('contactId');
		var newInfo={
			firstName:$('#userNameEdit').val(),
		    lastName:$('#userLastNameEdit').val(),
		    position:$('#positionEdit').val(),
		    email:$('#emailEdit').val(),
			interest:$('#interestEdit').val(),
			institution:$('#institutionEdit').val(),
			pictureID:$('#pictureIDEdit').val(),
		}
		
		Meteor.call('updateUserContact',id,newInfo);
		Meteor.call('updateUser', id, newInfo);
		
		}
		
	
})