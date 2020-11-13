Template.m9Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9Game_1");
	}
});

Template.m9Game_1.events({
	
	"click .pagination": function(evt){
		$('#m9game-intro').get(0).pause();
		$('#m9game-intro').get(0).currentTime = 0;
	}
});

Template.m9Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m9game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m9Game_1').addClass('hidden');
			$('#m9Game_2').removeClass('hidden');
			$('#m9game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m9Game_2');
		}, 1000);
    });	
}

