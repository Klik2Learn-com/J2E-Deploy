Template.m9a11.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a11_end') { 
			return false; 
		}
		return true;	 
	},

		paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m9a11_1","#m9a11_2","#m9a11_3","#m9a11_4","#m9a11_5","#m9a11_6","#m9a11_7","#m9a11_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
}); 

Template.m9a11.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 11, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a11.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m9a11paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m9a11_1","#m9a11_2","#m9a11_3","#m9a11_4","#m9a11_5","#m9a11_6", "#m9a11_7", "#m9a11_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				// return "hello";
			}
		}
		return "hidden";
	},

	// helpBox: function(){
	// 	var activeSection = Session.get("activeSection");
	// 	if (activeSection == "#m9a11_1"){
	// 		return "speech2"
	// 	} else {
	// 		return "hidden"
	// 	}
	// 	return
	// },
	
	// helpBox_2: function(){
	// 	var activeSection = Session.get("activeSection");
	// 	if (activeSection == "#m9a11_8"){
	// 		return ""
	// 	} else {
	// 		return "hidden"
	// 	}
	// 	return
	// }
})

Template.m9a11paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m9a11.index =evt.currentTarget.id;
		$("#m9a11textDisplay").html($.k2l.m9a11.paragraph[$.k2l.m9a11.index].paragraph);
		//$("#m9a11Q").html($(evt.currentTarget).html());
		}
	// "click #m9a11nextQ": function (evt) {
	// 	if ($.k2l.m9a11.Qindex >= 7){
	// 			$("#m9a11nextQ").addClass('pagination');
	// 			$("#m9a11cont").removeClass('hidden');
	// 			$("#m9a11nextQ").attr("href", "#m9a11_2")
	// } else {
	// 	$("#m9a11prevQ").removeClass('pagination');
	// 	$.k2l.m9a11.Qindex += 1;
	// 	$("#m9a11Quest").html($.k2l.m9a11.question[$.k2l.m9a11.Qindex].question);
	// 	$("#m9a11P").html($.k2l.m9a11.question[$.k2l.m9a11.Qindex].paragraph);
	// 	$("#m9a11Q").html(($.k2l.m9a11.Qindex + 1));
	// 	$("#m9a11Help").addClass('hidden');
	// 	$("#m9a11cont").addClass('hidden');
		
	// };
			
	// 	},
		// "click #m9a11prevQ": function (evt) {
		// 	if ($.k2l.m9a11.Qindex <= 0){
		// 		$("#m9a11prevQ").addClass('pagination');
		// 		$.k2l.m9a11.Qindex = 0;
		// 	} else {
		// $.k2l.m9a11.Qindex -= 1;
		// $("#m9a11Quest").html($.k2l.m9a11.question[$.k2l.m9a11.Qindex].question);
		// $("#m9a11P").html($.k2l.m9a11.question[$.k2l.m9a11.Qindex].paragraph);
		// $("#m9a11Q").html(($.k2l.m9a11.Qindex + 1));
		// 	};
		
			
		// }
	})


