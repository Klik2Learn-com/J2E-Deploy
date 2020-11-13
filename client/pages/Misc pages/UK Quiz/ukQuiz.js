Template.UKquiz.rendered = function() {
	
	if (Session.get('quiz_Correct') == undefined){
		Session.set('quiz_Correct', 0);
	};
	if (Session.get('quiz_Incorrect') == undefined){
		Session.set('quiz_Incorrect', 0);
	};
}

Template.UKquiz.events({  
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
},
});