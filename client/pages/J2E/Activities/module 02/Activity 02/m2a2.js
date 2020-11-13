

Template.m2a2.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a2.sound, $(evt.currentTarget));
	},

	"click .storeImage": function (evt) {

		if ($.k2l.m2a2.allowClick == true) {
			$.k2l.m2a2.allowClick = false;
			var isCorrect = false;


			for (var i = 0; i < $.k2l.m2a2.answer_index[$.k2l.m2a2.index].length; i++) {
				if ($(evt.currentTarget).attr('id') == $.k2l.m2a2.answer_index[$.k2l.m2a2.index][i]) {
					isCorrect = true;
					$.k2l.m2a2.correctAnswerIndex = i; // use this if there are multiple possible answers
					break;
				}
			}

			if (isCorrect) {
				var parentSection = $(evt.currentTarget).parents('section');
				//	$.k2l.m2a2.index++
				// Correct
				$.k2l.m2a2.allowClick = true;
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);

				$(evt.currentTarget).removeClass("storeImage");
				var text = $(evt.currentTarget).attr('id');
				$("div:contains(" + text + ")").removeClass("hidden");
				$.k2l.m2a2.ShopNumbers[$.k2l.m2a2.index]--;
				$(".counterleft u").html($.k2l.m2a2.ShopNumbers[$.k2l.m2a2.index]);

				if ($.k2l.m2a2.ShopNumbers[$.k2l.m2a2.index] < 1) {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						if ($.k2l.m2a2.index >= $.k2l.m2a2.answer_index.length) {
							$.k2l.m2a2.index = 0;
							$.k2l.m2a2.allowClick = true;
						}
						$.k2l.m2a2.wrongscore = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m2a2.index++;
						$.k2l.m2a2.sound.src = {};
						$.k2l.m2a2.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$.k2l.m2a2.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m2a2.wrongscore++;
				if ($.k2l.m2a2.wrongscore > 2) {
					$('.stuck').removeClass('hidden');
				}

			}
		}

	},

	'click .stuck': function (evt) {
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden');
		$.k2l.m2a2.wrongscore = 0;
		$(".counterleft u").html(0);
		$('.correctword').removeClass('hidden');
		setTimeout(function () {
			if ($.k2l.m2a2.index >= $.k2l.m2a2.answer_index.length) {
				$.k2l.m2a2.index = 0;
				$.k2l.m2a2.allowClick = true;
			}
			$.k2l.m2a2.index++;
			$.k2l.m2a2.sound.src = {};
			$('#welldonecap').addClass('hidden');
			$.k2l.m2a2.allowClick = true; // Make the buttons clickable again
			$(parentSection).addClass('hidden'); // hide this page
			$(parentSection).next('section').removeClass('hidden');// reveal next page.
			document.location.hash = $(parentSection).next('section').attr('id');
			Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			// $('.pagination').removeClass('hidden');
		}, 5000);
	},

	'click .pagination': function (evt) {
		$.k2l.m2a2.index = 0;
		$.k2l.m2a2.allowClick = true;
		$.k2l.m2a2.sound.src = {};
	},

});

Template.m2a2.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a2 == 'undefined') {
		$.k2l.m2a2 = {};
	};

	var answer_index = [["Supermarket", "Corner Shop", "Grocers"],
	["Supermarket", "Corner Shop", "Newsagents", "Shopping Centre"],
	["Butcher", "Supermarket"],
	["Department Store", "Charity Shop", "Fashion Store", "Shopping Centre", "Amazon", "eBay"],
	["Corner Shop", "Chemist", "Shopping Centre", "Supermarket"],
	["Department Store", "Jewellers", "Fashion Store", "Shopping Centre", "Amazon", "eBay"],
	["Chemist", "Amazon", "Supermarket", "Department Store"],
	["Department Store", "Charity Shop", "DIY Shop", "Supermarket", "Shopping Centre", "Amazon", "eBay"],
	["Department Store", "DIY Shop", "Supermarket", "Shopping Centre", "Amazon", "eBay"],
	["Department Store", "Charity Shop", "Fashion Store", "Supermarket", "Shopping Centre", "Amazon", "eBay"],
	["DIY Shop", "Amazon"],
	["Amazon", "Supermarket", "Florist", "Shopping Centre"],
	["Department Store", "Charity Shop", "Supermarket", "Shopping Centre", "Amazon", "eBay"],
	["Bakers", "Corner Shop", "Supermarket"],
	["Grocers", "Supermarket"]
	];

	$.k2l.m2a2.sound = new Audio();
	$.k2l.m2a2.wrongscore = 0;
	$.k2l.m2a2.correctAnswerIndex = 0;
	$.k2l.m2a2.ShopNumbers = getShopNumbers();
	$.k2l.m2a2.answer_index = answer_index;
	$.k2l.m2a2.index = 0;

	$.k2l.m2a2.allowClick = true;
}

getShopNumbers = function(){
	return ["3", "4", "2", "6", "4", "6", "4", "7", "6", "7", "2", "4", "6", "3", "2"];
}

Template.m2a2.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a2_end') {
			return false;
		} return true;
	}
});

Template.m2a2.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 2, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a2.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a2_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_1");
	}
})
Template.m2a2_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_2");
	}
})
Template.m2a2_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_3");
	}
})
Template.m2a2_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_4");
	}
})
Template.m2a2_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_5");
	}
})
Template.m2a2_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_6");
	}
})
Template.m2a2_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_7");
	}
})
Template.m2a2_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_8");
	}
})
Template.m2a2_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_9");
	}
})
Template.m2a2_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_10");
	}
})
Template.m2a2_11.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_11");
	}
})
Template.m2a2_12.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_12");
	}
})
Template.m2a2_13.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_13");
	}
})
Template.m2a2_14.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_14");
	}
})
Template.m2a2_15.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a2_15");
	}
})

