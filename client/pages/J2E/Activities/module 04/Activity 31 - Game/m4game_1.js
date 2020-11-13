Template.m4Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4Game_1");
	}
});

Template.m4Game_1.events({
	
	"click .pagination": function(evt){
		$('#m4game-intro').get(0).pause();
		$('#m4game-intro').get(0).currentTime = 0;
	}
});

Template.m4Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m4game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m4Game_1').addClass('hidden');
			$('#m4Game_2').removeClass('hidden');
			$('#m4game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m4Game_2');
		}, 1000);
    });	
}