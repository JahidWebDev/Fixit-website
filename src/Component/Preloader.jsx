import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaCommentDots,
} from "react-icons/fa";

// import logo from "../assets/LoadingpageAnimation2.mp4";
import logoTwo from "../assets/mainLogo.png";
import bgImage from "../assets/bg.jpg";

// ================= Preloader ==================

function Preloader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.div
        initial={{ y: 30, opacity: 0.2, filter: "brightness(50%)" }}
        animate={{
          opacity: [0.8, 0.2, 0.8], 
          filter: ["brightness(120%)", "brightness(50%)", "brightness(120%)"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
      <video
  src="/assets/LoadingpageAnimation2.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="relative z-10 h-[280px] w-[200px]"
/>

      </motion.div>
    </div>
  );
}

// ================= Home Page ==================
function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDate = new Date("2025-09-14");
    const endDate = new Date("2025-11-01");
    const today = new Date();

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const passedDays = Math.max(
      0,
      Math.ceil((today - startDate) / (1000 * 60 * 60 * 24))
    );

    const target = Math.min(Math.ceil((passedDays / totalDays) * 100), 100);

    let current = 0;
    const step = Math.ceil(target / 60); // animation step
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(id);
      }
      setProgress(current);
    }, 40);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen px-6 text-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Logo */}
        <img
          src={logoTwo}
          alt="Logo"
          className="h-auto mx-auto mb-6 w-28 brightness-110"
        />

        {/* Title */}
        <h1 className="text-4xl mt-[60px] md:text-6xl font-bold tracking-wide">
          UNDER <span className="block">CONSTRUCTION</span>
        </h1>

        <p className="mt-3 text-lg text-gray-200">
          Our official website is currently under development.
        </p>

        {/* Progress bar */}
        <div className="w-full mt-[70px] max-w-md mx-auto">
          <div className="w-full bg-gray-700 h-3 rounded-[3px] overflow-hidden">
            <motion.div
              className="h-3 bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-300">
            <span>0%</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Launch date */}
        <p className="text-gray-300 mt-15">
          Official Launch Date:{" "}
          <span className="font-semibold">November 01, 2025</span>
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6 text-xl">
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 transition border rounded-full border-white/20 hover:bg-white/10"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 transition border rounded-full border-white/20 hover:bg-white/10"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 transition border rounded-full border-white/20 hover:bg-white/10"
          >
            <FaYoutube />
          </a>
        </div>

        {/* Contact button */}
        <div className="flex flex-col mt-[20px] items-center justify-center text-white text-center px-6">
          {/* Contact + Message */}
          <div className="flex items-center ">
            {/* Contact Button */}
            <div>
              <button className="px-8  py-3 rounded-full bg-gray-200 text-black font-semibold shadow-sm hover:scale-[1.02] transition-transform">
                CONTACT
              </button>
            </div>

            {/* Message Icon */}
          </div>
          <div className="ml-[1300px] ">
            <button className="flex items-center justify-center w-12 h-12 transition rounded-full bg-white/20 hover:bg-white/30">
              <FaCommentDots className="text-2xl text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* About button */}
      <Link
        to="/Home"
        className="absolute top-10 right-[270px] bg-[#007266] hover:bg-green-600 text-white px-8 py-2 rounded-[3px]"
      >
        Home
      </Link>
    </div>
  );
}

// ================= About Page ==================
function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-gray-800">About Page</h1>
      <Link to="/" className="mt-4 text-blue-500 underline">
        Back Home
      </Link>
    </div>
  );
}

// ================= Main App ==================
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}
