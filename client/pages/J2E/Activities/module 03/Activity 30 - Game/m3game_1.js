Template.m3Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3Game_1");
	}
});

Template.m3Game_1.events({
	
	"click .pagination": function(evt){
		$('#m3game-intro').get(0).pause();
		$('#m3game-intro').get(0).currentTime = 0;
	}
});

Template.m3Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m3game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m3Game_1').addClass('hidden');
			$('#m3Game_2').removeClass('hidden');
			$('#m3game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m3Game_2');
		}, 1000);
    });	
}