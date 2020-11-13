Template.m10Game_43.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_43"); 
	},

	ghost: function(){
		var r13Correct = Session.get('R13_Correct');
		return (r13Correct >= 2);
	} ,
	allGhosts: function(){
		var r1Correct = Session.get('R1_Correct');
		var r2Correct = Session.get('R2_Correct');
		var r3Correct = Session.get('R3_Correct');
		var r4Correct = Session.get('R4_Correct');
		var r5Correct = Session.get('R5_Correct');
		var r6Correct = Session.get('R6_Correct');
		var r7Correct = Session.get('R7_Correct');
		var r8Correct = Session.get('R8_Correct');
		var r9Correct = Session.get('R9_Correct');
		var r10Correct = Session.get('R10_Correct');
		var r11Correct = Session.get('R11_Correct');
		var r12Correct = Session.get('R12_Correct');
		var r13Correct = Session.get('R13_Correct');

		return(r1Correct >= 2 && r2Correct >= 2 && r3Correct >= 2 && r4Correct >= 2 && r5Correct >= 2 && r6Correct >= 2 && r7Correct >= 2 && r8Correct >= 2 && r9Correct >= 2 && r10Correct >= 2 && r11Correct >= 2 && r12Correct >= 2 && r13Correct >= 2 );
	} 
}); 
 
Template.m10Game_43.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_43.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_43.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_43.sound.src = {};
	}

});

Template.m10Game_43.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_43 == 'undefined') {
		$.k2l.m10Game_43 = {};
	};
	
	$.k2l.m10Game_43.sound = new Audio();
}
	