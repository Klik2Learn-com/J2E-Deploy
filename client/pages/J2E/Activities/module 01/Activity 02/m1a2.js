Template.m1a2.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 2, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a2.rendered = function () {

	initActivity();

    document.title = "Journey 2 English";
	

};

Template.m1a2.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a2_end') {
			return false;
		} return true;
	}
});

Template.m1a2.events({
	'click #dd7': function (evt) {
		$(evt.currentTarget).addClass('disabled');
	},

	'click .pagination': function (evt) {
		if ($(evt.currentTarget).attr("href") == "#m1a2_3") {
			Session.set("init", false);
			$.k2l.m1a2.dragDropInterval = setInterval(initDragDrop2, 200);
		}
		$.k2l.m1a2_2.sound.src = {};
	}
});

Template.m1a2.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a2_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a2_2 == 'undefined') {
		$.k2l.m1a2_2 = {};
	};

	$.k2l.m1a2_2.sound = new Audio();
}

Template.m1a2_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a2_2");
	}
})

Template.m1a2_2.events({

	'click .letter': function (evt) {
		$.k2l.m1a2_2.sound.src = $(evt.currentTarget).data("audiosrc");
		$.k2l.m1a2_2.sound.play();
	},

});

Template.m1a2_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a2_3");
	}
});

Template.m1a2_end.events({
	'click a.restart': function (evt) {
		// Reset activity variables
		initActivity();
	}
});


var initDragDrop2 = function () {
	if ($(".draggable").get().length == 0) {
		return false;
	}

	var init = Session.get("init");
	//check if init already completed and execute if not
	if (init == null || init == 'undefined' || init === false) {
		$(".draggable").css("cursor", "move");
		//make the .draggable classs - ... draggable
		$(".draggable").draggable({
			revert: "invalid",
			opacity: 0.7,
			containment: "#m1a2_3"
		});

		//set the .target7 as a droppable target
		$(".target7").not('.complete').droppable({
			//on drop execute this function
			drop: function (event, ui) {
				//if the dragged element's destination is not for this target
				if ($(ui.draggable).data("destination") != $.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].target) {
					//show incorrect screen
					$('.incorrectscreen').removeClass('hidden');
					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
					}, 1000);
					//return the dragged element to its position and exit the function
					ui.draggable.draggable('option', 'revert', true);
					return false;
				} else {
					//move the dragged element inside the target box and disable its dragging
					$(ui.draggable).addClass('dd-img-wrapper2');
					$("#" + $.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].target).append(ui.draggable);
					$(ui.draggable).css("top", "auto");
					$(ui.draggable).css("left", "auto");
					$(ui.draggable).css("cursor", "default");
					$(ui.draggable).draggable("disable");

					//show correct screen
					$('.correctscreen').removeClass('hidden');
					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
					}, 1000);

					var target = $("#" + $.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].target);

					if ($(target).children().length == $(target).data("itemcount")) {

						if ($.k2l.m1a2.targetIndex < $.k2l.m1a2.targetSequence.length) {
							// Mark this destination list as complete

							$(target).addClass("complete");

							// Test if all 7 boxes are completed
							if ($(".complete").get().length == 7) {

								$('#dd7').addClass('pagination').removeClass('disabled');
								$('#exercise_instructions').empty();

								setTimeout(function () {
									$('.capwelldone').removeClass('hidden');
								}, 1000);
								setTimeout(function () {
									$('.capwelldone').addClass('hidden');
								}, 3000);
							}

							// Move onto next destination list
							$.k2l.m1a2.targetIndex += 1;
							if ($.k2l.m1a2.targetIndex < $.k2l.m1a2.targetSequence.length) {
								target = $("#" + $.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].target);
								$(target).addClass("active");
								$(target).removeClass("hidden");
								// Now handle the case where there are no other letters
								if ($(target).data("itemcount") == 1) {
									handleSingleLetterCase(target);
								} else {
									// Remove the button if it exists
									$('#exercise_instructions').empty();
									// Show the instructions to the user
									$('#exercise_instructions').text($.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].message);
								}
							}
						}

					}
				}
			}
		});
		//set init function complete
		Session.set("init", true);
	} else {
		clearInterval($.k2l.m1a2.dragDropInterval);
	}
}


function handleSingleLetterCase(target) {
	if ($(target).data("itemcount") == 1) {
		// Show the instructions to the user
		$('#exercise_instructions').text($.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].message);
		$("#exercise_instructions2").removeClass("disabled");
		setTimeout(function () {
			$(target).addClass("complete");
			$.k2l.m1a2.targetIndex += 1;
			$('#exercise_instructions').text($.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].message);
			target = document.getElementById($.k2l.m1a2.targetSequence[$.k2l.m1a2.targetIndex].target);
			$(target).addClass("active");
			$(target).removeClass("hidden");
			if ($(target).data("itemcount") == 1) {
				setTimeout(function () {
					handleSingleLetterCase(target);
				}, 1000);
			} else {
				$("#exercise_instructions2").addClass("disabled");
			}
		}, 1000);
	}
}


initActivity = function(){
	setStartActivity(1, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a3 == 'undefined') {
		$.k2l.m1a2 = {};
		$.k2l.m1a2.dragDropInterval = null;
		$.k2l.m1a2.dragSourceLetter = null;
		$.k2l.m1a2.targetSequence = [];
		$.k2l.m1a2.targetIndex = 0;
		$.k2l.m1a2.targetSequence[0] = { 'target': 'target1', 'message': "Drag 3 letters that have the same vowel sound as 'A' " };
		$.k2l.m1a2.targetSequence[1] = { 'target': 'target2', 'message': "Drag 7 letters that have the same vowel sound as 'B' into the box" };
		$.k2l.m1a2.targetSequence[2] = { 'target': 'target3', 'message': "Drag 6 letters that have the same vowel sound as 'F' into the box" };
		$.k2l.m1a2.targetSequence[3] = { 'target': 'target4', 'message': "Drag the letter that has the same vowel sound as 'I' into the box" };
		$.k2l.m1a2.targetSequence[4] = { 'target': 'target5', 'message': "There are no letters that have the same vowel sound as 'O' " };
		$.k2l.m1a2.targetSequence[5] = { 'target': 'target6', 'message': "There are no letters that have the same vowel sound as 'R' " };
		$.k2l.m1a2.targetSequence[6] = { 'target': 'target7', 'message': "Drag 2 letters that have the same vowel sound as 'Q' into the box" };
	}
}