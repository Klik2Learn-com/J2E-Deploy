Template.m7Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7Game_1");
	}
});

Template.m7Game_1.events({
	
	"click .pagination": function(evt){
		$('#m7game-intro').get(0).pause();
		$('#m7game-intro').get(0).currentTime = 0;
	}
});

Template.m7Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m7game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m7Game_1').addClass('hidden');
			$('#m7Game_2').removeClass('hidden');
			$('#m7game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m7Game_2');
		}, 1000);
    });	
}