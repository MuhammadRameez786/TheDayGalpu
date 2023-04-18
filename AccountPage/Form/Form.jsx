// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../actions/userActions";
// import Style from "./Form.module.css";
// import { Button } from "../../components/componentsindex.js";
// import { HiOutlineMail } from "react-icons/hi";
// import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
// import {
//   TiSocialFacebook,
//   TiSocialTwitter,
//   TiSocialInstagram,
// } from "react-icons/ti";

// const Form = ({ currentAccount, }) => {
//   //const router = useRouter()
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState('');
//   const [image, setImage] = useState("");
//   const [uploadedImg, setUpload] = useState("");

//   function previewFiles(file){
//     const reader = new FileReader();
//     reader.readAsDataURL(file)

//     reader.onloadend = ()=>{
//       setImage(reader.result);
//     }
//     console.log(image);
//   }

//   const dispatch = useDispatch();
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   const userUpdate = useSelector((state) => state.userUpdate);
//   const { loading, error, success } = userUpdate;

//   useEffect(() => {
//     if (!userInfo) {
//       //router.push("/");
//     } else {
//       setName(userInfo.name);
//       setEmail(userInfo.email);
//       setDescription(userInfo.description);
//     }
//   }, [userInfo]);

//   const handleChange = (e) =>{
//     const file = e.target.files[0]
//     setFile(file);
//     previewFiles(file);
//   }

//   // handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result =  await axios.post("http://127.0.0.1:4000", {
//       image: image
//     })
//     try {
//       const uploadedImg = result.data.public_id;
//       setUpload(uploadedImg);
//       //console.log(uploadedImg);
//     } catch(err){
//       console.log(err);
//     }
//     dispatch(updateProfile({ name, email, description }));
//   };
  

//   return (
//     <div className={Style.Form}>
//       <div className={Style.Form_box}>
//         <form onSubmit={handleSubmit}>
//         <div className={Style.Form_box_input}>
//             <label htmlFor="fileinput">Upload Image</label>
//             <input
//               type="file"
//               id="fileInput"
//               className={Style.Form_box_input_userName}
//               accept="image/png, image/jpg, image/jpeg"
//               onChange={e => handleChange(e)}
//             />
//           </div>
//           <img src={image} alt="" />
//           <div className={Style.Form_box_input}>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               name="name"
//               className={Style.Form_box_input_userName}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className={Style.Form_box_input}>
//             <label htmlFor="email">Email</label>
//             <div className={Style.Form_box_input_box}>
//               <div className={Style.Form_box_input_box_icon}>
//                 <HiOutlineMail />
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className={Style.Form_box_input}>
//             <label htmlFor="description">Description</label>
//             <textarea
//               name="description"
//               id=""
//               cols="30"
//               rows="6"
//               placeholder="something about yourself in few words"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>
//           </div>

//           <div className={Style.Form_box_input}>
//             <label htmlFor="website">Website</label>
//             <div className={Style.Form_box_input_box}>
//               <div className={Style.Form_box_input_box_icon}>
//                 <MdOutlineHttp />
//               </div>

//               <input
//                 type="text"
//                 placeholder="website"
//               />
//             </div>
//           </div>

//           <div className={Style.Form_box_input_social}>
//             <div className={Style.Form_box_input}>
//               <label htmlFor="facebook">Facebook</label>
//               <div className={Style.Form_box_input_box}>
//                   <div className={Style.Form_box_input_box_icon}>
//                     <TiSocialFacebook />
//                   </div>
//                   <input type="text" placeholder="http://shoaib" />
//                 </div>
//               </div>
//               <div className={Style.Form_box_input}>
//                 <label htmlFor="Twitter">Twitter</label>
//                 <div className={Style.Form_box_input_box}>
//                   <div className={Style.Form_box_input_box_icon}>
//                     <TiSocialTwitter />
//                   </div>
//                   <input type="text" placeholder="http://shoaib" />
//                 </div>
//               </div>
//               <div className={Style.Form_box_input}>
//                 <label htmlFor="Instragram">Instragram</label>
//                 <div className={Style.Form_box_input_box}>
//                   <div className={Style.Form_box_input_box_icon}>
//                     <TiSocialInstagram />
//                   </div>
//                   <input type="text" placeholder="http://shoaib" />
//                 </div>
//               </div>
//           </div>

