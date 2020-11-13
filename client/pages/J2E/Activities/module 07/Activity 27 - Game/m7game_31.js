Template.m7Game_31k1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");

		return (activeSection == "#m7Game_31k1");
	}
});

Template.m7Game_31k1.events({
	
	'click .pagination': function(evt) {
		
		$('#k1').get(0).pause();
		$('#k1').get(0).currentTime = 0;
	}

});