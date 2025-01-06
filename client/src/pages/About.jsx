import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, Globe, X, Clock, Menu, Grid } from "lucide-react";
import MobileNav from "../components/MobileNav";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const backgrounds = [
    "/photos/1.jpeg",
    "/photos/2.jpeg",
    "/photos/3.jpeg",
    "/photos/4.jpeg",
  ];

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  const techniques = [
    { icon: Camera, text: "Photography" },
    { icon: Video, text: "Videography" },
    { icon: Clock, text: "Time-lapse" },
    { icon: X, text: "Licensed Drone Operations" },
    { icon: Globe, text: "360° VR Tours" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/70 z-10" />
          <img
            src={backgrounds[currentBgIndex]}
            alt="background"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
      </AnimatePresence>

      <div className="fixed top-8 right-3 md:right-8 z-50 flex gap-4">
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
        >
          <Grid size={20} />
        </button>
        <button
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="fixed top-8 left-3 md:left-8 z-50 hidden md:flex flex-col  items-center">
        <Link to="/">
          <h1 className="text-base md:text-2xl font-light tracking-[0.2em]">
            <span className="font-medium">DREY</span>
            <span className="opacity-70">.MIDE</span>
          </h1>
        </Link>
        <div className="h-[1px] w-12 bg-white/30 mt-2 transform transition-all duration-300 hover:w-24 hover:bg-white/50" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Main Introduction */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className=" text-6xl font-light tracking-tight">
                  Drey Mide
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 font-light">
                  Visual Storyteller & Conceptual Artist
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-24 h-0.5 bg-white"
                />
                <p className="text-xs md:text-lg text-gray-300 leading-relaxed">
                  A Visual Storyteller and Conceptual Artist from Nigeria,
                  passionately exploring human stories that highlight our
                  heritage and the circumstantial economy, raising awareness
                  about social issues in Africa and its myriad perspectives.
                </p>
                <p className="text-xs md:text-lg text-gray-300 leading-relaxed">
                  For him, photography transcends mere art; it is a potent
                  medium for storytelling, education, and envisioning a better
                  society.
                </p>
              </motion.div>

              {/* Right Column - Current Work & Expertise */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-white/10 text-xs md:text-base">
                  <h2 className="text-lg md:text-xl font-light mb-4">
                    Current Focus
                  </h2>
                  <p className=" text-gray-300 leading-relaxed mb-6">
                    Presently, his major works and interests revolve around
                    mining across Africa. He has curated two publications on
                    gold and iron ore, respectively, and showcased his work in
                    Barcelona, Spain, in 2024.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Additionally, he has been a significant contributor to the
                    Geological Society of Nigeria&apos;s publication for two
                    consecutive years.
                  </p>
                </div>

                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-white/10 text-xs md:text-base">
                  <h2 className="text-lg md:text-xl font-light mb-4">
                    Content Creation
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    A confident, approachable, and enthusiastic content creator,
                    eager to help businesses of all sizes communicate their
                    greatness.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {techniques.map((technique, index) => (
                      <motion.div
                        key={technique.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <technique.icon className="h-5 w-5" />
                        <span className="text-xs md:text-sm">
                          {technique.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default AboutPage;
