import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
//INTERNALIMPORT
import Style from "../login/login.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";

const SignUp = () => {

  const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4000/api/v1/users/signup";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  // handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = { name, email, password, passwordConfirm}

  //   let res = await fetch('http://localhost:4000/api/v1/users/signup', {
  //     method:'POST',
  //     headers: {
  //       'Content-Type' : 'application/json',
  //     },
  //     body:JSON.stringify(data),
  //   })
  //   let response = await res.json()
  //   console.log(response)
    
    
  //   setName('')
  //   setEmail('')
  //   setPassword('')
  //   setpasswordConfirm('')
  //   toast.success('Your accout has benn created!', {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
  //   setTimeout(() => {
  //     router.push("/account");
  //   }, 1500);
  // }

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
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                placeholder="Name"
                value={data.name}
                required
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className={Style.user_box_input_box}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                placeholder="Email Address"
                value={data.email}
                required
                onChange={handleChange}
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
                placeholder="Password"
                value={data.password}
                required
                onChange={handleChange}
                name="password"
              />
            </div>
            {error && <div className={Style.error_msg}>{error}</div>}
						{msg && <div className={Style.success_msg}>{msg}</div>}
            {/* <div className={Style.user_box_input_box}>
              <label
                htmlFor="passwordCofirm"
                className={Style.user_box_input_box_label}>
                <p>Confirm Password</p>

              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={handleChange}
                name="passwordConfirm"
              />
            </div> */}
            <button type="submit" className={Style.button}>Sign Up</button>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default SignUp;
