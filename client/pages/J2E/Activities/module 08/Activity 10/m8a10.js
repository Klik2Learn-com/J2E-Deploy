Template.m8a10.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a10_end') { 
			return false; 
		}
		return true;	 
	} ,

	// This helper allows m4a42 to determine if a section is a PARAGRAPH SELECTION TEMPLATE. List all the pages on which the paragraph select should be displayed
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m8a10_1","#m8a10_2","#m8a10_3","#m8a10_4","#m8a10_5"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
}); 


Template.m8a10.events({

	'click i.titlereturn': function(evt){
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}

}); 



Template.m8a10_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a10_1"); 
	} 
}); 
 
Template.m8a10_1.events({ 
 
}); 
 
Template.m8a10_1.rendered = function() {
}

Template.m8a10paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m8a10_1","#m8a10_2","#m8a10_3","#m8a10_4","#m8a10_5","#m8a10_6", "#m8a10_7", "#m8a10_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return "hello";
			}
		}
		return "hidden";
	},

	helpBox: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m8a10_1"){
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},
	
	helpBox_2: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m8a10_8"){
			return ""
		} else {
			return "hidden"
		}
		return
	}
})

Template.m8a10paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m8a10.index =evt.currentTarget.id;
		$("#m8a10textDisplay").html($.k2l.m8a10.paragraph[$.k2l.m8a10.index].paragraph);
		//$("#m8a10Q").html($(evt.currentTarget).html());
		},
	"click #m8a10nextQ": function (evt) {
		if ($.k2l.m8a10.Qindex >= 7){
				$("#m8a10nextQ").addClass('pagination');
				$("#m8a10cont").removeClass('hidden');
				$("#m8a10nextQ").attr("href", "#m8a10_2")
	} else {
		$("#m8a10prevQ").removeClass('pagination');
		$.k2l.m8a10.Qindex += 1;
		$("#m8a10Quest").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].question);
		$("#m8a10P").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].paragraph);
		$("#m8a10Q").html(($.k2l.m8a10.Qindex + 1));
		$("#m8a10Help").addClass('hidden');
		$("#m8a10cont").addClass('hidden');
		
	};
			
		},
		"click #m8a10prevQ": function (evt) {
			if ($.k2l.m8a10.Qindex <= 0){
				$("#m8a10prevQ").addClass('pagination');
				$.k2l.m8a10.Qindex = 0;
			} else {
		$.k2l.m8a10.Qindex -= 1;
		$("#m8a10Quest").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].question);
		$("#m8a10P").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].paragraph);
		$("#m8a10Q").html(($.k2l.m8a10.Qindex + 1));
			};
		
			
		}
	}
)

Template.m8a10.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(8,10);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m8a10 == 'undefined') {
		$.k2l.m8a10 = {};
	};
	
	
	$.k2l.m8a10.index = 0;
	$.k2l.m8a10.Qindex = 0;

	
	var question = [
					{question:"Choose one of the unusual jobs from paragraph 1. What does this person do?", paragraph:"Paragraph 1"},
					{question:"Which statement is true:<Br>A: People are more likely to sue a company nowadays.<br>B: People are less likely to sue a company nowadays.", paragraph:"Paragraph 2"},
					{question:"Find two disadvantages of Derek’s job.", paragraph:"Paragraph 3"},
					{question:"Find one advantage of Derek’s job.", paragraph:"Paragraph 3"},
					{question:"Complete this sentence:<br>People in the UK don’t seem very happy with their jobs because...", paragraph:"Paragraph 4"}
					]
					
	var paragraph = [
			{paragraph: "<p><b>1.</b> The number of unusual jobs is increasing, from badger consultants to dog psychologists. One insurance company said there had been a steady increase in the number of firms wanting insurance cover for unusual occupations such as preparing kitchens for celebrity chef programmes on TV and checking for noise problems on construction sites. If people doing those jobs make mistakes, the company could face an expensive court case.</p>"},
			{paragraph: "<p><b>2.</b> One director said, “The difficulty with unusual jobs is that they don’t fit the normal rules. The more unconventional the job, the more you need to think about the hidden risks. In today’s compensation culture, it’s very easy to imagine a customer suing their dog psychologist if their dog continues to eat their slippers.”</p>"},
			{paragraph: "<p><b>3.</b> One of the UK’s most peculiar jobs is the Ravenmaster, the man who looks after the famous ravens at the Tower of London.Derrick Coyle, 64, starts each day at dawn. He greets each of the ravens by name and lets them out of the cages where they spend the night.He said in a recent interview: “Getting up in the morning is the worst part and I don’t have a social life. Even in the summer I always have to get back to put the ravens to bed. The fact it’s an unusual job does give me a bit of a boost. There’s no one else in the world who can say ‘I’m a Ravenmaster Yeoman.’</p>"},
			{paragraph: "<p><b>4.</b> So are workers in the UK a happy bunch on the whole? More and more people are looking for unusual jobs. Almost half the workers in the UK are actively looking for a new job. A survey of 300 adults showed that one in five wanted a change.</p>"}
		]
		
	$.k2l.m8a10.question = question;
	$.k2l.m8a10.paragraph = paragraph;
	
	$("#m8a10nextQ").removeClass('pagination');
}

