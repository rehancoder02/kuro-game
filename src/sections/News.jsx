import React from 'react'

const News = ({ isActive }) => {
  return (
    <section className={`news-section h-screen relative bg-black ${isActive ? 'active' : ''} bg-[url('/assets/news-bg.jpg')] bg-center bg-cover`}>
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

      {/* News Content */}
      <div className='pt-20 px-20'>
        <h1 className='text-4xl uppercase font-semibold text-[#A58A5F] border-b-2 pb-2 border-gray-500'>News</h1>
        <p></p>
      </div>
    </section>
  )
}

export default News
