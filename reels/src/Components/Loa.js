import React, { useState, useContext, useEffect } from "react";
import vid1 from "./vid1.mp4";
import vid2 from "./vid2.mp4";
import Video from "./Video";
// import vid3 '

function Loa() {
  const [sources, setSources] = useState([{ url: vid1 }, { url: vid2 }]);
  let options={
      threshold:0.9
  }
  const callback=entries=>{
      entries.forEach(element=>{
          console.log(element);
          let el=element.target.childNodes[0];
          // this observer will be applies to all videos during rendering for first time even when they are not in viewport
          el.play().then(()=>{//play every video
              // if video is not in viewport then pause it too
              if(!el.paused&&!element.isIntersecting){//done this work inside play because play is promise and will function asynchronously so we want to pause the vidweo only when play promise is fullfilled else it will throw an error
                  el.pause();
              }
          })
      })
  }
//   const callback = (entries) => {
//     entries.forEach((element) => {
//       console.log(element);
//       let el = element.target.childNodes[0];
//       el.play().then(() => {
//         //if this video is not in viewport then pause it
//         if (!el.paused && !element.isIntersecting) {
//           el.pause();
//         }
//       });
//     });
//   };
//   const observer = new IntersectionObserver(callback, {
//     threshold: 0.9,
//   });
//   useEffect(() => {
//     console.log("Effect");
//     let elements = document.querySelectorAll(".videos");
//     elements.forEach((el) => {
//       observer.observe(el);
//     });
//   }, []);
  useEffect(()=>{
      let videosElements=document.querySelectorAll(".videoElem");
      videosElements.forEach(elements=>{
          observer.observe(elements);
      })
  },[])
  let observer = new IntersectionObserver(callback, options);
  return (
    <div className="video-container">
      <div className="videoElem">
        <Video source={sources[0].url} />
      </div>
      <div className="videoElem">
        <Video source={sources[1].url} />
      </div>
    </div>
  );
}

export default Loa;
