Template.m7a3.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a3_end') { 
			return false; 
		}
		return true;	 
	},	
	// This helper allows m7a3 to determine if a section is a PARAGRAPH SELECTION TEMPLATE. List all the pages on which the paragraph select should be displayed
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m7a3_1","#m7a3_2","#m7a3_3","#m7a3_4","#m7a3_5","#m7a3_6","#m7a3_7","#m7a3_8","#m7a3_9"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
})

Template.m7a3.events({

	'click i.titlereturn': function(evt){
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}
})



Template.m7a3_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_1"); 
	} 
}); 
 
Template.m7a3_1.events({ 
 
}); 
 
Template.m7a3_1.rendered = function() {
}

Template.m7a3_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_10"); 
	} 
}); 
 
Template.m7a3_10.events({ 
 
}); 
 
Template.m7a3_10.rendered = function() {
}


Template.m7a3_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_2"); 
	} 
}); 
 
Template.m7a3_2.events({ 
 
}); 
 
Template.m7a3_2.rendered = function() {
}

Template.m7a3_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_3"); 
	} 
}); 
 
Template.m7a3_3.events({ 
 
}); 
 
Template.m7a3_3.rendered = function() {
}

Template.m7a3_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_4"); 
	} 
}); 
 
Template.m7a3_4.events({ 
 
}); 
 
Template.m7a3_4.rendered = function() {
}

Template.m7a3_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_5"); 
	} 
}); 
 
Template.m7a3_5.events({ 
 
}); 
 
Template.m7a3_5.rendered = function() {
}

Template.m7a3_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_6"); 
	} 
}); 
 
Template.m7a3_6.events({ 
 
}); 
 
Template.m7a3_6.rendered = function() {
}

Template.m7a3_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_7"); 
	} 
}); 
 
Template.m7a3_7.events({ 
 
}); 
 
Template.m7a3_7.rendered = function() {
}

Template.m7a3_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_8"); 
	} 
}); 
 
Template.m7a3_8.events({ 
 
}); 
 
Template.m7a3_8.rendered = function() {
}

Template.m7a3_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a3_9"); 
	} 
}); 
 
Template.m7a3_9.events({ 
 
}); 
 
Template.m7a3_9.rendered = function() {
}


Template.m7a3paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m7a3_1","#m7a3_2","#m7a3_3","#m7a3_4","#m7a3_5","#m7a3_6", "#m7a3_7", "#m7a3_8", "#m7a3_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return "hello";
			}
		}
		return "hidden";
	},

	helpBox: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m7a3_1"){
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},
	
	helpBox_2: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m7a3_8"){
			return ""
		} else {
			return "hidden"
		}
		return
	}
})

Template.m7a3paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m7a3.index =evt.currentTarget.id;
		$("#m7a3textDisplay").html($.k2l.m7a3.paragraph[$.k2l.m7a3.index].paragraph);
		//$("#m7a3Q").html($(evt.currentTarget).html());
		},
	"click #m7a3nextQ": function (evt) {
		if ($.k2l.m7a3.Qindex >= 7){
				$("#m7a3nextQ").addClass('pagination');
				$("#m7a3cont").removeClass('hidden');
				$("#m7a3nextQ").attr("href", "#m7a3_2")
	} else {
		$("#m7a3prevQ").removeClass('pagination');
		$.k2l.m7a3.Qindex += 1;
		$("#m7a3Quest").html($.k2l.m7a3.question[$.k2l.m7a3.Qindex].question);
		$("#m7a3P").html($.k2l.m7a3.question[$.k2l.m7a3.Qindex].paragraph);
		$("#m7a3Q").html(($.k2l.m7a3.Qindex + 1));
		$("#m7a3Help").addClass('hidden');
		$("#m7a3cont").addClass('hidden');
		
	};
			
		},
		"click #m7a3prevQ": function (evt) {
			if ($.k2l.m7a3.Qindex <= 0){
				$("#m7a3prevQ").addClass('pagination');
				$.k2l.m7a3.Qindex = 0;
			} else {
		$.k2l.m7a3.Qindex -= 1;
		$("#m7a3Quest").html($.k2l.m7a3.question[$.k2l.m7a3.Qindex].question);
		$("#m7a3P").html($.k2l.m7a3.question[$.k2l.m7a3.Qindex].paragraph);
		$("#m7a3Q").html(($.k2l.m7a3.Qindex + 1));
			};
		
			
		}
	}
)