Template.m9a11.rendered = function() {
		document.title = "Journey 2 English";
	
	setStartActivity(9,11);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m9a11 == 'undefined') {
		$.k2l.m9a11 = {};
	};
	
	
	$.k2l.m9a11.index = 0;
	$.k2l.m9a11.Qindex = 0;

	
	// var question = [
	// 				{question:"Question 1 goes here", paragraph:"Paragraph 1"},
	// 				{question:"Question 2 goes here", paragraph:"Paragraph 2"},
	// 				{question:"Question 3 goes here", paragraph:"Paragraph 3"},
	// 				{question:"Question 4 goes here", paragraph:"Paragraph 4"},
	// 				{question:"Question 5 goes here", paragraph:"Paragraph 5"},
	// 				{question:"Question 6 goes here", paragraph:"Paragraph 6"},
	// 				{question:"Question 7 goes here", paragraph:"Paragraph 7"},
	// 				{question:"Question 8 goes here", paragraph:"Paragraph 8"},
	// 				]
					
	var paragraph = [
			{paragraph: "<p><b>1.</b> It’s the world's biggest online business. But how does it treat its employees? What’s it really like to work at Amazon? Here’s a first hand account from Gill Brown who used to work for Amazon.</p>"},
			{paragraph: '<p><b>2.</b> For a week, I was an Amazon temporary worker. At the first interview I filled in a form, got tested for drugs and alcohol and they made sure I could read. Some people were selected for interviews. I trained with Pete who had been unemployed for the past three years. His partner, Susan, had also just started. It took them more than an hour to get to work. "We had to get the kids up at five," he says. After a 10½-hour shift, they get home at 9pm. Susan twisted her ankle on the first shift. The next day she phoned in to say she couldn’t come in to work. She will receive a "point". If she receives three points, she will be "released", which is how you get sacked by Amazon.</p>'},
			{paragraph: "<p><b>3.</b> The first item I see in Amazon's warehouse is a package of dog nappies. The warehouse is 800,000 square feet, - the size of 11 football pitches. The UK's largest warehouse is the size of 14 football pitches. It’s a quarter of a mile from end to end. </p>"},
			{paragraph: "<p><b>4.</b> There are more than 100 million items on Amazon’s UK website: if you can possibly imagine it, Amazon sells it. I spend 10½ hours a day picking items off the shelves - a One Direction charm bracelet, a dog coat, a cat scratching post, a banana slicer.</p>"},
			{paragraph: "<p><b>5.</b> On my second day, the manager tells us that we have picked and packed 155,000 items in the past 24 hours. Tomorrow, the 2nd of December is the busiest online shopping day of the year. The figure will be close to 450,000 and this is just one of eight warehouses across the UK. 24 hours a day, four shifts will be working at least a 50-hour week, hand-picking and packing each item.</p>"},
			{paragraph: "<p><b>6.</b> Amazon took 3.5 million orders on a single day last year. Christmas is its biggest challenge and the company takes on an extra 15,000 staff. It expects to double the number of warehouses in Britain in the next three years and it is already one of the most powerful multinationals on the planet.</p>"},
			{paragraph: "<p><b>7.</b> But Amazon pays its workers the minimum wage. It pushes them to the limits of European working times, and sacks them if they take three sick breaks in any three-month period. Other companies have accused Amazon of bullying.  MPs called it ‘immoral’ because it pays minimal tax. We may be living in a future where multinational corporations have more power than governments.</p>"},
			{paragraph: '<p><b>8.</b> Amazon is successful for a reason. It’s brilliant at what it does. It has mastered the challenge of storing tens of millions of products and figuring out how to get them to people on time, without fail. No one else has come even close. We didn\'t just pick and pack more than 155,000 items on my first day. We picked and packed the right items and sent them to the right customers. "We didn\'t miss a single order," our section manager tells us with pride.</p>'},
			{paragraph: '<p><b>9.</b> To work in what Amazon calls a "fulfilment centre" is to be a tiny cog in a massive global machine. It\'s a new industry on an enormous scale, made possible by new technology. Whether we like it or not, Amazon is the future of shopping and being a worker in an Amazon "fulfilment centre" is the future of work for thousands of people.</p>'}
		]
		
	// $.k2l.m9a11.question = question;
	$.k2l.m9a11.paragraph = paragraph;
	
	// $("#m9a11nextQ").removeClass('pagination');
}
Template.m9a11_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_6"); 
	} 
}); 
 
Template.m9a11_6.events({ 
 
}); 
 
Template.m9a11_6.rendered = function() {
}

Template.m9a11_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_3"); 
	} 
}); 
 
Template.m9a11_3.events({ 
 
}); 
 
Template.m9a11_3.rendered = function() {
}

Template.m9a11_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_1"); 
	} 
}); 
 
Template.m9a11_1.events({ 
 
}); 
 
Template.m9a11_1.rendered = function() {
}

Template.m9a11_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_2"); 
	} 
}); 
 
Template.m9a11_2.events({ 
 
}); 
 
Template.m9a11_2.rendered = function() {
}

Template.m9a11_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_4"); 
	} 
}); 
 
Template.m9a11_4.events({ 
 
}); 
 
Template.m9a11_4.rendered = function() {
}

Template.m9a11_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_5"); 
	} 
}); 
 
Template.m9a11_5.events({ 
 
}); 
 
Template.m9a11_5.rendered = function() {
}

Template.m9a11_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_8"); 
	} 
}); 
 
Template.m9a11_8.events({ 
 
}); 
 
Template.m9a11_8.rendered = function() {
}

Template.m9a11_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a11_7"); 
	} 
}); 
 
Template.m9a11_7.events({ 
 
}); 
 
Template.m9a11_7.rendered = function() {
}
