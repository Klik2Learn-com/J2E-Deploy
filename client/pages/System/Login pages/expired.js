Template.expired.rendered = function() {	
	document.title = "Journey 2 English";
}


Template.expired.helpers({
	routeData : function(){
		var date = Meteor.user().expiry;

		var day = (date.getUTCDate()<10?'0':'') + date.getUTCDate();
		var month = ((date.getUTCMonth() + 1)<10?'0':'') + (date.getUTCMonth() + 1); //months from 1-12
		var year = date.getUTCFullYear();
		var hours = (date.getHours()<10?'0':'') + date.getHours();
		var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();

		var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
		return formattedDate;
	},

	userId : function(){
		return Meteor.userId();
	}
});