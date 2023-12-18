// let audioContext;
// let audioBuffer;
// let audioSource;

// function initAudio() {
//   // Initialize AudioContext only if it hasn't been initialized before
//   if (!audioContext) {
//     audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   }
// }

// function loadAudio(url) {
//   const request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer';

//   request.onload = function () {
//     audioContext.decodeAudioData(request.response, function (buffer) {
//       audioBuffer = buffer;
//     });
//   };

//   request.send();
// }

// function playAudio() {
//   if (!audioBuffer) {
//     console.error('Audio buffer not loaded.');
//     return;
//   }

//   // Create a source node
//   audioSource = audioContext.createBufferSource();
//   audioSource.buffer = audioBuffer;

//   // Connect the source node to the audio context's destination (speakers)
//   audioSource.connect(audioContext.destination);

//   // Start playing the audio
//   audioSource.start();
// }

// function stopAudio() {
//   if (audioSource) {
//     audioSource.stop();
//   }
// }

// // Call these functions in response to a user gesture (e.g., button click)
// document.getElementById('loadButton').addEventListener('click', function () {
//   initAudio();
// //   loadAudio('gameMusic2.m4a');
// });

// document.getElementById('playButton').addEventListener('click', playAudio);
// document.getElementById('stopButton').addEventListener('click', stopAudio);


    