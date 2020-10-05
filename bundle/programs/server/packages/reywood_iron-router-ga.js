(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"reywood:iron-router-ga":{"lib":{"browser_policy.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////
//                                                                       //
// packages/reywood_iron-router-ga/lib/browser_policy.js                 //
//                                                                       //
///////////////////////////////////////////////////////////////////////////
                                                                         //
var Meteor = void 0;                                                     // 1
module.watch(require("meteor/meteor"), {                                 // 1
    Meteor: function (v) {                                               // 1
        Meteor = v;                                                      // 1
    }                                                                    // 1
}, 0);                                                                   // 1
Meteor.startup(function () {                                             // 3
    if (typeof BrowserPolicy === 'undefined') {                          // 4
        return;                                                          // 4
    }                                                                    // 4
                                                                         //
    BrowserPolicy.content.allowImageOrigin('www.google-analytics.com');  // 6
    BrowserPolicy.content.allowScriptOrigin('www.google-analytics.com');
});                                                                      // 8
///////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/reywood:iron-router-ga/lib/browser_policy.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['reywood:iron-router-ga'] = {};

})();

//# sourceMappingURL=reywood_iron-router-ga.js.map
