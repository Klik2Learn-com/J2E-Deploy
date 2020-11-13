Template.m7Game_27tu1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_27tu1");
	}
});

Template.m7Game_27tu1.events({
	
	'click .pagination': function(evt) {
		
		$('#tu1').get(0).pause();
		$('#tu1').get(0).currentTime = 0;
	}

});

Template.m7Game_27tu2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_27tu2");
	}
});

Template.m7Game_27tu2.events({
	
	'click .pagination': function(evt) {
		
		$('#tu2').get(0).pause();
		$('#tu2').get(0).currentTime = 0;
	}

});

Template.m7Game_27tu3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_27tu3");
	}
});

Template.m7Game_27tu3.events({
	
	'click .pagination': function(evt) {
		
		$('#tu3').get(0).pause();
		$('#tu3').get(0).currentTime = 0;
	}

});
