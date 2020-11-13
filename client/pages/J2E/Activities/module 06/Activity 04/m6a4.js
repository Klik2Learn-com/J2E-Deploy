Template.m6a4.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m6a4_end') {
 	return false;
	}
return true;
},

	
	// This helper allows m6a4 to determine if a section is a PARAGRAPH SELECTION TEMPLATE. List all the pages on which the paragraph select should be displayed
	paragraphSection: function(){
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m6a4_1","#m6a4_2","#m6a4_3","#m6a4_4","#m6a4_5","#m6a4_6","#m6a4_7","#m6a4_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return true;
			}
		}
		return false;
	}	
})

Template.m6a4.events({

	'click i.titlereturn': function(evt){
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}
})

Template.m6a4.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 4, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a4.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a4_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a4_1");
	}
})

Template.m6a4_1.events({

	'click .buttonaudio': function(evt) {
		
		audioButtonClickSetup($.k2l.m6a4_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a4_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$(".buttonaudio").removeClass("is-playing");
		$.k2l.m6a4_1.sound.src = {};
	}

});

Template.m6a4_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a4_1 == 'undefined') {
		$.k2l.m6a4_1 = {};
	};
	
	$.k2l.m6a4_1.sound = new Audio();
}

Template.m6a4_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_2");
	}
});

Template.m6a4_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_2");
	}
});

Template.m6a4_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_3");
	}
});

Template.m6a4_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_4");
	}
});

Template.m6a4_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_5");
	}
});

Template.m6a4_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_6");
	}
});

Template.m6a4_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_7");
	}
});

Template.m6a4_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a4_8");
	}
});

Template.m6a4paragraphselect.helpers({
	isHidden: function() {
		var activeSection = Session.get("activeSection");
		var paragraphSections = ["#m6a4_1","#m6a4_2","#m6a4_3","#m6a4_4","#m6a4_5","#m6a4_6", "#m6a4_7", "#m6a4_8"];
		
		for (var i = 0; i < paragraphSections.length; i++) {
			if (paragraphSections[i] == activeSection) {
				return "hello";
			}
		}
		return "hidden";
	},

	helpBox: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m6a4_1"){
			return "speech2"
		} else {
			return "hidden"
		}
		return
	},
	
	helpBox_2: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#m6a4_8"){
			return ""
		} else {
			return "hidden"
		}
		return
	}
})

Template.m6a4paragraphselect.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m6a4.index =evt.currentTarget.id;
		$("#m6a4textDisplay").html($.k2l.m6a4.paragraph[$.k2l.m6a4.index].paragraph);
		//$("#m6a4Q").html($(evt.currentTarget).html());
		},
	"click #m6a4nextQ": function (evt) {
		if ($.k2l.m6a4.Qindex >= 7){
				$("#m6a4nextQ").addClass('pagination');
				$("#m6a4cont").removeClass('hidden');
				$("#m6a4nextQ").attr("href", "#m6a4_2")
	} else {
		$("#m6a4prevQ").removeClass('pagination');
		$.k2l.m6a4.Qindex += 1;
		$("#m6a4Quest").html($.k2l.m6a4.question[$.k2l.m6a4.Qindex].question);
		$("#m6a4P").html($.k2l.m6a4.question[$.k2l.m6a4.Qindex].paragraph);
		$("#m6a4Q").html(($.k2l.m6a4.Qindex + 1));
		$("#m6a4Help").addClass('hidden');
		$("#m6a4cont").addClass('hidden');
		
	};
			
		},
		"click #m6a4prevQ": function (evt) {
			if ($.k2l.m6a4.Qindex <= 0){
				$("#m6a4prevQ").addClass('pagination');
				$.k2l.m6a4.Qindex = 0;
			} else {
		$.k2l.m6a4.Qindex -= 1;
		$("#m6a4Quest").html($.k2l.m6a4.question[$.k2l.m6a4.Qindex].question);
		$("#m6a4P").html($.k2l.m6a4.question[$.k2l.m6a4.Qindex].paragraph);
		$("#m6a4Q").html(($.k2l.m6a4.Qindex + 1));
			};
		
			
		}
	}
)

Template.m6a4.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 4);

	    var oldLocation = location.href;
  $.locationInterval = setInterval( function() {
    if(location.href != oldLocation) {
      subpage = location.href.split("#")[1];
      setLatestSubPage(6, 4, subpage);
      oldLocation = location.href;
    }
  }, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m6a4 == 'undefined') {
		$.k2l.m6a4 = {};
	};
	
	
	$.k2l.m6a4.index = 0;
	$.k2l.m6a4.Qindex = 0;

	
	var question = [
					{question:"What are celebrities usually famous for?", paragraph:"Paragraph 1"},
					{question:"Why do people find J K Rowling inspiring?", paragraph:"Paragraph 3"},
					{question:"What makes J K Rowling an unusual kind of celebrity?", paragraph:"Paragraph 4"},
					{question:"Why is Good Housekeeping important to the National Magazine Company?", paragraph:"Paragraph 5"},
					{question:"Why do older readers like Victoria Beckham?", paragraph:"Paragraph 6"},
					{question:"What expression means people treat you badly?", paragraph:"Paragraph 7"},
					{question:"Why did they choose the idea of influence rather than power?", paragraph:"Paragraph 8"}
					]
					
	var paragraph = [
			{paragraph: "<p><b>1.</b> She may lack Cheryl Cole's hair style and Victoria Beckham's fashion sense, but that doesn't stop J K Rowling from being voted Britain's most influential woman.</p>"},
			{paragraph: "<p><b>2.</b> The multimillionaire author will top a list of the 100 women who have the most influence over our lives. A national magazine company organised the survey to mark 100 years of producing magazines. Their titles include <i>Cosmopolitan</i> and <i>Good Housekeeping</i>.</p>"},
			{paragraph: "<p><b>3.</b> Rowling's success is surprising because the 45-year-old keeps a very low profile. But the editor of <i>Good Housekeeping</i> said: “Everyone felt J K Rowling was the one with the most influence across the widest audience. As a single parent, she managed to cope and pull herself out of poverty. She's very inspiring.“</p>"},
			{paragraph: "<p><b>4.</b> She added: “Rowling is very careful about the way she uses her fame and is very true to herself. She didn't pursue power, fame and money in a conventional way, but by writing her thoughts in a café while her baby slept.“</p>"},
			{paragraph: "<p><b>5.</b> The national magazine company hopes Rowling's values are shared by the millions of woman who read their magazines. <i>Good Housekeeping</i> was started in 1922 and has nearly 500,000 readers.</p>"},
			{paragraph: "<p><b>6.</b> Although beaten for the top place, Cheryl Cole and Victoria Beckham are both in the top 10. Beckham, the former Spice Girl, has reinvented herself as a designer. She is a role model who transcends the decades. She is admired among older women for a commitment to her family.</p>"},
			{paragraph: "<p><b>7.</b> The panel of editors also considered Nigella Lawson to be influential. She showed that curves can be fantastic and that you can love cooking for its own sake. “You can do traditional female things without becoming a doormat,“ said the editor of <i>Cosmopolitan</i>.</p>"},
			{paragraph: "<p><b>8.</b> The company chose the idea of influence rather than power. “We went for influence, because influential women are the sort of women our readers are interested in.”</p>"},
		]
		
	$.k2l.m6a4.question = question;
	$.k2l.m6a4.paragraph = paragraph;
	
	$("#m6a4nextQ").removeClass('pagination');
}
