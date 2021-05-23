let videoElem = document.querySelector("video");
let videoRecordButton = document.querySelector("#record-video");
let capturebtn = document.querySelector("#capture");
let timingELem = document.querySelector("#timing");
let allFilters = document.querySelectorAll(".filter");
let zoomInBtn = document.querySelector(".zoomin");
let zoomOutBtn = document.querySelector(".zoomout");
let clearObj;
let galleryBtn = document.querySelector(".gallery");
let uiFilter = document.querySelector(".ui-filter");
let filterColor = "#ffffff44"
let scale = 1;
let recordbtn
let mediaRecorder;
let buffer = [];
let constraints = {
    audio: true,
    video: true,
}

// console.log(navigator.mediaDevices.enumerateDevices());
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
            a.download = "name";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url)
        })

    }).catch((err) => {

        console.log(err);
    })
let recordState = false;

videoRecordButton.addEventListener("click", function() {
    if (recordState == false) {
        mediaRecorder.start();
        // videoRecorder.innerHTML = "recording";
        recordState = true;
        videoRecordButton.style.animation = "animate 1s infinite";
        startCounting();
    } else if (recordState == true) {
        mediaRecorder.stop();
        // videoRecorder.innerHTML = "record";
        recordState = false;
        videoRecordButton.style.animation = "";
        stopCounting();
    }
})
capturebtn.addEventListener("click", function(e) {
        let canvas = document.createElement("canvas");
        canvas.width = videoElem.videoWidth;
        canvas.height = videoElem.videoHeight;
        capturebtn.style.animation = "animate 0.5s 1";
        let tool = canvas.getContext("2d");
        tool.drawImage(videoElem, 0, 0);
        tool.fillStyle = filterColor;
        // translucent 
        tool.fillRect(0, 0, canvas.width, canvas.height);


        let link = canvas.toDataURL();
        enterData("photos", link)

        // let a = document.createElement("a");
        // a.href = link;
        // a.download = "ss.jpeg";
        // a.click();
        // a.remove();
        // canvas.remove();
    })
    //handle timer...
function startCounting() {
    timingELem.classList.add("timing-active");
    let timeCount = 0;
    clearObj = setInterval(function() {
        timeCount++;
        let seconds = (timeCount % 60) < 10 ? `0${timeCount % 60}` : `${timeCount % 60}`;
        let minutes = (timeCount / 60) < 10 ? `0${Number.parseInt(timeCount / 60)}` : `${Number.parseInt(timeCount / 60)}`;
        let hours = (timeCount / 3600) < 10 ? `0${Number.parseInt(timeCount / 3600)}` : `${Number.parseInt(timeCount / 3600)}`;
        timingELem.innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function stopCounting() {
    timingELem.classList.remove("timing-active");
    timingELem.innerText = "00: 00: 00";
    clearInterval(clearObj);
}

//filters......
for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", function() {
        // add filter to ui
        // alert("hello");
        let color = allFilters[i].style.backgroundColor
        if (color) {
            uiFilter.classList.add("active");
            uiFilter.style.backgroundColor = color;
            filterColor = color;
        } else {
            uiFilter.classList.remove("active");
            uiFilter.style.backgroundColor = "";
            filterColor = "";

        }
    })
}
zoomInBtn.addEventListener("click", function() {
    if (scale < 2) {
        scale += 0.3;
    }
    videoElem.style.transform = `scale(${scale})`

})
zoomOutBtn.addEventListener("click", function() {
    if (scale > 1) {
        scale -= 0.3;
    }
    videoElem.style.transform = `scale(${scale})`

})

// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
// let video = document.querySelector("video");

// video.addEventListener('loadedmetadata', function() {
//     ctx.translate(video.videoWidth, 0);
//     ctx.scale(-1, 1);
// });

// video.addEventListener('play', function() {
//     var $this = this; //cache
//     (function loop() {
//         if (!$this.paused && !$this.ended) {
//             ctx.drawImage($this, 0, 0);
//             setTimeout(loop, 1000 / 300); // drawing at 30fps
//         }
//     })();
// }, 0);