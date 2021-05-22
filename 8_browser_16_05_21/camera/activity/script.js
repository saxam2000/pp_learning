let videoElem = document.querySelector("video");
let videoRecorder = document.querySelector("#record-video");
let capturebtn = document.querySelector("#capture");
let recordbtn
let mediaRecorder;
let buffer = [];
let constraints = {
    audio: true,
    video: true,
}
navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(mediaStream) {
        videoElem.srcObject = mediaStream;
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener("dataavailable", function(e) {
            buffer.push(e.data);
        })
        mediaRecorder.addEventListener("stop", function() {
            let blob = new Blob(buffer, {
                type: "video/mp4"
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = "name";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url)
        })

    }).catch((err) => {

        console.log(err);
    })
let recordState = false;
videoRecorder.addEventListener("click", function() {
    if (recordState == false) {
        mediaRecorder.start();
        videoRecorder.innerHTML = "recording";
        recordState = true;
    } else if (recordState == true) {
        mediaRecorder.stop();
        videoRecorder.innerHTML = "record";
        recordState = false;
    }
})
capturebtn.addEventListener("click", function(e) {
    let canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth;
    canvas.height = videoElem.videoHeight;
    let tool = canvas.getContext("2d");
    tool.drawImage(videoElem, 0, 0);
    let link = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = link;
    a.download = "ss.jpeg";
    a.click();
    a.remove();
    canvas.remove();
})