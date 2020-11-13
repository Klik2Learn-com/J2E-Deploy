Template.forums.created = function(){
	this.subscribe('organisations');
	this.subscribe('f_forums');
};

Template.forums.helpers({
	forumList: function(){
		var organisationsArray = [];
		f_forums.find({}).map(function(forum){
			if($.inArray(forum.organisation, organisationsArray) == -1){
				organisationsArray.push(forum.organisation);
			}
		});
		return organisationsArray;
	},
	orgName:function(){
		var path = Iron.Location.get().path.substr(8);
		if (path[path.length-1] == '/'){
			return path.slice(0, -1);
		}
		return path;
	},
	orgIdName: function(){
		var orgDB = organisations.findOne({"_id" : this.toString()});
		return orgDB.name;	
	},

	forumLink : function(){
		return "forums/" + this.toString() + "/";
	}
});

Template.forums.events({
	'click .forums_org_back': function(){
		var path = Iron.Location.get().path;
		 
		if (path[path.length-1] == '/'){
			path = path.slice(0, -1);
		}
		 
		path = path.substr(0, path.lastIndexOf("/")+1);
		 
		Router.go(path);
	}
});

Template.forums.rendered = function() {	
	document.title = "Forums - Journey 2 English";
}