Template.m7a3.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 3);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);
	
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m7a3 == 'undefined') {
		$.k2l.m7a3 = {};
	};
	
	
	$.k2l.m7a3.index = 0;
	$.k2l.m7a3.Qindex = 0;

	
	var question = [
				//	{question:"Question 1 goes here", paragraph:"Paragraph 1"},
				//	{question:"Question 2 goes here", paragraph:"Paragraph 2"},
				//	{question:"Question 3 goes here", paragraph:"Paragraph 3"},
				//	{question:"Question 4 goes here", paragraph:"Paragraph 4"},
				//	{question:"Question 5 goes here", paragraph:"Paragraph 5"},
				//	{question:"Question 6 goes here", paragraph:"Paragraph 6"},
				//	{question:"Question 7 goes here", paragraph:"Paragraph 7"},
				//	{question:"Question 8 goes here", paragraph:"Paragraph 8"},
					]
					
	var paragraph = [
			{paragraph: "<p><b>1.</b> The room contains a glass tank with two baby stick insects called Jim and Bob. There’s a poster on the wall with the words \"Hazard Warning\" in vivid red ink and tray after tray of test tubes.</p>"},
			{paragraph: "<p><b>2.</b> All is calm – until the children arrive. The teacher, Sally, quickly calms the children with a friendly but firm voice. The equipment hasn’t changed much over the last 20 years.</p>"},
			{paragraph: "<p><b>3.</b> Pupils stay at school from the age of four until they move on to university or employment. The school day begins at 8.30am and lasts until 3pm. The discipline and values taught at an early age help to shape fully-rounded young adults. Discipline is good. The children are extremely well-behaved.</p>"},
			{paragraph: "<p><b>4.</b> For Sally, the day is longer. She arrives at school at 7.45am (eating her breakfast in the staff room) and usually works until 5pm, marking pupils’ work and preparing for the day ahead. She has little time to be with her three year old daughter. “You never really switch off,” she says.</p>"},
			{paragraph: "<p><b>5.</b> The long holidays are considered the main perk of the job, Sally disagrees. \"I get 13 weeks but, like most teachers, I spend a lot of time planning for the next term.\" She also says it’s easier to work when she’s not well. \"You have to prepare a lesson and you worry if the pupils will be disruptive. It's easier just to turn up.\"</p>"},
			{paragraph: "<p><b>6.</b> Today's lesson is about electromagnets. The lesson goes well. They see how many paperclips they can pick up. Sally tells them a previous group managed to pick up 120 paperclips. \"Kids love a bit of competition,\" she explains.</p>"},
			{paragraph: "<p><b>7.</b> The school is in a disadvantaged area but was judged \"outstanding.\" \"Some children are dealing with a lot of problems at home,” said Sally. “Sometimes, we're the only discipline they get. You don't know what's going on in their lives.”</p>"},
			{paragraph: "<p><b>8.</b> Sally Jones left university with a degree in zoology then studied for a teaching diploma. She taught in England for three years, before teaching English in South Korea. After six years in teaching she earns about £34,000 a year.</p>"},
			{paragraph: "<p><b>9.</b> At the end, the children walk away delighted when they receive a good mark. A couple of girls stay behind to discuss what to do with the stick insects over the Easter holidays. \"Why don't you take them home?\" Sally says to one of the girls. Her face breaks into a broad smile. \"Can I?\" she asks excitedly.</p>"}
		]
		
	$.k2l.m7a3.question = question;
	$.k2l.m7a3.paragraph = paragraph;
	
	$("#m7a3nextQ").removeClass('pagination');
}



Template.m7a3.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 3, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a3.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
