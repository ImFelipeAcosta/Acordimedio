import { motion } from 'framer-motion'
import { FaTimes, FaPlay, FaFilm } from 'react-icons/fa'
import { GiAccordion } from 'react-icons/gi'
import { useState, useEffect } from 'react'

const DocumentalModal = ({ onClose }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Pausar música de fondo cuando se abre el modal
  useEffect(() => {
    return () => {
      // Reanudar música cuando se cierra el modal
      if (window.audioController) {
        window.audioController.play()
      }
    }
  }, [])

  // Pausar el video cuando se cierra el modal
  const handleClose = () => {
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full relative overflow-hidden"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenedor con scroll interno */}
        <div 
          className="overflow-y-auto overflow-x-hidden h-[90vh] relative"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#DC2626 #f3f4f6',
            isolation: 'isolate'
          }}
        >
          {/* Botón cerrar con forma acuarela - DENTRO del scroll */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="absolute w-12 h-12 bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-50 rounded-lg"
            style={{
              top: '20px',
              right: '20px',
              filter: 'blur(0.3px)'
            }}
          >
            <FaTimes className="text-xl" />
          </motion.button>

          {/* Manchas de acuarela - DIRECTAMENTE dentro del scroll como LocationModal */}
          {/* Mancha roja - superior izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '180px',
                 left: '8%',
                 width: '200px',
                 height: '190px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.55) 0%, rgba(239, 68, 68, 0.28) 45%, transparent 75%)',
                 filter: 'blur(1.5px)',
                 borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-15deg)'
               }} />
          
          {/* Mancha naranja - superior derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '220px',
                 right: '10%',
                 width: '180px',
                 height: '170px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(249, 115, 22, 0.50) 0%, rgba(249, 115, 22, 0.25) 42%, transparent 72%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(20deg)'
               }} />
          
          {/* Mancha rosa - medio */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '500px',
                 left: '12%',
                 width: '165px',
                 height: '155px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(244, 114, 182, 0.48) 0%, rgba(244, 114, 182, 0.24) 48%, transparent 76%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
                 transform: 'rotate(-22deg)'
               }} />
          
          {/* Mancha amarilla - medio derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '600px',
                 right: '8%',
                 width: '185px',
                 height: '175px',
                 background: 'radial-gradient(ellipse at 50% 48%, rgba(251, 191, 36, 0.52) 0%, rgba(251, 191, 36, 0.26) 44%, transparent 74%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '55% 45% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(18deg)'
               }} />
          
          {/* Mancha coral - inferior izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '800px',
                 left: '15%',
                 width: '170px',
                 height: '160px',
                 background: 'radial-gradient(ellipse at 45% 55%, rgba(251, 113, 133, 0.50) 0%, rgba(251, 113, 133, 0.25) 45%, transparent 75%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
                 transform: 'rotate(-18deg)'
               }} />
          
          {/* Mancha naranja claro - medio centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '400px',
                 left: '42%',
                 width: '155px',
                 height: '145px',
                 background: 'radial-gradient(ellipse at 52% 50%, rgba(253, 186, 116, 0.48) 0%, rgba(253, 186, 116, 0.24) 48%, transparent 78%)',
                 filter: 'blur(1.1px)',
                 borderRadius: '50% 50% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(28deg)'
               }} />
          
          {/* Mancha roja intensa - superior centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '280px',
                 left: '32%',
                 width: '175px',
                 height: '165px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(220, 38, 38, 0.46) 0%, rgba(220, 38, 38, 0.23) 42%, transparent 72%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '52% 48% 48% 52% / 50% 50% 50% 50%',
                 transform: 'rotate(-25deg)'
               }} />
          
          {/* Mancha rosa suave - inferior derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '950px',
                 right: '12%',
                 width: '165px',
                 height: '155px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(252, 165, 165, 0.50) 0%, rgba(252, 165, 165, 0.25) 46%, transparent 76%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '45% 55% 52% 48% / 55% 45% 55% 45%',
                 transform: 'rotate(15deg)'
               }} />
          
          {/* Mancha verde menta */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '350px',
                 left: '18%',
                 width: '145px',
                 height: '138px',
                 background: 'radial-gradient(ellipse at 45% 50%, rgba(134, 239, 172, 0.45) 0%, rgba(134, 239, 172, 0.22) 48%, transparent 76%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                 transform: 'rotate(-12deg)'
               }} />
          
          {/* Mancha lila */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '680px',
                 left: '35%',
                 width: '150px',
                 height: '142px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(196, 181, 253, 0.48) 0%, rgba(196, 181, 253, 0.24) 45%, transparent 75%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                 transform: 'rotate(22deg)'
               }} />
          
          {/* Mancha azul cielo - superior derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '150px',
                 right: '15%',
                 width: '165px',
                 height: '158px',
                 background: 'radial-gradient(ellipse at 45% 50%, rgba(96, 165, 250, 0.52) 0%, rgba(96, 165, 250, 0.26) 45%, transparent 75%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(-18deg)'
               }} />
          
          {/* Mancha turquesa - medio */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '450px',
                 right: '20%',
                 width: '175px',
                 height: '168px',
                 background: 'radial-gradient(ellipse at 50% 48%, rgba(45, 212, 191, 0.50) 0%, rgba(45, 212, 191, 0.25) 48%, transparent 76%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
                 transform: 'rotate(25deg)'
               }} />
          
          {/* Mancha melocotón - superior izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '200px',
                 left: '25%',
                 width: '155px',
                 height: '148px',
                 background: 'radial-gradient(ellipse at 52% 52%, rgba(251, 146, 60, 0.48) 0%, rgba(251, 146, 60, 0.24) 46%, transparent 76%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-20deg)'
               }} />
          
          {/* Mancha rosa claro - medio inferior */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '750px',
                 right: '25%',
                 width: '160px',
                 height: '152px',
                 background: 'radial-gradient(ellipse at 48% 50%, rgba(249, 168, 212, 0.50) 0%, rgba(249, 168, 212, 0.25) 45%, transparent 75%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '55% 45% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(15deg)'
               }} />
          
          {/* Mancha amarillo limón - inferior izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '900px',
                 left: '10%',
                 width: '170px',
                 height: '162px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(253, 224, 71, 0.54) 0%, rgba(253, 224, 71, 0.27) 48%, transparent 78%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
                 transform: 'rotate(-15deg)'
               }} />
          
          {/* Mancha coral intenso - medio centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '550px',
                 left: '45%',
                 width: '145px',
                 height: '138px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(248, 113, 113, 0.52) 0%, rgba(248, 113, 113, 0.26) 45%, transparent 75%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '52% 48% 48% 52% / 50% 50% 50% 50%',
                 transform: 'rotate(30deg)'
               }} />
          
          {/* Mancha verde lima - inferior derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1000px',
                 right: '15%',
                 width: '158px',
                 height: '150px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(163, 230, 53, 0.48) 0%, rgba(163, 230, 53, 0.24) 46%, transparent 76%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '50% 50% 55% 45% / 52% 48% 52% 48%',
                 transform: 'rotate(-25deg)'
               }} />
          
          {/* Mancha lavanda - medio superior */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '320px',
                 right: '35%',
                 width: '150px',
                 height: '143px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.50) 0%, rgba(167, 139, 250, 0.25) 48%, transparent 78%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                 transform: 'rotate(18deg)'
               }} />
          
          {/* Mancha salmón - medio izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '650px',
                 left: '8%',
                 width: '165px',
                 height: '157px',
                 background: 'radial-gradient(ellipse at 45% 55%, rgba(254, 159, 145, 0.52) 0%, rgba(254, 159, 145, 0.26) 45%, transparent 75%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '52% 48% 52% 48% / 50% 50% 50% 50%',
                 transform: 'rotate(-12deg)'
               }} />
          
          {/* Mancha cyan - inferior centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1050px',
                 left: '35%',
                 width: '155px',
                 height: '148px',
                 background: 'radial-gradient(ellipse at 50% 48%, rgba(34, 211, 238, 0.50) 0%, rgba(34, 211, 238, 0.25) 46%, transparent 76%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(22deg)'
               }} />
          
          {/* Mancha naranja suave - superior centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '180px',
                 left: '50%',
                 width: '148px',
                 height: '140px',
                 background: 'radial-gradient(ellipse at 52% 50%, rgba(255, 183, 77, 0.48) 0%, rgba(255, 183, 77, 0.24) 48%, transparent 78%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '48% 52% 55% 45% / 48% 52% 48% 52%',
                 transform: 'rotate(-28deg)'
               }} />
          
          {/* Mancha fucsia - medio derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '720px',
                 right: '8%',
                 width: '162px',
                 height: '154px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(236, 72, 153, 0.50) 0%, rgba(236, 72, 153, 0.25) 45%, transparent 75%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '52% 48% 50% 50% / 50% 50% 50% 50%',
                 transform: 'rotate(16deg)'
               }} />
          
          {/* Mancha verde agua - inferior */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1100px',
                 left: '18%',
                 width: '172px',
                 height: '164px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(94, 234, 212, 0.52) 0%, rgba(94, 234, 212, 0.26) 48%, transparent 78%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '48% 52% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-20deg)'
               }} />
          
          {/* Mancha índigo - superior */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '240px',
                 left: '12%',
                 width: '152px',
                 height: '145px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(129, 140, 248, 0.48) 0%, rgba(129, 140, 248, 0.24) 46%, transparent 76%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                 transform: 'rotate(24deg)'
               }} />
          
          {/* MANCHAS ADICIONALES PARA LA ZONA INFERIOR (Créditos) */}
          {/* Mancha roja pastel - zona créditos 1 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1150px',
                 left: '8%',
                 width: '175px',
                 height: '168px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(252, 165, 165, 0.55) 0%, rgba(252, 165, 165, 0.28) 48%, transparent 78%)',
                 filter: 'blur(1.5px)',
                 borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                 transform: 'rotate(-18deg)'
               }} />
          
          {/* Mancha amarilla dorada - zona créditos 2 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1180px',
                 right: '12%',
                 width: '168px',
                 height: '160px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(250, 204, 21, 0.56) 0%, rgba(250, 204, 21, 0.28) 46%, transparent 76%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '52% 48% 55% 45% / 48% 52% 48% 52%',
                 transform: 'rotate(22deg)'
               }} />
          
          {/* Mancha verde esmeralda - zona créditos 3 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1220px',
                 left: '30%',
                 width: '162px',
                 height: '155px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(52, 211, 153, 0.52) 0%, rgba(52, 211, 153, 0.26) 45%, transparent 75%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-25deg)'
               }} />
          
          {/* Mancha azul océano - zona créditos 4 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1260px',
                 right: '25%',
                 width: '170px',
                 height: '163px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.54) 0%, rgba(59, 130, 246, 0.27) 48%, transparent 78%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
                 transform: 'rotate(18deg)'
               }} />
          
          {/* Mancha violeta - zona créditos 5 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1300px',
                 left: '15%',
                 width: '158px',
                 height: '150px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(139, 92, 246, 0.50) 0%, rgba(139, 92, 246, 0.25) 46%, transparent 76%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(-15deg)'
               }} />
          
          {/* Mancha coral suave - zona créditos 6 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1340px',
                 right: '18%',
                 width: '165px',
                 height: '157px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(251, 113, 133, 0.52) 0%, rgba(251, 113, 133, 0.26) 45%, transparent 75%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '50% 50% 55% 45% / 52% 48% 52% 48%',
                 transform: 'rotate(28deg)'
               }} />
          
          {/* Mancha turquesa claro - zona créditos 7 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1380px',
                 left: '40%',
                 width: '155px',
                 height: '148px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(103, 232, 249, 0.50) 0%, rgba(103, 232, 249, 0.25) 48%, transparent 78%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '48% 52% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-20deg)'
               }} />
          
          {/* Mancha naranja mandarina - zona créditos 8 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1420px',
                 left: '10%',
                 width: '172px',
                 height: '164px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(251, 146, 60, 0.54) 0%, rgba(251, 146, 60, 0.27) 46%, transparent 76%)',
                 filter: 'blur(1.5px)',
                 borderRadius: '52% 48% 50% 50% / 50% 50% 50% 50%',
                 transform: 'rotate(16deg)'
               }} />
          
          {/* Mancha rosa chicle - zona créditos 9 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1460px',
                 right: '10%',
                 width: '160px',
                 height: '152px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(244, 114, 182, 0.52) 0%, rgba(244, 114, 182, 0.26) 45%, transparent 75%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                 transform: 'rotate(-24deg)'
               }} />
          
          {/* Mancha limón - zona créditos 10 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1500px',
                 left: '35%',
                 width: '168px',
                 height: '161px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(234, 179, 8, 0.50) 0%, rgba(234, 179, 8, 0.25) 48%, transparent 78%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
                 transform: 'rotate(20deg)'
               }} />
          
          {/* Mancha verde menta claro - zona créditos 11 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1540px',
                 right: '28%',
                 width: '158px',
                 height: '150px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(110, 231, 183, 0.52) 0%, rgba(110, 231, 183, 0.26) 46%, transparent 76%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '52% 48% 48% 52% / 50% 50% 50% 50%',
                 transform: 'rotate(-18deg)'
               }} />
          
          {/* Mancha lavanda suave - zona créditos 12 */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1580px',
                 left: '18%',
                 width: '165px',
                 height: '157px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(196, 181, 253, 0.54) 0%, rgba(196, 181, 253, 0.27) 45%, transparent 75%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '50% 50% 50% 50% / 52% 48% 52% 48%',
                 transform: 'rotate(25deg)'
               }} />

          {/* Header ROJO con bordes irregulares acuarela */}
          <div className="relative flex-shrink-0 rounded-b-3xl"
               style={{
                 background: '#DC2626',
                 clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 96% 94%, 90% 100%, 82% 98%, 75% 95%, 65% 98%, 55% 100%, 45% 97%, 35% 99%, 25% 96%, 15% 100%, 8% 95%, 3% 92%, 0% 88%)',
                 paddingBottom: '20px'
               }}>
            {/* Manchas decorativas en el header */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-b-3xl">
              <div className="absolute top-2 right-10 w-20 h-20 bg-white/10 rounded-full" style={{ filter: 'blur(15px)' }} />
              <div className="absolute bottom-8 left-12 w-24 h-24 bg-black/10 rounded-full" style={{ filter: 'blur(20px)' }} />
            </div>
            
            <div className="flex items-center gap-4 p-6 relative z-10">
              {/* Icono con forma acuarela */}
              <div className="relative">
                <div className="flex items-center justify-center text-white rounded-3xl"
                     style={{
                       width: '80px',
                       height: '80px',
                       background: 'rgba(255, 255, 255, 0.2)',
                       filter: 'blur(0.4px)',
                       boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                     }}>
                  <FaFilm className="text-4xl" />
                </div>
              </div>
              <div>
                <h2 className="font-display text-4xl font-bold text-white drop-shadow-lg">Documental</h2>
                <p className="text-xl text-white/90 drop-shadow">El Acordeón de Juan Sebastián</p>
              </div>
            </div>
          </div>

          {/* Contenido con padding - NO tiene scroll, el padre lo tiene */}
          <div className="px-6 py-6 relative z-10">
          {/* Video Player - YouTube */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/JXFHdKXFFl0"
              title="Documental - El Acordeón de Juan Sebastián"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full aspect-video"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            ></iframe>
          </div>

          {/* Descripción del documental con fondo rojo pastel */}
          <div className="relative p-6 rounded-xl overflow-hidden mb-6"
               style={{
                 background: '#FEE2E2',
               }}>
            <div className="absolute top-2 right-4 w-16 h-16 bg-red-200/40 rounded-full" style={{ filter: 'blur(20px)' }} />
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
              <GiAccordion className="text-red-600 text-3xl" />
              Sobre el documental
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 relative z-10">
              En este mini documental seremos testigos de la inspiradora historia de Juan Sebastián, 
              un joven que encontró en el acordeón vallenato no solo una pasión, sino un puente entre mundos.
            </p>
            <p className="text-gray-700 leading-relaxed relative z-10">
              A través de cada nota, Juan Sebastián logró algo más grande que la música: reavivar el espíritu 
              de Colombia en el corazón de quienes viven lejos de su tierra. Su historia es la de un soñador que, 
              con cada melodía, une a los que extrañan su país, recordándoles que la identidad y la cultura viajan 
              con nosotros, donde sea que suene un acordeón siempre será un símbolo de los colombianos.
            </p>
          </div>

          {/* Créditos */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Créditos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Dirección</p>
                <p className="text-gray-600">Felipe Acosta</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Producción</p>
                <p className="text-gray-600">Felipe Acosta</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Fotografía</p>
                <p className="text-gray-600">Felipe Acosta y Juan Sebastián Acosta</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Música</p>
                <p className="text-gray-600">Acordeones de Colombia</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Duración</p>
                <p className="text-gray-600">09 minutos</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Año</p>
                <p className="text-gray-600">2025</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DocumentalModal
