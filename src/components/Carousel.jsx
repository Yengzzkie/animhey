"use client";

import { Carousel } from "@material-tailwind/react";
import { useContext } from "react";
import { PopularAnimeContext } from "../utils/context";
import { Link } from "react-router-dom";

export default function GalleryWithCarousel() {
  const { popular } = useContext(PopularAnimeContext);

  return (
    <Carousel
      prevArrow={false}
      nextArrow={false}
      navigation={false}
      loop={true}
      autoplay={true}
      className="items-center h-full w-full"
    >
      {popular.slice(0, 10).map((anime, index) => (
        <Link to={`/watch/${anime.id}/${anime.title.romaji}`} key={anime.id}>
          <div className="relative bg-[#252525a8] hover:bg-[#141414] items-center shadow-md h-full w-full mb-1 cursor-pointer">
            <img
              src={anime.cover}
              alt={anime.title.english}
              className="h-80 w-full object-cover"
              style={{ maxHeight: "288px" }} // Set max height if needed
            />
            <div className="absolute border-white w-full h-full">

            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}
