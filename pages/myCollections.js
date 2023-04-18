import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Style from "../styles/myCollection.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';


const myCollections = () => {
  const router = useRouter();
  const [arts, setArts] = useState([]);
  const [music, setMusic] = useState([]);
  const [photography, setPhotography] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/api/v1/collection");

    eventSource.addEventListener("nftCollection", (event) => {
      const data = JSON.parse(event.data);
      setArts(data.arts);
      setMusic(data.music);
      setPhotography(data.photography);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const artsSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false
  };

  const musicSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
  };

  const photographySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false
  };

  return (
    <div>
      <h2>Arts</h2>
      <Slider {...artsSliderSettings}>
        {arts.map((collection) => (
          <div key={collection._id} className={Style.slider_item}>
            <Link
              href={{
                pathname: `/collection`,
                query: {
                  collectionName: collection.name,
                  collectionImage: collection.image,
                  collectionDescription: collection.description,
                },
              }}
            >
              <a>
                <img
                  src={collection.image}
                  alt={collection.name}
                  className={Style.slider_image}
                />
                <div className={Style.slider_info}>
                  <div className={Style.slider_name}>{collection.name}</div>
                  <div className={Style.slider_description}>
                    {collection.description}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </Slider>

      <h2>Music</h2>
      <Slider {...musicSliderSettings}>
        {music.map((collection) => (
          <div key={collection._id} className={Style.slider_item}>
            <Link href={`/test?collectionName=${collection.name}`}>
              <a>
                <img
                  src={collection.image}
                  alt={collection.name}
                  className={Style.slider_image}
                />
                <div className={Style.slider_info}>
                  <div className={Style.slider_name}>{collection.name}</div>
                  <div className={Style.slider_description}>
                    {collection.description}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </Slider>

      <h2>Photography</h2>
      <Slider {...photographySliderSettings}>
        {photography.map((collection) => (
          <div key={collection._id} className={Style.slider_item}>
            <Link href={`/test?collectionName=${collection.name}`}>
              <a>
                <img
                  src={collection.image}
                  alt={collection.name}
                  className={Style.slider_image}
                />
                <div className={Style.slider_info}>
                  <div className={Style.slider_name}>{collection.name}</div>
                  <div className={Style.slider_description}>
                    {collection.description}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default myCollections;


