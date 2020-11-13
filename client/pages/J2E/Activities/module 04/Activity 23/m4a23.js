

Template.m4a23.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a23_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a23.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 23);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a23.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 23, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a23.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a23_2.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a23_2");
	}
});

Template.m4a23_2.events({

	"submit form" : function(evt) {

		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m4a23_2.correctAnswers[$.k2l.m4a23_2.index].length; i++) {
			if (userText == $.k2l.m4a23_2.correctAnswers[$.k2l.m4a23_2.index][i]){
				isCorrect = true;
				break;
			}
		}

		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m4a23_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m4a23_2.correctAnswers[$.k2l.m4a23_2.index]);
			// $(evt.currentTarget).parent().html($.k2l.m4a23_2.displayAnswers[$.k2l.m4a23_2.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m4a23_2.index).addClass('correctword');
			$('.hint').addClass('hidden');
			$('.info').removeClass('hidden');

			if ($.k2l.m4a23_2.index < $.k2l.m4a23_2.correctAnswers.length - 1) {
				$.k2l.m4a23_2.index++;
				$('#entryanswer'+$.k2l.m4a23_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a23_2.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a23_2.index = 0;
				$.k2l.m4a23_2.wrongcount = 0;
				setTimeout( function() {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout( function() {
					$('#welldonecap').addClass('hidden');
				}, 2000);

				$("#m4a23_2 .navfooter a").removeClass('hidden');

			}
		} else {
			$.k2l.m4a23_2.wrongcount++;
			if ($.k2l.m4a23_2.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m4a23_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m4a23_2.index).html($.k2l.m4a23_2.correctAnswers[$.k2l.m4a23_2.index]);
		// $('#entryanswer'+$.k2l.m4a23_2.index).html($.k2l.m4a23_2.displayAnswers[$.k2l.m4a23_2.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a23_2.index).addClass('correctword');
		$('.hint').addClass('hidden');
		$('.info').removeClass('hidden');
		$("#m4a23_2 .navfooter a").removeClass('hidden');
		if ($.k2l.m4a23_2.index < $.k2l.m4a23_2.correctAnswers.length - 1) {
			$.k2l.m4a23_2.index++;
			$('#entryanswer'+$.k2l.m4a23_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a23_2.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a23_2.index = 0;
			$.k2l.m4a23_2.wrongcount = 0;

		}
	},

	"click .pagination": function(evt){
		$.k2l.m4a23_2.index = 0;
		$.k2l.m4a23_2.wrongcount = 0;
	}

});

Template.m4a23_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m4a23_2 == 'undefined') {
		$.k2l.m4a23_2 = {};
	};

	$.k2l.m4a23_2.index = 0;
	$.k2l.m4a23_2.wrongcount = 0;

	var correctAnswers = [
			["should be able"]
		];

		/* var displayAnswers = [
			["should be able"]
		];

	$.k2l.m4a23_2.displayAnswers = displayAnswers; */
	$.k2l.m4a23_2.correctAnswers = correctAnswers;

}


Template.m4a23_3.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a23_3");
	}
});

Template.m4a23_3.events({

	"submit form" : function(evt) {

		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m4a23_3.correctAnswers[$.k2l.m4a23_3.index].length; i++) {
			if (userText == $.k2l.m4a23_3.correctAnswers[$.k2l.m4a23_3.index][i]){
				isCorrect = true;
				break;
			}
		}

		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m4a23_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m4a23_3.correctAnswers[$.k2l.m4a23_3.index]);
			// $(evt.currentTarget).parent().html($.k2l.m4a23_3.displayAnswers[$.k2l.m4a23_3.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m4a23_3.index).addClass('correctword');
			$('.hint').addClass('hidden');
			$('.info').removeClass('hidden');

			if ($.k2l.m4a23_3.index < $.k2l.m4a23_3.correctAnswers.length - 1) {
				$.k2l.m4a23_3.index++;
				$('#entryanswer'+$.k2l.m4a23_3.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a23_3.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a23_3.index = 0;
				$.k2l.m4a23_3.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
			$("#m4a23_3 .navfooter a").removeClass('hidden');

			}
		} else {
			$.k2l.m4a23_3.wrongcount++;
			if ($.k2l.m4a23_3.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m4a23_3.wrongcount = 0;
		$('#entryanswer'+$.k2l.m4a23_3.index).html($.k2l.m4a23_3.correctAnswers[$.k2l.m4a23_3.index]);
		// $('#entryanswer'+$.k2l.m4a23_3.index).html($.k2l.m4a23_3.displayAnswers[$.k2l.m4a23_3.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a23_3.index).addClass('correctword');
		$('.hint').addClass('hidden');
		$('.info').removeClass('hidden');

		if ($.k2l.m4a23_3.index < $.k2l.m4a23_3.correctAnswers.length - 1) {
			$.k2l.m4a23_3.index++;
			$('#entryanswer'+$.k2l.m4a23_3.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a23_3.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a23_3.index = 0;
			$.k2l.m4a23_3.wrongcount = 0;
			$("#m4a23_3 .navfooter a").removeClass('hidden');

		}
	},

	"click .pagination": function(evt){
		$.k2l.m4a23_3.index = 0;
		$.k2l.m4a23_3.wrongcount = 0;
	}

});

Template.m4a23_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m4a23_3 == 'undefined') {
		$.k2l.m4a23_3 = {};
	};

	$.k2l.m4a23_3.index = 0;
	$.k2l.m4a23_3.wrongcount = 0;

	var correctAnswers = [
			["ought to"]
		];

		/* var displayAnswers = [
			["ought to"]
		];

	$.k2l.m4a23_3.displayAnswers = displayAnswers; */
	$.k2l.m4a23_3.correctAnswers = correctAnswers;

}


