import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Plus, Grid, Camera } from "lucide-react";

const Portfolio = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showGrid, setShowGrid] = useState(false);

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

  const scrollToNext = (currentIndex) => {
    const nextSection = sections[currentIndex + 1];
    if (nextSection) {
      document
        .getElementById(nextSection.id)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Fixed Navigation */}
      <div className="fixed top-8 right-8 z-50 flex gap-4">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
        >
          <Grid size={20} />
        </button>
        <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all">
          <Camera size={20} />
        </button>
      </div>

      {/* Section Counter */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
        {sections.map((section, index) => (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            className={`block w-12 h-12 mb-2 relative ${
              hoveredSection === section.id ? "text-white" : "text-white/50"
            }`}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
              <span className="text-sm font-light mr-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <motion.div
                className="h-[1px] bg-current"
                initial={{ width: 0 }}
                animate={{ width: hoveredSection === section.id ? 24 : 12 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Grid View */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm p-8 md:p-16 overflow-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
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
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="h-screen relative snap-start overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="absolute inset-0"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                viewport={{ once: true }}
                className="h-[1px] bg-white/50 mb-8"
              />
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl font-light mb-8"
              >
                {section.title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-xl text-white/80 max-w-2xl mb-12"
              >
                {section.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex gap-12"
              >
                <div>
                  <div className="text-3xl font-light mb-2">
                    {section.stats.projects}
                  </div>
                  <div className="text-sm text-white/60">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-light mb-2">
                    {section.stats.photos}
                  </div>
                  <div className="text-sm text-white/60">Photos</div>
                </div>
                <div>
                  <div className="text-3xl font-light mb-2">
                    {section.stats.year}
                  </div>
                  <div className="text-sm text-white/60">Year</div>
                </div>
              </motion.div>

              {/* View Project Button */}
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="mt-12 flex items-center gap-2 group"
              >
                <span className="text-sm uppercase tracking-wider">
                  View Project
                </span>
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-2"
                />
              </motion.button>
            </div>
          </div>

          {/* Navigation Dots */}
          {index < sections.length - 1 && (
            <button
              onClick={() => scrollToNext(index)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            >
              <ChevronDown size={32} />
            </button>
          )}

          {/* Project Number */}
          <div className="absolute top-8 left-8 flex items-center gap-4">
            <span className="text-6xl font-light opacity-25">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm uppercase tracking-wider opacity-50">
              Project
            </span>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Portfolio;
