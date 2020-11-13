Template.Yeti_end_result.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_end_result")
	},
	
	perfectScore: function() {
		var yetiScore = Session.get('yetiScore');
		if (yetiScore == 100){
			return true;	
		} else {
			return false;
		}
	},
	
	amazingScore: function() {
		var yetiScore = Session.get('yetiScore');
		if (yetiScore > 88 && yetiScore < 100){
			return true;	
		} else {
			return false;
		}
	},
								 
	goodScore: function() {
		var yetiScore = Session.get('yetiScore');
		if (yetiScore > 59 && yetiScore < 89){
			return true;	
		} else {
			return false;
		}						 
	},
	
	mediumScore: function() {
		var yetiScore = Session.get('yetiScore');
		if (yetiScore > 29 && yetiScore < 60){
			return true;	
		} else {
			return false;
		}						 
	},
	
	badScore: function() {
		var yetiScore = Session.get('yetiScore');
		if (yetiScore < 30){
			return true;	
		} else {
			return false;
		}						 
	}
	
});