Template.modalEditUser.helpers ({
	edit:function(){
		id=Session.get('contactId');
		return userContact.findOne({_id:id});
	},
	normalPic:function(){
		id=Session.get('contactId');
		testPic=userContact.findOne({_id:id}).profile.picture;
		    if(testPic==undefined){
				return true;
			}else{
				return false;
			}
	},
	noPic:function(){
		id=Session.get('contactId');
		findPics=userContact.findOne({_id:id}).profile.picture;
		findPicn=userContact.findOne({_id:id}).profile.pictureID;
		if(findPics==undefined && findPicn==undefined || findPics==undefined && findPicn==false){
			return true;
		}else{
			return false;
		}
		
	}
});

Template.modalEditUser.events ({
	'click #submitContact':function(e){
		e.preventDefault();
		id=Session.get('contactId');
		newInfo={};
		    newInfo.firstName=$('#userNameEdit').val();
		    newInfo.lastName=$('#userLastNameEdit').val();
		    newInfo.position=$('#positionEdit').val();
		    newInfo.email=$('#emailEdit').val();
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
		
		}
		
	
})