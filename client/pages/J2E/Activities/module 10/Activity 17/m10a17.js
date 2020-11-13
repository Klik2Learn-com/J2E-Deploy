Template.m10a17.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m10a17_end') {
			return false;
		}
		return true;
	}
});


Template.m10a17.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 17, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a17.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m10a17.events({

	"click .button1": function (evt) {

		if ($.k2l.m10a17.allowClick == true) {
			$.k2l.m10a17.allowClick = false;

			var answerList = $.k2l.m10a17.answer_index[$.k2l.m10a17.index];
			var ansLength = answerList.length;

			if($.k2l.m10a17._2_count == 1 && $.k2l.m10a17.lastAns == $(evt.currentTarget).attr('id') && ansLength > 1){
				$.k2l.m10a17.allowClick = true; // Make the buttons clickable again
				return;
			}

			var isCorrect = false;
			for (var i = 0; i < answerList.length; i++) {
				if ($(evt.currentTarget).attr('id') == answerList[i]) {
					isCorrect = true;
					$.k2l.m10a17.lastAns = $(evt.currentTarget).attr('id');
					break;
				}
			}

			if (isCorrect) {
				var parentSection = $(evt.currentTarget).parents('section');
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);

				if ($.k2l.m10a17.index == 1 && $.k2l.m10a17._2_count < 1) {
					$.k2l.m10a17._2_count++;
					$.k2l.m10a17.allowClick = true; // Make the buttons clickable again
					if(ansLength > 1){
						$(evt.currentTarget).addClass('faded');
					}
					return;
				} else {
					$.k2l.m10a17.index++;
				}


				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					if ($.k2l.m10a17.index > $.k2l.m10a17.answer_index.length) {
						$.k2l.m10a17.index = 0;
					}
					$('#welldonecap').addClass('hidden');
					$.k2l.m10a17.allowClick = true; // Make the buttons clickable again
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 1000);
				// $('.pagination').removeClass('hidden');
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$.k2l.m10a17.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}
		}

	},

	'click .pagination': function (evt) {
		$.k2l.m10a17.index = 0;
		$.k2l.m10a17.allowClick = true;
	}

});

Template.m10a17.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a17 == 'undefined') {
		$.k2l.m10a17 = {};
	};

	var answer_index = [["1"], ["5", "3"], ["1"], ["5"], ["1"], ["5"], ["2"], ["6"], ["2"], ["1"], ["3"], ["6"], ["6"], ["3"], ["5"], ["4"], ["1"], ["2"], ["1"], ["3"]];

	$.k2l.m10a17.answer_index = answer_index;
	$.k2l.m10a17.index = 0;
	$.k2l.m10a17._2_count = 0;
	$.k2l.m10a17.lastAns = null;

	$.k2l.m10a17.allowClick = true;

	document.title = "Journey 2 English";
	
	setStartActivity(10, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);
}
Template.m10a17_12.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_12");
	}
});

Template.m10a17_12.events({

});

Template.m10a17_12.rendered = function () {
}

Template.m10a17_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_1");
	}
});

Template.m10a17_1.events({

});

Template.m10a17_1.rendered = function () {
}

Template.m10a17_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_7");
	}
});

Template.m10a17_7.events({

});

Template.m10a17_7.rendered = function () {
}

Template.m10a17_11.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_11");
	}
});

Template.m10a17_11.events({

});

Template.m10a17_11.rendered = function () {
}

Template.m10a17_18.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_18");
	}
});

Template.m10a17_18.events({

});

Template.m10a17_18.rendered = function () {
}

Template.m10a17_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_9");
	}
});

Template.m10a17_9.events({

});

Template.m10a17_9.rendered = function () {
}

Template.m10a17_13.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_13");
	}
});

Template.m10a17_13.events({

});

Template.m10a17_13.rendered = function () {
}

Template.m10a17_17.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_17");
	}
});

Template.m10a17_17.events({

});

Template.m10a17_17.rendered = function () {
}

Template.m10a17_19.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_19");
	}
});

Template.m10a17_19.events({

});

Template.m10a17_19.rendered = function () {
}

Template.m10a17_16.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_16");
	}
});

Template.m10a17_16.events({

});

Template.m10a17_16.rendered = function () {
}

Template.m10a17_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_10");
	}
});

Template.m10a17_10.events({

});

Template.m10a17_10.rendered = function () {
}

Template.m10a17_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_5");
	}
});

Template.m10a17_5.events({

});

Template.m10a17_5.rendered = function () {
}

Template.m10a17_20.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_20");
	}
});

Template.m10a17_20.events({

});

Template.m10a17_20.rendered = function () {
}

Template.m10a17_15.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_15");
	}
});

Template.m10a17_15.events({

});

Template.m10a17_15.rendered = function () {
}

Template.m10a17_21.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_21");
	}
});

Template.m10a17_21.events({

});

Template.m10a17_21.rendered = function () {
}

Template.m10a17_14.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_14");
	}
});

Template.m10a17_14.events({

});

Template.m10a17_14.rendered = function () {
}

Template.m10a17_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_8");
	}
});

Template.m10a17_8.events({

});

Template.m10a17_8.rendered = function () {
}

Template.m10a17_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_6");
	}
});

Template.m10a17_6.events({

});

Template.m10a17_6.rendered = function () {
}

Template.m10a17_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_2");
	}
});

Template.m10a17_2.events({

});

Template.m10a17_2.rendered = function () {
}

Template.m10a17_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_3");
	}
});

Template.m10a17_3.events({

});

Template.m10a17_3.rendered = function () {
}

Template.m10a17_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a17_4");
	}
});

Template.m10a17_4.events({

});

Template.m10a17_4.rendered = function () {
}
