import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "./CountDown/CountDown";


//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";
// remaining time calculation function

const NFTCard = () => {
  const [nfts, setNFTs] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/api/v1/nfts");
    eventSource.addEventListener("update", (event) => {
      const data = JSON.parse(event.data);
      setNFTs(data);
    });
    return () => eventSource.close();
  }, []);
  const [like, setLike] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [nftsPerPage, setNftsPerPage] = useState(9);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = nfts.slice(indexOfFirstNft, indexOfLastNft);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const remainingTime = nfts.createAt - currentTime;
  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    let output = '';
    if (days > 0) {
      output += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
      output += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      output += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    return output.trim();
  };
  
  
  
  const remainingTimeStr = formatTime(remainingTime);

  // console.log(NFTData);
  return (
    <div>
      <div className={Style.pagination}>
          <ul className={Style.pagination_list}>
            {nfts.length > nftsPerPage &&
              Array(Math.ceil(nfts.length / nftsPerPage))
                .fill()
                .map((_, i) => (
                  <li key={i}>
                    <button
                      className={Style.pagination_btn}
                      onClick={() => setCurrentPage(i+1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      <div className={Style.NFTCard}>
        {currentNfts.map((el, i) => (
          <Link href={{ pathname: "/NFT-details", query: el }}>
            <div className={Style.NFTCard_box} key={i + 1}>
              <div className={Style.NFTCard_box_img}>
                <Image
                  src={el.image[0]}
                  alt="NFT images"
                  width={600}
                  height={600}
                  className={Style.NFTCard_box_img_img}
                />
              </div>

              <div className={Style.NFTCard_box_update}>
                <div className={Style.NFTCard_box_update_left}>
                  <div
                    className={Style.NFTCard_box_update_left_like}
                    onClick={() => likeNft()}
                  >
                    {like ? (
                      <AiOutlineHeart />
                    ) : (
                      <AiFillHeart
                        className={Style.NFTCard_box_update_left_like_icon}
                      />
                    )}
                    {""} 22
                  </div>
                </div>

                <div className={Style.NFTCard_box_update_right}>
                  <div className={Style.NFTCard_box_update_right_info}>
                    <small>Remaining time</small>
                    <p> <CountdownTimer endTime={el.createAt} remainingTime={remainingTimeStr} /> </p>
                    {nfts.createAt}
                  </div>
                </div>
              </div>

              <div className={Style.NFTCard_box_update_details}>
                <div className={Style.NFTCard_box_update_details_price}>
                  <div className={Style.NFTCard_box_update_details_price_box}>
                    <h4>
                      {el.name} #{el.tokenId}
                    </h4>

                    <div
                      className={Style.NFTCard_box_update_details_price_box_box}
                    >
                      <div
                        className={Style.NFTCard_box_update_details_price_box_bid}
                      >
                        <small>Current Bid</small>
                        <p>{el.price}ETH</p>
                      </div>
                      <div
                        className={
                          Style.NFTCard_box_update_details_price_box_stock
                        }
                      >
                        <small>61 in stock</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Style.NFTCard_box_update_details_category}>
                  <BsImages />
                </div>
              </div>
            </div>
          </Link>
          
        ))}
        
      </div>
    </div>
  );
};

export default NFTCard;



//  const BigNFTSilder = () => {

//   const [sliderData, setSliderData] = useState([]);

//     useEffect(() => {
//       if (nfts.length > 0) {
//         const newSliderData = nfts.map((nft) => {
//           return {
//             nftImage: nft.images,
//             image: nft.seller, // replace "image" with the actual property name that holds the image data
//             title: nft.name,
//             price: `${nft.price}`,
//             collection: "Glow Worm World",
//             id: nft._id,
//             like: 243,
//             time: {
//               days: 21,
//               hours: 40,
//               minutes: 81,
//               seconds: 15,
//             },
//           };
//         });
    
//         setSliderData(newSliderData);
//       }

//     }, []);
//     console.log("SliderData", sliderData);


// return (
//   <div className={Style.bigNFTSlider}>
//     {nfts.length > 0 ? (
//       <Slider {...settings}>
//         {nfts.map((nft) => (
//           <div className={Style.bigNFTSlider_box} key={nft._id}>
//             <div className={Style.bigNFTSlider_box_left}>
//               <h2>{sliderData[idNumber].title}</h2>
//               <div className={Style.bigNFTSlider_box_left_creator}>
//                 <div className={Style.bigNFTSlider_box_left_creator_profile}>
//                   <Image
//                     className={Style.bigNFTSlider_box_left_creator_profile_img}
//                     src={nft.image}
//                     alt="profile image"
//                     width={50}
//                     height={50}
//                   />
//                   <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
//                     <p>Creator</p>
//                     <h4>
//                       {nft.name}{" "}
//                       <span>
//                         <MdVerified />
//                       </span>
//                     </h4>
//                   </div>
//                 </div>

//                 <div className={Style.bigNFTSlider_box_left_creator_collection}>
//                   <AiFillFire
//                     className={Style.bigNFTSlider_box_left_creator_collection_icon}
//                   />

//                   <div
//                     className={Style.bigNFTSlider_box_left_creator_collection_info}
//                   >
//                     <p>Collection</p>
//                     <h4>{sliderData[idNumber].collection}</h4>
//                   </div>
//                 </div>
//               </div>

//               <div className={Style.bigNFTSlider_box_left_bidding}>
//                 <div className={Style.bigNFTSlider_box_left_bidding_box}>
//                   <small>Current Bid</small>
//                   <p>
//                     {nft.price} <span>$221,21</span>
//                   </p>
//                 </div>

//                 <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
//                   <MdTimer
//                     className={Style.bigNFTSlider_box_left_bidding_box_icon}
//                   />
//                   <span>Auction ending in</span>
//                 </p>

//                 <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
//                   <div
//                     className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
//                   >
//                     <p>{sliderData[idNumber].time.days}</p>
//                     <span>Days</span>
//                   </div>

//                   <div
//                     className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
//                   >
//                     <p>{sliderData[idNumber].time.hours}</p>
//                     <span>Hours</span>
//                   </div>

//                   <div
//                     className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
//                   >
//                     <p>{sliderData[idNumber].time.minutes}</p>
//                     <span>mins</span>
//                   </div>

//                   <div
//                     className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
//                   >
//                     <p>{sliderData[idNumber].time.seconds}</p>
//                     <span>secs</span>
//                   </div>
//                 </div>

//                 <div className={Style.bigNFTSlider_box_left_button}>
//                   <Button btnName="Place" handleClick={() => { }} />
//                   <Button btnName="View" handleClick={() => { }} />
//                 </div>
//               </div>

//               <div className={Style.bigNFTSlider_box_left_sliderBtn}>
//                 <TbArrowBigLeftLines
//                   className={Style.bigNFTSlider_box_left_sliderBtn_icon}
//                   onClick={() => dec()}
//                 />
//                 <TbArrowBigRightLine
//                   className={Style.bigNFTSlider_box_left_sliderBtn_icon}
//                   onClick={() => inc()}
//                 />
//               </div>
//             </div>

//             <div className={Style.bigNFTSlider_box_right}>
//               <div className={Style.bigNFTSlider_box_right_box}>
//                 <Image
//                   src={sliderData[idNumber].nftImage}
//                   alt="NFT IMAGE"
//                   className={Style.bigNFTSlider_box_right_box_img}
//                 />

//                 <div className={Style.bigNFTSlider_box_right_box_like}>
//                   <AiFillHeart />
//                   <span>{sliderData[idNumber].like}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     ) : (
//       <p>Loading...</p>
//     )}
//   </div>
// );