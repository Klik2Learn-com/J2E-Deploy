Template.ukQuiz_scores.helpers({
  activeSection: function(){
    var activeSection = Session.get('activeSection');
    return (activeSection == "#ukQuiz_scores");
  },

  correct: function(){
    return Session.get('quiz_Correct');
  },

  percentage: function(){
    var correctScore = Session.get('quiz_Correct');

    var percentage = Math.round(correctScore/26*100);

    return percentage;

  },

  medal: function(){
    var correctScore = Session.get('quiz_Correct');

    var percentage = Math.round(correctScore/26*100);

    if(percentage == 100){
      return "score1";
    }
      else if (percentage > 75)
    {
      return "score2";
    }
     else if (percentage > 50) 
    {
      return "score3";
    }
    else if (percentage > 25)
    {
      return "score4";
    }
     else if (percentage < 24)
     {
      return "score5";
     }
  },

  goodScore: function(){
    var score = Session.get('quiz_Correct');

    if(score < 24){
      return true;
    }

  }
  });


Template.ukQuiz_scores.events({
  "click .fbShareButton": function() {
    FB.ui({
      method: 'share',
      display: 'popup',
      quote: 'I scored ' + Session.get('quiz_Correct') + ' out of 26 on the UK quiz',
      description: 'Try Klik2learn\'s new English course today!',
      picture: 'https://journey2english.com/landing/logo-journey.png',
      href: 'https://journey2english.com/ukQuiz/',
    }, function(response){});
  },
  
  "click .join": function(evt){
    if(typeof $.k2l != 'undefined'){
      if(typeof $.k2l.ukQuiz_1 != 'undefined'){
        // if(typeof $.k2l.ukQuiz_1.index != 'undefined'){
        //   $.k2l.ukQuiz_1.index=0;
        // }
        if (Session.get('quiz_Correct') == undefined){
          Session.set('quiz_Correct', 0);
        };
        if (Session.get('quiz_Incorrect') == undefined){
          Session.set('quiz_Incorrect', 0);
        }
      }
    }
    Session.set('quiz_Correct', 0);
    Session.set('quiz_Incorrect', 0);

    Router.go('/Register');
   // $('#ukQuizCorrectScore').html(Session.get('ukQuizCorrectScore'));
   // $('#ukQuizIncorrectScore').html(Session.get('ukQuizIncorrectScore'));
    // $.k2l.ukQuiz_1.allowClick = true;
},

"click #ukQuizrestart":function(evt){
    Session.set("activeSection", "#ukQuiz_1");	
    }
});