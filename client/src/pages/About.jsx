import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Globe,
  X,
  Menu,
  Grid,
  BadgeCheck,
  BookOpen,
  Users,
  Award,
  Building,
} from "lucide-react";
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

  const expertise = [
    { icon: Camera, text: "Visual Storytelling" },
    { icon: Video, text: "Corporate Documentation" },
    { icon: Globe, text: "Global Exhibition Experience" },
    { icon: BookOpen, text: "Publications & Research" },
    { icon: Users, text: "Youth Empowerment" },
    { icon: Award, text: "Canon Workshop Alumni" },
    { icon: Building, text: "Industrial Photography" },
    { icon: BadgeCheck, text: "Ministry Documentation" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
            window.location.href = "/works";
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

      <div className="fixed top-8 left-3 md:left-8 z-50 hidden md:flex flex-col items-center">
        <Link to="/">
          <h1 className="text-base md:text-2xl font-light tracking-[0.2em]">
            <span className="font-medium">DREY</span>
            <span className="opacity-70">.MIDE</span>
          </h1>
        </Link>
        <div className="h-[1px] w-12 bg-white/30 mt-2 transform transition-all duration-300 hover:w-24 hover:bg-white/50" />
      </div>

      <div className="relative z-10">
        <div className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-6xl font-light tracking-tight">
                  Oluwadamilare Ayomide
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
                  Born in Ibadan, Nigeria, 30 years ago, Drey Mide's journey
                  from modest beginnings to becoming a renowned visual
                  storyteller exemplifies resilience and creativity. With roots
                  in Osun State and a deep passion for God and humanity, he has
                  transformed his art into a powerful medium for education,
                  advocacy, and social change.
                </p>
                <p className="text-xs md:text-lg text-gray-300 leading-relaxed">
                  Through collaborations with Canon and various educational
                  workshops, Drey has refined his expertise in visual narration,
                  using his lens to capture compelling stories that transcend
                  borders and inspire change.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-white/10 text-xs md:text-base">
                  <h2 className="text-lg md:text-xl font-light mb-4">
                    Notable Achievements
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    From his acclaimed exhibition in Abuja (2020) to Barcelona
                    (2024), Drey's work has gained international recognition.
                    His project "Resilience on the Rocks" with NIWIMNRO and MSV
                    Studios highlighted untold stories of women in mining, while
                    his role as official storyteller for Nigeria's Ministry of
                    Mines and Steel Development has documented crucial progress
                    in the sector.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Through his youth empowerment initiatives, Drey has impacted
                    over 250 young Nigerians, providing photography equipment
                    and training. His vision extends to empowering 100,000 young
                    people across Africa in the next five years.
                  </p>
                </div>

                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-white/10 text-xs md:text-base">
                  <h2 className="text-lg md:text-xl font-light mb-4">
                    Areas of Expertise
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {expertise.map((item, index) => (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-xs md:text-sm">{item.text}</span>
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
