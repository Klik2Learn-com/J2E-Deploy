Template.m7Game_33tu1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_33tu1");
	}
});

Template.m7Game_33tu1.events({
	
	'click .pagination': function(evt) {
		
		$('#tu1').get(0).pause();
		$('#tu1').get(0).currentTime = 0;
	}

});