Template.modalUserContact.onRendered (function(){
	searcher="";
	Session.set('searcher',searcher);
});



Template.modalUserContact.events ({
	'keyup #emptyInput':function(e){
		e.preventDefault();
		searcher=$('#emptyInput').val();
		Session.set('searcher',searcher);
	},
	'click #addUserContact':function(e){
		e.preventDefault();
		userAddId=$('#userAddId').val();
		addUser=Meteor.users.findOne({_id:userAddId});
		Meteor.call('insertContact', addUser);
		let userId=userAddId;
		Meteor.call('toRoleAdmin',userId);
		Session.set('searcher',0);
		$('#emptyInput')[0].reset();
	}
});

Template.modalUserContact.helpers ({
	atts: function() {
    return {'id':'emptyInput','class': 'form-control', 'placeholder': "Search for a member",};
    },
	userContactPrev:function(){
		return Meteor.users.find();
	},
	//searcher filter who work filter by word
	//you can find the user introducing the name and the lastname
	//or just introducing the name or the lastName
	
	socialPic:function(){
		id=this._id;
		sPic=Meteor.users.findOne({_id:id}).profile.picture;
		    if(sPic){
				return true;
			}
	},
	normalPic:function(){
		id=this._id;
		nPic=Meteor.users.findOne({_id:id}).profile.pictureID;
		    if(nPic){
				return true;
			}
	},
	noPic:function(){
		id=this._id;
		findPics=Meteor.users.findOne({_id:id}).profile.picture;
		findPicn=Meteor.users.findOne({_id:id}).profile.pictureID;
		if(findPics==undefined && findPicn==undefined || findPics==undefined && findPicn==false){
			return true;
		}
		
	},
	 membersIndex: function() {
    return MembersIndex;
  },
  noSearch:function(){
	testing=Session.get('searcher');
	if (testing!=""){
		return true;
	}
  }
})