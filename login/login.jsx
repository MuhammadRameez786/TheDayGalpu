import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
// import ErrorMessage from "../../components/ErrorMessage";
 import { acountLogin } from "../userActions/userActions";
 import { useRouter } from 'next/router';



//INTERNALIMPORT
import Style from "./login.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
const login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      toast.success("Login Successfull", {
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
    } else if (userLogin.error) {
      toast.error(userLogin.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [userInfo, userLogin.error, router]);
  

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(acountLogin(email, password));
    //console.log('submiting the data:', data); 
  }
  const [activeBtn, setActiveBtn] = useState(1);

  const socialImage = [
    {
      social: images.facebook,
      name: "Continue with Facebook",
    },
    {
      social: images.twitter,
      name: "Continue with twitter",
    },
    {
      social: images.facebook,
      name: "Continue with Facebook",
    },
  ];
  return (
    <div>
      
      <div className={Style.user}>
        <div className={Style.user_box}>
          <div className={Style.user_box_social}>
            {socialImage.map((el, i) => (
              <div
                key={i + 1}
                onClick={() => setActiveBtn(i + 1)}
                className={`${Style.user_box_social_item} ${
                  activeBtn == i + 1 ? Style.active : ""
                }`}
              >
                <Image
                  src={el.social}
                  alt={el.name}
                  width={30}
                  height={30}
                  className={Style.user_box_social_item_img}
                />
                <p>
                  <span>{el.name}</span>
                </p>
              </div>
            ))}
          </div>
          <p className={Style.user_box_or}>OR</p>

          <form onSubmit={handleSubmit} className={Style.user_box_input} method="POST">
            <div className={Style.user_box_input_box}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                placeholder="example@emample.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>
            <div className={Style.user_box_input_box}>
              <label htmlFor="password"
                className={Style.user_box_input_box_label}>
                <p>Password</p>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>
            <button type="submit" className={Style.button}>Login</button>
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
    </div> 
  );
};

export default login;
