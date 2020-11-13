Template.m4a21.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m4a21_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a21_end");
	}
});

Template.m4a21.events({

  "click a.restart": function(evt){

    if(typeof $.k2l != 'undefined'){
      if(typeof $.k2l.m4a21 != 'undefined'){
        if(typeof $.k2l.m4a21.index != 'undefined') {
          $.k2l.m4a21.index = 0;
        }

      }
    }
	
	$('#m4a21_8 .next').addClass('hidden');

  },



});


Template.m4a21.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 21);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a21.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 21, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a21.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a21_1.helpers ({
  activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a21_1");
	}
});

Template.m4a21_1.events({

	"click .button1": function(evt){

		
    //$('.pagination').addClass('hidden');
		if ($.k2l.m4a21.allowClick === true) {
			$.k2l.m4a21.allowClick = false;
			if ($(evt.currentTarget).html() == $.k2l.m4a21.answer_index[$.k2l.m4a21.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4a21.index++;
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
					}, 1000);
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function() {
						if ($.k2l.m4a21.index >= $.k2l.m4a21.answer_index.length) {
							$.k2l.m4a21.index = 0;
              $('.pagination').removeClass('hidden');
						}
            else {
            $('#welldonecap').addClass('hidden');
						$.k2l.m4a21.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}
        }, 2000);


				} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m4a21.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}

	},

	'click .pagination': function(evt) {
		$.k2l.m4a21.index = 0;
		$.k2l.m4a21.allowClick = true;
	}

});

Template.m4a21_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.m4a21 == 'undefined') {
		$.k2l.m4a21 = {};
	}

	var answer_index = ["carefully","far too fast","completely","almost","really well","otherwise",'together','hard'];

	$.k2l.m4a21.answer_index = answer_index;
	$.k2l.m4a21.index = 0;

	$.k2l.m4a21.allowClick = true;
};

