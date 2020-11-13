/**
* Code to run on client app deployment.
*/
Meteor.startup(function (callback) {
    
    console.log("METEOR CLIENT STARTUP");
    if (Meteor.isClient) {
        //console.log("meteor is client");
        Meteor.settings = { "public": { "ga": { "id": "UA-144464149-2" } } };
    }

    if (Meteor.isClient) {
        Router.plugin('reywood:iron-router-ga');
    }

});