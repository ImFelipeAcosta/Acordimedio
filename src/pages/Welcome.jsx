import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GiAccordion } from 'react-icons/gi'
import { FaPlay } from 'react-icons/fa'

const Welcome = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // Iniciar la reproducción de audio cuando monta el componente
  useEffect(() => {
    if (window.audioController) {
      window.audioController.play()
    }
  }, [])

  const handleStart = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigate('/mapa')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Fondo animado con colores más sutiles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-gradient-to-br from-secondary/25 to-primary/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-accent/20 to-orange-300/25 rounded-full blur-3xl"
        />
      </div>

      {/* Partículas decorativas sutiles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -20, 20, -20],
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-primary' :
              i % 3 === 1 ? 'bg-accent' :
              'bg-secondary'
            }`}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center z-10 px-12 max-w-7xl w-full"
      >
        {/* Icono del acordeón con animación mejorada */}
        <motion.div
          animate={{ 
            rotate: [-5, 5, -5],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 30px rgba(212, 175, 55, 0.4)",
                "0 0 50px rgba(255, 107, 0, 0.6)",
                "0 0 30px rgba(212, 175, 55, 0.4)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="rounded-full p-8 bg-gradient-to-br from-primary via-accent to-secondary shadow-2xl"
          >
            <GiAccordion className="text-9xl text-white drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        {/* Título principal con gradiente */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
        >
          BIENVENIDO
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-display text-7xl md:text-8xl font-bold mb-6 text-secondary"
        >
          ACORDIMEDIO
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold"
        >
          Un viaje interactivo por la historia del acordeón en Colombia
        </motion.p>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Explora las regiones · Conoce su historia · Disfruta del documental · Juega y aprende
        </motion.p>

        {/* Botón de inicio con animación mejorada */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -3, 3, -3, 0],
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(212, 175, 55, 0.5)",
                "0 0 40px rgba(255, 107, 0, 0.7)",
                "0 0 20px rgba(212, 175, 55, 0.5)",
              ],
              y: [0, -5, 0],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={handleStart}
            disabled={isLoading}
            className="relative px-12 py-5 text-xl font-bold rounded-full overflow-hidden group"
          >
            {/* Fondo animado del botón */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundSize: "200% 200%",
                backgroundImage: "linear-gradient(45deg, #d4af37, #ff6b00, #8b4513, #d4af37)",
              }}
              className="absolute inset-0"
            />
            
            {/* Overlay brillante */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            {/* Contenido del botón */}
            <span className="relative z-10 text-white flex items-center gap-3 drop-shadow-lg">
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <FaPlay className="text-2xl" />
                  <span>COMENZAR EXPERIENCIA</span>
                </>
              )}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Welcome
