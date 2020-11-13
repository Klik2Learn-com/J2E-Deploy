Template.m5a11.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m5a11_end') {
 	return false;
	}
return true;
},

	
	// This helper allows m5a11 to determine if a section is a PARAGRAPH SELECTION TEMPLATE. List all the pages on which the paragraph select should be displayed
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m5a11_2","#m5a11_3","#m5a11_4","#m5a11_5","#m5a11_6"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
})

Template.m5a11.events({

	'click i.titlereturn': function(evt){
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}
})

Template.m5a11.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 11, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a11.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a11_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a11_2");
	}
});

Template.m5a11_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a11_3");
	}
});

Template.m5a11_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a11_4");
	}
});

Template.m5a11_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a11_5");
	}
});

Template.m5a11_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a11_6");
	}
});

Template.m5a11paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m5a11_2","#m5a11_3","#m5a11_4","#m5a11_5","#m5a11_6"];
		
		
		for (var i = 0; i < paragraphSections.length; i++) {
			
			if (paragraphSections[i] == activeSection) {
				return "hello";
			}
		}
		return "hidden";
	},

	helpBox: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m5a11_2"){
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},
	
	helpBox_2: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m5a11_6"){
			return ""
		} else {
			return "hidden"
		}
		return
	}
})

Template.m5a11paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m5a11.index =evt.currentTarget.id;
		$("#m5a11textDisplay").html($.k2l.m5a11.paragraph[$.k2l.m5a11.index].paragraph);
		//$("#m5a11Q").html($(evt.currentTarget).html());
		},
	"click #m5a11nextQ": function (evt) {
		if ($.k2l.m5a11.Qindex >= 5){
				$("#m5a11nextQ").addClass('pagination');
				$("#m5a11cont").removeClass('hidden');
				$("#m5a11nextQ").attr("href", "#m5a11_3")
	} else {
		$("#m5a11prevQ").removeClass('pagination');
		$.k2l.m5a11.Qindex += 1;
		$("#m5a11Quest").html($.k2l.m5a11.question[$.k2l.m5a11.Qindex].question);
		$("#m5a11P").html($.k2l.m5a11.question[$.k2l.m5a11.Qindex].paragraph);
		$("#m5a11Q").html(($.k2l.m5a11.Qindex + 1));
		$("#m5a11Help").addClass('hidden');
		$("#m5a11cont").addClass('hidden');
		
	};
			
		},
		"click #m5a11prevQ": function (evt) {
			if ($.k2l.m5a11.Qindex <= 0){
				$("#m5a11prevQ").addClass('pagination');
				$.k2l.m5a11.Qindex = 0;
			} else {
		$.k2l.m5a11.Qindex -= 1;
		$("#m5a11Quest").html($.k2l.m5a11.question[$.k2l.m5a11.Qindex].question);
		$("#m5a11P").html($.k2l.m5a11.question[$.k2l.m5a11.Qindex].paragraph);
		$("#m5a11Q").html(($.k2l.m5a11.Qindex + 1));
			};
		
			
		}
	}
)

Template.m5a11.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 11);

	    var oldLocation = location.href;
  $.locationInterval = setInterval( function() {
    if(location.href != oldLocation) {
      subpage = location.href.split("#")[1];
      setLatestSubPage(5, 11, subpage);
      oldLocation = location.href;
    }
  }, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m5a11 == 'undefined') {
		$.k2l.m5a11 = {};
	};
	
	
	$.k2l.m5a11.index = 0;
	$.k2l.m5a11.Qindex = 0;

	
	var question = [
					{question:"What makes Doctor Who different from any other British TV show?", paragraph:"Paragraph 1"},
					{question:"How do we know that Doctor Who has been around for a long time?", paragraph:"Paragraph 2"},
					{question:"Adults also like Doctor Who. What is one woman planning to do?", paragraph:"Paragraph 3"},
					{question:"Doctor Who is very popular in America. Find two examples of this.", paragraph:"Paragraph 4"},
					{question:"What added to the American connection?", paragraph:"Paragraph 5"}
					]
					
	var paragraph = [
			{paragraph: "<p><b>1.</b> <i>Doctor Who</i> has made history by becoming the first British TV show ever to feature on the front cover of US magazine <i>Entertainment Weekly</i>. Matt Smith - who portrays the Time Lord in the BBC One programme - is pictured on the front cover in front of the TARDIS, and scriptwriter Steven Moffat insists the show is no longer considered to be a “British import”.</p>"},
			{paragraph: "<p><b>2.</b> Speaking in the latest version of <i>Entertainment Weekly</i> - which is released tomorrow - he said: “It's not an obscure show anymore. It's not even ‘a British import' - it's just <i>Doctor Who</i>. Everyone who works at <i>Doctor Who</i> is a devotee, somebody who grew up loving it.”</p>"},
			{paragraph: "<p><b>3.</b> The show has even attracted praise from the famous American director Shonda Rhimes, who admits she would love to build a TARDIS in her home. She explained: “I keep trying to figure out a way of building a TARDIS in my house, and live in it.”</p>"},
			{paragraph: "<p><b>4.</b> <i>Doctor Who's</i> prominence in the US has gradually increased, and the show's latest series, season six, became the most watched series ever on BBC America. The same episodes made the programme the most downloaded show on US iTunes last year.</p>"},
			{paragraph: "<p><b>5.</b> Earlier this year, Steven opted to shoot the final <i>Doctor Who</i> episode in New York, which saw them battle with monsters - the Weeping Angels.</p>"}
		]
		
	$.k2l.m5a11.question = question;
	$.k2l.m5a11.paragraph = paragraph;
	
	$("#m5a11nextQ").removeClass('pagination');
}
