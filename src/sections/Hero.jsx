import React, { useState, useRef } from "react";
import { 
  motion, 
  AnimatePresence,
  useIsPresent 
} from "framer-motion";
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

const SocialIcons = React.memo(() => (
  <div className="flex items-center space-x-4">
    <FaShare className="text-2xl text-white cursor-pointer transition-opacity hover:opacity-75" aria-label="Share" />
    <FaXTwitter className="text-2xl text-white cursor-pointer transition-opacity hover:opacity-75" aria-label="Twitter" />
    <FaFacebook className="text-2xl text-white cursor-pointer transition-opacity hover:opacity-75" aria-label="Facebook" />
    <FaYoutube className="text-2xl text-white cursor-pointer transition-opacity hover:opacity-75" aria-label="YouTube" />
    <FaDiscord className="text-2xl text-white cursor-pointer transition-opacity hover:opacity-75" aria-label="Discord" />
    <FaTiktok className="text-2xl text-white cursor-pointer transition-opacity hover:opacity-75" aria-label="TikTok" />
    <FaInstagram className="text-2xl text-white cursor-pointer transition-opacity hover:opacity-75" aria-label="Instagram" />
  </div>
));

const Hero = ({ isActive }) => {
  const [trailer, setTrailer] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const safeYouTubeSrc = "https://www.youtube-nocookie.com/embed/wp4fdbuKw34";
  const isPresent = useIsPresent();

  const iframeVariants = {
    hidden: { scale: 0.2, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      scale: 0.2,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.7, 0, 0.84, 0]
      }
    }
  };

  return (
    <motion.section 
      className={`relative h-screen w-full overflow-hidden hero-section ${isActive ? 'active' : ''}`}
      aria-label="Hero section"
      initial={false}
      animate={isPresent ? "visible" : "hidden"}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {!videoLoaded && (
          <motion.img
            src="/assets/hero-img.png"
            className="h-full w-full object-cover"
            alt="Game preview"
            loading="lazy"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        <motion.video
          src="/assets/videos/hero-bg.mp4"
          className={`h-full w-full object-cover ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          aria-label="Background video"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <source src="/assets/videos/hero-bg.webm" type="video/webm" />
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </motion.video>
      </div>

<div className="absolute bottom-10 left-10 z-10">
      <SocialIcons />
</div>

      {/* Play Button */}
      <motion.button
        className="absolute top-1/2 left-1/2 z-10 cursor-pointer"
        onClick={() => setTrailer(true)}
        aria-label="Play game trailer"
        whileHover={{ scale: 1.05, opacity: 0.55 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src="/assets/icons/play-btn.png" 
          alt="" 
          role="presentation"
          loading="eager"
          width="50"
          height="50"
        />
      </motion.button>

      {/* Trailer Modal */}
      <AnimatePresence>
        {trailer && (
          <motion.div 
            className="fixed inset-0 z-20 bg-black/75 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Video trailer modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative flex items-center gap-5"
              variants={iframeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <iframe
                width="700"
                height="415"
                src={`${safeYouTubeSrc}?autoplay=1`}
                title="Game trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-xl"
                loading="lazy"
                importance="low"
              />
              <motion.div
                className="absolute -right-12 top-0 cursor-pointer text-2xl text-white"
                whileHover={{ scale: 1.1, opacity: 0.75 }}
                transition={{ duration: 0.2 }}
              >
                <ImCancelCircle
                  onClick={() => setTrailer(false)}
                  aria-label="Close trailer"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     {/* QR Code with Text */}
<motion.div 
  className="absolute bottom-10 right-10 z-10 rounded-md bg-black/20 p-3 backdrop-blur-sm"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
>
  <div className="flex items-center gap-3">
    <img
      src="/assets/qr-code.jpg"
      className="h-24 w-24 object-contain flex-shrink-0"
      alt="Download app QR code"
      loading="lazy"
      width="96"
      height="96"
    />
    
    <motion.div
      className="text-white "
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
    >
      <p className="text-sm font-semibold mb-1 leading-tight">
        Available On
      </p>
      
      <div className="grid grid-cols-2 gap-2">
        <motion.img 
          src="/assets/icons/appstore.png"
          alt="Download on the App Store"
          className="h-8 w-36 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          loading="lazy"
        />
        
        <motion.img 
          src="/assets/icons/goolge-play.png"
          alt="Get it on Google Play"
          className="h-8 w-36 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          loading="lazy"
        />
        
        <motion.img 
          src="/assets/icons/ps5.png"
          alt="Available on Epic Canesstore"
          className="h-8 w-36 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          loading="lazy"
        />
        
        <motion.img 
          src="/assets/icons/playgames.png"
          alt="Play on PC via Google Play Games"
          className="h-8 w-36 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          loading="lazy"
        />
      </div>
    </motion.div>
  </div>
</motion.div>
    </motion.section>
  );
};

export default React.memo(Hero);