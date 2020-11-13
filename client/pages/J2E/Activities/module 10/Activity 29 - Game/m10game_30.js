Template.m10Game_30.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_30"); 
	},

	ghost: function(){
		var r9Correct = Session.get('R9_Correct');
		return (r9Correct >= 2);
	}  
}); 
 
Template.m10Game_30.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_30.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_30.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_30.sound.src = {};
	}

});

Template.m10Game_30.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_30 == 'undefined') {
		$.k2l.m10Game_30 = {};
	};
	
	$.k2l.m10Game_30.sound = new Audio();
}
	