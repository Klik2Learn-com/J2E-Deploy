Template.m4a4.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m4a4_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a4");
	}
});

Template.m4a4.events({

  "click a.restart": function(evt){
		$('.buttonsmall-right.noclick').removeClass('buttonsmall-right noclick');
    $('.caption.capgreen').addClass('hidden');
    $('.instruction.hidden').removeClass('hidden');


    if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m4a4_1 != 'undefined'){
  			if(typeof $.k2l.m4a4_1.buttonsLeft != 'undefined'){
  				$.k2l.m4a4_1.buttonsLeft = 8;
  			}
		  }
		}
	},

});


Template.m4a4.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a4.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 4, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a4.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a4_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a4_1");
	}
});

Template.m4a4_1.events({


  "click .button1": function(evt){
    ;
    $(evt.currentTarget).addClass('buttonsmall-right noclick');

    // Reduce number of remaining buttons
    $.k2l.m4a4_1.buttonsLeft--;

    // When all buttons have been clicked
    if ($.k2l.m4a4_1.buttonsLeft===0) {
      $('.caption.capgreen.hidden').removeClass('hidden');
      $('.instruction').addClass('hidden');
      $('.pagination').removeClass('hidden');
    }

    // Show correct message
    $('.correctscreen').removeClass('hidden');
	setTimeout( function() {
		$('.correctscreen').addClass('hidden');
	}, 1000);

},



});

Template.m4a4_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.m4a4_1 == 'undefined') {
		$.k2l.m4a4_1 = {};
	}
  // Define number of buttons on the page
	$.k2l.m4a4_1.buttonsLeft = 8;
};


Template.m4a4_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a4_2");
	}
});


Template.m4a4_2.events({

	"click .pagination": function(evt){
		$.k2l.m4a4_2.draggedElement = {};
		$.k2l.m4a4_2.counter = 0;
	}
});

Template.m4a4_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a4_2 == 'undefined') {
		$.k2l.m4a4_2 = {};
	};
	
	$.k2l.m4a4_2.draggedElement = {};
	$.k2l.m4a4_2.counter = 0;

	// $.k2l.m4a4_2.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a4_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a4_2",
		nextPage: "#m4a4_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a4_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a4_3");
	}
});


Template.m4a4_3.events({
	
	"click .pagination": function(evt){
		$.k2l.m4a4_3.draggedElement = {};
		$.k2l.m4a4_3.counter = 0;
	}
});

Template.m4a4_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a4_3 == 'undefined') {
		$.k2l.m4a4_3 = {};
	};
	
	$.k2l.m4a4_3.draggedElement = {};
	$.k2l.m4a4_3.counter = 0;

	// $.k2l.m4a4_3.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a4_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a4_3",
		nextPage: "#m4a4_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}
