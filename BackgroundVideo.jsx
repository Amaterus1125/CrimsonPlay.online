import "../index.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BackgroundVideo() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  const contentRef = useRef(null);
  const aboutRef = useRef(null);

  const imgTopRef = useRef(null);
  const imgCenterRef = useRef(null);

  const ctaRef = useRef(null);
  const heroTextRef = useRef(null);

  const [videoSrc, setVideoSrc] = useState("");

  /* video switched everytime you click */
  useEffect(() => {
    const lastIndex = parseInt(localStorage.getItem("bg-video-index") || "0");
    const videos = ["/background1.mp4", "/background2.mp4", "/background3.mp4"];
    const nextIndex = (lastIndex + 1) % videos.length;

    localStorage.setItem("bg-video-index", nextIndex.toString());
    setVideoSrc(videos[nextIndex]);
  }, []);

  /* video settings */
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.playbackRate = 0.85;
      vid.preload = "auto";
      vid.playsInline = true;
    }
  }, [videoSrc]);

  /* parallax with smooth scroll - PRESERVED EXACT LOGIC */
  useEffect(() => {
    let currentY = 0;
    let targetY = 0;
    const ease = 0.06;

    const updateParallax = () => {
      targetY = window.scrollY;
      currentY += (targetY - currentY) * ease;

      if (videoRef.current)
        videoRef.current.style.transform = `translateY(-${currentY * 0.004}px)`;

      if (overlayRef.current)
        overlayRef.current.style.opacity = `${Math.min(currentY / 300, 1)}`;

      if (contentRef.current)
        contentRef.current.style.transform = `translateY(-${currentY * 0.05}px)`;

      if (aboutRef.current)
        aboutRef.current.style.transform = `translateY(-${currentY * 0.03}px)`;

      if (imgTopRef.current)
        imgTopRef.current.style.transform = `translateY(-${currentY * 0.04}px)`;

      if (imgCenterRef.current)
        imgCenterRef.current.style.transform = `translateY(-${currentY * 0.06}px)`;

      if (ctaRef.current)
        ctaRef.current.style.transform = `translateY(-${currentY * 0.07}px)`;

      if (heroTextRef.current)
        heroTextRef.current.style.transform = `translateY(-${currentY * 0.08}px)`;

      requestAnimationFrame(updateParallax);
    };

    updateParallax();
  }, []);

  /* scroll reveal - PRESERVED EXACT LOGIC */
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#090d14]">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover brightness-[1.35] saturate-[1.25]"
        />

        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full bg-[#090d14] opacity-0 transition-opacity duration-300"
        />

        <div
          ref={heroTextRef}
          className="absolute inset-0 flex items-center justify-center text-center z-[3] px-4"
        >
          <div className="flex flex-col items-center valorant-font">
            {/* Responsive Hero Text */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-widest glitch"
              data-text="PLAY BETTER"
            >
              PLAY BETTER
            </h1>

            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-semibold text-white mt-4 sm:translate-x-3 glitch"
              data-text="CHOOSE SMARTER"
            >
              CHOOSE SMARTER
            </h2>

            {/* Play Button */}
            <div ref={ctaRef} className="mt-10 md:mt-14">
              <button
                aria-label="Play Now"
                onClick={() => navigate("/home")}
                className="
                  relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold
                  text-white tracking-wide bg-gradient-to-r from-[#ff004c] via-[#ff5a7a] to-[#ff8aa0]
                  border border-[#ff004c] transform transition-all duration-200 ease-out
                  shadow-[0_10px_30px_rgba(255,0,76,0.15)]
                  hover:scale-110 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,0,76,0.40)]
                "
              >
                <span className="relative flex items-center gap-3">
                  <span className="w-1.5 md:w-2 h-6 md:h-7 rounded bg-white/90"></span>
                  <span className="text-lg md:text-xl">FIND GAME</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="relative w-full min-h-[140vh]">
        <video
          src="/pagebg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80 brightness-[1.6] saturate-[1.3] blur-[1px] z-[1]"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-[#090d14]/40 z-[2]" />

        {/* Content Container */}
        <main className="relative z-[3] px-6 py-20 md:p-20 text-white valorant-font space-y-24 md:space-y-32">
          
          {/* Section 1 */}
          <section
            ref={contentRef}
            className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 reveal opacity-0 translate-y-10 transition-all duration-1000"
          >
            {/* Box width changed from fixed 70% to full/fluid */}
            <div className="w-full lg:w-[65%] bg-white/5 backdrop-blur-xl border border-[#ff004c] rounded-3xl shadow-[0_0_25px_#ff004c80] p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl mb-4 text-[#ff004c]">PURPOSE</h2>
              <div className="space-y-4 text-sm md:text-base opacity-80 leading-relaxed">
                <p>Not sure what to play next? Say less. We deliver fresh, curated game recommendations instantly, personalized to your vibe with zero effort.</p>
                <p>Tell us your mood, the genres you vibe with, the games you love and we’ll serve up recommendations that actually feel right.</p>
              </div>
            </div>

            <div
              ref={imgTopRef}
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-3xl bg-white/10 backdrop-blur-xl border border-[#ff004c] shadow-[0_0_25px_#ff004c80] overflow-hidden flex-shrink-0"
            >
              <img src="/image1.png" loading="lazy" className="w-full h-full object-cover" alt="visual 1" />
            </div>
          </section>

          {/* Section 2 */}
          <section
            ref={aboutRef}
            className="w-full flex flex-col lg:flex-row-reverse items-center justify-center gap-10 md:gap-16 reveal opacity-0 translate-y-10 transition-all duration-1000"
          >
            <div className="w-full lg:w-[65%] bg-white/5 backdrop-blur-xl border border-[#ff004c] rounded-3xl shadow-[0_0_25px_#ff004c80] p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl mb-4 text-[#ff004c]">WHY TO CHOOSE US?</h2>
              <div className="space-y-4 text-sm md:text-base opacity-80 leading-relaxed">
                <p>Stuck choosing your next game? We got you. Our platform serves hand-picked, intelligent game recommendations crafted around your taste, mood, and playstyle.</p>
                <p>No more overwhelming game lists. Just instant, accurate suggestions that help you discover your next favorite title effortlessly.</p>
              </div>
            </div>

            <div
              ref={imgCenterRef}
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-3xl bg-white/10 backdrop-blur-xl border border-[#ff004c] shadow-[0_0_25px_#ff004c80] overflow-hidden flex-shrink-0"
            >
              <img src="/image2.png" loading="lazy" className="w-full h-full object-cover" alt="visual 2" />
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}