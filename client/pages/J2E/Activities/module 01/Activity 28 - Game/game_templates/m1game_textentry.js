Template.m1Game_phone_textentry.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_phone_textentry");
	}
});