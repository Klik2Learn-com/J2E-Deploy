Template.complete.created = function(){
	this.subscribe("userProgress");
	this.subscribe("users");
};

Template.complete.rendered = function() {
	document.title = "Course complete - Journey 2 English";
}

Template.complete.helpers({
	'daysRemaining': function(){
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var firstDate = this.expiry;
		var secondDate = new Date();

		if (firstDate == null){
			return "Unlimited";
		} else {
		var diffDays = Math.round((firstDate.getTime() - secondDate.getTime())/(oneDay));
		
		if (diffDays <= 0){
			return '0';
		} else {
		return diffDays;
	}
	}
	},

	coursePercentage: function(_id){
		var progress = userProgress.findOne({ userId : _id });
		var activityCount = 0;
		var completedCount = 0;
		for (var i = 0 ; i < progress.modules.length ; i++ ){
			for ( var j = 0 ; j < progress.modules[i].activities.length ; j++){
				activityCount++;
				if (progress.modules[i].activities[j].completed == "Completed"){
					completedCount++;
				}
			}
		}
		return parseFloat((completedCount / activityCount) * 100).toFixed(1);
	},

	completedCount: function(_id) {
		var progress = userProgress.findOne({ userId : _id });
		var activityCount = 0;
		var completedCount = 0;
		for (var i = 0 ; i < progress.modules.length ; i++ ){
			for ( var j = 0 ; j < progress.modules[i].activities.length ; j++){
				activityCount++;
				if (progress.modules[i].activities[j].completed == "Completed"){
					completedCount++;
				}
			}
		}
		return completedCount + " out of " + activityCount;
	},

	totalTimeCount: function(_id){
	var s = 0;
	var modules = userProgress.findOne({ userId : _id }).modules;
	for (var i = 0; i < modules.length; i++){
		for (var j = 0; j < modules[i].activities.length; j++){
			var time = modules[i].activities[j].timeTaken;
			time = time || 0
			if(time == NaN || time == null ){
				s = s+0;
			} else{
				s = s+time;
			}
		}
	}

    function msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60)));

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        var time = hours + " hrs " + minutes + " mins";
        return time;
    }
	return msToTime(s);

	},

});

Template.complete.events({

})





