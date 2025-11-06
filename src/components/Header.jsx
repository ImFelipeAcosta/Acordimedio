import { motion } from 'framer-motion'
import { FaTiktok, FaInstagram, FaYoutube } from 'react-icons/fa'
import { GiAccordion } from 'react-icons/gi'
import { useState } from 'react'
import ProjectInfoModal from './ProjectInfoModal'

const Header = () => {
  const [showProjectInfo, setShowProjectInfo] = useState(false)

  const socialLinks = [
    { icon: FaTiktok, url: 'https://tiktok.com', color: 'hover:bg-black' },
    { icon: FaInstagram, url: 'https://www.instagram.com/acordeon.col/', color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@Acorde%C3%B3nCOL', color: 'hover:bg-red-600' },
  ]

  return (
    <>
      <ProjectInfoModal isOpen={showProjectInfo} onClose={() => setShowProjectInfo(false)} />
      
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-amber-50 to-orange-50 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo y nombre */}
          <motion.button
            onClick={() => setShowProjectInfo(true)}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0"
          >
            <GiAccordion 
              className="text-4xl text-accent" 
            />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-accent">
              ACORDIMEDIO
            </h1>
          </motion.button>

          {/* Redes sociales */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="transition-colors"
              >
                <social.icon 
                  className="text-xl text-accent" 
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.header>
    </>
  )
}

export default Header
