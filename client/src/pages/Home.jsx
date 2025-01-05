/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "../components/MobileNav";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [[page, direction], setPage] = useState([0, 0]);
  const [projects, setProjects] = useState([
    {
      title: "Mines",
      description: "A collection of mining photography",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010876/drey/mines/WhatsApp_Image_2024-12-16_at_11.58.34_bs8jqt.jpg",
    },
    {
      title: "Industrial Energy",
      description: "Industrial landscapes and machinery",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010762/drey/industrial%20energy/WhatsApp_Image_2024-12-16_at_10.39.34_s1tr5s.jpg",
    },
    {
      title: "Segilola ",
      description: "A glimpse into the Segilola project",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010906/drey/segilola/WhatsApp_Image_2024-12-16_at_10.42.24_2_kd6vpq.jpg",
    },
    {
      title: "Sustainable Development",
      description: "A collection of sustainable development projects",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010889/drey/sustainable%20development/WhatsApp_Image_2024-12-16_at_10.46.56_g070md.jpg",
    },
    {
      title: "Conferences",
      description: "A collection of conferences and events",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736012006/drey/conferences/WhatsApp_Image_2025-01-04_at_3.00.51_PM_1_rziaqs.jpg",
    },
    {
      title: "AEF",
      description: "A collection of AEF events",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736009692/drey/AEF/WhatsApp_Image_2024-12-16_at_11.26.36_eme05k.jpg",
    },
  ]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const updatedProjects = await Promise.all(
  //         projects.map(async (project) => {
  //           const response = await fetch(
  //             `https://api.pexels.com/v1/search?orientation=landscape&query=${
  //               project.query
  //             }&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`,
  //             {
  //               headers: {
  //                 Authorization: PEXELS_API_KEY,
  //               },
  //             }
  //           );
  //           const data = await response.json();
  //           if (data.photos && data.photos.length > 0) {
  //             return {
  //               ...project,
  //               image: data.photos[0].src.large2x,
  //               photographer: data.photos[0].photographer,
  //               photographerUrl: data.photos[0].photographer_url,
  //             };
  //           }
  //           return project;
  //         })
  //       );
  //       setProjects(updatedProjects);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const paginate = (newDirection) => {
    setIsAutoPlaying(false);
    setPage([page + newDirection, newDirection]);
    setCurrentImageIndex((prevIndex) => {
      const nextIndex =
        (prevIndex + newDirection + projects.length) % projects.length;
      return nextIndex;
    });
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

      {/* Main Image Slider */}
      <div className="relative h-full w-full">
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
            onClick={() =>
              navigate(
                `/gallery/${projects[currentImageIndex].title.toLowerCase()}`
              )
            }
          >
            {/* Image */}
            <img
              src={projects[currentImageIndex].image}
              alt={projects[currentImageIndex].title}
              className="h-full w-full object-cover"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30" />

            {/* Image info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-20 left-6 md:left-10 max-w-xl"
            >
              <Link to="/gallery">
                <h2 className="text-6xl font-light mb-6 text-white text-wrap">
                  {projects[currentImageIndex].title}
                </h2>
              </Link>
              <p className="text-sm text-white/90 font-light mb-2 text-wrap">
                {projects[currentImageIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute z-30 right-10 top-1/2 -translate-y-1/2 flex flex-col space-y-8"
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

      {/* Progress Indicator */}
      <div className="absolute z-30 bottom-10 right-10 flex items-center space-x-3">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentImageIndex(index);
              setPage([index, index > currentImageIndex ? 1 : -1]);
            }}
            className={`h-1 transition-all duration-300 rounded-full ${
              index === currentImageIndex
                ? "w-8 bg-white"
                : "w-4 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Home;
