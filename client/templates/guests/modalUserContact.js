Template.modalUserContact.events ({
	'keyup #toUserContact':function(e){
		e.preventDefault();
		searcher=$('#toUserContact').val();
		Session.set('searcher',searcher);
	},
	'click #addUserContact':function(e){
		e.preventDefault();
		userAddId=$('#userAddId').val();
		addUser=Meteor.users.findOne({_id:userAddId});
		Meteor.call('insertContact', addUser);
		Session.set('searcher',0);
		
	}
});

Template.modalUserContact.helpers ({
	userContactPrev:function(){
		return Meteor.users.find();
	},
	//searcher filter who work filter by word
	//you can find the user introducing the name and the lastname
	//or just introducing the name or the lastName
	userContactFilter:function(){
		name_=""+Session.get('searcher');
		name=name_.split(" ");
		kill=name.split(",");
		userName=Meteor.users.findOne({_id:this._id}).profile.firstName;
		userLast=Meteor.users.findOne({_id:this._id}).profile.lastName;
		if (kill[0]==userName && kill[1]==userLast || kill[1]==userName && kill[0]==userLast){
			
			return true;
		}else if (kill[0]==userName || kill[0]==userLast){
			
			if (kill[1]==""){
				
				return true;
			}else if (kill[1]!=userLast || kill[1]!=userName){
				
				return false;
			}
			
		}else{
			
			return false;
		}
	}
})