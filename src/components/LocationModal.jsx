import { motion } from 'framer-motion'
import { FaTimes, FaMapMarkerAlt, FaBookOpen, FaImages, FaLightbulb, FaMusic } from 'react-icons/fa'
import { GiAccordion } from 'react-icons/gi'

const LocationModal = ({ location, onClose }) => {
  // Mapear colores de Tailwind a códigos hexadecimales para el scrollbar
  const colorMap = {
    'bg-red-500': '#ef4444',
    'bg-green-500': '#22c55e',
    'bg-blue-500': '#3b82f6',
    'bg-yellow-500': '#eab308',
    'bg-purple-500': '#a855f7'
  }
  
  // Mapear colores para el botón de cerrar (versiones más claras/pasteles)
  const buttonColorMap = {
    'bg-red-500': { bg: '#fca5a5', hover: '#f87171' },      // red-300/red-400
    'bg-green-500': { bg: '#86efac', hover: '#4ade80' },    // green-300/green-400
    'bg-blue-500': { bg: '#93c5fd', hover: '#60a5fa' },     // blue-300/blue-400
    'bg-yellow-500': { bg: '#fde047', hover: '#facc15' },   // yellow-300/yellow-400
    'bg-purple-500': { bg: '#d8b4fe', hover: '#c084fc' }    // purple-300/purple-400
  }
  
  const scrollbarColor = colorMap[location.color] || '#ef4444'
  const buttonColors = buttonColorMap[location.color] || { bg: '#fca5a5', hover: '#f87171' }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh]">
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative bg-white w-full h-full shadow-2xl rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Contenedor con scroll */}
          <div 
            className="overflow-y-auto overflow-x-hidden h-[90vh] p-8 relative z-0"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: `${scrollbarColor} #f3f4f6`,
              isolation: 'isolate'
            }}
          >
            {/* Botón cerrar - DENTRO del scroll para que se mueva con el contenido */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute w-12 h-12 text-white flex items-center justify-center shadow-lg z-[80] rounded-lg"
              style={{
                top: '20px',
                right: '20px',
                background: buttonColors.bg,
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = buttonColors.hover}
              onMouseLeave={(e) => e.currentTarget.style.background = buttonColors.bg}
            >
              <FaTimes className="text-2xl" />
            </motion.button>

            {/* Manchas de acuarela - ABSOLUTAS dentro del contenido */}
            {/* Mancha verde turquesa grande - superior derecha */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '120px',
                   right: '80px',
                   width: '200px',
                   height: '180px',
                   background: 'radial-gradient(ellipse at 30% 40%, rgba(168, 230, 207, 0.55) 0%, rgba(168, 230, 207, 0.28) 40%, transparent 70%)',
                   filter: 'blur(1px)',
                   borderRadius: '48% 52% 45% 55% / 60% 45% 55% 40%',
                   transform: 'rotate(-12deg)'
                 }} />
            
            {/* Mancha amarilla mediana - izquierda centro */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '300px',
                   left: '80px',
                   width: '160px',
                   height: '150px',
                   background: 'radial-gradient(ellipse at 60% 30%, rgba(255, 229, 160, 0.58) 0%, rgba(255, 229, 160, 0.32) 45%, transparent 75%)',
                   filter: 'blur(0.8px)',
                   borderRadius: '55% 45% 60% 40% / 45% 55% 45% 55%',
                   transform: 'rotate(25deg)'
                 }} />
            
            {/* Manchas adicionales para la parte inferior */}
            {/* Mancha verde agua grande - inferior derecha */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '850px',
                   right: '100px',
                   width: '180px',
                   height: '170px',
                   background: 'radial-gradient(ellipse at 40% 45%, rgba(168, 230, 207, 0.56) 0%, rgba(168, 230, 207, 0.30) 42%, transparent 72%)',
                   filter: 'blur(1px)',
                   borderRadius: '52% 48% 50% 50% / 55% 45% 55% 45%',
                   transform: 'rotate(-18deg)'
                 }} />
            
            {/* Mancha amarillo limón - inferior izquierda */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1000px',
                   left: '15%',
                   width: '150px',
                   height: '145px',
                   background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 229, 160, 0.52) 0%, rgba(255, 229, 160, 0.28) 48%, transparent 78%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '48% 52% 55% 45% / 50% 50% 50% 50%',
                   transform: 'rotate(28deg)'
                 }} />
            
            {/* Mancha rosa coral suave - inferior centro */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1100px',
                   left: '40%',
                   width: '165px',
                   height: '158px',
                   background: 'radial-gradient(ellipse at 45% 55%, rgba(255, 179, 186, 0.50) 0%, rgba(255, 179, 186, 0.26) 50%, transparent 80%)',
                   filter: 'blur(0.95px)',
                   borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                   transform: 'rotate(-25deg)'
                 }} />
            
            {/* Mancha azul lavanda - muy inferior derecha */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1200px',
                   right: '20%',
                   width: '155px',
                   height: '148px',
                   background: 'radial-gradient(ellipse at 50% 40%, rgba(184, 212, 232, 0.54) 0%, rgba(184, 212, 232, 0.29) 45%, transparent 75%)',
                   filter: 'blur(1.05px)',
                   borderRadius: '55% 45% 50% 50% / 48% 52% 48% 52%',
                   transform: 'rotate(15deg)'
                 }} />
            
            {/* Mancha lila pastel - final */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1300px',
                   left: '25%',
                   width: '140px',
                   height: '135px',
                   background: 'radial-gradient(ellipse at 52% 48%, rgba(221, 164, 238, 0.48) 0%, rgba(221, 164, 238, 0.25) 50%, transparent 78%)',
                   filter: 'blur(1px)',
                   borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
                   transform: 'rotate(-32deg)'
                 }} />
            
            {/* Mancha naranja melocotón - inferior */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '750px',
                   right: '18%',
                   width: '170px',
                   height: '162px',
                   background: 'radial-gradient(ellipse at 48% 52%, rgba(255, 200, 124, 0.52) 0%, rgba(255, 200, 124, 0.27) 48%, transparent 76%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '52% 48% 48% 52% / 50% 50% 50% 50%',
                   transform: 'rotate(22deg)'
                 }} />
            
            {/* Mancha verde menta - muy inferior izquierda */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '950px',
                   left: '12%',
                   width: '145px',
                   height: '138px',
                   background: 'radial-gradient(ellipse at 45% 50%, rgba(168, 230, 207, 0.54) 0%, rgba(168, 230, 207, 0.28) 46%, transparent 74%)',
                   filter: 'blur(1px)',
                   borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                   transform: 'rotate(-15deg)'
                 }} />
            
            {/* Mancha rosa suave - muy inferior centro */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1150px',
                   left: '45%',
                   width: '160px',
                   height: '155px',
                   background: 'radial-gradient(ellipse at 50% 48%, rgba(255, 179, 186, 0.33) 0%, rgba(255, 179, 186, 0.14) 50%, transparent 78%)',
                   filter: 'blur(1.05px)',
                   borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                   transform: 'rotate(28deg)'
                 }} />
            
            {/* Mancha amarillo pastel - casi final */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1250px',
                   right: '22%',
                   width: '152px',
                   height: '146px',
                   background: 'radial-gradient(ellipse at 52% 46%, rgba(255, 229, 160, 0.37) 0%, rgba(255, 229, 160, 0.17) 47%, transparent 76%)',
                   filter: 'blur(1px)',
                   borderRadius: '55% 45% 48% 52% / 50% 50% 50% 50%',
                   transform: 'rotate(-20deg)'
                 }} />
            
            {/* Mancha azul lavanda suave - final inferior */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '650px',
                   left: '28%',
                   width: '165px',
                   height: '158px',
                   background: 'radial-gradient(ellipse at 48% 52%, rgba(184, 212, 232, 0.35) 0%, rgba(184, 212, 232, 0.16) 48%, transparent 77%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                   transform: 'rotate(18deg)'
                 }} />
            
            {/* Mancha lila coral - final absoluto */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1350px',
                   right: '15%',
                   width: '148px',
                   height: '142px',
                   background: 'radial-gradient(ellipse at 50% 50%, rgba(221, 164, 238, 0.32) 0%, rgba(221, 164, 238, 0.14) 50%, transparent 78%)',
                   filter: 'blur(1px)',
                   borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                   transform: 'rotate(-25deg)'
                 }} />
            
            {/* Mancha rosa coral - superior izquierda */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '200px',
                   left: '12%',
                   width: '140px',
                   height: '135px',
                   background: 'radial-gradient(ellipse at 40% 50%, rgba(255, 179, 186, 0.32) 0%, rgba(255, 179, 186, 0.12) 50%, transparent 80%)',
                   filter: 'blur(1.2px)',
                   borderRadius: '40% 60% 55% 45% / 50% 60% 40% 50%',
                   transform: 'rotate(-8deg)'
                 }} />
            
            {/* Mancha azul cielo - medio */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '420px',
                   right: '10%',
                   width: '175px',
                   height: '165px',
                   background: 'radial-gradient(ellipse at 50% 40%, rgba(184, 212, 232, 0.38) 0%, rgba(184, 212, 232, 0.18) 42%, transparent 72%)',
                   filter: 'blur(1px)',
                   borderRadius: '58% 42% 48% 52% / 45% 52% 48% 55%',
                   transform: 'rotate(18deg)'
                 }} />
            
            {/* Mancha lila pequeña */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '550px',
                   left: '40%',
                   width: '120px',
                   height: '115px',
                   background: 'radial-gradient(ellipse at 55% 45%, rgba(221, 164, 238, 0.3) 0%, rgba(221, 164, 238, 0.14) 48%, transparent 78%)',
                   filter: 'blur(0.9px)',
                   borderRadius: '45% 55% 52% 48% / 55% 48% 52% 45%',
                   transform: 'rotate(-22deg)'
                 }} />
            
            {/* Mancha verde menta */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '680px',
                   left: '18%',
                   width: '155px',
                   height: '148px',
                   background: 'radial-gradient(ellipse at 35% 55%, rgba(168, 230, 207, 0.36) 0%, rgba(168, 230, 207, 0.16) 44%, transparent 74%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '50% 50% 45% 55% / 52% 48% 52% 48%',
                   transform: 'rotate(35deg)'
                 }} />
            
            {/* Mancha durazno */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '360px',
                   right: '28%',
                   width: '145px',
                   height: '138px',
                   background: 'radial-gradient(ellipse at 45% 60%, rgba(255, 200, 170, 0.34) 0%, rgba(255, 200, 170, 0.15) 46%, transparent 76%)',
                   filter: 'blur(0.95px)',
                   borderRadius: '52% 48% 58% 42% / 48% 55% 45% 52%',
                   transform: 'rotate(-15deg)'
                 }} />
            
            {/* Mancha amarillo limón difusa */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '480px',
                   left: '32%',
                   width: '130px',
                   height: '125px',
                   background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 229, 160, 0.28) 0%, rgba(255, 229, 160, 0.12) 50%, transparent 82%)',
                   filter: 'blur(1.3px)',
                   borderRadius: '48% 52% 50% 50% / 55% 45% 55% 45%',
                   transform: 'rotate(42deg)'
                 }} />
            
            {/* Mancha verde agua adicional */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '260px',
                   right: '38%',
                   width: '125px',
                   height: '120px',
                   background: 'radial-gradient(ellipse at 45% 55%, rgba(168, 230, 207, 0.3) 0%, rgba(168, 230, 207, 0.13) 48%, transparent 78%)',
                   filter: 'blur(1px)',
                   borderRadius: '50% 50% 48% 52% / 55% 45% 55% 45%',
                   transform: 'rotate(-25deg)'
                 }} />
            
            {/* Mancha coral claro */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '600px',
                   left: '28%',
                   width: '135px',
                   height: '128px',
                   background: 'radial-gradient(ellipse at 50% 45%, rgba(255, 179, 186, 0.45) 0%, rgba(255, 179, 186, 0.22) 50%, transparent 80%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '45% 55% 50% 50% / 52% 48% 52% 48%',
                   transform: 'rotate(18deg)'
                 }} />
            
            {/* Manchas adicionales parte inferior */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '280px',
                   right: '5%',
                   width: '155px',
                   height: '148px',
                   background: 'radial-gradient(ellipse at 48% 52%, rgba(168, 230, 207, 0.48) 0%, rgba(168, 230, 207, 0.24) 46%, transparent 74%)',
                   filter: 'blur(1.2px)',
                   borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                   transform: 'rotate(-25deg)'
                 }} />
            
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '180px',
                   left: '8%',
                   width: '140px',
                   height: '135px',
                   background: 'radial-gradient(ellipse at 52% 48%, rgba(255, 229, 160, 0.5) 0%, rgba(255, 229, 160, 0.26) 48%, transparent 76%)',
                   filter: 'blur(1px)',
                   borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                   transform: 'rotate(22deg)'
                 }} />
            
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '100px',
                   right: '15%',
                   width: '165px',
                   height: '158px',
                   background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 212, 232, 0.52) 0%, rgba(184, 212, 232, 0.28) 50%, transparent 78%)',
                   filter: 'blur(1.3px)',
                   borderRadius: '52% 48% 48% 52% / 50% 50% 50% 50%',
                   transform: 'rotate(-18deg)'
                 }} />
            
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '50px',
                   left: '25%',
                   width: '130px',
                   height: '125px',
                   background: 'radial-gradient(ellipse at 45% 55%, rgba(255, 179, 186, 0.46) 0%, rgba(255, 179, 186, 0.23) 52%, transparent 82%)',
                   filter: 'blur(0.9px)',
                   borderRadius: '55% 45% 52% 48% / 48% 52% 48% 52%',
                   transform: 'rotate(30deg)'
                 }} />
            
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '40px',
                   right: '35%',
                   width: '145px',
                   height: '138px',
                   background: 'radial-gradient(ellipse at 50% 48%, rgba(221, 164, 238, 0.44) 0%, rgba(221, 164, 238, 0.21) 50%, transparent 80%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                   transform: 'rotate(-15deg)'
                 }} />

            {/* 10 MANCHAS ADICIONALES */}
            {/* Mancha 1 - Verde agua brillante */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '150px',
                   left: '5%',
                   width: '185px',
                   height: '175px',
                   background: 'radial-gradient(ellipse at 42% 38%, rgba(168, 230, 207, 0.60) 0%, rgba(168, 230, 207, 0.35) 45%, transparent 75%)',
                   filter: 'blur(1.2px)',
                   borderRadius: '48% 52% 55% 45% / 50% 55% 45% 50%',
                   transform: 'rotate(-20deg)'
                 }} />
            
            {/* Mancha 2 - Amarillo intenso */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '380px',
                   right: '8%',
                   width: '170px',
                   height: '165px',
                   background: 'radial-gradient(ellipse at 55% 50%, rgba(255, 229, 160, 0.62) 0%, rgba(255, 229, 160, 0.38) 48%, transparent 78%)',
                   filter: 'blur(1px)',
                   borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                   transform: 'rotate(30deg)'
                 }} />
            
            {/* Mancha 3 - Rosa coral vibrante */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '520px',
                   left: '42%',
                   width: '160px',
                   height: '155px',
                   background: 'radial-gradient(ellipse at 48% 52%, rgba(255, 179, 186, 0.58) 0%, rgba(255, 179, 186, 0.32) 50%, transparent 80%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '45% 55% 48% 52% / 52% 48% 52% 48%',
                   transform: 'rotate(-25deg)'
                 }} />
            
            {/* Mancha 4 - Azul cielo suave */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '720px',
                   right: '25%',
                   width: '175px',
                   height: '168px',
                   background: 'radial-gradient(ellipse at 50% 45%, rgba(184, 212, 232, 0.56) 0%, rgba(184, 212, 232, 0.30) 46%, transparent 76%)',
                   filter: 'blur(1.3px)',
                   borderRadius: '50% 50% 52% 48% / 55% 45% 55% 45%',
                   transform: 'rotate(22deg)'
                 }} />
            
            {/* Mancha 5 - Lila pastel */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '880px',
                   left: '18%',
                   width: '150px',
                   height: '145px',
                   background: 'radial-gradient(ellipse at 52% 48%, rgba(221, 164, 238, 0.54) 0%, rgba(221, 164, 238, 0.28) 50%, transparent 78%)',
                   filter: 'blur(1px)',
                   borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                   transform: 'rotate(-18deg)'
                 }} />
            
            {/* Mancha 6 - Verde menta grande */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1050px',
                   right: '12%',
                   width: '190px',
                   height: '182px',
                   background: 'radial-gradient(ellipse at 45% 55%, rgba(168, 230, 207, 0.58) 0%, rgba(168, 230, 207, 0.33) 47%, transparent 77%)',
                   filter: 'blur(1.4px)',
                   borderRadius: '55% 45% 48% 52% / 50% 50% 50% 50%',
                   transform: 'rotate(28deg)'
                 }} />
            
            {/* Mancha 7 - Durazno suave */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   top: '1180px',
                   left: '35%',
                   width: '165px',
                   height: '158px',
                   background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 200, 170, 0.56) 0%, rgba(255, 200, 170, 0.30) 50%, transparent 80%)',
                   filter: 'blur(1.1px)',
                   borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
                   transform: 'rotate(-30deg)'
                 }} />
            
            {/* Mancha 8 - Amarillo limón brillante */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '320px',
                   left: '22%',
                   width: '155px',
                   height: '150px',
                   background: 'radial-gradient(ellipse at 48% 52%, rgba(255, 229, 160, 0.60) 0%, rgba(255, 229, 160, 0.34) 48%, transparent 76%)',
                   filter: 'blur(1.2px)',
                   borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                   transform: 'rotate(35deg)'
                 }} />
            
            {/* Mancha 9 - Rosa coral intenso */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '220px',
                   right: '30%',
                   width: '170px',
                   height: '165px',
                   background: 'radial-gradient(ellipse at 50% 48%, rgba(255, 179, 186, 0.62) 0%, rgba(255, 179, 186, 0.36) 50%, transparent 78%)',
                   filter: 'blur(1px)',
                   borderRadius: '45% 55% 52% 48% / 50% 50% 50% 50%',
                   transform: 'rotate(-22deg)'
                 }} />
            
            {/* Mancha 10 - Azul lavanda grande */}
            <div className="absolute pointer-events-none z-[1]"
                 style={{
                   bottom: '140px',
                   left: '15%',
                   width: '180px',
                   height: '172px',
                   background: 'radial-gradient(ellipse at 52% 48%, rgba(184, 212, 232, 0.58) 0%, rgba(184, 212, 232, 0.32) 46%, transparent 76%)',
                   filter: 'blur(1.3px)',
                   borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                   transform: 'rotate(18deg)'
                 }} />

            {/* Header con color de ubicación */}
            <div className={`relative ${location.color} text-white p-6 mb-6 shadow-lg -mx-8 -mt-8 px-8 z-10`}
                 style={{
                   clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 96% 94%, 90% 100%, 82% 98%, 75% 95%, 65% 98%, 55% 100%, 45% 97%, 35% 99%, 25% 96%, 15% 100%, 8% 95%, 3% 92%, 0% 88%)',
                   filter: 'blur(0.3px)'
                 }}>
              <h2 className="text-4xl font-bold mb-2" style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)' }}>
                {location.name}
              </h2>
              <p className="text-lg opacity-95" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)' }}>
                {location.region}
              </p>
            </div>

            {/* Descripción */}
            <div className="relative mb-8 z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Descripción
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {location.description}
              </p>
            </div>

            {/* Historia */}
            <div className="relative mb-8 p-6 bg-amber-50 rounded-xl shadow-md z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Historia
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {location.history}
              </p>
            </div>

            {/* Galería */}
            <div className="relative mb-8 z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Galería
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {location.images.map((img, idx) => (
                  <div key={idx} className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={`/images/${img}`} 
                      alt={`${location.name} ${idx + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Manchas de acuarela alrededor de la galería */}
              <div className="absolute pointer-events-none z-[1]"
                   style={{
                     bottom: '-20px',
                     left: '3%',
                     width: '160px',
                     height: '152px',
                     background: 'radial-gradient(ellipse at 48% 52%, rgba(168, 230, 207, 0.56) 0%, rgba(168, 230, 207, 0.28) 46%, transparent 74%)',
                     filter: 'blur(1.2px)',
                     borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                     transform: 'rotate(-22deg)'
                   }} />
              
              <div className="absolute pointer-events-none z-[1]"
                   style={{
                     top: '50%',
                     right: '-30px',
                     width: '145px',
                     height: '138px',
                     background: 'radial-gradient(ellipse at 50% 48%, rgba(255, 179, 186, 0.54) 0%, rgba(255, 179, 186, 0.28) 50%, transparent 78%)',
                     filter: 'blur(1.1px)',
                     borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
                     transform: 'rotate(25deg)'
                   }} />
            </div>

            {/* Dato Curioso */}
            <div className="relative mb-8 p-6 bg-purple-50 rounded-xl shadow-md z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Dato Curioso
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {location.curiosity}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LocationModal


