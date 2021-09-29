'use strict';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: true,
  video: true
};

const localVideo = document.querySelector('video');
let localStream;

function handleVideoSuccess(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function handleVideoFailure(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function handleStreamSuccess(stream) {
  startButton.disabled = true;
  const video = document.getElementById('localShare');
  video.srcObject = stream;

  // demonstrates how to detect that the user has stopped
  // sharing the screen via the browser UI.
  stream.getVideoTracks()[0].addEventListener('ended', () => {
    errorMsg('The user has ended sharing the screen');
    startButton.disabled = false;
  });
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
  navigator.mediaDevices.getDisplayMedia({video: true})
      .then(handleStreamSuccess, handleStreamFailure);
});

function handleStreamFailure(error) {
  errorMsg(`getDisplayMedia error: ${error.name}`, error);
}

navigator.mediaDevices.getUserMedia(constraints)
  .then(handleVideoSuccess).catch(handleVideoFailure);



if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
startButton.disabled = false;
}