//             <div className={Style.Form_box_input}>
//               <label htmlFor="wallet">Wallet address</label>
//               <div className={Style.Form_box_input_box}>
//                 <div className={Style.Form_box_input_box_icon}>
//                   <MdOutlineHttp />
//                 </div>
//                 <input type="text" value={currentAccount} id="myInput" />
//                 <div className={Style.Form_box_input_box_icon}>
//                   <MdOutlineContentCopy />
//                 </div>
//               </div>
//             </div>
//             <div className={Style.Form_box_btn}>
//               <Button
//                 btnName="Upload profile"
//                 type="submit"
//                 classStyle={Style.button}
//               />
//             </div>
//         </form>
//       </div>
//       <img uploadedImg={uploadedImg}/>
//     </div>
//   );
// };

// export default Form;


//SECTION 2--------------------

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Style from "./Form.module.css";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import { updateProfile } from "../../userActions/userActions";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

const Form = ({ currentAccount }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [pic, setPic] = useState(null);
  const [picMessage, setPicMessage] = useState();
  const [url, setUrl] = useState(null);
  const [SelectedFile, setSelectedFile] =  useState(null);
  

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  //const picUpdate = useSelector((state) => state.picUpdate);

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setDescription(userInfo.description);
      setPic(userInfo.pic);
    }
  }, [userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "hbe8ape3");
      data.append("cloud_name", "dmesqweam");
      fetch("https://api.cloudinary.com/v1_1/dmesqweam/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    dispatch(updateProfile({ name, email, description, pic }));
    toast.success("Profile updated successfully.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      router.push("/author");
    }, 1500);
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
      <div className={Style.account_box_img}>
            <img
              src={userInfo?.data?.user?.pic || 'Profile Pic'}
              alt="profile Image"
              width={150}
              height={150}
              className={Style.account_box_img_img}
            />
        </div>
        <form>
        <div className={Style.Form_box_image}>
        <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: "none" }}
              onChange={(e) => postDetails(e.target.files[0])}
            />
 
          {picMessage && <p className="error">{picMessage}</p>}
        </div>
      
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className={Style.Form_box_input_userName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="6"
              placeholder="something about yourself in few words"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input
                type="text"
                placeholder="website"
              />
            </div>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                  <div className={Style.Form_box_input_box_icon}>
                    <TiSocialFacebook />
                  </div>
                  <input type="text" placeholder="http://shoaib" />
                </div>
              </div>
              <div className={Style.Form_box_input}>
                <label htmlFor="Twitter">Twitter</label>
                <div className={Style.Form_box_input_box}>
                  <div className={Style.Form_box_input_box_icon}>
                    <TiSocialTwitter />
                  </div>
                  <input type="text" placeholder="http://shoaib" />
                </div>
              </div>
              <div className={Style.Form_box_input}>
                <label htmlFor="Instragram">Instragram</label>
                <div className={Style.Form_box_input_box}>
                  <div className={Style.Form_box_input_box_icon}>
                    <TiSocialInstagram />
                  </div>
                  <input type="text" placeholder="http://shoaib" />
                </div>
              </div>
          </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="wallet">Wallet address</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <MdOutlineHttp />
                </div>
                <input type="text" value={currentAccount} id="myInput" />
                <div className={Style.Form_box_input_box_icon}>
                  <MdOutlineContentCopy />
                </div>
              </div>
            </div>
          <div className={Style.Form_box_btn}>
            <button onClick={handleSubmit} className={Style.button}>Submit</button>
          </div>
        </form>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
      </div>
    </div>
  );
};

export default Form;