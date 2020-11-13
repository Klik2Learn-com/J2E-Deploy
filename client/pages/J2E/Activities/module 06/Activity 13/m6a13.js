Template.m6a13.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a13_end') {
			return false;
		}
		return true;
	},

})

Template.m6a13.events({
	"click #m6a13videobtn": function (evt) {
		setTimeout(function () {
			$("#m6a13video_modal video")[0].play();
		}, 500);
	},

});

Template.m6a13.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a13 == 'undefined') {
		$.k2l.m6a13 = {};
	};


	// $.k2l.m6a13.sound = new Audio();
	$('#m6a13video_modal').on("hidden.bs.modal", function (event) {
		var stopVideo = function (element) {
			var iframe = element.querySelector('iframe');
			if (iframe) {
				var iframeSrc = iframe.src;
				iframe.src = iframeSrc;
			}
		};

		if (event.target == this || event.target.id == "modalButton") {
			stopVideo(this);
		}
	});
}

Template.m6a13.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 13, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a13.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a13_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a13_1");
	}
});

Template.m6a13_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a13_2");
	}
});

Template.m6a13_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a13_3");
	}
});

Template.m6a13_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a13_4");
	}
});

Template.m6a13_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a13_2";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m6a13_2",
		nextPage: "#m6a13_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a13_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a13_3";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m6a13_3",
		nextPage: "#m6a13_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a13_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a13_4";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m6a13_4",
		nextPage: "#m6a13_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}
