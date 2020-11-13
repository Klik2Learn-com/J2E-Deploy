Template.Yeti_photo.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#Yeti_photo"){
			setTimeout(function(){
				document.location.hash = "Yeti_end_result";
				Session.set("activeSection", "#Yeti_end_result");
				$('#Yeti_photo').addClass('hidden');
				$('#Yeti_end_result').removeClass('hidden');
			}, 5000);
		}
	}
})