Template.m3a19.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a19");
	},

	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m3a19_end') { 
			return false; 
		}		return true;	 
 	} 
});

Template.m3a19.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a19.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a19.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {

		$.k2l.m3a19.sound.src = {};
	}

});

Template.m3a19.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m3a19 == 'undefined') {
		$.k2l.m3a19 = {};
	};

	$.k2l.m3a19.sound = new Audio();
	$('[id^=m3a19_city]').on("click",function(event){
			var stopVideo = function ( element ) {
				var iframe = element.querySelector( 'iframe');
				if ( iframe ) {
					var iframeSrc = iframe.src;
					iframe.src = iframeSrc;
				}
				var video = element.querySelector( 'video' );
				if ( video ) {
					video.pause();
				}
			};

		if(event.target == this || $(event.target).is('button')){
			stopVideo(this);
		}

	});
}


Template.m3a19.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 19, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a19.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a19_1.helpers({
		activeSection: function(){
			var activeSection = Session.get('activeSection');
			return (activeSection == "#m3a19_1");
		}
	})

Template.m3a19_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a19_2");
	}
});

Template.m3a19_2.events({

	'click #m3a19_2 .correctAnswer': function(evt) {
			$('.correctscreen').removeClass("hidden");

			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
			}, 1000);

      setTimeout(function() {
		var parentSection = $(evt.currentTarget).parents('section');
		$.k2l.m3a19.sound.src = {};
        $(parentSection).addClass('hidden'); // hide this page
        $(parentSection).next('section').removeClass('hidden');// reveal next page.
        document.location.hash = $(parentSection).next('section').attr('id');
        Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
      }, 1000);

		},

  	'click #m3a19_2 .incorrectAnswer': function(evt) {
  			$('.incorrectscreen').removeClass("hidden");

  			setTimeout(function(){
  				$('.incorrectscreen').addClass("hidden");
  			}, 1000);

  	}

});


Template.m3a19_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a19_3");
	}
});

Template.m3a19_3.events({

	'click #m3a19_3 .correctAnswer': function(evt) {
			$('.correctscreen').removeClass("hidden");

			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
			}, 1000);

      setTimeout(function() {
		var parentSection = $(evt.currentTarget).parents('section');
		$.k2l.m3a19.sound.src = {};
        $(parentSection).addClass('hidden'); // hide this page
        $(parentSection).next('section').removeClass('hidden');// reveal next page.
        document.location.hash = $(parentSection).next('section').attr('id');
        Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
      }, 1000);

		},

  	'click #m3a19_3 .incorrectAnswer': function(evt) {
  			$('.incorrectscreen').removeClass("hidden");

  			setTimeout(function(){
  				$('.incorrectscreen').addClass("hidden");
  			}, 1000);

  	}

});


Template.m3a19_4.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a19_4");
	}
});

Template.m3a19_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a19_4.correctAnswers[$.k2l.m3a19_4.index].length; i++) {
			if (userText == $.k2l.m3a19_4.correctAnswers[$.k2l.m3a19_4.index][i]){ 
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
			$.k2l.m3a19_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a19_4.correctAnswers[$.k2l.m3a19_4.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a19_4.displayAnswers[$.k2l.m3a19_4.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a19_4.index).addClass('caption capgreen');
			
			if ($.k2l.m3a19_4.index < $.k2l.m3a19_4.correctAnswers.length - 1) {
				$.k2l.m3a19_4.index++;
				$('#entryanswer'+$.k2l.m3a19_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a19_4.index).html('<form class="textentry"><input type="text" name="userText" size="8" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a19_4.index = 0;
				$.k2l.m3a19_4.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m3a19_4.wrongcount++;
			if ($.k2l.m3a19_4.wrongcount >= 1) {
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
		$.k2l.m3a19_4.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a19_4.index).html($.k2l.m3a19_4.correctAnswers[$.k2l.m3a19_4.index]);
		// $('#entryanswer'+$.k2l.m3a19_4.index).html($.k2l.m3a19_4.displayAnswers[$.k2l.m3a19_4.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a19_4.index).addClass('caption capgreen');
		
		if ($.k2l.m3a19_4.index < $.k2l.m3a19_4.correctAnswers.length - 1) {
			$.k2l.m3a19_4.index++;
			$('#entryanswer'+$.k2l.m3a19_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a19_4.index).html('<form class="textentry"><input type="text" name="userText" size="8" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a19_4.index = 0;
			$.k2l.m3a19_4.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m3a19_4.index = 0;
		$.k2l.m3a19_4.wrongcount = 0;
	}
	
});

Template.m3a19_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a19_4 == 'undefined') {
		$.k2l.m3a19_4 = {};
	};
	
	$.k2l.m3a19_4.index = 0;
	$.k2l.m3a19_4.wrongcount = 0;
	
	var correctAnswers = [
			["friendliness"],
			["cleanliness"]
		];
		
		/* var displayAnswers = [
			["friendliness"],
			["cleanliness"]
		]; 
		
	$.k2l.m3a19_4.displayAnswers = displayAnswers; */
	$.k2l.m3a19_4.correctAnswers = correctAnswers;
	
}

Template.m3a19_5.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a19_5");
	}
});