Template.m4a23_4.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a23_4");
	}
});

Template.m4a23_4.events({

	"submit form" : function(evt) {

		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m4a23_4.correctAnswers[$.k2l.m4a23_4.index].length; i++) {
			if (userText == $.k2l.m4a23_4.correctAnswers[$.k2l.m4a23_4.index][i]){
				isCorrect = true;
				break;
			}
		}

		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m4a23_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m4a23_4.correctAnswers[$.k2l.m4a23_4.index]);
			$(evt.currentTarget).parent().html($.k2l.m4a23_4.displayAnswers[$.k2l.m4a23_4.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m4a23_4.index).addClass('correctword');
			$('.hint').addClass('hidden');
			$('.info').removeClass('hidden');

			if ($.k2l.m4a23_4.index < $.k2l.m4a23_4.correctAnswers.length - 1) {
				$.k2l.m4a23_4.index++;
				$('#entryanswer'+$.k2l.m4a23_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a23_4.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a23_4.index = 0;
				$.k2l.m4a23_4.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
			$("#m4a23_4 .navfooter a").removeClass('hidden');

			}
		} else {
			$.k2l.m4a23_4.wrongcount++;
			if ($.k2l.m4a23_4.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m4a23_4.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m4a23_4.index).html($.k2l.m4a23_4.correctAnswers[$.k2l.m4a23_4.index]);
		$('#entryanswer'+$.k2l.m4a23_4.index).html($.k2l.m4a23_4.displayAnswers[$.k2l.m4a23_4.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a23_4.index).addClass('correctword');
		$('.hint').addClass('hidden');
		$('.info').removeClass('hidden');

		if ($.k2l.m4a23_4.index < $.k2l.m4a23_4.correctAnswers.length - 1) {
			$.k2l.m4a23_4.index++;
			$('#entryanswer'+$.k2l.m4a23_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a23_4.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a23_4.index = 0;
			$.k2l.m4a23_4.wrongcount = 0;
			$("#m4a23_4 .navfooter a").removeClass('hidden');

		}
	},

	"click .pagination": function(evt){
		$.k2l.m4a23_4.index = 0;
		$.k2l.m4a23_4.wrongcount = 0;
	}

});

Template.m4a23_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m4a23_4 == 'undefined') {
		$.k2l.m4a23_4 = {};
	};

	$.k2l.m4a23_4.index = 0;
	$.k2l.m4a23_4.wrongcount = 0;

	var correctAnswers = [
			["need to", "have to"]
		];
	var displayAnswers = [
			["need to / have to"]
		];

		 

	$.k2l.m4a23_4.displayAnswers = displayAnswers; 
	$.k2l.m4a23_4.correctAnswers = correctAnswers;

}


Template.m4a23_5.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a23_5");
	}
});

