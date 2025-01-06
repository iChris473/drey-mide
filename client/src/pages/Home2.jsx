import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Grid, X, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "../components/MobileNav";

const Home2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const navigate = useNavigate();
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
      id: "portraits",
      title: "Portraits",
      description:
        "Capturing the essence and personality of individuals through portrait photography.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736152640/drey/portraits/DSC09812_knyh31.jpg",
      stats: { projects: 10, photos: 70, year: 2023 },
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
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736120930/drey/sustainable%20development/WhatsApp_Image_2025-01-04_at_3.29.56_PM_guk5qu.jpg",
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
    <div className="min-h-screen bg-white text-white">
      {/* Logo */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <Link to="/">
          <h1 className="text-base md:text-2xl font-light tracking-[0.2em]">
            <span className="font-medium">DREY</span>
            <span className="opacity-70">.MIDE</span>
          </h1>
        </Link>
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

      {/* Main Stacked Sections */}
      <div className="pt- ">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative h-screen w-full overflow-hidden group cursor-pointer"
            onHoverStart={() => setHoveredSection(index)}
            onHoverEnd={() => setHoveredSection(null)}
            onClick={() => navigate(`/works/${section.title.toLowerCase()}`)}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 items-center text-center">
              <div className="max-w-4xl">
                {/* <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredSection === index ? 100 : 0 }}
                  className="h-[1px] bg-white/50 mb-8"
                  transition={{ duration: 0.5 }}
                /> */}
                <h2 className="text-6xl font-light mb-6 transform transition-all duration-500 group-hover:translate-x-0">
                  {section.title}
                </h2>
                <p className="text-sm md:text-lg text-white/80 max-w-xl mb-8 opacity-100 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {section.description}
                </p>
                <Link to={`/works/${section.title.toLowerCase()}`}>
                  <motion.button className="flex items-center justify-center gap-2 opacity-0 w-full group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <span className="text-sm uppercase tracking-wider">
                      View Gallery
                    </span>
                    <ArrowRight className="transition-transform group-hover:translate-x-2" />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Section Number */}
            <div className="absolute top-8 left-8 opacity-25">
              <span className="text-6xl font-light">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
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
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setShowGrid(false)}
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

      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Home2;
