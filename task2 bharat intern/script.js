const localVideo = document.getElementById('localVideo');
const remoteVideos = document.getElementById('remote-videos');

// Request access to the user's camera and microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing camera or microphone:', error);
    });
    const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');

let mediaRecorder;
let recordedChunks = [];

startButton.addEventListener('click', () => {
  recordedChunks = [];
  const stream = localVideo.srcObject;
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = event => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.start();
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
});

mediaRecorder.onstop = () => {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  
};