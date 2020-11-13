Template.EndPage.events({
	'click div[data-function="saveProgress"]': function (evt) {
		saveProgress(evt);
	},

	'click .restart': function(evt){
		evt.preventDefault();
		window.removeEventListener("beforeunload", beforeUnloadConfirm);
		Session.set("dirty", false);
		location.reload(true);
	}
});

Template.EndPage2.events({
	'click div[data-function="saveProgress"]': function (evt) {
		saveProgress(evt);
	},

	'click .restart': function(evt){
		evt.preventDefault();
		window.removeEventListener("beforeunload", beforeUnloadConfirm);
		Session.set("dirty", false);
		location.reload(true);
	}
});

Template.EndPage3.events({
	'click div[data-function="saveProgress"]': function (evt) {
		saveProgress(evt);
	},

	'click .restart': function(evt){
		evt.preventDefault();
		window.removeEventListener("beforeunload", beforeUnloadConfirm);
		Session.set("dirty", false);
		location.reload(true);
	}
});

var saveProgress = function (evt) {
	// Extract Module and Activity numbers from activity
	var activityCode = $(evt.currentTarget).attr('data-activity');
	var result = activityCode.match(/[0-9]+/g);
	Session.set('activeSection', '#' + activityCode);
	if (result.length < 2) {
		if (result[0] == "1") {
			result.push("28");
		} else if (result[0] == "2") {
			result.push("29");
		} else if (result[0] == "3") {
			result.push("30");
		} else if (result[0] == "4") {
			result.push("31");
		} else if (result[0] == "5") {
			result.push("25");
		} else if (result[0] == "6") {
			result.push("30");
		} else if (result[0] == "7") {
			result.push("27");
		} else if (result[0] == "8") {
			result.push("35");
		} else if (result[0] == "9") {
			result.push("31");
		} else if (result[0] == "10") {
			result.push("29");
		}
	}
	setEndActivity(result[0], result[1]);
}