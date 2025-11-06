import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

const KeyTutorialModal = ({ onComplete, onClose, onBack }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set())
  const [allKeysPressedOnce, setAllKeysPressedOnce] = useState(false)
  const [currentlyPressedKeys, setCurrentlyPressedKeys] = useState(new Set())

  const requiredKeys = new Set(['a', 's', 'j', 'k'])
  const keyColors = {
    'a': { pastel: '#A8E6CF', solid: '#22c55e', text: 'A' },
    's': { pastel: '#FFB3BA', solid: '#ef4444', text: 'S' },
    'j': { pastel: '#FFE5A0', solid: '#eab308', text: 'J' },
    'k': { pastel: '#B8D4E8', solid: '#3b82f6', text: 'K' }
  }

  // Función para hacer fade out de la música y luego completar el tutorial
  const handleCompleteWithFadeOut = async () => {
    if (window.audioController && window.audioController.fadeOut) {
      await window.audioController.fadeOut(1000) // 1 segundo de fade out
    }
    onComplete()
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      
      // Detectar Enter cuando se han presionado todas las teclas
      if (key === 'enter' && allKeysPressedOnce) {
        e.preventDefault()
        handleCompleteWithFadeOut()
        return
      }
      
      if (requiredKeys.has(key)) {
        e.preventDefault()
        setCurrentlyPressedKeys(prev => new Set([...prev, key]))
        setPressedKeys(prev => {
          const newSet = new Set([...prev, key])
          if (newSet.size === 4) {
            setAllKeysPressedOnce(true)
          }
          return newSet
        })
      }
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (requiredKeys.has(key)) {
        e.preventDefault()
        setCurrentlyPressedKeys(prev => {
          const newSet = new Set(prev)
          newSet.delete(key)
          return newSet
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [pressedKeys, allKeysPressedOnce])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón atrás */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="absolute w-12 h-12 bg-blue-300 text-white flex items-center justify-center shadow-lg hover:bg-blue-400 transition-colors z-50 rounded-lg"
          style={{
            top: '20px',
            left: '20px'
          }}
          title="Volver a dificultad"
        >
          <span className="text-xl">←</span>
        </motion.button>

        {/* Botón cerrar */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute w-12 h-12 bg-blue-300 text-white flex items-center justify-center shadow-lg hover:bg-blue-400 transition-colors z-50 rounded-lg"
          style={{
            top: '20px',
            right: '20px',
            filter: 'blur(0.3px)'
          }}
        >
          <FaTimes className="text-xl" />
        </motion.button>

        {/* Header azul con clipPath */}
        <div 
          className="bg-blue-500 text-white flex flex-col items-center justify-center"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 96% 90%, 90% 95%, 82% 93%, 75% 91%, 65% 93%, 55% 95%, 45% 93%, 35% 95%, 25% 92%, 15% 95%, 8% 91%, 3% 88%, 0% 83%)',
            minHeight: '120px',
            paddingBottom: '40px',
            paddingTop: '30px'
          }}
        >
          <h2 className="font-display text-4xl font-bold">
            Aprende a Tocar
          </h2>
        </div>

        {/* Contenido */}
        <div className="p-16 text-center">
          <p className="text-2xl mb-12 text-gray-700">
            Recuerda usar las teclas A, S, J, K al ritmo
          </p>

          {/* Teclas interactivas */}
          <div className="flex gap-6 justify-center mb-12">
            {Array.from(requiredKeys).map((key) => (
              <motion.button
                key={key}
                animate={{
                  scale: currentlyPressedKeys.has(key) ? 0.95 : 1,
                  opacity: 1
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="py-6 px-6 rounded-lg font-bold text-3xl text-gray-700 shadow-md transition-all"
                style={{
                  background: currentlyPressedKeys.has(key) 
                    ? keyColors[key].solid 
                    : pressedKeys.has(key)
                    ? keyColors[key].solid
                    : `${keyColors[key].pastel}80`,
                  color: (currentlyPressedKeys.has(key) || pressedKeys.has(key)) ? 'white' : '#4a4a4a',
                  border: `2px solid ${keyColors[key].solid}`,
                  boxShadow: currentlyPressedKeys.has(key) 
                    ? `0 0 20px ${keyColors[key].solid}` 
                    : '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {keyColors[key].text}
              </motion.button>
            ))}
          </div>

          <p className="text-lg mb-12 text-gray-600 h-6">
            Presiona cada tecla para continuar
          </p>

          {/* Botón de inicio */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={allKeysPressedOnce ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 20 }}
            whileHover={allKeysPressedOnce ? { scale: 1.05 } : {}}
            whileTap={allKeysPressedOnce ? { scale: 0.95 } : {}}
            disabled={!allKeysPressedOnce}
            className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all ${
              allKeysPressedOnce
                ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Enter para tocar el acordeón
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default KeyTutorialModal

