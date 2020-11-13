Template.Dunfermline.created = function() {
	this.subscribe('userProgress');
  }

Template.Dunfermline.helpers({ 
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

Template.Edinburgh.created = function() {
	this.subscribe('userProgress');
  }

Template.Edinburgh.helpers({ 
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

Template.Linlithgow.created = function() {
	this.subscribe('userProgress');
  }

Template.Linlithgow.helpers({ 
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

Template.NorthBerwick.created = function() {
	this.subscribe('userProgress');
  }

Template.NorthBerwick.helpers({ 
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

Template.Peebles.created = function() {
	this.subscribe('userProgress');
  }

Template.Peebles.helpers({ 
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

Template.Stirling.created = function() {
	this.subscribe('userProgress');
  }

Template.Stirling.helpers({ 
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

