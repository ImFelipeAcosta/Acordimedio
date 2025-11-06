import { motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

const ProjectInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full">
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative bg-white w-full shadow-2xl rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Contenedor sin scroll */}
          <div 
            className="overflow-hidden p-8 relative z-0"
            style={{
              isolation: 'isolate'
            }}
          >
            {/* Botón cerrar - DENTRO del scroll */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute w-12 h-12 text-white flex items-center justify-center shadow-lg z-[80] rounded-lg"
              style={{
                top: '20px',
                right: '20px',
                backgroundColor: '#f472b6',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ec4899'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f472b6'}
            >
              <FaTimes className="text-2xl" />
            </motion.button>

            {/* Manchas de acuarela - ABSOLUTAS */}
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

            {/* Header con color ámbar */}
            <div className="relative text-white p-6 mb-6 shadow-lg -mx-8 -mt-8 px-8 z-10"
                 style={{
                   background: '#f8a3d3',
                   clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 96% 94%, 90% 100%, 82% 98%, 75% 95%, 65% 98%, 55% 100%, 45% 97%, 35% 99%, 25% 96%, 15% 100%, 8% 95%, 3% 92%, 0% 88%)',
                   filter: 'blur(0.3px)'
                 }}>
              <h2 className="text-4xl font-bold mb-2" style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)' }}>
                Acordimedio
              </h2>
              <p className="text-lg opacity-95" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)' }}>
                Un proyecto transmedia desarrollado desde el programa de Ing. en Multimedia de la UMNG.
              </p>
            </div>

            {/* Descripción - Sobre el Proyecto */}
            <div className="relative mb-8 z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Sobre el proyecto
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                "Acordimedio" es un proyecto transmedia interactivo que celebra la riqueza cultural del acordeón vallenato. 
                A través de una experiencia educativa y entretenida, los usuarios pueden explorar historias, geografía y ritmo de la música tradicional colombiana.
              </p>
            </div>

            {/* Componentes */}
            <div className="relative mb-8 p-6 bg-blue-50 rounded-xl shadow-md z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Componentes del proyecto
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold mb-1" style={{ color: '#ff6b35' }}>Mapa Interactivo</h4>
                  <p className="text-gray-600">Explora distintas regiones de Colombia y descubre sus historias y tradiciones musicales.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: '#2563EB' }}>Juego de Ritmo</h4>
                  <p className="text-gray-600">Demuestra tus habilidades musicales con un juego interactivo basado en canciones tradicionales.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: '#CA8A04' }}>Trivia Interactiva</h4>
                  <p className="text-gray-600">Aprende curiosidades sobre el acordeón, sus compositores y la cultura vallenata.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: '#DC2626' }}>Documental</h4>
                  <p className="text-gray-600">Accede a contenido audiovisual que profundiza en la historia del acordeón colombiano.</p>
                </div>
              </div>
            </div>



            {/* Footer */}
            <div className="relative bg-amber-50 border-t-2 border-amber-200 p-6 text-center -mx-8 -mb-8 z-10">
              <p className="text-sm text-gray-600">
                © 2025 Acordimedio - Proyecto Transmedia   |   Página web desarrollada por Felipe Acosta y Cristian Gonzalez
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectInfoModal
