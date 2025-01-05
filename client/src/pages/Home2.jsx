import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Grid, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import MobileNav from "../components/MobileNav";

const Home2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    {
      id: "mines",
      title: "Mines",
      description:
        "A collection of mining photography showcasing the scale and complexity of modern mining operations.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010876/drey/mines/WhatsApp_Image_2024-12-16_at_11.58.34_bs8jqt.jpg",
      stats: { projects: 24, photos: 150, year: 2023 },
    },
    {
      id: "industrial",
      title: "Industrial Energy",
      description:
        "Industrial landscapes and machinery captured in their raw, powerful form.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010762/drey/industrial%20energy/WhatsApp_Image_2024-12-16_at_10.39.34_s1tr5s.jpg",
      stats: { projects: 18, photos: 120, year: 2023 },
    },
    {
      id: "segilola",
      title: "Segilola",
      description:
        "A comprehensive look into the Segilola project, documenting its development and impact.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010906/drey/segilola/WhatsApp_Image_2024-12-16_at_10.42.24_2_kd6vpq.jpg",
      stats: { projects: 12, photos: 85, year: 2024 },
    },
    {
      id: "sustainable",
      title: "Sustainable Development",
      description:
        "Showcasing projects that balance industrial progress with environmental responsibility.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010889/drey/sustainable%20development/WhatsApp_Image_2024-12-16_at_10.46.56_g070md.jpg",
      stats: { projects: 15, photos: 95, year: 2024 },
    },
    {
      id: "conferences",
      title: "Conferences",
      description:
        "Documenting key industry events and professional gatherings.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736012006/drey/conferences/WhatsApp_Image_2025-01-04_at_3.00.51_PM_1_rziaqs.jpg",
      stats: { projects: 30, photos: 200, year: 2024 },
    },
    {
      id: "aef",
      title: "AEF",
      description:
        "Coverage of AEF events, highlighting key moments and discussions.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736009692/drey/AEF/WhatsApp_Image_2024-12-16_at_11.26.36_eme05k.jpg",
      stats: { projects: 20, photos: 140, year: 2024 },
    },
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const paginate = (newDirection) => {
    setIsAutoPlaying(false);
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + sections.length) % sections.length
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Logo */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <h1 className="text-base md:text-2xl font-light tracking-[0.2em]">
          <span className="font-medium">DREY</span>
          <span className="opacity-70">.MIDE</span>
        </h1>
        <div className="h-[1px] w-12 bg-white/30 mt-2 transform transition-all duration-300 hover:w-24 hover:bg-white/50" />
      </div>
      {/* Fixed Navigation */}
      <div className="fixed top-8 right-3 md:right-8 z-50 flex gap-4">
        <button
          onClick={() => setShowGrid(!showGrid)}
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

      {/* Section Counter */}
      <div className="fixed md:left-8 left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
            className="relative w-12 h-6 flex items-center"
          >
            <span className="text-sm font-light mr-2 text-white/50">
              {String(index + 1).padStart(2, "0")}
            </span>
            <motion.div
              className="h-[1px] bg-white"
              initial={{ width: 0 }}
              animate={{
                width: currentIndex === index ? 24 : 12,
                opacity: currentIndex === index ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Grid View */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm p-4 md:p-16 overflow-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowGrid(false);
                  }}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-light mb-2">
                        {section.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Slider */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <img
              src={sections[currentIndex].image}
              alt={sections[currentIndex].title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-2 md:px-16">
              <div className="max-w-4xl md:ml-6 ml-20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 100 }}
                  className="h-[1px] bg-white/50 mb-8"
                />
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-8xl font-light mb-8 pr-6"
                >
                  {sections[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm md:text-xl text-white/80 max-w-2xl mb-12 pr-14 md:pr-0"
                >
                  {sections[currentIndex].description}
                </motion.p>

                {/* View Project Button */}
                <Link to={sections[currentIndex].title.toLowerCase()}>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-12 flex items-center gap-2 group"
                  >
                    <span className="text-sm uppercase tracking-wider">
                      View
                    </span>
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Project Number */}
            <div className="absolute top-8 left-2 md:left-8 flex items-center gap-4">
              <span className="text-6xl font-light opacity-25">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute z-30 right-10 top-1/2 -translate-y-1/2 flex flex-col gap-8"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft size={24} className="text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <ArrowRight size={24} className="text-white" />
        </motion.button>
      </motion.div>
      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Home2;
