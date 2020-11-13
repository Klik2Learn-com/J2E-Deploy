Template.m1a19.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m1a19_end') {
 	return false;
	}
return true;
},

	
	// This helper allows m1a19 to determine if a section is a PARAGRAPH SELECTION TEMPLATE.
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m1a19_3","#m1a19_4","#m1a19_5","#m1a19_6","#m1a19_7","#m1a19_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
})

Template.m1a19.events({

	'click i.titlereturn': function(evt){
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}
})



Template.m1a19.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 19, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a19.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m1a19_3","#m1a19_4","#m1a19_5","#m1a19_6","#m1a19_7","#m1a19_8", "#m1a19_9", "#m1a19_10"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return "hello";
			}
		}
		return "hidden";
	},

	helpBox: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m1a19_3"){
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},
	
	helpBox_2: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m1a19_8"){
			return ""
		} else {
			return "hidden"
		}
		return
	}
})

Template.paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m1a19.index =evt.currentTarget.id;
		$("#m1a19textDisplay").html($.k2l.m1a19.paragraph[$.k2l.m1a19.index].paragraph);
		//$("#m1a19Q").html($(evt.currentTarget).html());
		},
	"click #nextQ": function (evt) {
		if ($.k2l.m1a19.Qindex >= 5){
				$("#nextQ").addClass('pagination');
				$("#cont").removeClass('hidden');
				$("#nextQ").attr("href", "#m1a19_4")
	} else {
		$("#prevQ").removeClass('pagination');
		$.k2l.m1a19.Qindex += 1;
		$("#m1a19Quest").html($.k2l.m1a19.question[$.k2l.m1a19.Qindex].question);
		$("#m1a19P").html($.k2l.m1a19.question[$.k2l.m1a19.Qindex].paragraph);
		$("#m1a19Q").html(($.k2l.m1a19.Qindex + 1));
		$("#m1a19Help").addClass('hidden');
		$("#cont").addClass('hidden');
		
	};
			
		},
		"click #prevQ": function (evt) {
			if ($.k2l.m1a19.Qindex <= 0){
				$("#prevQ").addClass('pagination');
				$.k2l.m1a19.Qindex = 0;
			} else {
		$.k2l.m1a19.Qindex -= 1;
		$("#m1a19Quest").html($.k2l.m1a19.question[$.k2l.m1a19.Qindex].question);
		$("#m1a19P").html($.k2l.m1a19.question[$.k2l.m1a19.Qindex].paragraph);
		$("#m1a19Q").html(($.k2l.m1a19.Qindex + 1));
			};
		
			
		}
	}
)

Template.m1a19.rendered = function() {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m1a19 == 'undefined') {
		$.k2l.m1a19 = {};
	};
	
	
	$.k2l.m1a19.index = 0;
	$.k2l.m1a19.Qindex = 0;

	
	var question = [
					{question:"What conclusion did the American study reach about national stereotypes?", paragraph:"Paragraph 1"},
					{question:"<p>They did two surveys:</p><p>What did the first survey investigate?</p><p>What did the second survey investigate?</p>", paragraph:"Paragraphs 2 and 3"},
					{question:"<p>What’s the point of the Canadian example?</p>", paragraph:"Paragraph 2"},
					{question:"<p>How did they find out what people thought about other nationalities?</p>", paragraph:"Paragraph 3"},
					{question:"<p>What warning does Robert MacRae give?</p>", paragraph:"Paragraph 4"},
					{question:"Why do some people believe in national identities?", paragraph:"Paragraph 5"},
					]
					
	var paragraph = [
			{paragraph: "<p><b>1.</b> Each country has an identity that is supposed to be ‘typical.’ But a new study in the American journal ‘Science’ proves that these stereotypes are inaccurate. The survey found ‘national myths’ in almost every country.</p>"},
			{paragraph: "<p><b>2.</b> They looked at national stereotypes in 49 countries to see if Germans really are ‘no nonsense,’ Americans ‘brash’ or Italians ‘happy – go – lucky.’ The researchers tried to find out if the stereotypes matched real people.  In almost every case, they found there was no such thing as a ‘typical citizen.’ For example, Canadians are far more independent than the stereotype suggests. </p><p>So if you think, ‘There’s a group of Canadians visiting next week. They’re all going to conform and not ask any awkward questions,’ you may get a big surprise!</p>"},
			{paragraph: "<p><b>3.</b> Researchers asked 4,000 people to choose words like, ‘imaginative,’ ‘artistic,’ ‘mean,’  ‘copes well with a crisis,’  to describe ‘typical’ characteristics of their own nationality and culture.</p><p>They then asked 12,000 people to do the same thing for people they actually knew from these countries. They found that the data from the two surveys simply did not match.</p>"},
			{paragraph: "<p><b>4.</b> ‘This shows,’ said Robert McRae, the author of the study, ‘that national stereotypes cannot be taken seriously.’ He explained why.</p><p>‘They are often unfounded. They exaggerate characteristics. People need to remember that their beliefs about ‘typical Americans,’ or ‘typical Italians,’ are not a very good guide when it comes to interacting with real people from these countries.’</p>"},
			{paragraph: "<p><b>5.</b> Nevertheless, experts say national identities are real and do serve a purpose. Often a group will promote themselves by choosing a few characteristics that are positive and ignore others that might not show them in such a good light.</p><p>They might say for example, ‘we are warm, friendly and relaxed,’ but not mention that their industrial output figures are not very good!</p>"}
		]
		
	$.k2l.m1a19.question = question;
	$.k2l.m1a19.paragraph = paragraph;
	
	$("#nextQ").removeClass('pagination');
}
