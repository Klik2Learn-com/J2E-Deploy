Template.yeti_intro.events({
	
	"click #yetivideodiv": function(evt) {
		// Play if paused, pause if playing.
		if ($('#yetivideo').get(0).paused) {
			$('#yetivideo').get(0).play()
			$('#playpausebutton').addClass('fa-pause');
			$('#playpausebutton').removeClass('fa-play');
			
		} else {
			$('#yetivideo').get(0).pause();
			$('#playpausebutton').addClass('fa-play');
			$('#playpausebutton').removeClass('fa-pause');
		}
	},
	
	"click .pagination": function(evt){
		$('#yetivideo').get(0).pause();
		$('#yetivideo').get(0).currentTime = 0;
	}
});

Template.yeti_intro.rendered = function() {
	
	if (Session.get('yetiScore') == undefined){
		Session.set('yetiScore', 0);
	};
	
	// Function executes when the video finishes.
	$('#yetivideo').on('ended',function(){
		setTimeout(function() {
			$('#Yeti').addClass('hidden');
			$('#Yeti_1').removeClass('hidden');
			$('#yetivideo').get(0).currentTime = 0;
			Session.set('activeSection', '#Yeti_1');
		}, 1000);
    });	
}