Template.resumePopUp.rendered = function() {
	//if (!this.rendered){
	    var mXaX = $(".content").parent("section").attr("id");
		var numberPattern = /\d+/g;
		var modActArray = mXaX.match(numberPattern);
		$.mod = modActArray[0];
		$.act = modActArray[1];
    	this.rendered = true;
   // }
};

Template.resumePopUp.events({
	"click .resumeYesButton": function(evt){
		$("article.shadow section").addClass("hidden");
		$.latestSubpage = "#" + $.latestSubpage;
		$($.latestSubpage).removeClass("hidden");
		//Session.set(activeSection, "#" + $.latestSubpage);
	},

	"click .resumeNoButton": function(evt){
		$(".resume").addClass("hidden");
	}
});

Template.resumePopUp.helpers({
	resumeButton : function(){
		//Meteor.subscribe("userProgress", function(){
			$.latestSubpage = userProgress.findOne({ userId : Meteor.userId() }).modules[$.mod-1].activities[$.act-1].latestSubpage;
			$.latestSubpageRem = $.latestSubpage.split('_')[1];
		//});
		if ($.latestSubpage == undefined || $.latestSubpage == null || $.latestSubpageRem == null || $.latestSubpageRem == "end"){
			return false;
		} 
		return $.latestSubpageRem;
	}
});