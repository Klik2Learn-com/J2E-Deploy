Template.m7Game_43k1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_43k1");
	}
});

Template.m7Game_43k1.events({
	
	'click .pagination': function(evt) {
		
		$('#k1').get(0).pause();
		$('#k1').get(0).currentTime = 0;
	}

});

Template.m7Game_43tu1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_43tu1");
	}
});

Template.m7Game_43tu1.events({
	
	'click .pagination': function(evt) {
		
		$('#tu1').get(0).pause();
		$('#tu1').get(0).currentTime = 0;
	}

});

Template.m7Game_43tu2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_43tu2");
	}
});

Template.m7Game_43tu2.events({
	
	'click .pagination': function(evt) {
		
		$('#tu2').get(0).pause();
		$('#tu2').get(0).currentTime = 0;
	}

});