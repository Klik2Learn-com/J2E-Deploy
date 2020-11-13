Template.m9Game_26.helpers({  
  slideText: function() {
    
    var kCorrect = Session.get('K_Correct');
    var tuCorrect = Session.get('Tu_Correct');
    var elleCorrect = Session.get('Elle_Correct');

    if (kCorrect > tuCorrect && kCorrect > elleCorrect){
      return "K found the most seeds";  
    } else if (tuCorrect > kCorrect && tuCorrect > elleCorrect){
      return "Tu found the most seeds";
    } else if (elleCorrect > kCorrect && elleCorrect > tuCorrect){
      return "Elle found the most seeds";
    } else if (kCorrect > tuCorrect && elleCorrect > tuCorrect && kCorrect == elleCorrect){
      return "It's a draw! K and Elle found the most seeds";
    } else if (kCorrect > elleCorrect && tuCorrect > elleCorrect && kCorrect == tuCorrect){
      return "It's a draw! K and Tu found the most seeds";
    } else if (tuCorrect > kCorrect && elleCorrect > kCorrect && elleCorrect == tuCorrect){
      return "It's a draw! Tu and Elle found the most seeds";
    } else if (kCorrect == tuCorrect && tuCorrect == elleCorrect && kCorrect > 0 && tuCorrect > 0 && elleCorrect > 0){
      return "It's a draw! K, Tu and Elle found the same number of seeds!";
    };
    
    
  },

  slideImage: function() {
    
    var kCorrect = Session.get('K_Correct');
    var tuCorrect = Session.get('Tu_Correct');
    var elleCorrect = Session.get('Elle_Correct');

    if (kCorrect > tuCorrect && kCorrect > elleCorrect){
      return "images/game/module9/result-k.png";  
    } else if (tuCorrect > kCorrect && tuCorrect > elleCorrect){
      return "images/game/module9/result-tu.png"; 
    } else if (elleCorrect > kCorrect && elleCorrect > tuCorrect){
      return "images/game/module9/result-elle.png"; 
    } else if (kCorrect > tuCorrect && elleCorrect > tuCorrect && kCorrect == elleCorrect){
      return "images/game/module9/result-k-elle.png"; 
    } else if (kCorrect > elleCorrect && tuCorrect > elleCorrect && kCorrect == tuCorrect){
      return "images/game/module9/result-k-tu.png"; 
    } else if (tuCorrect > kCorrect && elleCorrect > kCorrect && elleCorrect == tuCorrect){
      return "images/game/module9/result-tu-elle.png"; 
    } else if (kCorrect == tuCorrect && tuCorrect == elleCorrect && kCorrect > 0 && tuCorrect > 0 && elleCorrect > 0){
      return "images/game/module9/result-k-tu-elle.png"; ;
    };
    
    
  }

});