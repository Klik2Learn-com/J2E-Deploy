Template.m1Game_audio.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_audio");
	}
});