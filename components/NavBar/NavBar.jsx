import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //----USESTATE COMPONNTS
  const [user, setUser] = useState('')
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);
  
  const handleDiscoverClick = () => {
    setDiscoverOpen(!discoverOpen);
    setHelpOpen(false);
  }
  const handleHelpClick = () => {
    setHelpOpen(!helpOpen);
    setDiscoverOpen(false);
  } 

  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscoverOpen(true);
      setHelpOpen(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscoverOpen(false);
      setHelpOpen(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscoverOpen(false);
      setHelpOpen(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscoverOpen(false);
      setHelpOpen(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelpOpen(false);
      setDiscoverOpen(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  //SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {
    if (!currentAccount) {
      connectWallet();
    }
  }, [currentAccount, connectWallet]);  

  useEffect(() => {}, [userInfo]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
          <Image
          src={images.logo}
          alt="logo"
          width={150}
          height={150}  onClick={() => router.push("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}

            onMouseEnter={handleDiscoverClick}
             onMouseLeave={() => setDiscoverOpen(false)}
             >
          <Link href="#">
            <a>Discover</a>
          </Link>
            {discoverOpen && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}
            onMouseEnter={handleHelpClick}
            onMouseLeave={() => setHelpOpen(false)}
          >
            <Link href="#">
              <a>Help Center</a>
            </Link>
            {helpOpen && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (  
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
          </div>
          {isMounted && (
            /* USER PROFILE */
            (typeof window !== "undefined" && userInfo) ? (
              <div className={Style.navbar_container_right_profile_box}>
                <div className={Style.navbar_container_right_profile}> 
                  <img
                    src={userInfo?.data?.user?.pic || 'Anonymous'}
                    alt="Profile"
                    width={40}
                    height={40}
                    onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  /> 
                  {profile && <Profile currentAccount={currentAccount} />}       
                </div>
              </div>
            ) : (
              <div className={Style.navbar_container_right_profile_box}>
                <div className={Style.navbar_container_right_profile}>
                  <Link href="/login">
                    <a className={Style.link}>Login</a>
                  </Link>
                </div>
              </div>
            )
          )}

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError && <Error />}

    </div>
  );
};

export default NavBar;
