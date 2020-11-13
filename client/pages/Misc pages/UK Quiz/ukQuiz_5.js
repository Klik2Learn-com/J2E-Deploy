Template.ukQuiz_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#ukQuiz_5");
	}
});

Template.ukQuiz_5.events({

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.ukQuiz_5.questionWordLock == false && $.k2l.ukQuiz_5.stuckFlag == false){
      $.k2l.ukQuiz_5.questionWordLock = true;
      var scoreCorrect = Session.get('quiz_Correct');
      // var scoreIncorrect = Session.get('quiz_Incorrect');
      setTimeout(function(){
        $.k2l.ukQuiz_5.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      // $('.correctscreen').removeClass("hidden");
      // setTimeout(function(){
      //   $('.correctscreen').addClass("hidden");
      // }, 1000);

      $.k2l.ukQuiz_5.index--;
      scoreCorrect++
        Session.set('quiz_Correct', scoreCorrect);
      // $(".counterleft u").html($.k2l.ukQuiz_5.index);

      if($.k2l.ukQuiz_5.index <=0){
        var parentSection = $(evt.currentTarget).parents('section');
       $(parentSection).addClass('hidden'); // hide this page
          $(parentSection).next('section').removeClass('hidden');// reveal next page.
          document.location.hash = $(parentSection).next('section').attr('id');
          Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
          
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.ukQuiz_5.questionWordLock == false && $.k2l.ukQuiz_5.stuckFlag == false){
      $.k2l.ukQuiz_5.questionWordLock = false;
      // var scoreCorrect = Session.get('quiz_Correct');
      var scoreIncorrect = Session.get('quiz_Incorrect');
      scoreIncorrect++
        Session.set('quiz_Incorrect', scoreIncorrect);
       var parentSection = $(evt.currentTarget).parents('section');
       $(parentSection).addClass('hidden'); // hide this page
          $(parentSection).next('section').removeClass('hidden');// reveal next page.
          document.location.hash = $(parentSection).next('section').attr('id');
          Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
          

    }
	},
  // 'click .stuck': function(evt) {
  //   $('.stuck').addClass('hidden');
  //   $.k2l.ukQuiz_5.wrongscore = 0;
  //   $.k2l.ukQuiz_5.index = 0;
  //   $(".counterleft u").html($.k2l.ukQuiz_5.index);
  //   $('.paraclick-word').addClass('correctword');
  //   $('.paraclick-word-sleep').addClass('correctword');
  //   $('#ukQuiz_5 .navfooter a').removeClass('hidden');
  //   $.k2l.ukQuiz_5.stuckFlag = true;
  // },

  // 'click .navfooter a': function(evt) {
  //   $('#ukQuiz_5 .navfooter a').addClass('hidden');
  //   $('.paraclick-word').removeClass('correctword');
  //   $.k2l.ukQuiz_5.wrongscore = 0;
  //   $.k2l.ukQuiz_5.index = 6;
		// $.k2l.ukQuiz_5.stuckFlag = false;
  //   $(".counterleft u").html($.k2l.ukQuiz_5.index);
  // }

});

Template.ukQuiz_5.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.ukQuiz_5 == 'undefined') {
		$.k2l.ukQuiz_5 = {};
	};

	$.k2l.ukQuiz_5.index = 1;
  $.k2l.ukQuiz_5.wrongscore = 0;
  $.k2l.ukQuiz_5.stuckFlag = false;
  $.k2l.ukQuiz_5.questionWordLock = false;

}