Template.m10Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_1");
	}
});

Template.m10Game_1.events({
	
	"click .pagination": function(evt){
		$('#m10game-intro').get(0).pause();
		$('#m10game-intro').get(0).currentTime = 0;
	}
});

Template.m10Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m10game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m10Game_1').addClass('hidden');
			$('#m10Game_1b').removeClass('hidden');
			$('#m10game-intro').get(0).currentTime = 0;
		}, 1000);
    });	
}