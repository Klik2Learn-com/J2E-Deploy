Template.m5Game_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5Game_1");
	}
});

Template.m5Game_1.events({
	
	"click .pagination": function(evt){
		$('#m5game-intro').get(0).pause();
		$('#m5game-intro').get(0).currentTime = 0;
	}
});

Template.m5Game_1.rendered = function() {
	
	// Function executes when the video finishes.
	$('#m5game-intro').on('ended',function(){
		setTimeout(function() {
			$('#m5Game_1').addClass('hidden');
			$('#m5Game_2').removeClass('hidden');
			$('#m5game-intro').get(0).currentTime = 0;
			Session.set('activeSection', '#m5Game_2');
		}, 1000);
    });	
}