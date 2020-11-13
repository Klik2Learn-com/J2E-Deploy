Template.m7Game_25k1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_25k1");
	}
});

Template.m7Game_25k1.events({
	
	'click .pagination': function(evt) {
		
		$('#k1').get(0).pause();
		$('#k1').get(0).currentTime = 0;
	}

});

Template.m7Game_25k2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_25k2");
	}
});

Template.m7Game_25k2.events({
	
	'click .pagination': function(evt) {
		
		$('#k2').get(0).pause();
		$('#k2').get(0).currentTime = 0;
	}

});

