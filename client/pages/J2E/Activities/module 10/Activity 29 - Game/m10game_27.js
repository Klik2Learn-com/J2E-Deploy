Template.m10Game_27.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_27"); 
	},

	ghost: function(){
		var r8Correct = Session.get('R8_Correct');
		return (r8Correct >= 2);
	}  
}); 
 
Template.m10Game_27.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_27.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_27.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_27.sound.src = {};
	}

});

Template.m10Game_27.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_27 == 'undefined') {
		$.k2l.m10Game_27 = {};
	};
	
	$.k2l.m10Game_27.sound = new Audio();
}
	