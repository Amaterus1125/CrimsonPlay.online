import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function About() {
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
  const sectionRefs = useRef([]);
  const smootherRef = useRef(null);

  useEffect(() => {
    // scroll smotherrr
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    // text animation
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
          },
        }
      );

      gsap.to(el, {
        yPercent: -15 - i * 5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // image animation
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );

      gsap.to(el, {
        yPercent: -25 - i * 8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // section reveal logic
    sectionRefs.current.forEach((sec) => {
      if (!sec) return;
      gsap.fromTo(
        sec,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <div id="smooth-wrapper" className="relative w-full bg-[#090d14] overflow-x-hidden">
      <div id="smooth-content">
        <Navbar />

        {/*background video */}
        <video
          src="/pagebg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80 brightness-[1.5] saturate-[1.3] blur-[1px] z-[1]"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-[#090d14]/40 z-[2]" />

        {/* for mobile*/}
        <main className="relative z-[3] px-6 py-20 md:p-20 text-white valorant-font space-y-20 md:space-y-22">
          
          {/* for mobile */}
          <h1 className="text-4xl md:text-6xl font-bold text-center text-[#ff004c] mb-10">
            THE NEXUS TEAM
          </h1>

          <p className="opacity-90 text-lg md:text-xl max-w-3xl mx-auto text-center leading-relaxed mb-12 md:mb-20 text-[#00f3ff] font-bold">
            We combine advanced design, great storytelling, and deep understanding of
            players to build immersive gaming enhancement tools.
          </p>

          <div className="space-y-32 md:space-y-52">
            {[
              {
                title: "FRONTEND & BACKEND",
                text: "Hi, I’m Harshit Sharma, a passionate developer who loves coding and building meaningful digital experiences. I’ve worked on both the frontend and backend of web applications, and recently created a complete game-recommendation system website. I enjoy exploring new technologies, solving real-world problems, and turning ideas into smooth, functional products.",
                img: "/user1.webp",
              },
              {
                title: "MACHINE LEARNING & AI",
                text: "Hi, I’m Shobhit Sahu, a developer passionate about AI, machine learning, and building innovative digital solutions. I worked on creating the machine learning model and integrating AI features into our game-recommendation website. I love experimenting with new technologies, improving model accuracy, and contributing to projects that push the boundaries of what’s possible.",
                img: "/user2.jpg",
              },
            ].map((item, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className={`flex flex-col items-center gap-10 md:gap-14 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/*some more mobile update */}
                <div
                  ref={(el) => (textRefs.current[index] = el)}
                  className="w-full lg:w-[700px] min-h-[260px] rounded-3xl bg-white/5 backdrop-blur-xl p-6 md:p-10 border border-[#ff004c] shadow-[0_0_25px_#ff004c80]"
                >
                  <h2 className="text-2xl md:text-3xl mb-4 text-[#ff4b7d]">{item.title}</h2>
                  <p className="text-sm md:text-base opacity-80 leading-relaxed">{item.text}</p>
                </div>

                <div
                  ref={(el) => (imageRefs.current[index] = el)}
                  className="w-[220px] h-[320px] md:w-[280px] md:h-[400px] rounded-3xl overflow-hidden border border-[#ff004c] shadow-[0_0_30px_#ff004caa]"
                >
                  <img
                    src={item.img}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );

}
