

Template.m2a3.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a3_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m2a3.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 3);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a3.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 3, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a3.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a3_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a3_2");
	}
});

Template.m2a3_2.events({
	
	"submit form" : function(evt) {
		
		if (evt.preventDefault){
			evt.preventDefault();
		}
		
		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();
		
		
		var isCorrect = false;
		for (var i = 0; i < $.k2l.m2a3_2.correctAnswers[$.k2l.m2a3_2.index].length; i++){
			if (userText ==  $.k2l.m2a3_2.correctAnswers[$.k2l.m2a3_2.index][i]){
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect){
			//correct
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m2a3_2.wrongcount = 0;
			$('.stuck').addClass( 'hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a3_2.displayAnswers[$.k2l.m2a3_2.index]);
			$('#entryanswer'+$.k2l.m2a3_2.index).addClass('correctword');
			
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);

			if ($.k2l.m2a3_2.index < $.k2l.m2a3_2.correctAnswers.length - 1) {
				$.k2l.m2a3_2.index++;
				$('#entryanswer'+$.k2l.m2a3_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m2a3_2.index).removeClass('ddwidth11');
				$('#entryanswer'+$.k2l.m2a3_2.index).html('<form class="textentry"><input type="text" name="userText" size="15"><input type="submit" value="OK"></form>');
			} else {
				/*
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				}, 1500);
				*/
				$('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m2a3_2.wrongcount++;
			
			if ($.k2l.m2a3_2.wrongcount >= 1) {
				$('.stuck').removeClass( 'hidden');
			}
			
			$('.incorrectscreen').removeClass('hidden');
			setTimeout( function() {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			
			evt.target.userText.value = "";
		}
	},
	
	"click .stuck-button": function(evt) {
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass( 'hidden'); //hide stuck button if visible
		$('.incorrect').addClass('hidden');
		$.k2l.m2a3_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m2a3_2.index).html($.k2l.m2a3_2.displayAnswers[$.k2l.m2a3_2.index]);
		$('#entryanswer'+$.k2l.m2a3_2.index).addClass('correctword');
		
		if ($.k2l.m2a3_2.index < $.k2l.m2a3_2.correctAnswers.length - 1) {
			$.k2l.m2a3_2.index++;
			$('#entryanswer'+$.k2l.m2a3_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m2a3_2.index).removeClass('ddwidth11');
			$('#entryanswer'+$.k2l.m2a3_2.index).html('<form class="textentry"><input type="text" name="userText" size="17"><input type="submit" value="OK"></form>');
		} else {
			setTimeout(function() {
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", $(parentSection).next('section').attr('id'));
			}, 4000);
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m2a3_2.index = 0;
		$.k2l.m2a3_2.wrongcount = 0;
	}
	
});

Template.m2a3_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a3_2 == 'undefined') {
		$.k2l.m2a3_2 = {};
	};
	
	$.k2l.m2a3_2.index = 0;
	$.k2l.m2a3_2.wrongcount = 0;
	
	var correctAnswers = [
			["alex hunter"], // Possible answers for Q1.
			["106 abbottsfield road"],// Possible answers for Q2.
			["braemar"],
			["aberdeenshire"],
			["ab354tg", "ab35 4tg"],
			["united kingdom"]
			
		];
		
	var displayAnswers = ["Alex Hunter", "106 Abbottsfield Road", "Braemar", "Aberdeenshire", "AB35 4TG", "United Kingdom"];
	
	$.k2l.m2a3_2.displayAnswers = displayAnswers;
	$.k2l.m2a3_2.correctAnswers = correctAnswers;
	
}

