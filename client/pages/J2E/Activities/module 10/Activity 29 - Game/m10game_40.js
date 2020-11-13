Template.m10Game_40.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_40"); 
	},

	ghost: function(){
		var r12Correct = Session.get('R12_Correct');
		return (r12Correct >= 2);
	}  
}); 
 
Template.m10Game_40.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_40.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_40.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_40.sound.src = {};
	}

});

Template.m10Game_40.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_40 == 'undefined') {
		$.k2l.m10Game_40 = {};
	};
	
	$.k2l.m10Game_40.sound = new Audio();
}
	