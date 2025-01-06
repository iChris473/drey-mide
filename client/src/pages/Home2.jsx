import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Grid, X, Menu, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import pdf from "../assets/pe.pdf";
import Footer from "../components/Footer";

const Home2 = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const navigate = useNavigate();
  const sections = [
    {
      id: "mines",
      title: "Mines",
      description:
        "A collection of mining photography showcasing the scale and complexity of modern mining operations.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010876/drey/mines/WhatsApp_Image_2024-12-16_at_11.58.34_bs8jqt.jpg",
    },
    {
      id: "industrial",
      title: "Industrial Energy",
      description:
        "Industrial landscapes and machinery captured in their raw, powerful form.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010762/drey/industrial%20energy/WhatsApp_Image_2024-12-16_at_10.39.34_s1tr5s.jpg",
    },
    {
      id: "professional",
      title: "Professional Experience",
      description:
        "A showcase of professional projects and experiences across various industries.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736167722/drey/professional%20experience/WhatsApp_Image_2025-01-06_at_11.32.45_AM_y0u5nz.jpg",
      pdfUrl: pdf,
      type: "pdf",
    },
    {
      id: "portraits",
      title: "Portraits",
      description:
        "Capturing the essence and personality of individuals through portrait photography.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736152640/drey/portraits/DSC09812_knyh31.jpg",
    },
    {
      id: "segilola",
      title: "Segilola",
      description:
        "A comprehensive look into the Segilola project, documenting its development and impact.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736010906/drey/segilola/WhatsApp_Image_2024-12-16_at_10.42.24_2_kd6vpq.jpg",
    },
    {
      id: "sustainable",
      title: "Sustainable Development",
      description:
        "Showcasing projects that balance industrial progress with environmental responsibility.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736120930/drey/sustainable%20development/WhatsApp_Image_2025-01-04_at_3.29.56_PM_guk5qu.jpg",
    },
    {
      id: "conferences",
      title: "Conferences",
      description:
        "Documenting key industry events and professional gatherings.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736012006/drey/conferences/WhatsApp_Image_2025-01-04_at_3.00.51_PM_1_rziaqs.jpg",
    },
    {
      id: "aef",
      title: "AEF",
      description:
        "Coverage of AEF events, highlighting key moments and discussions.",
      image:
        "https://res.cloudinary.com/dwsbh0v8b/image/upload/v1736009692/drey/AEF/WhatsApp_Image_2024-12-16_at_11.26.36_eme05k.jpg",
    },
  ];

  const handleSectionClick = (section) => {
    if (section.type === "pdf") {
      setShowPDF(true);
    } else {
      navigate(`/works/${section.title.toLowerCase()}`);
    }
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
      <div className="pt-0">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative h-screen w-full overflow-hidden group cursor-pointer"
            onHoverStart={() => setHoveredSection(index)}
            onHoverEnd={() => setHoveredSection(null)}
            onClick={() => handleSectionClick(section)}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 items-center text-center">
              <div className="max-w-4xl">
                <h2 className="text-7xl md:text-8xl font-extralight mb-6 transform transition-all duration-500 group-hover:translate-x-0">
                  {section.title}
                </h2>
                <p className="text-sm mx-auto md:text-lg text-white/80 max-w-xl mb-8 opacity-100 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {section.description}
                </p>
                <motion.button className="flex items-center justify-center gap-2 opacity-0 w-full group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span className="text-sm uppercase tracking-wider">
                    {section.type === "pdf" ? "View" : "View Gallery"}
                  </span>
                  {section.type === "pdf" ? (
                    <FileText />
                  ) : (
                    <ArrowRight className="transition-transform group-hover:translate-x-2" />
                  )}
                </motion.button>
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

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {showPDF && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col"
          >
            <div className="flex justify-between items-center p-4 bg-black/50">
              <h3 className="text-xl">Professional Experience</h3>
              <button
                onClick={() => setShowPDF(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={sections.find((s) => s.id === "professional").pdfUrl}
                className="w-full h-full rounded-lg"
                title="Professional Experience PDF"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <Footer />
    </div>
  );
};

export default Home2;
