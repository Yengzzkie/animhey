"use client";

import { Carousel } from "@material-tailwind/react";
import { useContext } from "react";
import { PopularAnimeContext } from "../utils/context";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function GalleryWithCarousel() {
  const { popular } = useContext(PopularAnimeContext);

  return (
    <Carousel
      navigation={false}
      loop={true}
      autoplay={true}
      className="items-center h-full w-full"
    >
      {popular.slice(0, 10).map((anime, index) => (
        
          <div className="relative bg-[#252525a8] hover:bg-[#141414] items-center shadow-md h-full w-full mb-1 cursor-pointer">
            <img
              src={anime.cover}
              alt={anime.title}
              className="h-96 w-full object-cover"
              style={{ maxHeight: "288px" }} // Set max height if needed
            />
            <div className="bg=[#252525a8] backdrop-blur-sm absolute top-0 left-0 font-semibold w-full h-full">
              <div className="absolute top-1/2 left-1/2 flex items-center justify-center gap-6 -translate-x-1/2 -translate-y-1/2 w-full">
                <img src={anime.image} className="w-28 lg:w-32 rounded-md top-image" />
                <div className="flex flex-col gap-2">
                  <h1 className="text-md lg:text-xl text-shadow">{anime.title.english}</h1>
                  <span className="bg-orange-400 text-white rounded-md w-fit px-2 status-badge">#{index + 1} in Top Viewed</span>
                  <Link to={`/watch/${anime.id}/${anime.title.romaji}`} key={anime.id}>
                    <Button className="hover:bg-red-600" variant="gradient" size="sm">Watch Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      ))}
    </Carousel>
  );
}
