Template.Yeti.helpers({
	
	d1_hardpath: function() {
		var path = Session.get('d1_hardpath')
		if (path == true){
			return true;
		} else {
			return false;
		}
	},
	
	d2_hardpath: function() {
		var path = Session.get('d2_hardpath')
		if (path == true){
			return true;
		} else {
			return false;
		}
	},
	
	d3_hardpath: function() {
		var path = Session.get('d3_hardpath')
		if (path == true){
			return true;
		} else {
			return false;
		}
		
	},
	
	d4_hardpath: function() {
		var path = Session.get('d4_hardpath')
		if (path == true){
			return true;
		} else {
			return false;
		}
	}
	
});

Template.Yeti.events({
	
	'click #dunveganreturn': function(evt){
		Session.set('activeSection', 'Dunvegan');	
	}
});