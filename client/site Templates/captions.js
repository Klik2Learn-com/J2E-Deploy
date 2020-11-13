Template.scorebox2.helpers({

	rightDisplay: function() {
		var session = Session.get(this.rightSession);
		return session;
	},

	wrongDisplay: function() {
		var session = Session.get(this.wrongSession);
		return session;
	}

});

Template.scorebox2.rendered = function() {
}

Template.scorebox1.helpers({

	rightDisplay: function() {
		var session = Session.get(this.rightSession);
		return session;
	},

	wrongDisplay: function() {
		var session = Session.get(this.wrongSession);
		return session;
	}

});

Template.scorebox1.rendered = function() {
}