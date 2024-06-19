"use client";

import { Carousel } from "@material-tailwind/react";

export default function GalleryWithCarousel() {
  return (
    <Carousel loop={true} autoplay={true} className="items-center">
      <img
        src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/20635-2eB3QP44dM1M.jpg"
        alt="image 1"
        className="h-full w-full object-cover lg:object-contain object-center"
      />
      <img
        src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/114308-VuYDoBJMbU1i.jpg"
        alt="image 1"
        className="h-full w-full object-cover lg:object-contain object-center"
      />
        <img
          src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg"
          alt="image 3"
          className="h-full w-full object-cover lg:object-contain object-center"
        />
      <img
        src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg"
        alt="image 2"
        className="h-full w-full object-cover lg:object-contain object-center"
      />
      <img
        src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/20958-Y7eQdz9VENBD.jpg"
        alt="image 3"
        className="h-full w-full object-cover lg:object-contain object-center"
      />
    </Carousel>
  );
}