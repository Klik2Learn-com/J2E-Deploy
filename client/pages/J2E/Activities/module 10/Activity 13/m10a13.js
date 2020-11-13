Template.m10a13.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m10a13_end') {
			return false;
		}
		return true;
	}
});

Template.m10a13.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(10, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m10a13.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 13, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a13.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a13_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m10a13_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a13_2.events({
	"drop .ddseatedtarget": function (evt) {
		evt.preventDefault();

		//var destination = $(evt.toElement).data("destination");
		var destination = $(evt.originalEvent.target).data("destination");
		var targets = destination.split(" ");
		var targetDestination = false;
		for (var i = 0; i < targets.length; i++) {
			if (targets[i] == $(evt.target).data('destinationid')) {
				targetDestination = true;
			}
		}

		if (targetDestination) {
			$(evt.target).next().next('.info').removeClass('hidden');
		}
	}
})

Template.m10a13_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m10a13_3";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a13_3.events({
	"drop .ddseatedtarget": function (evt) {
		evt.preventDefault();

		//var destination = $(evt.toElement).data("destination");
		var destination = $(evt.originalEvent.target).data("destination");
		var targets = destination.split(" ");
		var targetDestination = false;
		for (var i = 0; i < targets.length; i++) {
			if (targets[i] == $(evt.target).data('destinationid')) {
				targetDestination = true;
			}
		}
		if (targetDestination) {
			$(evt.target).next().next('.info').removeClass('hidden');
		}
	}
})