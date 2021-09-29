'use strict';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};

const localVideo = document.querySelector('video');
let localStream;

function handleSuccess(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function handleFailure(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints)
  .then(handleSuccess).catch(handleFailure);