Template.m8a10_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a10_2"); 
	} 
}); 
 
Template.m8a10_2.events({ 
 
}); 
 
Template.m8a10_2.rendered = function() {
}

Template.m8a10_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a10_3"); 
	} 
}); 
 
Template.m8a10_3.events({ 
 
}); 
 
Template.m8a10_3.rendered = function() {
}

Template.m8a10_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a10_4"); 
	} 
}); 
 
Template.m8a10_4.events({ 
 
}); 
 
Template.m8a10_4.rendered = function() {
}

Template.m8a10_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a10_5"); 
	} 
}); 
 
Template.m8a10_5.events({ 
 
}); 
 
Template.m8a10_5.rendered = function() {
}

Template.m8a10_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a10_6"); 
	} 
}); 
 
Template.m8a10_6.events({ 
 
}); 
 
Template.m8a10_6.rendered = function() {
}


Template.m8a10.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 10, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a10.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
Template.m8a10.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a10_end') { 
			return false; 
		}
		return true;	 
	} ,

	// This helper allows m4a42 to determine if a section is a PARAGRAPH SELECTION TEMPLATE. List all the pages on which the paragraph select should be displayed
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m8a10_1","#m8a10_2","#m8a10_3","#m8a10_4","#m8a10_5"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
}); 


// Template.m8a10.events({

// 	'click i.titlereturn': function(evt){
// 		var activeSection = $(evt.currentTarget).parent('a').attr('href');
// 		Session.set('activeSection', activeSection);
// 	}

// }); 

// Template.m8a10.rendered = function() { 
// 		document.title = "Journey 2 English";
	
	// setStartActivity(8,10);

// 	var oldLocation = location.href;
// 	$.locationInterval = setInterval( function() {
// 		if(location.href != oldLocation) {
// 			subpage = location.href.split("#")[1];
// 			setLatestSubPage(8, 10, subpage);
// 			oldLocation = location.href;
// 		}
// 	}, 500);
		
// }

// Template.m8a10_1.helpers({ 
// 	activeSection: function(){ 
// 		var activeSection = Session.get("activeSection"); 
// 		return (activeSection == "#m8a10_1"); 
// 	} 
// }); 
 
// Template.m8a10_1.events({ 
 
// }); 
 
// Template.m8a10_1.rendered = function() {
// }

// Template.m8a10paragraphselect.helpers({
// 	isHidden: function() {
// 		var activeSection = Session.get("activeSection");
// 		var paragraphSections = ["#m8a10_1","#m8a10_2","#m8a10_3","#m8a10_4","#m8a10_5","#m8a10_6", "#m8a10_7", "#m8a10_8"];
		
// 		for (var i = 0; i < paragraphSections.length; i++) {
// 			if (paragraphSections[i] == activeSection) {
// 				return "hello";
// 			}
// 		}
// 		return "hidden";
// 	},

// 	helpBox: function(){
// 		var activeSection = Session.get("activeSection");
// 		if (activeSection == "#m8a10_1"){
// 			return "speech2"
// 		} else {
// 			return "hidden"
// 		}
// 		return
// 	},
	
// 	helpBox_2: function(){
// 		var activeSection = Session.get("activeSection");
// 		if (activeSection == "#m8a10_8"){
// 			return ""
// 		} else {
// 			return "hidden"
// 		}
// 		return
// 	}
// })

// Template.m8a10paragraphselect.events({
	
// 	"click .numbutt": function (evt) {
// 		$.k2l.m8a10.index =evt.currentTarget.id;
// 		$("#m8a10textDisplay").html($.k2l.m8a10.paragraph[$.k2l.m8a10.index].paragraph);
// 		//$("#m8a10Q").html($(evt.currentTarget).html());
// 		},
// 	"click #m8a10nextQ": function (evt) {
// 		if ($.k2l.m8a10.Qindex >= 7){
// 				$("#m8a10nextQ").addClass('pagination');
// 				$("#m8a10cont").removeClass('hidden');
// 				$("#m8a10nextQ").attr("href", "#m8a10_2")
// 	} else {
// 		$("#m8a10prevQ").removeClass('pagination');
// 		$.k2l.m8a10.Qindex += 1;
// 		$("#m8a10Quest").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].question);
// 		$("#m8a10P").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].paragraph);
// 		$("#m8a10Q").html(($.k2l.m8a10.Qindex + 1));
// 		$("#m8a10Help").addClass('hidden');
// 		$("#m8a10cont").addClass('hidden');
		
// 	};
			
// 		},
// 		"click #m8a10prevQ": function (evt) {
// 			if ($.k2l.m8a10.Qindex <= 0){
// 				$("#m8a10prevQ").addClass('pagination');
// 				$.k2l.m8a10.Qindex = 0;
// 			} else {
// 		$.k2l.m8a10.Qindex -= 1;
// 		$("#m8a10Quest").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].question);
// 		$("#m8a10P").html($.k2l.m8a10.question[$.k2l.m8a10.Qindex].paragraph);
// 		$("#m8a10Q").html(($.k2l.m8a10.Qindex + 1));
// 			};
		
			
// 		}
// 	}
// )

