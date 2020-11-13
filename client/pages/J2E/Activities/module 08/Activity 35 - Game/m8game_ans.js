Template.m8Game_ans.helpers({
	
	hardpath: function() {
		var path = Session.get('hardpath');
		if (path == true){
			return true;
		} else {
			return false;
		}
	}

});
