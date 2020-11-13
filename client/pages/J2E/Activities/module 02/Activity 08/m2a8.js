

Template.m2a8.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a8_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m2a8.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a8.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 8, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a8.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a8_1.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a8_1");
	}
});

Template.m2a8_1.events({
	
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
		
		for (var i = 0; i < $.k2l.m2a8_1.correctAnswers[$.k2l.m2a8_1.index].length; i++) {
			if (userText == $.k2l.m2a8_1.correctAnswers[$.k2l.m2a8_1.index][i]){ 
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
			$.k2l.m2a8_1.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a8_1.displayAnswers[$.k2l.m2a8_1.index]);
			$('#entryanswer'+$.k2l.m2a8_1.index).addClass('correctword');
			
			if ($.k2l.m2a8_1.index < $.k2l.m2a8_1.correctAnswers.length - 1) {
				$.k2l.m2a8_1.index++;
				$('#entryanswer'+$.k2l.m2a8_1.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m2a8_1.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m2a8_1.index = 0;
				$.k2l.m2a8_1.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m2a8_1.wrongcount++;
			if ($.k2l.m2a8_1.wrongcount >= 1) {
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
		$.k2l.m2a8_1.wrongcount = 0;
		$('#entryanswer'+$.k2l.m2a8_1.index).html($.k2l.m2a8_1.displayAnswers[$.k2l.m2a8_1.index]);
		$('#entryanswer'+$.k2l.m2a8_1.index).addClass('correctword');
		
		if ($.k2l.m2a8_1.index < $.k2l.m2a8_1.correctAnswers.length - 1) {
			$.k2l.m2a8_1.index++;
			$('#entryanswer'+$.k2l.m2a8_1.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m2a8_1.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m2a8_1.index = 0;
		$.k2l.m2a8_1.wrongcount = 0;
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .numbutt": function (evt) {
		$.k2l.m2a8_1.pindex =evt.currentTarget.id;
		$("#textDisplay").html($.k2l.m2a8_1.paragraphs[$.k2l.m2a8_1.pindex].para);
		},
	
	"click .pagination": function(evt){
		$.k2l.m2a8_1.index = 0;
		$.k2l.m2a8_1.wrongcount = 0;
	}
	
});

Template.m2a8_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a8_1 == 'undefined') {
		$.k2l.m2a8_1 = {};
	};
	
	$.k2l.m2a8_1.index = 0;
	$.k2l.m2a8_1.wrongcount = 0;
	
	var correctAnswers = [
			["leads"], // Possible answers for Q1.
			["enjoy"],
			["want", "want to go"],
			["make"],
			["need"],
			["take"]
		];
		
		var displayAnswers = [
			["leads"],
			["enjoy"],
			["want/want to go"],
			["make"],
			["need"],
			["take"]
		];
		$.k2l.m2a8_1.displayAnswers = displayAnswers;
		
	$.k2l.m2a8_1.correctAnswers = correctAnswers;
	
	$.k2l.m2a8_1.pindex = 0;
	
	var paragraphs = [
			{para: "<b>1)</b> Sue Brown and Sylvia Jones pause for a few moments to admire their morning’s work; eight large boxes overflowing with delicious oranges, green beans, bananas, grapes, potatoes and apples. <br><br> They’ve got quite a bargain. The two women and their friends have pooled their money to buy all this produce from wholesale fruit and vegetable stores for only £35.90 – a cost far below the retail prices being charged in all the supermarkets in town."},
			{para: "<b>2)</b> Sue leads the small co-operative food-buying group of eight families and is enthusiastic about their success. ‘The quality is fantastic and we have almost no waste.’<br><br> The group has discovered other advantages too. ‘Having so much cheap produce around has changed my family’s eating habits.  The children enjoy trying out all kinds of different fruit and vegetables.’"},
			{para: "<b>3)</b> They are astonished at how interested the children are; they often want to go on the early morning trips to the wholesaler and help to divide the produce afterwards."},
			{para: "<b>4)</b> The savings they make are reduced a bit of course, by the cost of the 20 mile journey to pick up the food and the small bags they need to divide it into eight shares. <br><br>However, they all take turns to order, collect and deliver the food and are getting more efficient at buying. <br><br>‘We made some mistakes at first,’ admitted Sue. ‘We ordered some very strange things and had a ‘freak of the week’ award!’"},
			{para: "<b>5</b>) Overall, though, they wouldn’t go back to buying their fruit and   vegetables from supermarkets. ‘Our lives have changed,’ says Sue.<br><br> ‘It’s unusual, but we all eat more healthily and it’s always fun to get a bargain.’ "},
			{para: "<b>6.</b>) ‘We made some mistakes at first,’ admitted Sue. ‘We ordered some very strange things and had a ‘freak of the week’ award!’ <br><br> Overall, though, they wouldn’t go back to buying their fruit and vegetables from supermarkets. ‘Our lives have changed,’ says Sue. ‘It’s unusual, but we all eat more healthily and it’s always fun to get a bargain.’"}			
		]
		
	$.k2l.m2a8_1.paragraphs = paragraphs;
}
