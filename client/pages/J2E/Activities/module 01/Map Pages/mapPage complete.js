Template.Inverness.created = function() {
	this.subscribe('userProgress');
  }

Template.Inverness.helpers({ 
	completed: function(m,a) { 
		var userid = Meteor.userId(); 
		var progress = userProgress.findOne({ userId : userid });
		var module = m - 1;
		var activity = a - 1;
		 if (progress.modules[module].activities[activity].completed == "Completed"){
					return "completed";
				}
  } 
});

Template.DunveganCastle.created = function() {
	this.subscribe('userProgress');
  }

Template.DunveganCastle.helpers({ 
	completed: function(m,a) { 
		var userid = Meteor.userId(); 
		var progress = userProgress.findOne({ userId : userid });
		var module = m - 1;
		var activity = a - 1;
		 if (progress.modules[module].activities[activity].completed == "Completed"){
					return "completed";
				}
  } 
});

Template.FortAugustus.created = function() {
	this.subscribe('userProgress');
  }

Template.FortAugustus.helpers({ 
	completed: function(m,a) { 
		var userid = Meteor.userId(); 
		var progress = userProgress.findOne({ userId : userid });
		var module = m - 1;
		var activity = a - 1;
		 if (progress.modules[module].activities[activity].completed == "Completed"){
					return "completed";
				}
  } 
});

Template.KyleofLochalsh.created = function() {
	this.subscribe('userProgress');
  }

Template.KyleofLochalsh.helpers({ 
	completed: function(m,a) { 
		var userid = Meteor.userId(); 
		var progress = userProgress.findOne({ userId : userid });
		var module = m - 1;
		var activity = a - 1;
		 if (progress.modules[module].activities[activity].completed == "Completed"){
					return "completed";
				}
  } 
});

Template.LochNess.created = function() {
	this.subscribe('userProgress');
  }

Template.LochNess.helpers({ 
	completed: function(m,a) { 
		var userid = Meteor.userId(); 
		var progress = userProgress.findOne({ userId : userid });
		var module = m - 1;
		var activity = a - 1;
		 if (progress.modules[module].activities[activity].completed == "Completed"){
					return "completed";
				}
  } 
});

Template.Portree.created = function() {
	this.subscribe('userProgress');
  }

Template.Portree.helpers({ 
	completed: function(m,a) { 
		var userid = Meteor.userId(); 
		var progress = userProgress.findOne({ userId : userid });
		var module = m - 1;
		var activity = a - 1;
		 if (progress.modules[module].activities[activity].completed == "Completed"){
					return "completed";
				}
  } 
});

