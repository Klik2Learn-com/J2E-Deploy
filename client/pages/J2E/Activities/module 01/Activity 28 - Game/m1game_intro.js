Template.m1Game_intro.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_intro");
	}
});

Template.m1Game_intro.events({
	
	"click .pagination": function(evt){
		if($('#game-intro').get(0) != null && $('#game-intro').get(0) != 'undefined'){
			$('#game-intro').get(0).pause();
			$('#game-intro').get(0).currentTime = 0;
		}
	}
});

Template.m1Game_intro.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m1game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m1Game_intro').addClass('hidden');
			$('#m1Game_map').removeClass('hidden');
			$('#m1game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m1Game_map');
		}, 1000);
    });	
}