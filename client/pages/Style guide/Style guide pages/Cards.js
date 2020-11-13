Template.styleCards.events({

	'click .flippable': function (evt) {

		if (Session.get("flip-set") !== true) {
			$(".flippable").flip({
				trigger: 'manual'
			});
			Session.set("flip-set", true);
		}

		$(evt.currentTarget).flip("toggle");
	}

});

