Template.m6Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6Game_1");
	}
});

Template.m6Game_1.events({
	
	"click .pagination": function(evt){
		$('#m6game-intro').get(0).pause();
		$('#m6game-intro').get(0).currentTime = 0;
	}
});

Template.m6Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m6game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m6Game_1').addClass('hidden');
			$('#m6Game_2').removeClass('hidden');
			$('#m6game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m6Game_2');
		}, 1000);
    });	
}