Template.m3a19_5.events({

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

		for (var i = 0; i < $.k2l.m3a19_5.correctAnswers[$.k2l.m3a19_5.index].length; i++) {
			if (userText == $.k2l.m3a19_5.correctAnswers[$.k2l.m3a19_5.index][i]){
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
			$.k2l.m3a19_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a19_5.correctAnswers[$.k2l.m3a19_5.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a19_5.displayAnswers[$.k2l.m3a19_5.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a19_5.index).addClass('correctword');
			$("#order").html($.k2l.m3a19_5.order [$.k2l.m3a19_5.orderIndex]);
			$.k2l.m3a19_5.orderIndex++;
			if ($.k2l.m3a19_5.index < $.k2l.m3a19_5.correctAnswers.length - 1) {
				$.k2l.m3a19_5.index++;
				$('#entryanswer'+$.k2l.m3a19_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a19_5.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a19_5.index = 0;
        $.k2l.m3a19_5.orderIndex = 0;
				$.k2l.m3a19_5.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m3a19_5.wrongcount++;
			if ($.k2l.m3a19_5.wrongcount >= 1) {
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
		$.k2l.m3a19_5.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a19_5.index).html($.k2l.m3a19_5.correctAnswers[$.k2l.m3a19_5.index]);
		// $('#entryanswer'+$.k2l.m3a19_5.index).html($.k2l.m3a19_5.displayAnswers[$.k2l.m3a19_5.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a19_5.index).addClass('correctword');
		$("#order").html($.k2l.m3a19_5.order [$.k2l.m3a19_5.orderIndex]);

		if ($.k2l.m3a19_5.index < $.k2l.m3a19_5.correctAnswers.length - 1) {
			$.k2l.m3a19_5.index++;
			$.k2l.m3a19_5.orderIndex++;
			$('#entryanswer'+$.k2l.m3a19_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a19_5.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a19_5.index = 0;
			$.k2l.m3a19_5.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function(evt){
		$.k2l.m3a19_5.index = 0;
		$.k2l.m3a19_5.wrongcount = 0;
	}

});

Template.m3a19_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m3a19_5 == 'undefined') {
		$.k2l.m3a19_5 = {};
	};

	$.k2l.m3a19_5.index = 0;
	$.k2l.m3a19_5.wrongcount = 0;

	$.k2l.m3a19_5.correctAnswers = [
			["friendliest"],
			["cleanest"],
			["best"],
			["safest"]
		];

	 $.k2l.m3a19_5.order = [
		 		 "second", "third", "fourth", "fourth"
		]

	 $.k2l.m3a19_5.orderIndex = 0;

}


Template.m3a19_6.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a19_6");
	}
});

Template.m3a19_6.events({

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

		for (var i = 0; i < $.k2l.m3a19_6.correctAnswers[$.k2l.m3a19_6.index].length; i++) {
			if (userText == $.k2l.m3a19_6.correctAnswers[$.k2l.m3a19_6.index][i]){
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
			$.k2l.m3a19_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a19_6.displayAnswers[$.k2l.m3a19_6.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a19_6.displayAnswers[$.k2l.m3a19_6.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a19_6.index).addClass('correctword');

			if ($.k2l.m3a19_6.index < $.k2l.m3a19_6.correctAnswers.length - 1) {
				$.k2l.m3a19_6.index++;
				$('#entryanswer'+$.k2l.m3a19_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a19_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a19_6.index = 0;
				$.k2l.m3a19_6.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m3a19_6.wrongcount++;
			if ($.k2l.m3a19_6.wrongcount >= 1) {
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
		$.k2l.m3a19_6.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m3a19_6.index).html($.k2l.m3a19_6.correctAnswers[$.k2l.m3a19_6.index]); //
		$('#entryanswer'+$.k2l.m3a19_6.index).html($.k2l.m3a19_6.displayAnswers[$.k2l.m3a19_6.index]);
		$('#entryanswer'+$.k2l.m3a19_6.index).addClass('correctword');

		if ($.k2l.m3a19_6.index < $.k2l.m3a19_6.correctAnswers.length - 1) {
			$.k2l.m3a19_6.index++;
			$('#entryanswer'+$.k2l.m3a19_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a19_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a19_6.index = 0;
			$.k2l.m3a19_6.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function(evt){
		$.k2l.m3a19_6.index = 0;
		$.k2l.m3a19_6.wrongcount = 0;
	}

});

Template.m3a19_6.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m3a19_6 == 'undefined') {
		$.k2l.m3a19_6 = {};
	};

	$.k2l.m3a19_6.index = 0;
	$.k2l.m3a19_6.wrongcount = 0;

	var correctAnswers = [
			["if it's value for money you're after"]
		];

	var displayAnswers = [
			["If it's value for money you're after..."]
		];

	$.k2l.m3a19_6.displayAnswers = displayAnswers;
	$.k2l.m3a19_6.correctAnswers = correctAnswers;

}


Template.m3a19_7.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a19_7");
	}
});

Template.m3a19_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a19_7.correctAnswers[$.k2l.m3a19_7.index].length; i++) {
			if (userText == $.k2l.m3a19_7.correctAnswers[$.k2l.m3a19_7.index][i]){ 
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
			$.k2l.m3a19_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a19_7.correctAnswers[$.k2l.m3a19_7.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a19_7.displayAnswers[$.k2l.m3a19_7.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a19_7.index).addClass('correctword');
			
			if ($.k2l.m3a19_7.index < $.k2l.m3a19_7.correctAnswers.length - 1) {
				$.k2l.m3a19_7.index++;
				$('#entryanswer'+$.k2l.m3a19_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a19_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a19_7.index = 0;
				$.k2l.m3a19_7.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m3a19_7.wrongcount++;
			if ($.k2l.m3a19_7.wrongcount >= 1) {
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
		$.k2l.m3a19_7.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a19_7.index).html($.k2l.m3a19_7.correctAnswers[$.k2l.m3a19_7.index]);
		// $('#entryanswer'+$.k2l.m3a19_7.index).html($.k2l.m3a19_7.displayAnswers[$.k2l.m3a19_7.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a19_7.index).addClass('correctword');
		
		if ($.k2l.m3a19_7.index < $.k2l.m3a19_7.correctAnswers.length - 1) {
			$.k2l.m3a19_7.index++;
			$('#entryanswer'+$.k2l.m3a19_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a19_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a19_7.index = 0;
			$.k2l.m3a19_7.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m3a19.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m3a19_7.index = 0;
		$.k2l.m3a19_7.wrongcount = 0;
	}
	
});

Template.m3a19_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a19_7 == 'undefined') {
		$.k2l.m3a19_7 = {};
	};
	
	$.k2l.m3a19_7.index = 0;
	$.k2l.m3a19_7.wrongcount = 0;
	
	var correctAnswers = [
			["apparently"]
		];
		
		/* var displayAnswers = [
			["apparently"]
		
	$.k2l.m3a19_7.displayAnswers = displayAnswers; */
	$.k2l.m3a19_7.correctAnswers = correctAnswers;
	
}
