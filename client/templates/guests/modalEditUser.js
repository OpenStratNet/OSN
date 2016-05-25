Template.modalEditUser.helpers ({
	edit:function(){
		id=Session.get('contactId');
		return userContact.findOne({_id:id});
	},
	socialPic:function(){
		id=Session.get('contactId');
		sPic=Meteor.users.findOne({_id:id}).profile.picture;
		    if(sPic){
				return true;
			}
	},
	normalPic:function(){
		id=Session.get('contactId');
		nPic=Meteor.users.findOne({_id:id}).profile.pictureID;
		    if(nPic){
				return true;
			}
	},
	noPic:function(){
		id=Session.get('contactId');
		findPics=Meteor.users.findOne({_id:id}).profile.picture;
		findPicn=Meteor.users.findOne({_id:id}).profile.pictureID;
		if(findPics==undefined && findPicn==undefined || findPics==undefined && findPicn==false){
			return true;
		}
		
	}
});

Template.modalEditUser.events ({
	'click #submitContact':function(e){
		e.preventDefault();
		id=Session.get('contactId');
		email_=$('#emailEdit').val().toLowerCase();
		
		newInfo={};
		    newInfo.firstName=$('#userNameEdit').val();
		    newInfo.lastName=$('#userLastNameEdit').val();
		    newInfo.position=$('#positionEdit').val();
		    newInfo.email=email_;
		    newInfo.interest=Meteor.users.findOne({_id:id}).profile.interest;
			newInfo.institution=Meteor.users.findOne({_id:id}).profile.institution;
			if (Meteor.users.findOne({_id:id}).profile.pictureID){
				newInfo.pictureID=Meteor.users.findOne({_id:id}).profile.pictureID;
			};
			if (Meteor.users.findOne({_id:id}).profile.profileID){
				newInfo.profileID=Meteor.users.findOne({_id:id}).profile.profileID;
			};
		
		Meteor.call('updateUserContact',id,newInfo);
		Meteor.call('updateUser', id, newInfo);
		Meteor.call('updateEmail',id,email_);
		
		}
		
	
})