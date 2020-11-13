Template.m9Game_seeds.helpers({

	KSeeds: function() {
		var session = Session.get("K_Correct");
		return session;
	},

	TuSeeds: function() {
		var session = Session.get("Tu_Correct");
		return session;
	},

	ElleSeeds: function() {
		var session = Session.get("Elle_Correct");
		return session;
	}

});

Template.m9Game_seeds.rendered = function() {
}
