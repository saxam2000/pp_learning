import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [postArr, setPostArr] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
      try{
    const docRef =  database.users.doc(`${currentUser.uid}`);

        let doc=await docRef.get();
        if (doc.exists) {
            console.log("Document data:", doc.data());
            let postIdsArray=[...doc.data().postIds];
            console.log(postIdsArray);
            let parr=[];
            // postIdsArray.forEach(postId=>{
            //     let postObjref= database.posts.doc(`${postId}`);
            //     // let postObj=await postObjref.get();
            //     parr.push(postObjref.get());
            //     // console.log(postObj);

            // })
            await Promise.all( postIdsArray.map(async (postId)=>{
                let postObjref= database.posts.doc(`${postId}`);
                let postObj=await postObjref.get();
                if (postObj.exists) {
                    console.log("Document data:", doc.data());
                }else{
                    console.log("doc doesnt exist")
                }
                parr.push(postObjref.get());
                console.log(postObj);
            } ));
        } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  
}
 catch(e){
     console.log("error is -->",e.message)
 }
  };

  // console.log(currentUser);
  return (
    <div>
      <h1>This is profile page</h1>
      {postArr === [] ? <></> : <></>}
    </div>
  );
}

export default Profile;
