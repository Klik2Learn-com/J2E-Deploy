Template.Overview.created = function() {
	
	document.title = "Course Overview - Journey 2 English";
}

Template.Overview.events({

	'click .pagination-overview-acts': function(evt) {
		$(".content-overview").addClass("hidden");
		var contentOverview = $(this).attr("href");
		$(contentOverview).removeClass("hidden");
	},
	
	'click #overviewTopics a': function(evt) {
		document.title = "Journey 2 English";
	},
	
	'click #overviewGrammar a': function(evt) {
		document.title = "Journey 2 English";
	},

	'click .numbutt': function(evt) {
		$(".content-overview").addClass('hidden');
		$(".numbutt").removeClass('numbuttactive');
		$(evt.currentTarget).addClass('numbuttactive');
		var mod = $(evt.currentTarget).attr('id');
		$('#overviewActMod' + mod).removeClass('hidden');
	},

	'click #previousMod': function(evt){
		$(".content-overview").addClass('hidden');		
		$(".numbutt").removeClass('numbuttactive');		
		var mod = $(evt.currentTarget).attr('data-mod');
		$('#overviewActMod' + mod).removeClass('hidden');
		$('#' + mod).addClass('numbuttactive');
	},
	'click #nextMod': function(evt){
		$(".content-overview").addClass('hidden');		
		$(".numbutt").removeClass('numbuttactive');		
		var mod = $(evt.currentTarget).attr('data-mod');
		$('#overviewActMod' + mod).removeClass('hidden');
		$('#' + mod).addClass('numbuttactive');
	},
});