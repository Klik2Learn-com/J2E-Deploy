Template.m7Game_45k1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_45k1");
	}
});

Template.m7Game_45k1.events({
	
	'click .pagination': function(evt) {
		
		$('#k1').get(0).pause();
		$('#k1').get(0).currentTime = 0;
	}

});

Template.m7Game_45tu1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_45tu1");
	}
});

Template.m7Game_45tu1.events({
	
	'click .pagination': function(evt) {
		
		$('#tu1').get(0).pause();
		$('#tu1').get(0).currentTime = 0;
	}

});

Template.m7Game_45k2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_45k2");
	}
});

Template.m7Game_45k2.events({
	
	'click .pagination': function(evt) {
		
		$('#k2').get(0).pause();
		$('#k2').get(0).currentTime = 0;
	}

});

Template.m7Game_45k3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_45k3");
	}
});

Template.m7Game_45k3.events({
	
	'click .pagination': function(evt) {
		
		$('#k3').get(0).pause();
		$('#k3').get(0).currentTime = 0;
	}

});