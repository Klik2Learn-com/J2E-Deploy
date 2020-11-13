

Template.m2a5.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a5_end') {
			return false;
		} return true;
	}
});

Template.m2a5.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a5.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 5, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a5.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a5_paragraph.helpers({

	helpBox: function () {
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m1a19_3") {
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},

	helpBox_2: function () {
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m1a19_8") {
			return ""
		} else {
			return "hidden"
		}
		return
	}

});

Template.m2a5_paragraph.events({

	"click .numbutt": function (evt) {
		$.k2l.m2a5_paragraph.index = $(evt.target).text() - 1;
		$("#m2a5_paragraphtextDisplay").html($.k2l.m2a5_paragraph.paragraphs[$.k2l.m2a5_paragraph.index].paragraph);
	}

});

Template.m2a5_paragraph.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m2a5_paragraph == 'undefined') {
		$.k2l.m2a5_paragraph = {};
	};

	$.k2l.m2a5_paragraph.index = 0;

	var paragraphs = [
		{ paragraph: "<p><b>1.</b> Sue Brown and Sylvia Jones pause for a few moments to admire their morning’s work; eight large boxes overflowing with delicious oranges, green beans, bananas, grapes, potatoes and apples. They’ve got quite a bargain. The two women and their friends have pooled their money to buy all this produce from wholesale fruit and vegetable stores for only £35.90 – a cost far below the retail prices being charged in all the supermarkets in town.</p>" },
		{ paragraph: "<p><b>2.</b> Sue leads the small co-operative food-buying group of eight families and is enthusiastic about their success. ‘The quality is fantastic and we have almost no waste.’ The group has discovered other advantages too. </p>" },
		{ paragraph: "<p><b>3.</b> ‘Having so much cheap produce around has changed my family’s eating habits. The children enjoy trying out all kinds of different fruit and vegetables.’</p>" },
		{ paragraph: "<p><b>4.</b> They are astonished at how interested the children are; they often want to go on the early morning trips to the wholesaler and help to divide the produce afterwards.</p>" },
		{ paragraph: "<p><b>5.</b> The savings they make are reduced a bit of course, by the cost of the 20 mile journey to pick up the food and the small bags they need to divide it into eight shares. However, they all take turns to order, collect and deliver the food and are getting more efficient at buying.</p>" },
		{ paragraph: "<p><b>6.</b> ‘We made some mistakes at first,’ admitted Sue. ‘We ordered some very strange things and had a ‘freak of the week’ award!’ Overall, though, they wouldn’t go back to buying their fruit and   vegetables from supermarkets. ‘Our lives have changed,’ says Sue. ‘It’s unusual, but we all eat more healthily and it’s always fun to get a bargain.’</p>" }
	]

	$.k2l.m2a5_paragraph.paragraphs = paragraphs;

}


Template.m2a5_questions.helpers({

	activeQuestionNumber: function () {
		return Session.get('activeQuestionNumber');
	},

	activeQuestion: function () {
		return Session.get('activeQuestion');
	},

	requiredParagraphs: function () {
		return Session.get('requiredParagraphs');
	},

	revealNext: function () {
		if (Session.get('activeQuestionNumber') == 6) {
			return true;
		} else {
			return false;
		};
	}

});

Template.m2a5_questions.events({

	"click #nextQ": function (evt) {
		evt.preventDefault();
		if ($.k2l.m2a5_questions.index < $.k2l.m2a5_questions.questions.length - 1) {
			$.k2l.m2a5_questions.index++;
			Session.set('activeQuestion', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].qu);
			Session.set('activeQuestionNumber', $.k2l.m2a5_questions.index + 1);
			Session.set('requiredParagraphs', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].paragraph);
			if (Session.get('activeQuestionNumber') == 6) {
				$("#m2a5QuestionFooter").addClass('disabled');
			}
		};

	},

	"click #prevQ": function (evt) {
		evt.preventDefault();
		if ($.k2l.m2a5_questions.index > 0) {
			$.k2l.m2a5_questions.index--;
			Session.set('activeQuestion', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].qu);
			Session.set('activeQuestionNumber', $.k2l.m2a5_questions.index + 1);
			Session.set('requiredParagraphs', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].paragraph);
		};
	},

	"click .pagination": function (evt) {
		//reset the variables
		$.k2l.m2a5_questions.index = 0;
		$.k2l.m2a5_paragraph.index = 0;
		Session.set('activeQuestion', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].qu);
		Session.set('activeQuestionNumber', $.k2l.m2a5_questions.index + 1);
		Session.set('requiredParagraphs', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].paragraph);

		$("#m2a5QuestionFooter").removeClass('disabled');

	}

});

Template.m2a5_questions.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m2a5_questions == 'undefined') {
		$.k2l.m2a5_questions = {};
	};

	$.k2l.m2a5_questions.index = 0;

	$.k2l.m2a5_questions.questions = [
		{ qu: "Why did the woman decide to buy their fruit and vegetables this way?", paragraph: "Paragraph 1" },
		{ qu: "What advantages does the co-operative have for their families?", paragraph: "Paragraph 2" },
		{ qu: "Find three jobs they have to do for the co-operative group.", paragraph: "Paragraph 5" },
		{ qu: "What costs do they have apart from the cost of the food?", paragraph: "Paragraph 5" },
		{ qu: "What mistakes did they make at first?", paragraph: "Paragraph 6" },
		{ qu: "What are the advantages and disadvantages of co-operatives?", paragraph: "Full Article" }
	];

	Session.set('activeQuestion', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].qu);
	Session.set('activeQuestionNumber', $.k2l.m2a5_questions.index + 1);
	Session.set('requiredParagraphs', $.k2l.m2a5_questions.questions[$.k2l.m2a5_questions.index].paragraph);
}

Template.m2a5_4.events( {

	"click .pagination.next": function(evt) {
		$.k2l.m2a5_questions.index = 0;
		$("#m2a5_paragraphtextDisplay").html($.k2l.m2a5_paragraph.paragraphs[$.k2l.m2a5_paragraph.index].paragraph);
	}
})

