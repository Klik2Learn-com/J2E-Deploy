Template.m1Game_e_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_e_3");
	}
});


Template.m1Game_e_3.events({

	"click .pagination": function (evt) {
		$.k2l.m1Game_e_3.draggedElement = {};
		$.k2l.m1Game_e_3.counter = 0;
	}
});

Template.m1Game_e_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_e_3 == 'undefined') {
		$.k2l.m1Game_e_3 = {};
	};

	// $.k2l.m1Game_e_3.draggedElement = {};
	// $.k2l.m1Game_e_3.counter = 0;

	//$.k2l.m1Game_e_3.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m1Game_e_3";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m1Game_e_3",
		nextPage: "#m1Game_e_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}