Template.m4a7.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m4a7_end') {
 	return false;
	}
return true;
},

	
	// This helper allows m4a7 to determine if a section is a PARAGRAPH SELECTION TEMPLATE.
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m4a7_1","#m4a7_2","#m4a7_3","#m4a7_4","#m4a7_5","#m4a7_6","#m4a7_7","#m4a7_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
})

Template.m4a7.events({

	'click i.titlereturn': function(evt){
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}
})

Template.m4a7.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 7, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a7.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a7paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m4a7_1","#m4a7_2","#m4a7_3","#m4a7_4","#m4a7_5","#m4a7_6", "#m4a7_7", "#m4a7_8"];
		
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return "hello";
			}
		}
		return "hidden";
	},

	helpBox: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m4a7_1"){
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},
	
	helpBox_2: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m4a7_8"){
			return ""
		} else {
			return "hidden"
		}
		return
	}
})

Template.m4a7paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m4a7.index =evt.currentTarget.id;
		$("#m4a7textDisplay").html($.k2l.m4a7.paragraph[$.k2l.m4a7.index].paragraph);
		//$("#m4a7Q").html($(evt.currentTarget).html());
		},
	"click #m4a7nextQ": function (evt) {
		if ($.k2l.m4a7.Qindex >= 7){
				$("#m4a7nextQ").addClass('pagination');
				$("#m4a7cont").removeClass('hidden');
				$("#m4a7nextQ").attr("href", "#m4a7_9")
	} else {
		$("#m4a7prevQ").removeClass('pagination');
		$.k2l.m4a7.Qindex += 1;
		$("#m4a7Quest").html($.k2l.m4a7.question[$.k2l.m4a7.Qindex].question);
		$("#m4a7P").html($.k2l.m4a7.question[$.k2l.m4a7.Qindex].paragraph);
		$("#m4a7Q").html(($.k2l.m4a7.Qindex + 1));
		$("#m4a7Help").addClass('hidden');
		$("#m4a7cont").addClass('hidden');
		
	};
			
		},
		"click #m4a7prevQ": function (evt) {
			if ($.k2l.m4a7.Qindex <= 0){
				$("#m4a7prevQ").addClass('pagination');
				$.k2l.m4a7.Qindex = 0;
			} else {
		$.k2l.m4a7.Qindex -= 1;
		$("#m4a7Quest").html($.k2l.m4a7.question[$.k2l.m4a7.Qindex].question);
		$("#m4a7P").html($.k2l.m4a7.question[$.k2l.m4a7.Qindex].paragraph);
		$("#m4a7Q").html(($.k2l.m4a7.Qindex + 1));
			};
		
			
		}
	}
)

Template.m4a7.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 7);

	    var oldLocation = location.href;
  $.locationInterval = setInterval( function() {
    if(location.href != oldLocation) {
      subpage = location.href.split("#")[1];
      setLatestSubPage(4, 7, subpage);
      oldLocation = location.href;
    }
  }, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m4a7 == 'undefined') {
		$.k2l.m4a7 = {};
	};
	
	
	$.k2l.m4a7.index = 0;
	$.k2l.m4a7.Qindex = 0;

	
	var question = [
					{question:"Why does Scotland have a lot of people suffering from Multiple Sclerosis?", paragraph:"Paragraph 1"},
					{question:"What does Professor Ebers want to do about this problem?", paragraph:"Paragraph 2"},
					{question:"How is the company Kellogg’s helping to tackle the problem?", paragraph:"Paragraph 5"},
					{question:"What two diseases have been prevented by adding vitamins to food?", paragraph:"Paragraph 6"},
					{question:"Why did children in Victorian times get the disease rickets?", paragraph:"Paragraph 7"},
					{question:"Why might children in the  21st century still get rickets?", paragraph:"Paragraph 8"},
					{question:"What two types of people are most likely to lack Vitamin D?", paragraph:"Paragraph 10"},
					{question:"The article mentions three possible ways people can get enough Vitamin D. What are they?", paragraph:"Paragraphs 1 and 6"},
					]
					
	var paragraph = [
			{paragraph: "<p><b>1.</b> International experts are calling for vitamin D to be added to food in Scotland.</p><p>Scotland has a high number of people with Multiple Sclerosis – one of the highest levels in the world. Scots don’t get enough sunshine and a lack of vitamin D is caused by a lack of sunlight. For half the year, nobody living in Scotland gets enough UVB rays from the sun on their skin to make the vitamin D they need and many do not eat enough of the foods that contain it, such as oily fish.</p>"},
			{paragraph: "<p><b>2.</b> Professor George Ebers at Oxford University believes the evidence is now good enough to justify dosing the entire population with vitamin D. This month his team published evidence of a link between a lack of vitamin D and MS.</p>"},
			{paragraph: "<p><b>3.</b> It is a piece of strong scientific evidence which backs up the theory that people who do not get enough sunshine are more likely to get MS. In countries with year-round sunshine there are very low numbers of MS sufferers.</p><p>'Now the question is, can we finally persuade the public health authorities?' said Ebers.</p>"},
			{paragraph: "<p><b>4.</b> Shine on Scotland is a campaign launched by 13-year-old Ryan McLaughlin in response to his mother's diagnosis with MS. They marched on the Scottish parliament last year and organised an international conference in Glasgow involving scientists and Scottish health secretary at the time Nicola Sturgeon.</p>"},
			{paragraph: "<p><b>5.</b> 'We still think that's the best way to go,' Ryan said. 'We’ve started having talks with manufacturers about adding vitamin D to milk or fruit juice.' They have even persuaded Kellogg’s to add extra vitamin D to their cereals.</p>"},
			{paragraph: "<p><b>6.</b> Experts believe that asking people to take vitamin pills won’t work. They say you need to add it to food at quite a high level - higher than the small amounts we used to add to food to prevent rickets. If people had to buy and take pills, most people would not do it.</p><p>If we hadn’t fortified table salt, many people would be walking around with goitre.</p>"},
			{paragraph: "<p><b>7.</b> Vitamin D is vital for the gut to absorb calcium. Low levels can cause the bone disease rickets. In Victorian times, when rickets was rife among the poor, children suffered softening of the bones and ended up with bow legs because their diet was so bad.</p>"},
			{paragraph: "<p><b>8.</b> In recent years rickets appears to have had a resurgence. The reason this time is a lack of vitamin D and there is speculation that children's indoor life, with computer games and TV, may be partly to blame.</p>"},
			{paragraph: "<p><b>9.</b> In the northern hemisphere, the sun is not strong enough in the winter. People are wrapped against the cold or mostly indoors and the body uses up stocks of vitamin D made in the summer.</p>"},
			{paragraph: "<p><b>10.</b> People with darker skins are at greater risk of vitamin D deficiency and so are those who stay fully covered because of their religious beliefs. Over-exposure to the sun is harmful but all of us need about 10 to 15 minutes a day to maintain adequate vitamin D levels.</p>"}
		]
		
	$.k2l.m4a7.question = question;
	$.k2l.m4a7.paragraph = paragraph;
	
	$("#m4a7nextQ").removeClass('pagination');
}
