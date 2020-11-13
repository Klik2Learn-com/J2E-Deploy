Template.m1Game_map.events({
	'click .route-easy': function(evt) {
		Session.set('hardpath', false);
		Session.set("activeSection", "#m1Game_e_1");
		$('#m1Game_map').addClass('hidden');
		$('#m1Game_e_1').removeClass('hidden');
		document.location.hash = 'm1Game_e_1';
	
	},
	'click .route-hard': function(evt) {
		Session.set('hardpath', true);
		$('#m1Game_map').addClass('hidden');
		$('#m1Game_h_1').removeClass('hidden');
		Session.set("activeSection", "#m1Game_h_1");
		
		document.location.hash = 'm1Game_h_1';
	
	 }
});