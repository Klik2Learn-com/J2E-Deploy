Template.m7Game_37k1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_37k1");
	}
});

Template.m7Game_37k1.events({
	
	'click .pagination': function(evt) {
		
		$('#k1').get(0).pause();
		$('#k1').get(0).currentTime = 0;
	}

});
Template.m7Game_37tu1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_37tu1");
	}
});

Template.m7Game_37tu1.events({
	
	'click .pagination': function(evt) {
		
		$('#tu1').get(0).pause();
		$('#tu1').get(0).currentTime = 0;
	}

});