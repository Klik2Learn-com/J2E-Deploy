if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  window.fbAsyncInit = function () {
    FB.init({
      appId: '334914750233778',
      status: true,
      xfbml: true,
      version: 'v2.8'
    });
  };

  //console.log("METEOR CLIENT TEMPLATES.js");
  if (Meteor.isClient) {
    //console.log("meteor is client");
    Meteor.settings = { "public": { "ga": { "id": "UA-144464149-2" } } };
  }
}

if (Meteor.isServer) {

}
