import { Menu, X, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import navLinks from "../../utils/navlinks";

const Header2 = ({ setIsMenuOpen, isMenuOpen }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Gradient background with blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

      <div className="relative flex justify-between items-center px-6 md:px-12 py-6">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-16">
          <Link to="/" className="group">
            <motion.div className="relative" transition={{ duration: 0.3 }}>
              <h1 className="text-xl md:text-2xl font-light tracking-[0.2em] text-black">
                <span className="font-medium">DREY</span>
                <span className="opacity-70">.MIDE</span>
              </h1>
              <motion.div
                className="h-[1px] bg-black/30 w-0 group-hover:w-full transition-all duration-300"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-light tracking-wider text-black/80 group-hover:text-black transition-colors">
                  {item.name}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-black/30 w-0 group-hover:w-full transition-all duration-300"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Social Links and Mobile Menu */}
        <div className="flex items-center space-x-8">
          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              {
                icon: Instagram,
                href: "https://instagram.com",
                label: "Instagram",
              },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Mail, href: "mailto:hello@drey.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-2 rounded-full hover:bg-black/5 transition-colors">
                  <Icon
                    size={20}
                    className="text-black/70 group-hover:text-black transition-colors"
                  />
                </div>
                <motion.span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-wider opacity-0 group-hover:opacity-70 transition-opacity">
                  {label}
                </motion.span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-black/5 transition-colors md:hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X size={24} className="text-black" />
                ) : (
                  <Menu size={24} className="text-black" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header2;
