(function(){if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

window.fbAsyncInit = function() {
    FB.init({
      appId      : '334914750233778',
      status     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
  };
}

if (Meteor.isServer) {

}


}).call(this);
