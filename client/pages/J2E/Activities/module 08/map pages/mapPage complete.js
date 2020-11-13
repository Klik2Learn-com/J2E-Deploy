Template.Bath.created = function() {
	this.subscribe('userProgress');
  }

Template.Bath.helpers({ 
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

Template.Bristol.created = function() {
	this.subscribe('userProgress');
  }

Template.Bristol.helpers({ 
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

Template.Cardiff.created = function() {
	this.subscribe('userProgress');
  }

Template.Cardiff.helpers({ 
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

Template.Gloucester.created = function() {
	this.subscribe('userProgress');
  }

Template.Gloucester.helpers({ 
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

Template.Oxford.created = function() {
	this.subscribe('userProgress');
  }

Template.Oxford.helpers({ 
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

Template.Stonehenge.created = function() {
	this.subscribe('userProgress');
  }

Template.Stonehenge.helpers({ 
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

