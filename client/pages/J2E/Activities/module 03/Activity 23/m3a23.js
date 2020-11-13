Template.m3a23.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a23_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a23");
	}
})

Template.m3a23.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a23.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a23.sound, $(evt.currentTarget));
	},

	'click .buttonsmall-icon': function (evt) {
		audioButtonClickSetup($.k2l.m3a23.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a23.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a23.sound.src = {};
	}

});

Template.m3a23.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 23);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a23 == 'undefined') {
		$.k2l.m3a23 = {};
	};

	$.k2l.m3a23.sound = new Audio();
}



Template.m3a23.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 23, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a23.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a23_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a23_2");
	}
});


Template.m3a23_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a23_3");
	}
});


Template.m3a23_3.events({
	"click .m3a23-link": function (evt) {
		evt.preventDefault();
		$('#m3a23textDisplay').html($.k2l.m3a23_3.paragraphs[$(evt.currentTarget).attr('id')]);
	}
});

Template.m3a23_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a23_3 == 'undefined') {
		$.k2l.m3a23_3 = {};
	};

	var paragraphs = ["<h4>Leisure Pool</h4> <p>Perth Leisure Pool is one of Scotland’s top aquatic attractions. Opened in 1988, it caters for all ages with flumes, fun features and an outdoor lagoon.</p> <p>The under fives go free and have their own pool with slides and fountains.</p> <p>More serious swimmers can use the training pool. There’s also a sauna, steam room and gym facilities.</p>",

		"<h4>Ice rink</h4> <p>The Dewars Centre was named after the famous local whisky family. It was opened in 1990 as a state-of-the-art curling rink and indoor bowling arena.</p> <p>Since then, it has become a first-class business and function centre as well as an internationally famous sporting venue.</p>",

		"<h4>Public library</h4> <p>Perth library contains a lot more than books, DVDs and music.  Everyone is welcome to use the facilities, get internet access or enjoy some home baking in the library café.</p> <p>It’s worth looking out for special events. The library often has visiting writers, workshops and exhibitions.</p>",

		"<h4>Golf Course</h4> <p>Perthshire has some of the oldest and finest golf courses in Scotland. In the 4th century the city was the capital of Scotland and Scottish kings made the first golf course in the parkland area of the South Inch.</p> <p>The area gives golfers the chance to experience excellent courses in wonderful scenery.</p>",

		"<h4>Public Parks</h4> <p>Perth has two splendid public parks – the North and South Inch, and a striking promenade by the river on Tay Street. The city regularly wins the Britain in Bloom contest.</p>  <p>Apart from miles of paths and gardens, both parks contain other attractions – the South Inch has a pond and crazy golf course and the North Inch has the Bell Sports Centre, a large children’s playpark and a Pétanque court.</p>",

		"<h4>Putting Green</h4> <p>If you explore the South Inch parkland in Perth, you will come across an amazing outdoor putting arena – great fun if you have children.</p> <p>It’s a spacious, brightly coloured crazy golf course with enough tree coverage to make you think you’re miles away from the city centre.</p>",

		"<h4>Skatepark</h4> <p>Situated on the edge of town, beside the South Inch park, is one of the first skateparks in Scotland. It was built in 2003 with help from the city’s landscape architect and has a range of features to suit all levels of ability: a fun box, a bowl area, banks, stairs and rails. There is a special section too for beginners.</p>",

		"<h4>Tennis Courts</h4> <p>Perth tennis Club is a short distance from the Bells’ Sports Centre on the North Inch. It’s open all year round for anyone interested in playing tennis, including a pay and play ticket for visitors.</p> <p>There are four all weather courts with the latest rubberized surface and floodlights. When it rains you can play squash, snooker and table tennis.</p>",

		"<h4>Riverside Walks</h4> <p>The river Tay, at 120 miles long, is the longest river in Scotland. It has the largest volume of flow of any river in Britain. The North Inch park gives open views of this mighty river from a circular path. Along the riverside on Tay Street you’ll find a wide promenade with artwork and sculptures. This is an ideal place to spot wildlife including seals which you can see sometimes underneath the bridges.</p>",

		"<h4>Museum/Art Gallery</h4> <p>Perth Museum and Art Gallery gives you an exciting look at the natural and social history of Perthshire. The gallery is one of the oldest in Scotland and has over 500,000 items of silver, glass, art and natural history.</p> <p>Admission is free and a tour of its rooms will take you from medieval Scotland to the present day.</p>",

		"<h4>Theatre</h4> <p>Right in the middle of Perth’s High Street, is one of Scotland’s oldest theatres.</p> <p>Originally a Victorian playhouse, it opened in 1901 and can seat 460 people. It’s a busy, award winning theatre with a café/restaurant and runs a programme of classic  and popular drama, music, comedy and dance all year.</p>",

		"<h4>Concert Hall</h4> <p>Perth’s Concert Hall is Scotland’s newest concert venue – built as a Millennium project and opened in 2005. It has an amazing glass foyer and a copper topped dome with a spacious café area and space for modern art.</p> <p>As well as attracting some of the best international artists, comedians and musicians, it is a famous centre for large conferences and public events.</p>",

		"<h4>Farmers’ Market</h4> <p>Farmers around Perthshire were the first in Scotland to set up a monthly market to sell their produce. Now, on 1st Saturday of each month, over 40 traders arrive in the city centre with a variety of high quality food and arts and crafts. Many offer you a taste before you buy or give you a cookery demonstration.</p> <p>Sometimes, the city’s finest chefs compete against each other using the local produce on display.</p>"];

	$.k2l.m3a23_3.paragraphs = paragraphs;
	$.k2l.m3a23_3.index = 0;

	$.k2l.m3a23_3.allowClick = true;
}

