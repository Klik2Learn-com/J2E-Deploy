Template.m8a27.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a27_end') { 
			return false; 
		}
		return true;	 
	},

		// This helper allows m8a27 to determine if a section is a PARAGRAPH SELECTION TEMPLATE. List all the pages on which the paragraph select should be displayed
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m8a27_1","#m8a27_2","#m8a27_3","#m8a27_4","#m8a27_5","#m8a27_6","#m8a27_7","#m8a27_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}
}); 


Template.m8a27.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 27, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a27.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};



Template.m8a27.events({

	'click i.titlereturn': function(evt){
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}
})
Template.m8a27_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_9"); 
	} 
}); 
 
Template.m8a27_9.events({ 
 
}); 
 
Template.m8a27_9.rendered = function() {
}

Template.m8a27_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_10"); 
	} 
}); 
 
Template.m8a27_10.events({ 
 
}); 
 
Template.m8a27_10.rendered = function() {
}

Template.m8a27_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_4"); 
	} 
}); 
 
Template.m8a27_4.events({ 
 
}); 
 
Template.m8a27_4.rendered = function() {
}

Template.m8a27paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m8a27_1","#m8a27_2","#m8a27_3","#m8a27_4","#m8a27_5","#m8a27_6", "#m8a27_7", "#m8a27_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return "hello";
			}
		}
		return "hidden";
	},

	helpBox: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m8a27_1"){
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},
	
	helpBox_2: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m8a27_8"){
			return ""
		} else {
			return "hidden"
		}
		return
	}
})

Template.m8a27paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m8a27.index =evt.currentTarget.id;
		$("#m8a27textDisplay").html($.k2l.m8a27.paragraph[$.k2l.m8a27.index].paragraph);
		//$("#m8a27Q").html($(evt.currentTarget).html());
		},
	"click #m8a27nextQ": function (evt) {
		if ($.k2l.m8a27.Qindex >= 7){
				$("#m8a27nextQ").addClass('pagination');
				$("#m8a27cont").removeClass('hidden');
				$("#m8a27nextQ").attr("href", "#m8a27_2")
	} else {
		$("#m8a27prevQ").removeClass('pagination');
		$.k2l.m8a27.Qindex += 1;
		$("#m8a27Quest").html($.k2l.m8a27.question[$.k2l.m8a27.Qindex].question);
		$("#m8a27P").html($.k2l.m8a27.question[$.k2l.m8a27.Qindex].paragraph);
		$("#m8a27Q").html(($.k2l.m8a27.Qindex + 1));
		$("#m8a27Help").addClass('hidden');
		$("#m8a27cont").addClass('hidden');
		
	};
			
		},
		"click #m8a27prevQ": function (evt) {
			if ($.k2l.m8a27.Qindex <= 0){
				$("#m8a27prevQ").addClass('pagination');
				$.k2l.m8a27.Qindex = 0;
			} else {
		$.k2l.m8a27.Qindex -= 1;
		$("#m8a27Quest").html($.k2l.m8a27.question[$.k2l.m8a27.Qindex].question);
		$("#m8a27P").html($.k2l.m8a27.question[$.k2l.m8a27.Qindex].paragraph);
		$("#m8a27Q").html(($.k2l.m8a27.Qindex + 1));
			};
		
			
		}
	}
)

Template.m8a27.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(8,27);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 27, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m8a27 == 'undefined') {
		$.k2l.m8a27 = {};
	};
	
	
	$.k2l.m8a27.index = 0;
	$.k2l.m8a27.Qindex = 0;

	
	var question = [
					{question:"Four main things have changed since the 1950s. What are they?", paragraph:"Paragraph 1"},
					{question:"Technology has some disadvantages. Choose two that you agree with.", paragraph:"Paragraph 2"},
					{question:"What’s the main difference in working life now?", paragraph:"Paragraph 3"},
					{question:"Who has the best reason to complain – workers in the 50’s or nowadays?", paragraph:"Paragraph 4"},
					{question:"What types of jobs are disappearing in modern life?", paragraph:"Paragraph 5"},
					{question:"Find an example of a type of job that’s much more common today.", paragraph:"Paragraph 6"},
					{question:"How have women’s lives changed nowadays?", paragraph:"Paragraph 6"},
					{question:"Find two things that are worse about working life today.", paragraph:"Paragraph 7"}
					]

			
	var paragraph = [
			{paragraph: "<p><b>1.</b> It was an era when women stayed at home, a 9-to-5 job meant just that, workers had a job for life and nobody had a smartphone to ruin their holidays. But were the 1950s exactly like that? What is it like for workers in this country 60 years later? The world of work has fundamentally changed, but it is not a change which is making us happy, according to the Chartered Institute of Personnel.</p>"},
			{paragraph: "<p><b>2.</b> People do not seem much happier about their working lives. The invention of new technology, from laptops to iPhones is imposing entirely new pressures on staff. While technology allows people to work from home, we now have an information overload. There is pressure for instant responses, employees are under more surveillance and the boundaries between work and non-work time are blurred.</p>"},
			{paragraph: "<p><b>3.</b> Overall, work continues to be central to everyday life but we are doing it very differently. In 1952, just four per cent of people worked part-time. Today, the number has ballooned to one in four workers –an astonishing 26 per cent of the entire workforce.</p>"},
			{paragraph: "<p><b>4.</b> Today’s workers may whinge that they are over-worked, but it was their parents or grandparents in the 1950s who had a lot more to complain about. On average, workers did a 48-hour week in 1952. Today, a typical worker with a full-time job does only 37 hours.</p>"},
			{paragraph: "<p><b>5.</b> However, it is probably the type of jobs that people do which have changed most dramatically. In 1952, 8.7 million people worked in manufacturing. Today, the number is only 2.5 million. Around 880,000 worked in ‘mining and quarrying’, compared to 60,000 today, while the number working in agriculture, forestry and fishing has tumbled from 725,000 to 460,000.</p>"},
			{paragraph: "<p><b>6.</b> There are some jobs which hardly existed 60 years ago. In 1952, there were only around 20,000 people working in personnel, compared to 400,000 today. And how many people did not work? Not very many but only one in two women had a job in the 1950s, compared to two-thirds today.</p>"},
			{paragraph: "<p><b>7.</b> The number of working men has changed more significantly, from 96 per cent in the 1950s to 75 per cent today. Meanwhile, the number of people claiming unemployment benefits has ballooned from around 350,000 to nearly 1.6 million today and young people are far less likely to have a job.</p>"}
		]

	$.k2l.m8a27.question = question;
	$.k2l.m8a27.paragraph = paragraph;
	
	$("#m8a27nextQ").removeClass('pagination');
}

Template.m8a27_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_6"); 
	} 
}); 
 
Template.m8a27_6.events({ 
 
}); 
 
Template.m8a27_6.rendered = function() {
}

Template.m8a27_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_3"); 
	} 
}); 
 
Template.m8a27_3.events({ 
 
}); 
 
Template.m8a27_3.rendered = function() {
}

Template.m8a27_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_8"); 
	} 
}); 
 
Template.m8a27_8.events({ 
 
}); 
 
Template.m8a27_8.rendered = function() {
}

Template.m8a27_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_5"); 
	} 
}); 
 
Template.m8a27_5.events({ 
 
}); 
 
Template.m8a27_5.rendered = function() {
}

Template.m8a27_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a27_7"); 
	} 
}); 
 
Template.m8a27_7.events({ 
 
}); 
 
Template.m8a27_7.rendered = function() {
}
