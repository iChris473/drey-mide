import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Camera, Video, Drone } from "lucide-react";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [[page, direction], setPage] = useState([0, 0]);

  const services = [
    { icon: Camera, text: "Photography" },
    { icon: Video, text: "Videography & Time-lapse" },
    { icon: Drone, text: "Licensed Drone Operations" },
  ];

  const navigate = useNavigate();

  const projects = [
    {
      title: "Mining Stories",
      description: "Documenting the rich heritage of African mining",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010876/drey/mines/WhatsApp_Image_2024-12-16_at_11.58.34_bs8jqt.jpg",
    },
    {
      title: "Industrial Narratives",
      description: "Capturing Africa's industrial evolution",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010762/drey/industrial%20energy/WhatsApp_Image_2024-12-16_at_10.39.34_s1tr5s.jpg",
    },
    {
      title: "Heritage Projects",
      description: "Exploring cultural identity through visual storytelling",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010906/drey/segilola/WhatsApp_Image_2024-12-16_at_10.42.24_2_kd6vpq.jpg",
    },
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => paginate(1), 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const paginate = (newDirection) => {
    setIsAutoPlaying(false);
    setPage([page + newDirection, newDirection]);
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + newDirection + projects.length) % projects.length
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <img
              src={projects[currentImageIndex].image}
              alt={projects[currentImageIndex].title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-6 text-center text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 text-5xl font-light"
            >
              Drey Mide
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-xl font-light"
            >
              Visual Storyteller & Conceptual Artist
            </motion.p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-black py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/90 space-y-6"
          >
            <p className="text-lg font-light">
              Passionately exploring human stories that highlight our heritage
              and the circumstantial economy, raising awareness about social
              issues in Africa and its myriad perspectives.
            </p>
            <p className="text-lg font-light">
              Photography transcends mere art; it is a potent medium for
              storytelling, education, and envisioning a better society.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-neutral-900 py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white mb-12"
          >
            Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.text}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-black/50 rounded-lg text-white text-center"
              >
                <service.icon className="mx-auto mb-4 h-8 w-8" />
                <h3 className="text-lg font-light">{service.text}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed z-30 right-10 top-1/2 -translate-y-1/2 flex flex-col space-y-8"
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

export default Home;
