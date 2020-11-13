Template.m1Game_ans.helpers ({
	
	hardpath: function() {
		var path = Session.get('hardpath');
		if (path == true){
			return true;
		} else {
			return false;
		}
	}

});

Template.m1Game_ans.events ({

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_ans.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_ans.sound, $(evt.currentTarget));
		$.k2l.m1Game_ans.sound.play();
	},

	'click .pagination': function (evt) {
		$.k2l.m1Game_ans.sound.src = {};
		$.k2l.m1Game_ans.index = 0;
		$.k2l.m1Game_ans.allowClick = true;
	}

})



Template.m1Game_ans.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_ans == 'undefined') {
		$.k2l.m1Game_ans = {};
	};

	$.k2l.m1Game_ans.sound = new Audio();

}
