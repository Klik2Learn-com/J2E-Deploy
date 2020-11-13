if (!isInternetExplorer()) {

	// var AudioContext = window.AudioContext || window.webkitAudioContext;
	// var audioCtx = new AudioContext();
	var audioCtx = null;
	var fileStream = null;
	var buffers = [];
	var tempData = {};
	var tempAudioBlob = {};
	var source = {};
	var scriptNode = {};
	var biquadFilter = {};


	navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	var startTime;
	var endTime;

	var micStream;
	var mediaStreamTracks;

	Template.voiceRecorderComment.helpers({

		addComment: function () {
			return Template.instance().addComment.get();
		},

		recordComment: function () {
			return Template.instance().recordComment.get();
		},

		recording: function () {
			return Template.instance().recording.get();
		},

		recorded: function () {
			return Template.instance().recorded.get();
		}

	});

	Template.voiceRecorderComment.events({

		'click *[data-function="record-comment"]': function (evt) {
			Template.instance().recordComment.set(true);
		},

		'click *[data-function="add-comment"]': function (evt) {
			Template.instance().addComment.set(true);
		},

		'click *[data-function="confirm-comment"]': function (evt) {
			var comment = $('#comment-body').val();
			var noteId = this._id;

			if (comment != "") {
				Template.instance().addComment.set(false);
				Meteor.call('insertAudioTextComment', noteId, comment);
			} else {
				alert('Please write a comment or click cancel');
			}
		},

		'click *[data-function="cancel-comment"]': function (evt) {
			Template.instance().addComment.set(false);
		},

		'click #btnplaytemp': function (evt) {
			if (window.URL) {
				var url = window.URL.createObjectURL(tempAudioBlob);
			} else {
				var url = window.webkitURL.createObjectURL(tempAudioBlob);
			}
			var player = document.getElementById('player');
			player.setAttribute("src", url);
			player.play();
		},

		'click #btnsave': function (evt, template) {

			var instance = Template.instance();
			var regExp = new RegExp(/[!@#$%^&*(),.?":{}|<>/\\]/g);
			var saveTitle = $('#audio-title').val();
			var savename = saveTitle.replace(regExp, "_");			
			// Save the file which was just recorded.
			var value = tempData.duration;
			var parentId = this._id;
			var audioComment = $('#audio-comment-body').val();
			CommentBinaryFileReader.read(tempAudioBlob, function (err, fileinfo) {
				var recDate = Date.now();
				var newFile = new FS.File();
				newFile.attachData(fileinfo, { type: 'audio/wav' }, function (error) {
					newFile.name(savename);
					newFile.metadata = { duration: value };
					newFile.audioAuthor = Meteor.userId();
					newFile.parentFile = parentId;
					newFile.comment = audioComment;
					commentRecordings.insert(newFile, function (err, fileObj) {
						// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
						Meteor.call('addAudioComment', parentId, fileObj._id, function (err, result) {
							template.recordComment.set(false);
							template.recorded.set(false);
							instance.recorded.set(false);
						})
					});
				})
			})
		},

		'click #btncancel': function (evt) {
			Template.instance().recordComment.set(false);
			Template.instance().recorded.set(false);
		},

		'click #btnrecord': function (evt) {
			// Template.instance().recording.set(true);
			var instance = Template.instance();
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			audioCtx = new AudioContext();
			micStream = null;
			buffers = [];
			tempData = {};
			tempAudioBlob = {};


			// if (navigator.getUserMedia) {
			// 	Session.set("recordingsupported", "true");
			// 	startTime = new Date().getTime();
			// 	navigator.getUserMedia(
			// 		// constraints
			// 		{
			// 			audio: true
			// 		},
			// 		// successCallback
			// 		function (localMediaStream) {
			// 			micStream = localMediaStream;
			// 			// Create a media stream source from the new stream
			// 			mediaStreamTracks = localMediaStream.getTracks()[0]
			// 			source = audioCtx.createMediaStreamSource(localMediaStream);
			// 			// Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
			// 			scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
			// 			// Create biquadFilter required for down sampling to reduce high frequency artefacts
			// 			biquadFilter = audioCtx.createBiquadFilter();
			// 			biquadFilter.type = "lowpass";
			// 			// The nominal capture frequency is 44100 but ideally we want to aim for 8000 
			// 			// but for perfomance reasons we must use an integer downsample ratio so 44100 / 5 = 8820
			// 			biquadFilter.frequency.value = 8820;
			// 			scriptNode.onaudioprocess = function (audioProcessingEvent) {
			// 				var inputBuffer = audioProcessingEvent.inputBuffer;
			// 				var leftChannel = inputBuffer.getChannelData(0);
			// 				var sampleBuffer = new Float32Array(820);
			// 				var bufferPointer = 0;

			// 				for (var i = 0; i < leftChannel.length; i += 5) {
			// 					sampleBuffer[bufferPointer++] = leftChannel[i];
			// 				}
			// 				buffers.push(sampleBuffer);
			// 			};
			// 			// Coonect source stream to our filter and processor nodes
			// 			source.connect(biquadFilter);
			// 			biquadFilter.connect(scriptNode);
			// 			scriptNode.connect(audioCtx.destination);
			// 		},
			// 		// errorCallback
			// 		function (err) {
			// 			console.log("The following error occured: " + err);
			// 			Session.set("soundRecording", "false");
			// 		}
			// 	);
			// } else {
			// 	console.log("getUserMedia not supported");
			// 	Session.set("recordingsupported", "false");
			// 	Session.set("soundRecording", "false");
			// }

			/*
			if (navigator.mediaDevices.getUserMedia) {
				Session.set("recordingsupported", "true");
				startTime = new Date().getTime();
				navigator.mediaDevices.getUserMedia({audio: true}).then(
					// successCallback
					function (localMediaStream) {
						micStream = localMediaStream;
						// Create a media stream source from the new stream
						mediaStreamTracks = localMediaStream.getTracks()[0]
						source = audioCtx.createMediaStreamSource(localMediaStream);
						// Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
						scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
						// Create biquadFilter required for down sampling to reduce high frequency artefacts
						biquadFilter = audioCtx.createBiquadFilter();
						biquadFilter.type = "lowpass";
						// The nominal capture frequency is 44100 but ideally we want to aim for 8000 
						// but for perfomance reasons we must use an integer downsample ratio so 44100 / 5 = 8820
						biquadFilter.frequency.value = 8820;
						scriptNode.onaudioprocess = function (audioProcessingEvent) {
							var inputBuffer = audioProcessingEvent.inputBuffer;
							var leftChannel = inputBuffer.getChannelData(0);
							var sampleBuffer = new Float32Array(820);
							var bufferPointer = 0;

							for (var i = 0; i < leftChannel.length; i += 5) {
								sampleBuffer[bufferPointer++] = leftChannel[i];
							}
							buffers.push(sampleBuffer);
						};
						// Coonect source stream to our filter and processor nodes
						source.connect(biquadFilter);
						biquadFilter.connect(scriptNode);
						scriptNode.connect(audioCtx.destination);
					}).catch(
						// errorCallback
						function (err) {
							console.log("The following error occured: " + err);
							Session.set("soundRecording", "false");
					});
			} else {
				console.log("getUserMedia not supported");
				Session.set("recordingsupported", "false");
				Session.set("soundRecording", "false");
			}
			*/


			//RECORDERJS IMPLEMENTATION
			if (navigator.mediaDevices.getUserMedia) {
				Session.set("recordingsupported", "true");
				startTime = new Date().getTime();
				navigator.mediaDevices.getUserMedia({audio: true}).then(
					// successCallback
					function (localMediaStream) {
						micStream = localMediaStream;

						source = audioCtx.createMediaStreamSource(localMediaStream);
						
						rec = new Recorder(source,{numChannels:1});

						//start the recording process
						rec.record();
						console.log("recording started");
						instance.recording.set(true);

					}).catch(
						// errorCallback
						function (err) {
							console.log("The following error occured: " + err);
							Session.set("soundRecording", "false");
					});
			} else {
				console.log("getUserMedia not supported");
				Session.set("recordingsupported", "false");
				Session.set("soundRecording", "false");
			}

		},

		'click #btnstop': function (evt) {

			/*Template.instance().recording.set(false);
			Template.instance().recorded.set(true);

			if (navigator.mediaDevices.getUserMedia) {
				endTime = new Date().getTime();
				mediaStreamTracks.stop();

				source.disconnect(biquadFilter);
				biquadFilter.disconnect(scriptNode);
				scriptNode.disconnect(audioCtx.destination);

				var totalLength = 0;
				for (var i = buffers.length - 1; i >= 0; i--) {
					totalLength += buffers[i].length;
				}
				var audioBuffer = new Float32Array(totalLength);
				var offset = 0;
				for (var i = 0; i < buffers.length; i++) {
					audioBuffer.set(buffers[i], offset);
					offset += buffers[i].length;
				}
				var dataview = encodeMonoWAV(audioBuffer, 8820);
				var audioBlob = new Blob([dataview], { type: 'audio/wav' });
				tempAudioBlob = audioBlob;
				tempData = { "name": "tempaudio", "duration": ((endTime - startTime) / 1000).toFixed(2), "length": buffers.length }
			}*/


			//RECORDERJS IMPLEMENTATION
			// Template.instance().recording.set(false);
			// Template.instance().recorded.set(true)
			var instance = Template.instance();
			if (navigator.mediaDevices.getUserMedia) {

				audioCtx.close().then(function () { 
					endTime = new Date().getTime();

					//tell the recorder to stop the recording
					rec.stop();
					console.log("recording stopped");
	
					//stop microphone access
					micStream.getAudioTracks()[0].stop();
	
					//create the wav blob and pass it on to createDownloadLink
					rec.exportWAV(function(blob) {
						tempAudioBlob = blob;
						tempData = { "name": "tempaudio", "duration": ((endTime - startTime) / 1000).toFixed(2)};
						instance.recording.set(false);
						instance.recorded.set(true);
					});	
					
				});
			}
		}

	});

	Template.voiceRecorderComment.created = function () {
		Template.instance().recorded = new ReactiveVar(false);
		Template.instance().recording = new ReactiveVar(false);
		Template.instance().addComment = new ReactiveVar(false);
		Template.instance().recordComment = new ReactiveVar(false);
	}

	/**********************************************
	*
	*
	***********************************************/

	CommentBinaryFileReader = {
		read: function (file, callback) {
			var reader = new FileReader;
			var fileInfo = {
				name: file.name,
				type: file.type,
				size: file.size,
				file: null
			};

			reader.onload = function () {
				fileInfo.file = new Uint8Array(reader.result);
				fileInfo.file.type = fileInfo.type;
				callback(null, fileInfo.file);
			};
			reader.onerror = function () {
				callback(reader.error);
			};

			reader.readAsArrayBuffer(file);
		}
	};

	
	// function floatTo16BitPCM(output, offset, input) {
	// 	for (var i = 0; i < input.length; i++ , offset += 2) {
	// 		var s = Math.max(-1, Math.min(1, input[i]));
	// 		output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
	// 	}
	// }

	// function writeString(view, offset, string) {
	// 	for (var i = 0; i < string.length; i++) {
	// 		view.setUint8(offset + i, string.charCodeAt(i));
	// 	}
	// }

	// encodeMonoWAV = function encodeMonoWAV(samples, sampleRate) {
	// 	var buffer = new ArrayBuffer(44 + samples.length * 2);
	// 	var view = new DataView(buffer);

	// 	/* RIFF identifier */
	// 	writeString(view, 0, 'RIFF');
	// 	/* file length */
	// 	view.setUint32(4, 44 + samples.length * 2, true);
	// 	/* RIFF type */
	// 	writeString(view, 8, 'WAVE');
	// 	/* format chunk identifier */
	// 	writeString(view, 12, 'fmt ');
	// 	/* format chunk length */
	// 	view.setUint32(16, 16, true);
	// 	/* sample format (raw) */
	// 	view.setUint16(20, 1, true);
	// 	/* channel count */
	// 	view.setUint16(22, 1, true); // mono
	// 	/* sample rate */
	// 	view.setUint32(24, sampleRate, true);
	// 	/* byte rate (sample rate * block align) */
	// 	view.setUint32(28, sampleRate * 2, true);
	// 	/* block align (channel count * bytes per sample) */
	// 	view.setUint16(32, 2, true);
	// 	/* bits per sample */
	// 	view.setUint16(34, 16, true);
	// 	/* data chunk identifier */
	// 	writeString(view, 36, 'data');
	// 	/* data chunk length */
	// 	view.setUint32(40, samples.length * 2, true);

	// 	floatTo16BitPCM(view, 44, samples);

	// 	return view;
	// }
	
}