// Template.m8a10.rendered = function() {
	
// 	if(typeof $.k2l == 'undefined'){
// 		$.k2l = {};
// 	}
// 	if (typeof $.k2l.m8a10 == 'undefined') {
// 		$.k2l.m8a10 = {};
// 	};
	
	
// 	$.k2l.m8a10.index = 0;
// 	$.k2l.m8a10.Qindex = 0;

	
// 	var question = [
// 					{question:"Choose one of the unusual jobs from paragraph 1. What does this person do?", paragraph:"Paragraph 1"},
// 					{question:"Which statement is true:<Br>A: People are more likely to sue a company nowadays.<br>B: People are less likely to sue a company nowadays.", paragraph:"Paragraph 2"},
// 					{question:"Find two disadvantages of Derek’s job.", paragraph:"Paragraph 3"},
// 					{question:"Find one advantage of Derek’s job.", paragraph:"Paragraph 3"},
// 					{question:"Complete this sentence:<br>People in the UK don’t seem very happy with their jobs because...", paragraph:"Paragraph 4"}
// 					]
					
// 	var paragraph = [
// 			{paragraph: "<p><b>1.</b> The number of unusual jobs is increasing, from badger consultants to dog psychologists. One insurance company said there had been a steady increase in the number of firms wanting insurance cover for unusual occupations such as preparing kitchens for celebrity chef programmes on TV and checking for noise problems on construction sites. If people doing those jobs make mistakes, the company could face an expensive court case.</p>"},
// 			{paragraph: "<p><b>2.</b> One director said, “The difficulty with unusual jobs is that they don’t fit the normal rules. The more unconventional the job, the more you need to think about the hidden risks. In today’s compensation culture, it’s very easy to imagine a customer suing their dog psychologist if their dog continues to eat their slippers.”</p>"},
// 			{paragraph: "<p><b>3.</b> One of the UK’s most peculiar jobs is the Ravenmaster, the man who looks after the famous ravens at the Tower of London.Derrick Coyle, 64, starts each day at dawn. He greets each of the ravens by name and lets them out of the cages where they spend the night.He said in a recent interview: “Getting up in the morning is the worst part and I don’t have a social life. Even in the summer I always have to get back to put the ravens to bed. The fact it’s an unusual job does give me a bit of a boost. There’s no one else in the world who can say ‘I’m a Ravenmaster Yeoman.’</p>"},
// 			{paragraph: "<p><b>4.</b> So are workers in the UK a happy bunch on the whole? More and more people are looking for unusual jobs. Almost half the workers in the UK are actively looking for a new job. A survey of 300 adults showed that one in five wanted a change.</p>"}
// 		]
		
// 	$.k2l.m8a10.question = question;
// 	$.k2l.m8a10.paragraph = paragraph;
	
// 	$("#m8a10nextQ").removeClass('pagination');
// }

// Template.m8a10_2.helpers({ 
// 	activeSection: function(){ 
// 		var activeSection = Session.get("activeSection"); 
// 		return (activeSection == "#m8a10_2"); 
// 	} 
// }); 
 
// Template.m8a10_2.events({ 
 
// }); 
 
// Template.m8a10_2.rendered = function() {
// }

// Template.m8a10_3.helpers({ 
// 	activeSection: function(){ 
// 		var activeSection = Session.get("activeSection"); 
// 		return (activeSection == "#m8a10_3"); 
// 	} 
// }); 
 
// Template.m8a10_3.events({ 
 
// }); 
 
// Template.m8a10_3.rendered = function() {
// }

// Template.m8a10_4.helpers({ 
// 	activeSection: function(){ 
// 		var activeSection = Session.get("activeSection"); 
// 		return (activeSection == "#m8a10_4"); 
// 	} 
// }); 
 
// Template.m8a10_4.events({ 
 
// }); 
 
// Template.m8a10_4.rendered = function() {
// }

// Template.m8a10_5.helpers({ 
// 	activeSection: function(){ 
// 		var activeSection = Session.get("activeSection"); 
// 		return (activeSection == "#m8a10_5"); 
// 	} 
// }); 
 
// Template.m8a10_5.events({ 
 
// }); 
 
// Template.m8a10_5.rendered = function() {
// }

// Template.m8a10_6.helpers({ 
// 	activeSection: function(){ 
// 		var activeSection = Session.get("activeSection"); 
// 		return (activeSection == "#m8a10_6"); 
// 	} 
// }); 
 
// Template.m8a10_6.events({ 
 
// }); 
 
// Template.m8a10_6.rendered = function() {
// }


// Template.m8a10.created = function() {
// 	this.subscribe("userProgress");
// 	this.subscribe("pauseConnection", 8, 10, Meteor.userId());
// };

// Template.m8a10.destroyed = function() {
// 	clearInterval($.locationInterval);
// };