Template.m4a23_5.events({

	"submit form" : function(evt) {

		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m4a23_5.correctAnswers[$.k2l.m4a23_5.index].length; i++) {
			if (userText == $.k2l.m4a23_5.correctAnswers[$.k2l.m4a23_5.index][i]){
				isCorrect = true;
				break;
			}
		}

		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m4a23_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m4a23_5.correctAnswers[$.k2l.m4a23_5.index]);
			// $(evt.currentTarget).parent().html($.k2l.m4a23_5.displayAnswers[$.k2l.m4a23_5.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m4a23_5.index).addClass('correctword');
			$('.hint').addClass('hidden');
			$('.info').removeClass('hidden');

			if ($.k2l.m4a23_5.index < $.k2l.m4a23_5.correctAnswers.length - 1) {
				$.k2l.m4a23_5.index++;
				$('#entryanswer'+$.k2l.m4a23_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a23_5.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a23_5.index = 0;
				$.k2l.m4a23_5.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
			$("#m4a23_5 .navfooter a").removeClass('hidden');

			}
		} else {
			$.k2l.m4a23_5.wrongcount++;
			if ($.k2l.m4a23_5.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m4a23_5.wrongcount = 0;
		$('#entryanswer'+$.k2l.m4a23_5.index).html($.k2l.m4a23_5.correctAnswers[$.k2l.m4a23_5.index]);
		// $('#entryanswer'+$.k2l.m4a23_5.index).html($.k2l.m4a23_5.displayAnswers[$.k2l.m4a23_5.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a23_5.index).addClass('correctword');
		$('.hint').addClass('hidden');
		$('.info').removeClass('hidden');

		if ($.k2l.m4a23_5.index < $.k2l.m4a23_5.correctAnswers.length - 1) {
			$.k2l.m4a23_5.index++;
			$('#entryanswer'+$.k2l.m4a23_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a23_5.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a23_5.index = 0;
			$.k2l.m4a23_5.wrongcount = 0;
			$("#m4a23_5 .navfooter a").removeClass('hidden');

		}
	},

	"click .pagination": function(evt){
		$.k2l.m4a23_5.index = 0;
		$.k2l.m4a23_5.wrongcount = 0;
	}

});

Template.m4a23_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m4a23_5 == 'undefined') {
		$.k2l.m4a23_5 = {};
	};

	$.k2l.m4a23_5.index = 0;
	$.k2l.m4a23_5.wrongcount = 0;

	var correctAnswers = [
			["must"]
		];

		/* var displayAnswers = [
			["must"]
		];

	$.k2l.m4a23_5.displayAnswers = displayAnswers; */
	$.k2l.m4a23_5.correctAnswers = correctAnswers;

}


Template.m4a23_6.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a23_6");
	}
});

Template.m4a23_6.events({

	"submit form" : function(evt) {

		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m4a23_6.correctAnswers[$.k2l.m4a23_6.index].length; i++) {
			if (userText == $.k2l.m4a23_6.correctAnswers[$.k2l.m4a23_6.index][i]){
				isCorrect = true;
				break;
			}
		}

		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m4a23_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m4a23_6.correctAnswers[$.k2l.m4a23_6.index]); // use this is there is multiple possible answers
			$(evt.currentTarget).parent().html($.k2l.m4a23_6.displayAnswers[$.k2l.m4a23_6.index]);
			$('#entryanswer'+$.k2l.m4a23_6.index).addClass('correctword');
			$('.hint').addClass('hidden');
			$('.info').removeClass('hidden');

			if ($.k2l.m4a23_6.index < $.k2l.m4a23_6.correctAnswers.length - 1) {
				$.k2l.m4a23_6.index++;
				$('#entryanswer'+$.k2l.m4a23_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a23_6.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a23_6.index = 0;
				$.k2l.m4a23_6.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
			$("#m4a23_6 .navfooter a").removeClass('hidden');

			}
		} else {
			$.k2l.m4a23_6.wrongcount++;
			if ($.k2l.m4a23_6.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m4a23_6.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m4a23_6.index).html($.k2l.m4a23_6.correctAnswers[$.k2l.m4a23_6.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a23_6.index).html($.k2l.m4a23_6.displayAnswers[$.k2l.m4a23_6.index]);
		$('#entryanswer'+$.k2l.m4a23_6.index).addClass('correctword');
		$('.hint').addClass('hidden');
		$('.info').removeClass('hidden');

		if ($.k2l.m4a23_6.index < $.k2l.m4a23_6.correctAnswers.length - 1) {
			$.k2l.m4a23_6.index++;
			$('#entryanswer'+$.k2l.m4a23_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a23_6.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a23_6.index = 0;
			$.k2l.m4a23_6.wrongcount = 0;

			$("#m4a23_6 .navfooter a").removeClass('hidden');

		}
	},

	"click .pagination": function(evt){
		$.k2l.m4a23_6.index = 0;
		$.k2l.m4a23_6.wrongcount = 0;
	}

});

Template.m4a23_6.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m4a23_6 == 'undefined') {
		$.k2l.m4a23_6 = {};
	};

	$.k2l.m4a23_6.index = 0;
	$.k2l.m4a23_6.wrongcount = 0;

	var correctAnswers = [
			["'d better", "had better"]
		];

		var displayAnswers = [
			["'d better/had better"]
		];

	$.k2l.m4a23_6.displayAnswers = displayAnswers;
	$.k2l.m4a23_6.correctAnswers = correctAnswers;

}

