import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const News = ({ isActive }) => {
  const [activeCategory, setActiveCategory] = useState('Latest');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation variants
  const tabVariants = {
    hover: { 
      color: "#A58A5F",
      backgroundColor: "rgba(165, 138, 95, 0.1)",
    },
    active: { 
      color: "#A58A5F",
      backgroundColor: "rgba(165, 138, 95, 0.05)",
    },
    inactive: { color: "#9CA3AF" }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 70 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: { opacity: 0, x: -50 }
  };

  const dotVariants = {
    active: { 
      scale: 1.2, 
      backgroundColor: "#A58A5F",
    },
    inactive: { 
      scale: 1, 
      backgroundColor: "#4B5563",
    }
  };
  const arrowVariants = {
    hover: {
      scale: 1.2,
      color: "#D4AF37",
      filter: "drop-shadow(0 0 8px rgba(165,138,95,0.5))",
      transition: { type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.9 },
    disabled: { opacity: 0.3, scale: 1 }
  };

  // Sample content data
  const categoryContent = {
    Latest: [
      {
        title: '[Absolute Pulsation] Featured Weapon',
        date: '25.01.22',
        description: 'New weapon series available in limited-time event',
        link: '#',
        image: '/assets/region-1.jpg'
      },
      {
        title: '[Thawborn Renewal] Featured Resonator',
        date: '25.01.22',
        description: 'Special character event now live',
        link: '#',
        image: '/assets/region-1.jpg'
      },
      {
        title: '[Thawborn Renewal] Featured Resonator',
        date: '25.01.22',
        description: 'Special character event now live',
        link: '#',
        image: '/assets/region-1.jpg'
      }
    ],
    Notice: [
      {
        title: 'Server Maintenance Notice',
        date: '25.01.23',
        description: 'Scheduled maintenance on January 28th',
        link: '#',
        image: '/assets/region-1.jpg'
      }
    ],
    News: [
      {
        title: 'Version Update 1.1 Details',
        date: '25.01.24',
        description: 'New features and content coming soon',
        link: '#',
        image: '/assets/region-1.jpg'
      }
    ],
    Event: [
      {
        title: 'Winter Festival Event',
        date: '25.01.25',
        description: 'Special holiday-themed activities',
        link: '#',
        image: '/assets/region-1.jpg'
      }
    ]
  };

  const categories = Object.keys(categoryContent);
  const currentSlides = categoryContent[activeCategory];

  return (
    <section className={`news-section h-screen relative bg-[url('/assets/news-bg.jpg')] ${isActive ? 'active' : ''} bg-center bg-cover`}>
      {/* Wave video background */}
      <div className='absolute bottom-0'>
        <video 
          src="/assets/videos/wave-layout.mp4"
          className='filter brightness-100 mix-blend-screen'
          autoPlay
          muted
          loop
          preload="metadata"
          aria-label="Background layout video"
        >
          <source src="/assets/videos/wave-layout.webm" type="video/webm" />
          <source src="/assets/videos/wave-layout.mp4" type="video/mp4" />
        </video>
      </div>

      <div className='pt-20 px-20 h-full relative z-20'>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-4xl uppercase font-semibold text-[#A58A5F] mb-8 border-b-2 pb-2 border-gray-600'
        >
          News
        </motion.h1>

        <div className='flex h-3/4 gap-8'>
          {/* Tab Navigation */}
          <div className='w-1/4 flex flex-col gap-1 border-r border-gray-700 pr-4'>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentSlide(0);
                }}
                className={`relative py-4 px-6 text-left text-lg uppercase 
                  rounded-xl transition-colors ${activeCategory === category ? 'font-medium' : 'font-normal'}`}
                variants={tabVariants}
                animate={activeCategory === category ? "active" : "inactive"}
                whileHover="hover"
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    className="absolute left-0 inset-y-0 w-1 bg-[#A58A5F] rounded-r"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Content Slider */}
          <div className='w-3/4 relative overflow-hidden'>
            <AnimatePresence mode='wait'>
              {currentSlides.map((slide, index) => (
                currentSlide === index && (
                  <motion.div 
                    key={`${activeCategory}-${index}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={slideVariants}
                    className='h-[450px]'
                  >
                    <div className='relative h-[420px] rounded-t-xl overflow-hidden border-2 border-[#A58A5F]/30'>
                      <img 
                        src={slide.image} 
                        alt="" 
                        className='w-full h-full object-cover'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-8'>
                        <div className='text-white space-y-4'>
                          <span className='text-[#A58A5F] text-sm font-medium tracking-wide'>
                            {activeCategory} • {slide.date}
                          </span>
                          <h3 className='text-3xl font-bold'>{slide.title}</h3>
                          <p className='text-gray-300 text-lg'>{slide.description}</p>
                          <a 
                            href={slide.link}
                            className='inline-flex items-center text-[#A58A5F] hover:text-amber-600 transition-colors group'
                          >
                            <span className='mr-2'>Learn More</span>
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className='text-xl'
                            >
                              →
                            </motion.span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Dot Navigation */}
            <div className='absolute bottom-6 right-6 flex items-center gap-4'>
            <motion.button
              variants={arrowVariants}
              whileHover={currentSlide > 0 ? "hover" : ""}
              whileTap={currentSlide > 0 ? "tap" : ""}
              animate={currentSlide === 0 ? "disabled" : ""}
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              className="text-[#A58A5F] text-3xl"
              disabled={currentSlide === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

          

            <motion.button
              variants={arrowVariants}
              whileHover={currentSlide < currentSlides.length - 1 ? "hover" : ""}
              whileTap={currentSlide < currentSlides.length - 1 ? "tap" : ""}
              animate={currentSlide === currentSlides.length - 1 ? "disabled" : ""}
              onClick={() => setCurrentSlide(prev => Math.min(currentSlides.length - 1, prev + 1))}
              className="text-[#A58A5F] text-3xl"
              disabled={currentSlide === currentSlides.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
);
};

export default News;