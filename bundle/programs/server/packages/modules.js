(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package['modules-runtime'].meteorInstall;

var require = meteorInstall({"node_modules":{"meteor":{"modules":{"server.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/modules/server.js                                                        //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
require("./install-packages.js");
require("./process.js");
require("./reify.js");

///////////////////////////////////////////////////////////////////////////////////////

},"install-packages.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/modules/install-packages.js                                              //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
function install(name, mainModule) {
  var meteorDir = {};

  // Given a package name <name>, install a stub module in the
  // /node_modules/meteor directory called <name>.js, so that
  // require.resolve("meteor/<name>") will always return
  // /node_modules/meteor/<name>.js instead of something like
  // /node_modules/meteor/<name>/index.js, in the rare but possible event
  // that the package contains a file called index.js (#6590).

  if (typeof mainModule === "string") {
    // Set up an alias from /node_modules/meteor/<package>.js to the main
    // module, e.g. meteor/<package>/index.js.
    meteorDir[name + ".js"] = mainModule;
  } else {
    // back compat with old Meteor packages
    meteorDir[name + ".js"] = function (r, e, module) {
      module.exports = Package[name];
    };
  }

  meteorInstall({
    node_modules: {
      meteor: meteorDir
    }
  });
}

// This file will be modified during computeJsOutputFilesMap to include
// install(<name>) calls for every Meteor package.

install("meteor");
install("meteor-base");
install("mobile-experience");
install("modules-runtime");
install("modules", "meteor/modules/server.js");
install("jquery");
install("tracker");
install("deps");
install("underscore");
install("ecmascript-runtime");
install("promise", "meteor/promise/server.js");
install("ecmascript-runtime-server", "meteor/ecmascript-runtime-server/runtime.js");
install("babel-compiler");
install("ecmascript");
install("base64");
install("babel-runtime", "meteor/babel-runtime/babel-runtime.js");
install("ejson", "meteor/ejson/ejson.js");
install("cfs:base-package");
install("check", "meteor/check/match.js");
install("random");
install("retry");
install("id-map");
install("callback-hook");
install("ddp-common");
install("diff-sequence");
install("mongo-id");
install("ddp-client", "meteor/ddp-client/namespace.js");
install("rate-limit");
install("ddp-rate-limiter");
install("logging");
install("routepolicy");
install("boilerplate-generator", "meteor/boilerplate-generator/generator.js");
install("webapp-hashing");
install("webapp", "meteor/webapp/webapp_server.js");
install("geojson-utils", "meteor/geojson-utils/main.js");
install("ordered-dict");
install("minimongo", "meteor/minimongo/minimongo_server.js");
install("ddp-server");
install("ddp");
install("livedata");
install("mongo-livedata");
install("raix:eventemitter");
install("npm-mongo");
install("allow-deny");
install("binary-heap");
install("mongo");
install("cfs:storage-adapter");
install("cfs:gridfs");
install("cfs:standard-packages");
install("fortawesome:fontawesome");
install("harrison:papa-parse");
install("observe-sequence");
install("reactive-var");
install("htmljs");
install("blaze");
install("ui");
install("spacebars");
install("templating-compiler");
install("templating-runtime");
install("templating");
install("iron:core");
install("iron:dynamic-template");
install("iron:layout");
install("iron:url");
install("iron:middleware-stack");
install("iron:location");
install("reactive-dict");
install("iron:controller");
install("iron:router");
install("reload");
install("session");
install("twbs:bootstrap");
install("mikael:device");
install("momentjs:moment");
install("themeteorchef:bert");
install("fastclick");
install("url");
install("http");
install("cfs:data-man");
install("cfs:file");
install("cfs:ui");
install("npm-bcrypt", "meteor/npm-bcrypt/wrapper.js");
install("accounts-base", "meteor/accounts-base/server_main.js");
install("sha");
install("srp");
install("email");
install("accounts-password");
install("alanning:roles");
install("blaze-html-templates");
install("andrei:tablesorter");
install("shell-server", "meteor/shell-server/main.js");
install("multiply:iron-router-progress");
install("gadicohen:robots-txt");
install("gadicohen:sitemaps");
install("johnantoni:meteor-unveil");
install("mrgalaxy:stripe");
install("standard-app-packages");
install("autoupdate");
install("meteor-platform");
install("awatson1978:browser-detection");
install("themeteorchef:jquery-validation");
install("miro:mailchimp");
install("em0ney:honeypot");
install("reywood:iron-router-ga");
install("okgrow:router-autoscroll");
install("standard-minifier-css");
install("minifier-css");
install("markdown");
install("less");
install("richsilv:owl-carousel");
install("standard-minifier-js");
install("standard-minifiers");
install("gwendall:body-events");
install("spiderable");
install("coffeescript");
install("mizzao:timesync");
install("mizzao:user-status");
install("accounts-ui-unstyled");
install("accounts-ui");
install("dynamic-import", "meteor/dynamic-import/server.js");
install("cfs:filesystem");
install("cfs:ejson-file");
install("hot-code-push");
install("launch-screen");
install("cfs:tempstore");
install("cfs:http-methods");
install("cfs:http-publish");
install("cfs:access-point");
install("cfs:reactive-property");
install("cfs:reactive-list");
install("cfs:power-queue");
install("cfs:upload-http");
install("cfs:collection");
install("cfs:collection-filters");
install("cfs:worker");
install("service-configuration");

///////////////////////////////////////////////////////////////////////////////////////

},"process.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/modules/process.js                                                       //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
if (! global.process) {
  try {
    // The application can run `npm install process` to provide its own
    // process stub; otherwise this module will provide a partial stub.
    global.process = require("process");
  } catch (missing) {
    global.process = {};
  }
}

var proc = global.process;

if (Meteor.isServer) {
  // Make require("process") work on the server in all versions of Node.
  meteorInstall({
    node_modules: {
      "process.js": function (r, e, module) {
        module.exports = proc;
      }
    }
  });
} else {
  proc.platform = "browser";
  proc.nextTick = proc.nextTick || Meteor._setImmediate;
}

if (typeof proc.env !== "object") {
  proc.env = {};
}

var hasOwn = Object.prototype.hasOwnProperty;
for (var key in meteorEnv) {
  if (hasOwn.call(meteorEnv, key)) {
    proc.env[key] = meteorEnv[key];
  }
}

///////////////////////////////////////////////////////////////////////////////////////

},"reify.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/modules/reify.js                                                         //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
var Module = module.constructor;
var Mp = Module.prototype;
require("reify/lib/runtime").enable(Mp);
Mp.importSync = Mp.importSync || Mp.import;
Mp.import = Mp.import || Mp.importSync;

///////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"reify":{"lib":{"runtime":{"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// node_modules/meteor/modules/node_modules/reify/lib/runtime/index.js               //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
"use strict";

// This module should be compatible with PhantomJS v1, just like the other files
// in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
// not acceptable here, and importing any npm packages should be contemplated
// with extreme skepticism.

var utils = require("./utils.js");
var Entry = require("./entry.js");

// The exports.enable method can be used to enable the Reify runtime for
// specific module objects, or for Module.prototype (where implemented),
// to make the runtime available throughout the entire module system.
exports.enable = function (mod) {
  if (typeof mod.export !== "function" ||
      typeof mod.importSync !== "function") {
    mod.export = moduleExport;
    mod.exportDefault = moduleExportDefault;
    mod.runSetters = runSetters;
    mod.watch = moduleWatch;

    // Used for copying the properties of a namespace object to
    // mod.exports to implement `export * from "module"` syntax.
    mod.makeNsSetter = moduleMakeNsSetter;

    // To be deprecated:
    mod.runModuleSetters = runSetters;
    mod.importSync = importSync;

    return true;
  }

  return false;
};

function moduleWatch(exported, setters, key) {
  utils.setESModule(this.exports);
  Entry.getOrCreate(this.exports, this);

  if (utils.isObject(setters)) {
    Entry.getOrCreate(exported).addSetters(this, setters, key);
  }
}

// If key is provided, it will be used to identify the given setters so
// that they can be replaced if module.importSync is called again with the
// same key. This avoids potential memory leaks from import declarations
// inside loops. The compiler generates these keys automatically (and
// deterministically) when compiling nested import declarations.
function importSync(id, setters, key) {
  return this.watch(this.require(id), setters, key);
}

// Register getter functions for local variables in the scope of an export
// statement. Pass true as the second argument to indicate that the getter
// functions always return the same values.
function moduleExport(getters, constant) {
  utils.setESModule(this.exports);
  var entry = Entry.getOrCreate(this.exports, this);
  entry.addGetters(getters, constant);
  if (this.loaded) {
    // If the module has already been evaluated, then we need to trigger
    // another round of entry.runSetters calls, which begins by calling
    // entry.runModuleGetters(module).
    entry.runSetters();
  }
}

// Register a getter function that always returns the given value.
function moduleExportDefault(value) {
  return this.export({
    default: function () {
      return value;
    }
  }, true);
}

// Platform-specific code should find a way to call this method whenever
// the module system is about to return module.exports from require. This
// might happen more than once per module, in case of dependency cycles,
// so we want Module.prototype.runSetters to run each time.
function runSetters(valueToPassThrough) {
  var entry = Entry.get(this.exports);
  if (entry !== null) {
    entry.runSetters();
  }

  if (this.loaded) {
    // If this module has finished loading, then we must create an Entry
    // object here, so that we can add this module to entry.ownerModules
    // by passing it as the second argument to Entry.getOrCreate.
    Entry.getOrCreate(this.exports, this);
  }

  // Assignments to exported local variables get wrapped with calls to
  // module.runSetters, so module.runSetters returns the
  // valueToPassThrough parameter to allow the value of the original
  // expression to pass through. For example,
  //
  //   export var a = 1;
  //   console.log(a += 3);
  //
  // becomes
  //
  //   module.export("a", () => a);
  //   var a = 1;
  //   console.log(module.runSetters(a += 3));
  //
  // This ensures module.runSetters runs immediately after the assignment,
  // and does not interfere with the larger computation.
  return valueToPassThrough;
}

// Returns a function that takes a namespace object and copies the
// properties of the namespace to module.exports, excluding any "default"
// property, which is useful for implementing `export * from "module"`.
function moduleMakeNsSetter() {
  var module = this;
  // Discussion of why the "default" property is skipped:
  // https://github.com/tc39/ecma262/issues/948
  return function (namespace) {
    Object.keys(namespace).forEach(function (key) {
      if (key !== "default") {
        utils.copyKey(key, module.exports, namespace);
      }
    });
  };
}

///////////////////////////////////////////////////////////////////////////////////////

}}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/modules/server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.modules = exports, {
  meteorInstall: meteorInstall
});

})();
