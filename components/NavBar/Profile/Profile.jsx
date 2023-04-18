import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload, TbLogout } from "react-icons/tb";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { useRouter } from 'next/router';
import {} from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";
import { logout } from "../../../userActions/userActions";

const Profile = ({ currentAccount }) => {
  const [user, setUser] = useState('');


  const dispatch = useDispatch();
  const router = useRouter();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    //window.location.reload();
  router.push('/login');
  };
  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <div className={Style.profile}>
      {userInfo && (
        <div className={Style.profile_account}>
          <img
            src={userInfo?.data?.user?.pic || 'Anonymous'}
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          />

          <div className={Style.profile_account_info}>
            <p>{userInfo?.data?.user?.name || 'Anonymous'}</p>
            <small>{currentAccount.slice(0, 18)}..</small>
          </div>
        </div>
      )}
      

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/author" }}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/myColletions" }}>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/contactus" }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href={{ pathname: "/aboutus" }}>About Us</Link>
            </p>
          </div>
            <div className={Style.profile_menu_one_item}onClick={logoutHandler}>
              <TbLogout /> &nbsp;&nbsp;&nbsp;&nbsp;Logout            
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
