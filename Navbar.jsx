import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);

  /* burgur animation */
  useEffect(() => {
    if (menuOpen) {
      gsap.to(line1.current, { rotate: 45, y: 6, duration: 0.3, ease: "power3.out" });
      gsap.to(line2.current, { opacity: 0, duration: 0.2 });
      gsap.to(line3.current, { rotate: -45, y: -6, duration: 0.3, ease: "power3.out" });
    } else {
      gsap.to(line1.current, { rotate: 0, y: 0, duration: 0.3, ease: "power3.inOut" });
      gsap.to(line2.current, { opacity: 1, duration: 0.2 });
      gsap.to(line3.current, { rotate: 0, y: 0, duration: 0.3, ease: "power3.inOut" });
    }
  }, [menuOpen]);

  /* clcik animation on burgur*/
  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <>
      {/* navbar size */}
      <nav className="fixed top-0 left-0 w-full z-40 px-5 py-2 bg-[#090d14]/40 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">

        {/* the holy burgur button */}
        <button
          ref={burgerRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative w-10 h-10 flex flex-col items-center justify-center cursor-pointer"
        >
          <span ref={line1} className="h-[3px] w-8 bg-white rounded block"></span>
          <span ref={line2} className="h-[3px] w-8 bg-white rounded block my-[6px]"></span>
          <span ref={line3} className="h-[3px] w-8 bg-white rounded block"></span>
        </button>

        {/* the holy center buttons */}
        <div className="flex gap-12 valorant-font items-center">
          <Link to="/home" className="nav-btn">Home</Link>
          <Link to="/about" className="nav-btn">About</Link>
        </div>

        {/* neony framy logo */}
        <Link to="/" className="logo-frame">
          <img src="/logo.png" className="object-cover w-full h-full pointer-events-none" alt="logo" />
        </Link>
      </nav>

      {/* the holy slide menu */}
      <div
        ref={menuRef}
        className={`fixed top-14 left-0 h-full w-64 z-50 bg-[#090d14]/80 backdrop-blur-xl border-r border-white/10 shadow-lg transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 mt-20 gap-6 valorant-font">
          <Link to="/home" onClick={() => setMenuOpen(false)} className="text-white text-xl hover:text-blue-300 transition">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-white text-xl hover:text-blue-300 transition">About</Link>
        </div>
      </div>
    </>
  );
}