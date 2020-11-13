Template.Yeti_s_perfect.helpers({
	userScore: function() {
		return Session.get('yetiScore');	
	}
});

Template.Yeti_s_amazing.helpers({
	userScore: function() {
		return Session.get('yetiScore');	
	}
});

Template.Yeti_s_good.helpers({
	userScore: function() {
		return Session.get('yetiScore');	
	}
});

Template.Yeti_s_ok.helpers({
	userScore: function() {
		return Session.get('yetiScore');	
	}
});

Template.Yeti_s_bad.helpers({
	userScore: function() {
		return Session.get('yetiScore');	
	}
});

/********************************************
******************* EVENTS ******************
*********************************************/

Template.Yeti_s_perfect.events({
	'click .restart': function(evt){
		resetGame();
	}
});

Template.Yeti_s_amazing.events({
	'click .restart': function(evt){
		resetGame();
	}
});

Template.Yeti_s_good.events({
	'click .restart': function(evt){
		resetGame();
	}
});

Template.Yeti_s_ok.events({
	'click .restart': function(evt){
		resetGame();
	}
});

Template.Yeti_s_bad.events({
	'click .restart': function(evt){
		resetGame();
	}
});

function resetGame(){
	// RESET the score
		Session.set('yetiScore', 0);
		
		// RESET the chosen paths
		Session.set('d1_hardpath', false);
		Session.set('d2_hardpath', false);
		Session.set('d3_hardpath', false);
		Session.set('d4_hardpath', false);
		
		// RESET all aswers to incorrect.
		Session.set('d1_h1_result', 'incorrect');
		Session.set('d1_h2_result', 'incorrect');
		Session.set('d1_h3_result', 'incorrect');
		
		Session.set('d1_e1_result', 'incorrect');
		Session.set('d1_e2_result', 'incorrect');
		Session.set('d1_e3_result', 'incorrect');
		Session.set('d1_e4_result', 'incorrect');
		Session.set('d1_e5_result', 'incorrect');
		
		Session.set('d2_h1_result', 'incorrect');
		Session.set('d2_h2_result', 'incorrect');
		Session.set('d2_h3_result', 'incorrect');
		
		Session.set('d2_e1_result', 'incorrect');
		Session.set('d2_e2_result', 'incorrect');
		Session.set('d2_e3_result', 'incorrect');
		Session.set('d2_e4_result', 'incorrect');
		Session.set('d2_e5_result', 'incorrect');
		
		Session.set('d3_h1_result', 'incorrect');
		Session.set('d3_h2_result', 'incorrect');
		Session.set('d3_h3_result', 'incorrect');
		
		Session.set('d3_e1_result', 'incorrect');
		Session.set('d3_e2_result', 'incorrect');
		Session.set('d3_e3_result', 'incorrect');
		Session.set('d3_e4_result', 'incorrect');
		Session.set('d3_e5_result', 'incorrect');
		
		Session.set('d4_h1_result', 'incorrect');
		Session.set('d4_h2_result', 'incorrect');
		Session.set('d4_h3_result', 'incorrect');
		
		Session.set('d4_e1_result', 'incorrect');
		Session.set('d4_e2_result', 'incorrect');
		Session.set('d4_e3_result', 'incorrect');
		Session.set('d4_e4_result', 'incorrect');
		Session.set('d4_e5_result', 'incorrect');
		
		// FINALLY set the activeSection
		Session.set('activeSection', 'Yeti');
		
		document.location.hash = '';
		$('#Yeti').removeClass('hidden');
}