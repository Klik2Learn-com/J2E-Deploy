(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var FS = Package['cfs:base-package'].FS;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var _chunkPath, _fileReference;

var require = meteorInstall({"node_modules":{"meteor":{"cfs:tempstore":{"tempStore.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/cfs_tempstore/tempStore.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// ##Temporary Storage                                                                                                 // 1
//                                                                                                                     // 2
// Temporary storage is used for chunked uploads until all chunks are received                                         // 3
// and all copies have been made or given up. In some cases, the original file                                         // 4
// is stored only in temporary storage (for example, if all copies do some                                             // 5
// manipulation in beforeSave). This is why we use the temporary file as the                                           // 6
// basis for each saved copy, and then remove it after all copies are saved.                                           // 7
//                                                                                                                     // 8
// Every chunk is saved as an individual temporary file. This is safer than                                            // 9
// attempting to write multiple incoming chunks to different positions in a                                            // 10
// single temporary file, which can lead to write conflicts.                                                           // 11
//                                                                                                                     // 12
// Using temp files also allows us to easily resume uploads, even if the server                                        // 13
// restarts, and to keep the working memory clear.                                                                     // 14
// The FS.TempStore emits events that others are able to listen to                                                     // 16
var EventEmitter = Npm.require('events').EventEmitter; // We have a special stream concating all chunk files into one readable stream
                                                                                                                       //
                                                                                                                       //
var CombinedStream = Npm.require('combined-stream'); /** @namespace FS.TempStore                                       // 20
                                                      * @property FS.TempStore                                         //
                                                      * @type {object}                                                 //
                                                      * @public                                                        //
                                                      * @summary An event emitter                                      //
                                                      */                                                               //
                                                                                                                       //
FS.TempStore = new EventEmitter(); // Create a tracker collection for keeping track of all chunks for any files that are currently in the temp store
                                                                                                                       //
var tracker = FS.TempStore.Tracker = new Mongo.Collection('cfs._tempstore.chunks'); /**                                // 31
                                                                                     * @property FS.TempStore.Storage  //
                                                                                     * @type {StorageAdapter}          //
                                                                                     * @namespace FS.TempStore         //
                                                                                     * @private                        //
                                                                                     * @summary This property is set to either `FS.Store.FileSystem` or `FS.Store.GridFS`
                                                                                     *                                 //
                                                                                     * __When and why:__               //
                                                                                     * We normally default to `cfs-filesystem` unless its not installed. *(we default to gridfs if installed)*
                                                                                     * But if `cfs-gridfs` and `cfs-worker` is installed we default to `cfs-gridfs`
                                                                                     *                                 //
                                                                                     * If `cfs-gridfs` and `cfs-filesystem` is not installed we log a warning.
                                                                                     * the user can set `FS.TempStore.Storage` them selfs eg.:
                                                                                     * ```js                           //
                                                                                     *   // Its important to set `internal: true` this lets the SA know that we
                                                                                     *   // are using this internally and it will give us direct SA api
                                                                                     *   FS.TempStore.Storage = new FS.Store.GridFS('_tempstore', { internal: true });
                                                                                     * ```                             //
                                                                                     *                                 //
                                                                                     * > Note: This is considered as `advanced` use, its not a common pattern.
                                                                                     */                                //
FS.TempStore.Storage = null; // We will not mount a storage adapter until needed. This allows us to check for the      // 54
// existance of FS.FileWorker, which is loaded after this package because it                                           // 57
// depends on this package.                                                                                            // 58
                                                                                                                       //
function mountStorage() {                                                                                              // 59
  if (FS.TempStore.Storage) return; // XXX: We could replace this test, testing the FS scope for grifFS etc.           // 61
  // This is on the todo later when we get "stable"                                                                    // 64
                                                                                                                       //
  if (Package["cfs:gridfs"] && (Package["cfs:worker"] || !Package["cfs:filesystem"])) {                                // 65
    // If the file worker is installed we would prefer to use the gridfs sa                                            // 66
    // for scalability. We also default to gridfs if filesystem is not found                                           // 67
    // Use the gridfs                                                                                                  // 69
    FS.TempStore.Storage = new FS.Store.GridFS('_tempstore', {                                                         // 70
      internal: true                                                                                                   // 70
    });                                                                                                                // 70
  } else if (Package["cfs:filesystem"]) {                                                                              // 71
    // use the Filesystem                                                                                              // 73
    FS.TempStore.Storage = new FS.Store.FileSystem('_tempstore', {                                                     // 74
      internal: true                                                                                                   // 74
    });                                                                                                                // 74
  } else {                                                                                                             // 75
    throw new Error('FS.TempStore.Storage is not set: Install cfs:filesystem or cfs:gridfs or set it manually');       // 76
  }                                                                                                                    // 77
                                                                                                                       //
  FS.debug && console.log('TempStore is mounted on', FS.TempStore.Storage.typeName);                                   // 79
}                                                                                                                      // 80
                                                                                                                       //
function mountFile(fileObj, name) {                                                                                    // 82
  if (!fileObj.isMounted()) {                                                                                          // 83
    throw new Error(name + ' cannot work with unmounted file');                                                        // 84
  }                                                                                                                    // 85
} // We update the fileObj on progress                                                                                 // 86
                                                                                                                       //
                                                                                                                       //
FS.TempStore.on('progress', function (fileObj, chunkNum, count, total, result) {                                       // 89
  FS.debug && console.log('TempStore progress: Received ' + count + ' of ' + total + ' chunks for ' + fileObj.name());
}); // XXX: TODO                                                                                                       // 91
// FS.TempStore.on('stored', function(fileObj, chunkCount, result) {                                                   // 94
//   // This should work if we pass on result from the SA on stored event...                                           // 95
//   fileObj.update({ $set: { chunkSum: 1, chunkCount: chunkCount, size: result.size } });                             // 96
// });                                                                                                                 // 97
// Stream implementation                                                                                               // 99
/**                                                                                                                    // 101
 * @method _chunkPath                                                                                                  //
 * @private                                                                                                            //
 * @param {Number} [n] Chunk number                                                                                    //
 * @returns {String} Chunk naming convention                                                                           //
 */                                                                                                                    //
                                                                                                                       //
_chunkPath = function (n) {                                                                                            // 107
  return (n || 0) + '.chunk';                                                                                          // 108
}; /**                                                                                                                 // 109
    * @method _fileReference                                                                                           //
    * @param {FS.File} fileObj                                                                                         //
    * @param {Number} chunk                                                                                            //
    * @private                                                                                                         //
    * @returns {String} Generated SA specific fileKey for the chunk                                                    //
    *                                                                                                                  //
    * Note: Calling function should call mountStorage() first, and                                                     //
    * make sure that fileObj is mounted.                                                                               //
    */                                                                                                                 //
                                                                                                                       //
_fileReference = function (fileObj, chunk, existing) {                                                                 // 121
  // Maybe it's a chunk we've already saved                                                                            // 122
  existing = existing || tracker.findOne({                                                                             // 123
    fileId: fileObj._id,                                                                                               // 123
    collectionName: fileObj.collectionName                                                                             // 123
  }); // Make a temporary fileObj just for fileKey generation                                                          // 123
                                                                                                                       //
  var tempFileObj = new FS.File({                                                                                      // 126
    collectionName: fileObj.collectionName,                                                                            // 127
    _id: fileObj._id,                                                                                                  // 128
    original: {                                                                                                        // 129
      name: _chunkPath(chunk)                                                                                          // 130
    },                                                                                                                 // 129
    copies: {                                                                                                          // 132
      _tempstore: {                                                                                                    // 133
        key: existing && existing.keys[chunk]                                                                          // 134
      }                                                                                                                // 133
    }                                                                                                                  // 132
  }); // Return a fitting fileKey SA specific                                                                          // 126
                                                                                                                       //
  return FS.TempStore.Storage.adapter.fileKey(tempFileObj);                                                            // 140
}; /**                                                                                                                 // 141
    * @method FS.TempStore.exists                                                                                      //
    * @param {FS.File} File object                                                                                     //
    * @returns {Boolean} Is this file, or parts of it, currently stored in the TempStore                               //
    */                                                                                                                 //
                                                                                                                       //
FS.TempStore.exists = function (fileObj) {                                                                             // 148
  var existing = tracker.findOne({                                                                                     // 149
    fileId: fileObj._id,                                                                                               // 149
    collectionName: fileObj.collectionName                                                                             // 149
  });                                                                                                                  // 149
  return !!existing;                                                                                                   // 150
}; /**                                                                                                                 // 151
    * @method FS.TempStore.listParts                                                                                   //
    * @param {FS.File} fileObj                                                                                         //
    * @returns {Object} of parts already stored                                                                        //
    * @todo This is not yet implemented, milestone 1.1.0                                                               //
    */                                                                                                                 //
                                                                                                                       //
FS.TempStore.listParts = function () {                                                                                 // 159
  function fsTempStoreListParts(fileObj) {                                                                             // 159
    var self = this;                                                                                                   // 160
    console.warn('This function is not correctly implemented using SA in TempStore'); //XXX This function might be necessary for resume. Not currently supported.
  }                                                                                                                    // 163
                                                                                                                       //
  return fsTempStoreListParts;                                                                                         // 159
}(); /**                                                                                                               // 159
      * @method FS.TempStore.removeFile                                                                                //
      * @public                                                                                                        //
      * @param {FS.File} fileObj                                                                                       //
      * This function removes the file from tempstorage - it cares not if file is                                      //
      * already removed or not found, goal is reached anyway.                                                          //
      */                                                                                                               //
                                                                                                                       //
FS.TempStore.removeFile = function () {                                                                                // 172
  function fsTempStoreRemoveFile(fileObj) {                                                                            // 172
    var self = this; // Ensure that we have a storage adapter mounted; if not, throw an error.                         // 173
                                                                                                                       //
    mountStorage(); // If fileObj is not mounted or can't be, throw an error                                           // 176
                                                                                                                       //
    mountFile(fileObj, 'FS.TempStore.removeFile'); // Emit event                                                       // 179
                                                                                                                       //
    self.emit('remove', fileObj);                                                                                      // 182
    var chunkInfo = tracker.findOne({                                                                                  // 184
      fileId: fileObj._id,                                                                                             // 185
      collectionName: fileObj.collectionName                                                                           // 186
    });                                                                                                                // 184
                                                                                                                       //
    if (chunkInfo) {                                                                                                   // 189
      // Unlink each file                                                                                              // 191
      FS.Utility.each(chunkInfo.keys || {}, function (key, chunk) {                                                    // 192
        var fileKey = _fileReference(fileObj, chunk, chunkInfo);                                                       // 193
                                                                                                                       //
        FS.TempStore.Storage.adapter.remove(fileKey, FS.Utility.noop);                                                 // 194
      }); // Remove fileObj from tracker collection, too                                                               // 195
                                                                                                                       //
      tracker.remove({                                                                                                 // 198
        _id: chunkInfo._id                                                                                             // 198
      });                                                                                                              // 198
    }                                                                                                                  // 200
  }                                                                                                                    // 201
                                                                                                                       //
  return fsTempStoreRemoveFile;                                                                                        // 172
}(); /**                                                                                                               // 172
      * @method FS.TempStore.removeAll                                                                                 //
      * @public                                                                                                        //
      * @summary This function removes all files from tempstorage - it cares not if file is                            //
      * already removed or not found, goal is reached anyway.                                                          //
      */                                                                                                               //
                                                                                                                       //
FS.TempStore.removeAll = function () {                                                                                 // 209
  function fsTempStoreRemoveAll() {                                                                                    // 209
    var self = this; // Ensure that we have a storage adapter mounted; if not, throw an error.                         // 210
                                                                                                                       //
    mountStorage();                                                                                                    // 213
    tracker.find().forEach(function (chunkInfo) {                                                                      // 215
      // Unlink each file                                                                                              // 216
      FS.Utility.each(chunkInfo.keys || {}, function (key, chunk) {                                                    // 217
        var fileKey = _fileReference({                                                                                 // 218
          _id: chunkInfo.fileId,                                                                                       // 218
          collectionName: chunkInfo.collectionName                                                                     // 218
        }, chunk, chunkInfo);                                                                                          // 218
                                                                                                                       //
        FS.TempStore.Storage.adapter.remove(fileKey, FS.Utility.noop);                                                 // 219
      }); // Remove from tracker collection, too                                                                       // 220
                                                                                                                       //
      tracker.remove({                                                                                                 // 223
        _id: chunkInfo._id                                                                                             // 223
      });                                                                                                              // 223
    });                                                                                                                // 224
  }                                                                                                                    // 225
                                                                                                                       //
  return fsTempStoreRemoveAll;                                                                                         // 209
}(); /**                                                                                                               // 209
      * @method FS.TempStore.createWriteStream                                                                         //
      * @public                                                                                                        //
      * @param {FS.File} fileObj File to store in temporary storage                                                    //
      * @param {Number | String} [options]                                                                             //
      * @returns {Stream} Writeable stream                                                                             //
      *                                                                                                                //
      * `options` of different types mean differnt things:                                                             //
      * * `undefined` We store the file in one part                                                                    //
      * *(Normal server-side api usage)*                                                                               //
      * * `Number` the number is the part number total                                                                 //
      * *(multipart uploads will use this api)*                                                                        //
      * * `String` the string is the name of the `store` that wants to store file data                                 //
      * *(stores that want to sync their data to the rest of the files stores will use this)*                          //
      *                                                                                                                //
      * > Note: fileObj must be mounted on a `FS.Collection`, it makes no sense to store otherwise                     //
      */                                                                                                               //
                                                                                                                       //
FS.TempStore.createWriteStream = function (fileObj, options) {                                                         // 244
  var self = this; // Ensure that we have a storage adapter mounted; if not, throw an error.                           // 245
                                                                                                                       //
  mountStorage(); // If fileObj is not mounted or can't be, throw an error                                             // 248
                                                                                                                       //
  mountFile(fileObj, 'FS.TempStore.createWriteStream'); // Cache the selector for use multiple times below             // 251
                                                                                                                       //
  var selector = {                                                                                                     // 254
    fileId: fileObj._id,                                                                                               // 254
    collectionName: fileObj.collectionName                                                                             // 254
  }; // TODO, should pass in chunkSum so we don't need to use FS.File for it                                           // 254
                                                                                                                       //
  var chunkSum = fileObj.chunkSum || 1; // Add fileObj to tracker collection                                           // 257
                                                                                                                       //
  tracker.upsert(selector, {                                                                                           // 260
    $setOnInsert: {                                                                                                    // 260
      keys: {}                                                                                                         // 260
    }                                                                                                                  // 260
  }); // Determine how we're using the writeStream                                                                     // 260
                                                                                                                       //
  var isOnePart = false,                                                                                               // 263
      isMultiPart = false,                                                                                             // 263
      isStoreSync = false,                                                                                             // 263
      chunkNum = 0;                                                                                                    // 263
                                                                                                                       //
  if (options === +options) {                                                                                          // 264
    isMultiPart = true;                                                                                                // 265
    chunkNum = options;                                                                                                // 266
  } else if (options === '' + options) {                                                                               // 267
    isStoreSync = true;                                                                                                // 268
  } else {                                                                                                             // 269
    isOnePart = true;                                                                                                  // 270
  } // XXX: it should be possible for a store to sync by storing data into the                                         // 271
  // tempstore - this could be done nicely by setting the store name as string                                         // 274
  // in the chunk variable?                                                                                            // 275
  // This store name could be passed on the the fileworker via the uploaded                                            // 276
  // event                                                                                                             // 277
  // So the uploaded event can return:                                                                                 // 278
  // undefined - if data is stored into and should sync out to all storage adapters                                    // 279
  // number - if a chunk has been uploaded                                                                             // 280
  // string - if a storage adapter wants to sync its data to the other SA's                                            // 281
  // Find a nice location for the chunk data                                                                           // 283
                                                                                                                       //
                                                                                                                       //
  var fileKey = _fileReference(fileObj, chunkNum); // Create the stream as Meteor safe stream                          // 284
                                                                                                                       //
                                                                                                                       //
  var writeStream = FS.TempStore.Storage.adapter.createWriteStream(fileKey); // When the stream closes we update the chunkCount
                                                                                                                       //
  writeStream.safeOn('stored', function (result) {                                                                     // 290
    // Save key in tracker document                                                                                    // 291
    var setObj = {};                                                                                                   // 292
    setObj['keys.' + chunkNum] = result.fileKey;                                                                       // 293
    tracker.update(selector, {                                                                                         // 294
      $set: setObj                                                                                                     // 294
    });                                                                                                                // 294
    var temp = tracker.findOne(selector);                                                                              // 296
                                                                                                                       //
    if (!temp) {                                                                                                       // 298
      FS.debug && console.log('NOT FOUND FROM TEMPSTORE => EXIT (REMOVED)');                                           // 299
      return;                                                                                                          // 300
    } // Get updated chunkCount                                                                                        // 301
                                                                                                                       //
                                                                                                                       //
    var chunkCount = FS.Utility.size(temp.keys); // Progress                                                           // 304
                                                                                                                       //
    self.emit('progress', fileObj, chunkNum, chunkCount, chunkSum, result);                                            // 307
    var modifier = {                                                                                                   // 309
      $set: {}                                                                                                         // 309
    };                                                                                                                 // 309
                                                                                                                       //
    if (!fileObj.instance_id) {                                                                                        // 310
      modifier.$set.instance_id = process.env.COLLECTIONFS_ENV_NAME_UNIQUE_ID ? process.env[process.env.COLLECTIONFS_ENV_NAME_UNIQUE_ID] : process.env.METEOR_PARENT_PID;
    } // If upload is completed                                                                                        // 312
                                                                                                                       //
                                                                                                                       //
    if (chunkCount === chunkSum) {                                                                                     // 315
      // We no longer need the chunk info                                                                              // 316
      modifier.$unset = {                                                                                              // 317
        chunkCount: 1,                                                                                                 // 317
        chunkSum: 1,                                                                                                   // 317
        chunkSize: 1                                                                                                   // 317
      }; // Check if the file has been uploaded before                                                                 // 317
                                                                                                                       //
      if (typeof fileObj.uploadedAt === 'undefined') {                                                                 // 320
        // We set the uploadedAt date                                                                                  // 321
        modifier.$set.uploadedAt = new Date();                                                                         // 322
      } else {                                                                                                         // 323
        // We have been uploaded so an event were file data is updated is                                              // 324
        // called synchronizing - so this must be a synchronizedAt?                                                    // 325
        modifier.$set.synchronizedAt = new Date();                                                                     // 326
      } // Update the fileObject                                                                                       // 327
                                                                                                                       //
                                                                                                                       //
      fileObj.update(modifier); // Fire ending events                                                                  // 330
                                                                                                                       //
      var eventName = isStoreSync ? 'synchronized' : 'stored';                                                         // 333
      self.emit(eventName, fileObj, result); // XXX is emitting "ready" necessary?                                     // 334
                                                                                                                       //
      self.emit('ready', fileObj, chunkCount, result);                                                                 // 337
    } else {                                                                                                           // 338
      // Update the chunkCount on the fileObject                                                                       // 339
      modifier.$set.chunkCount = chunkCount;                                                                           // 340
      fileObj.update(modifier);                                                                                        // 341
    }                                                                                                                  // 342
  }); // Emit errors                                                                                                   // 343
                                                                                                                       //
  writeStream.on('error', function (error) {                                                                           // 346
    FS.debug && console.log('TempStore writeStream error:', error);                                                    // 347
    self.emit('error', error, fileObj);                                                                                // 348
  });                                                                                                                  // 349
  return writeStream;                                                                                                  // 351
}; /**                                                                                                                 // 352
     * @method FS.TempStore.createReadStream                                                                           //
     * @public                                                                                                         //
     * @param {FS.File} fileObj The file to read                                                                       //
     * @return {Stream} Returns readable stream                                                                        //
     *                                                                                                                 //
     */                                                                                                                //
                                                                                                                       //
FS.TempStore.createReadStream = function (fileObj) {                                                                   // 361
  // Ensure that we have a storage adapter mounted; if not, throw an error.                                            // 362
  mountStorage(); // If fileObj is not mounted or can't be, throw an error                                             // 363
                                                                                                                       //
  mountFile(fileObj, 'FS.TempStore.createReadStream');                                                                 // 366
  FS.debug && console.log('FS.TempStore creating read stream for ' + fileObj._id); // Determine how many total chunks there are from the tracker collection
                                                                                                                       //
  var chunkInfo = tracker.findOne({                                                                                    // 371
    fileId: fileObj._id,                                                                                               // 371
    collectionName: fileObj.collectionName                                                                             // 371
  }) || {};                                                                                                            // 371
  var totalChunks = FS.Utility.size(chunkInfo.keys);                                                                   // 372
                                                                                                                       //
  function getNextStreamFunc(chunk) {                                                                                  // 374
    return Meteor.bindEnvironment(function (next) {                                                                    // 375
      var fileKey = _fileReference(fileObj, chunk);                                                                    // 376
                                                                                                                       //
      var chunkReadStream = FS.TempStore.Storage.adapter.createReadStream(fileKey);                                    // 377
      next(chunkReadStream);                                                                                           // 378
    }, function (error) {                                                                                              // 379
      throw error;                                                                                                     // 380
    });                                                                                                                // 381
  } // Make a combined stream                                                                                          // 382
                                                                                                                       //
                                                                                                                       //
  var combinedStream = CombinedStream.create(); // Add each chunk stream to the combined stream when the previous chunk stream ends
                                                                                                                       //
  var currentChunk = 0;                                                                                                // 388
                                                                                                                       //
  for (var chunk = 0; chunk < totalChunks; chunk++) {                                                                  // 389
    combinedStream.append(getNextStreamFunc(chunk));                                                                   // 390
  } // Return the combined stream                                                                                      // 391
                                                                                                                       //
                                                                                                                       //
  return combinedStream;                                                                                               // 394
};                                                                                                                     // 395
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/cfs:tempstore/tempStore.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:tempstore'] = {};

})();

//# sourceMappingURL=cfs_tempstore.js.map
