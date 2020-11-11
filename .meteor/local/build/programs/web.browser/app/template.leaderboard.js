(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    "class": "outer"
  }, HTML.Raw('\n    <div class="logo"></div>\n    <h1 class="title">Leaderboard</h1>\n    <div class="subtitle">Select a scientist to give them points</div>\n    '), Spacebars.include(view.lookupTemplate("leaderboard")), "\n  ");
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("leaderboard");
Template["leaderboard"] = new Template("Template.leaderboard", (function() {
  var view = this;
  return [ HTML.OL({
    "class": "leaderboard"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("players"));
  }, function() {
    return [ "\n      ", Spacebars.include(view.lookupTemplate("player")), "\n    " ];
  }), "\n  "), "\n\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("selectedName"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "details"
    }, "\n      ", HTML.DIV({
      "class": "name"
    }, Blaze.View("lookup:selectedName", function() {
      return Spacebars.mustache(view.lookup("selectedName"));
    })), "\n      ", HTML.BUTTON({
      "class": "inc"
    }, "Add 5 points"), "\n    "), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "message"
    }, "Click a player to select"), "\n  " ];
  }) ];
}));

Template.__checkName("player");
Template["player"] = new Template("Template.player", (function() {
  var view = this;
  return HTML.LI({
    "class": function() {
      return [ "player ", Spacebars.mustache(view.lookup("selected")) ];
    }
  }, "\n    ", HTML.SPAN({
    "class": "name"
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n    ", HTML.SPAN({
    "class": "score"
  }, Blaze.View("lookup:score", function() {
    return Spacebars.mustache(view.lookup("score"));
  })), "\n  ");
}));

}).call(this);
