Template.scorebox2.helpers({
	
	rightScore: function(){
		return Session.get('SGscoresRightScore');
	},
	
	wrongScore: function() {
		return Session.get('SGscoresWrongScore');
	}
});
