Template.Bangor.created = function() {
	this.subscribe('userProgress');
  }

Template.Bangor.helpers({ 
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

Template.Chester.created = function() {
	this.subscribe('userProgress');
  }

Template.Chester.helpers({ 
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

Template.ColwynBay.created = function() {
	this.subscribe('userProgress');
  }

Template.ColwynBay.helpers({ 
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

Template.PeakDistrict.created = function() {
	this.subscribe('userProgress');
  }

Template.PeakDistrict.helpers({ 
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

Template.Sheffield.created = function() {
	this.subscribe('userProgress');
  }

Template.Sheffield.helpers({ 
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

Template.StokeonTrent.created = function() {
	this.subscribe('userProgress');
  }

Template.StokeonTrent.helpers({ 
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

