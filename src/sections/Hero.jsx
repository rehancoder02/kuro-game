import React, { useEffect, useRef, useState } from "react";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaShare,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";

const Hero = () => {
  const [trailer, setTrailer] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (trailer) {
      // Animate zoom in
      gsap.fromTo(
        iframeRef.current,
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
      );
    } else {
      // Animate zoom out
      gsap.to(iframeRef.current, {
        scale: 0.2,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
      });
    }
  }, [trailer]);

  return (
    <section className="h-screen overflow-hidden relative">
      <div className="absolute bottom-0">
        {/* <img src="/assets/hero-img.jpg" className='h-screen w-screen object-cover' alt="" /> */}
        {!videoLoaded && (
          <img
            src="/assets/hero-img.jpg"
            className="h-screen w-screen object-cover"
            alt=""
          />
        )}
        <video
          src="/assets/videos/hero-bg.mp4"
          className={`${videoLoaded ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          onCanPlayThrough={() => setVideoLoaded(true)}
        />
      </div>

      {/* Social links */}
      <div className="absolute bottom-10 left-10">
        <div className="flex items-center space-x-4">
          <FaShare className="text-white text-2xl cursor-pointer" />
          <FaXTwitter className="text-white text-2xl cursor-pointer" />
          <FaFacebook className="text-white text-2xl cursor-pointer" />
          <FaYoutube className="text-white text-2xl cursor-pointer" />
          <FaDiscord className="text-white text-2xl cursor-pointer" />
          <FaTiktok className="text-white text-2xl cursor-pointer" />
          <FaInstagram className="text-white text-2xl cursor-pointer" />
        </div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:opacity-55 transition-all duration-300"
        onClick={() => setTrailer(true)}
      >
        <img src="/assets/icons/play-btn.png" alt="" />
      </div>

      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/75 h-screen w-screen ${
          trailer ? "flex" : "hidden"
        } justify-center items-center`}
      >
        <div className="flex gap-5">
          <iframe
            ref={iframeRef}
            width="700"
            height="415"
            src={
              trailer
                ? "https://www.youtube.com/embed/wp4fdbuKw34?autoplay=1"
                : "https://www.youtube.com/embed/wp4fdbuKw34?si=0k_CXDDx_ycNwYnq"
            }
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <ImCancelCircle
            className="text-2xl text-white cursor-pointer"
            onClick={() => setTrailer(false)}
          />
        </div>
      </div>

      <div className="absolute bottom-10 right-10 bg-black/20 p-2 rounded-md">
        <img src="assets/qr-code.jpg" className="w-24 " alt="" />
      </div>
    </section>
  );
};  

export default Hero;