Template.m3a23_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a23_4");
	}
});


Template.m3a23_4.events({

	"click #m3a23_4 .button2": function (evt) {

		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");

		if ($.k2l.m3a23_4.questionWordLock == false) {
			$.k2l.m3a23_4.questionWordLock = true;

			var correctAnswer = $.k2l.m3a23_4.correctAnswers[$.k2l.m3a23_4.index];
			if (buttonValue == correctAnswer) {
				$('.correctscreen').removeClass("hidden");
				setTimeout(function () {
					$('.correctscreen').addClass("hidden");
				}, 1000);
				var parentSection = $(evt.currentTarget).parents('section');
				var temp = $(evt.currentTarget).data('value')
				var value = $.trim(temp);
				if (value == "True") {
					$(evt.currentTarget).addClass('noclick');
					$(evt.currentTarget).next('button').addClass('faded'); // Next Button must be False
				} else if (value == 'False') {
					$(evt.currentTarget).addClass('noclick');
					$(evt.currentTarget).prev('button').addClass('faded'); // Previous Button must be True
				}
				playPauseAudio($.k2l.m3a23.sound, $('.buttonaudio').get($.k2l.m3a23_4.index));
				$.k2l.m3a23_4.index++;
				$.k2l.m3a23_4.questionWordLock = false;
				$('#m3a23_4 .row#' + $.k2l.m3a23_4.index).removeClass('hidden');

				if ($.k2l.m3a23_4.index < $.k2l.m3a23_4.correctAnswers.length) {
					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m3a23_4.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
					}, 2000);
					setTimeout(function () {
						$.k2l.m3a23_4.index = 0;
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);
				}
				$.k2l.m3a23_4.questionWordLock = false;
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m3a23_4.questionWordLock = false;
			}
		}
	},

	'click a.restart': function (evt) {
		// When clicking to restart the activity this should reset the variables to
		// initial values.


		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m3a23_4 != 'undefined') {
				if (typeof $.k2l.m3a23_4.index != 'undefined') {
					$.k2l.m3a23_4.index = 0;
				}
				if (typeof $.k2l.m3a23_4.wrongCount != 'undefined') {
					$.k2l.m3a23_4.wrongCount = 0;
				}
			}
		}
	}

})

Template.m3a23_4.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a23_4 == 'undefined') {
		$.k2l.m3a23_4 = {};
	};

	var correctAnswers = ["True", "False", "True", "False", "True", "False", "False", "True", "True", "True", "True", "False", "False", "False", "False", "True", "True", "True", "True", "False"];

	$.k2l.m3a23_4.index = 0;
	$.k2l.m3a23_4.correctAnswers = correctAnswers;

	$.k2l.m3a23_4.questionWordLock = false; //variable to prevent multiple clicks of button
}
