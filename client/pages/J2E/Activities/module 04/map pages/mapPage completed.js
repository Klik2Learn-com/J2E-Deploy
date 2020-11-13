Template.Crianlarich.created = function() {
	this.subscribe('userProgress');
  }

Template.Crianlarich.helpers({ 
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

Template.FortWilliam.created = function() {
	this.subscribe('userProgress');
  }

Template.FortWilliam.helpers({ 
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

Template.Glasgow.created = function() {
	this.subscribe('userProgress');
  }

Template.Glasgow.helpers({ 
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

Template.GlenCoe.created = function() {
	this.subscribe('userProgress');
  }

Template.GlenCoe.helpers({ 
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

Template.Helensburgh.created = function() {
	this.subscribe('userProgress');
  }

Template.Helensburgh.helpers({ 
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

Template.LochLomond.created = function() {
	this.subscribe('userProgress');
  }

Template.LochLomond.helpers({ 
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

