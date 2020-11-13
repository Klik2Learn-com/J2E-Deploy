Template.m8Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8Game_1");
	}
});

Template.m8Game_1.events({
	
	"click .pagination": function(evt){
		$('#m8game-intro').get(0).pause();
		$('#m8game-intro').get(0).currentTime = 0;
	}
});

Template.m8Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m8game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m8Game_1').addClass('hidden');
			$('#m8Game_2').removeClass('hidden');
			$('#m8game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m8Game_2');
		}, 1000);
    });	
}