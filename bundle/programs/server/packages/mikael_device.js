(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var Device;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/mikael_device/packages/mikael_device.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mikael:device'] = {}, {
  Device: Device
});

})();
