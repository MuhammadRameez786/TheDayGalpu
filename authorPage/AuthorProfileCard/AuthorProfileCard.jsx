import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiSocialRed,
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiSocialPinterest,
} from "react-icons/ti";
import { DiJqueryLogo } from "react-icons/di";
import { 
  FaPinterest, 
  FaRedditAlien, 
  FaSnapchatGhost, 
  FaTwitch, 
  FaDiscord, 
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import { Button } from "../../components/componentsindex.js";

const AuthorProfileCard = ({ currentAccount }) => {
  //const [state, setState] = useState(initialState);
  const [user, setUser] = useState('')
  const [isClient, setIsClient] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //console.log(userInfo);
  const router = useRouter();
    
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      setIsClient(true);
      setUser(userInfo?.user || {});
      setFollowersCount(userInfo?.user?.followers?.length || 0);
      setFollowingCount(userInfo?.user?.following?.length || 0);
    }
  }, [userInfo, currentAccount, router]); 

  useEffect(() => {
    if (isClient) {
      const copyAddress = () => {
        const copyText = document.getElementById("myInput");
    
        copyText.select();
        if (typeof window !== 'undefined') {
          navigator.clipboard.writeText(copyText.value);
        }
      };
      // Update the state here
    }
  }, [followersCount, followingCount]);

  if (typeof window !== 'undefined' && !router) return null;
 
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);

  //copyAddress function
  

  const openShare = () => {
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };
 
  const handleFollow = () => {
    // dispatch follow action
    setIsFollowing(true);
    setFollowersCount(followersCount + 1);
  };

  const handleUnfollow = () => {
    // dispatch unfollow action
    setIsFollowing(false);
    setFollowersCount(followersCount - 1);
  };

  return (
    <div>
      <ToastContainer />
      <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
      {isClient && userInfo && (
        <div className={Style.AuthorProfileCard_box_img}> 
          <img
            src={userInfo?.data?.user?.pic || 'Profile Pic'}
            className={Style.AuthorProfileCard_box_img_img}
            alt="Profile Picture"
            width={220}
            height={220}
          />
          <div className={Style.AuthorProfileCard_box_head}>
            <div>
            <h3>{userInfo?.data?.user?.name || 'Anonymous'}</h3>
            </div>
            <div className={Style.AuthorProfileCard_box_info_address}>
            <small>{currentAccount}..</small>
              <FiCopy
                onClick={() => copyAddress()}
                className={Style.AuthorProfileCard_box_info_address_icon}
              />
            </div>

            <p>
            {userInfo?.data?.user?.description || 'No discription'}
            </p>
          </div>
          <div className={Style.AuthorProfileCard_box_info_follow}>
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: '700' }}>{followersCount}</span> Followers
              </div>
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: '700' }}>{followingCount}</span> Following
              </div>
            </div>
        </div>
        )}

        <div className={Style.AuthorProfileCard_box_info}>
          <div className={Style.AuthorProfileCard_box_info_social}>
          <a href="https://www.facebook.com/Thedaygalpuclub">
              <TiSocialFacebook />
            </a>
            <a href="https://www.linkedin.com/company/the-day-galpu-club/">
              <TiSocialLinkedin />
            </a>
            <a href="https://twitter.com/TheDayGalpuClub">
              <TiSocialTwitter />
            </a>
            <a href="https://www.youtube.com/channel/UCSiAaU4ogteY4Q6_2VZhlVw">
              <TiSocialYoutube />
            </a>
            <a href="https://www.instagram.com/thedaygalpuclub">
              <TiSocialInstagram />
            </a>
            <a href="https://www.pinterest.com/TheDayGalpuClub/">
              <TiSocialPinterest />
            </a>
          </div>
          <div className={Style.AuthorProfileCard_box_info_social}>
            <a href="https://www.reddit.com/user/TheDayGalpuClub">
              <FaRedditAlien />
            </a>
            <a href="https://www.snapchat.com/add/thedaygalpuclub?share_id=0B8r2amIyFk&locale=en-US">
              <FaSnapchatGhost />
            </a>
            <a href="https://www.twitch.tv/thedaygalpuclub">
              <FaTwitch />
            </a>
            <a href="https://support.discord.com/hc/en-us/profiles/10059899835671">
              <FaDiscord />
            </a>
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
        {userInfo?.user?._id !== user?._id && ( // show follow button only for other users
          <div>
            {userInfo?.user?.followers?.includes(user?._id) ? ( // if current user is already following the other user, show unfollow button
              <Button
                btnName="Unfollow"
                handleClick={() => {
                  dispatch(unfollowUser(userInfo?.user?._id)); // dispatch an action to unfollow the other user
                  toast.success("Unfollowed!");
                }}
              />
            ) : ( // else, show follow button
              <Button
                btnName="Follow"
                handleClick={() => {
                  dispatch(followUser(userInfo?.user?._id)); // dispatch an action to follow the other user
                  toast.success("Followed!");
                }}
              />
            )}
          </div>
        )}
          <MdCloudUpload
            onClick={() => openShare()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                {""}
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                {""}
                Instragram
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>{" "}
                {""}
                LinkedIn
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                {""}
                YouTube
              </p>
            </div>
          )}

          <BsThreeDots
            onClick={() => openReport()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {report && (
            <p className={Style.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{" "}
              {""}
              Report abouse
            </p>
          )}
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default AuthorProfileCard;


