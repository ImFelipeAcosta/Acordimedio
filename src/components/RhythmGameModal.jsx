import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import SongSelectionModal from './SongSelectionModal'
import RhythmGameCanvas from './RhythmGameCanvas'
import KeyTutorialModal from './KeyTutorialModal'

const RhythmGameModal = ({ onClose }) => {
  const [gameState, setGameState] = useState('song-select') // song-select, difficulty-select, tutorial, playing
  const [selectedSong, setSelectedSong] = useState(null)
  const [difficulty, setDifficulty] = useState(null)
  const [isClosing, setIsClosing] = useState(false) // Controlar si se cierra completamente

  // Pausar la música de fondo cuando llegue al tutorial
  useEffect(() => {
    if (gameState === 'tutorial') {
      // NO pausar aquí, mantener la música sonando en el tutorial
      if (window.audioController) {
        window.audioController.play()
      }
    } else if (gameState === 'song-select' || gameState === 'difficulty-select') {
      // Mantener la música sonando en selección de canción y dificultad
      if (window.audioController) {
        window.audioController.play()
      }
    }
  }, [gameState])

  // Reanudar la música cuando se cierra completamente el RhythmGameModal
  useEffect(() => {
    return () => {
      if (isClosing && window.audioController) {
        window.audioController.play()
      }
    }
  }, [isClosing])

  // Manejar selección de canción
  const handleSongSelect = (song) => {
    console.log('🎵 Canción seleccionada:', song)
    setSelectedSong(song)
    setGameState('difficulty-select')
  }

  // Manejar selección de dificultad - Va al tutorial
  const handleDifficultySelect = (selectedDifficulty) => {
    console.log('⭐ Dificultad seleccionada:', selectedDifficulty)
    setDifficulty(selectedDifficulty)
    setGameState('tutorial')
  }

  // Manejar completar tutorial - Inicia el juego
  const handleTutorialComplete = () => {
    setGameState('playing')
  }

  // Volver a selección de dificultad desde el juego
  const handleBackToDifficulty = () => {
    setGameState('difficulty-select')
    setDifficulty(null)
  }

  // Volver a selección de canciones
  const handleBackToSongs = () => {
    setGameState('song-select')
    setSelectedSong(null)
    setDifficulty(null)
  }

  // Volver al mapa
  const handleBackToMap = () => {
    setIsClosing(true)
    setGameState('song-select')
    setSelectedSong(null)
    setDifficulty(null)
    onClose()
  }

  // Cerrar todo
  const handleClose = () => {
    setIsClosing(true)
    setGameState('song-select')
    setSelectedSong(null)
    setDifficulty(null)
    onClose()
  }

  return (
    <>
      {!isClosing && (
        <>
          {/* Selector de canciones */}
          <SongSelectionModal
            isOpen={gameState === 'song-select'}
            onClose={handleClose}
            onSelectSong={handleSongSelect}
          />

          {/* Selector de dificultad */}
          {gameState === 'difficulty-select' && selectedSong && (
            <DifficultySelectScreen
              selectedSong={selectedSong}
              onSelectDifficulty={handleDifficultySelect}
              onBack={handleBackToSongs}
              onClose={handleClose}
            />
          )}

          {/* Tutorial de teclas */}
          {gameState === 'tutorial' && (
            <KeyTutorialModal
              onComplete={handleTutorialComplete}
              onClose={handleClose}
              onBack={handleBackToDifficulty}
            />
          )}

          {/* Juego con Canvas (60 FPS, sin lag) */}
          {gameState === 'playing' && difficulty && selectedSong && (
            <RhythmGameCanvas 
              selectedDifficulty={difficulty}
              selectedSong={selectedSong}
              onBack={handleBackToDifficulty}
              onBackToSongs={handleBackToSongs}
              onBackToMap={handleBackToMap}
              onClose={handleClose}
            />
          )}
        </>
      )}
    </>
  )
}

// Componente: Pantalla de selección de dificultad con estética acuarela
const DifficultySelectScreen = ({ selectedSong, onSelectDifficulty, onBack, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Manchas de acuarela decorativas - Muchas pequeñas */}
        {/* Mancha 1 - azul superior izquierda */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '60px',
               left: '8%',
               width: '120px',
               height: '110px',
               background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.50) 0%, rgba(59, 130, 246, 0.25) 50%, transparent 80%)',
               filter: 'blur(1.2px)',
               borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
               transform: 'rotate(-15deg)'
             }} />
        
        {/* Mancha 2 - amarilla superior */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '90px',
               right: '12%',
               width: '100px',
               height: '95px',
               background: 'radial-gradient(ellipse at 48% 52%, rgba(251, 191, 36, 0.45) 0%, rgba(251, 191, 36, 0.22) 50%, transparent 78%)',
               filter: 'blur(1.1px)',
               borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
               transform: 'rotate(20deg)'
             }} />
        
        {/* Mancha 3 - verde media izquierda */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '280px',
               left: '5%',
               width: '110px',
               height: '105px',
               background: 'radial-gradient(ellipse at 52% 48%, rgba(34, 197, 94, 0.42) 0%, rgba(34, 197, 94, 0.20) 50%, transparent 75%)',
               filter: 'blur(1.2px)',
               borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
               transform: 'rotate(-22deg)'
             }} />
        
        {/* Mancha 4 - rosa media */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '320px',
               right: '8%',
               width: '130px',
               height: '120px',
               background: 'radial-gradient(ellipse at 50% 48%, rgba(244, 114, 182, 0.48) 0%, rgba(244, 114, 182, 0.24) 50%, transparent 74%)',
               filter: 'blur(1.3px)',
               borderRadius: '55% 45% 48% 52% / 52% 48% 52% 48%',
               transform: 'rotate(18deg)'
             }} />

        {/* Mancha 5 - azul claro centro */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '450px',
               left: '15%',
               width: '95px',
               height: '90px',
               background: 'radial-gradient(ellipse at 50% 50%, rgba(147, 197, 253, 0.40) 0%, rgba(147, 197, 253, 0.18) 55%, transparent 78%)',
               filter: 'blur(1px)',
               borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
               transform: 'rotate(25deg)'
             }} />

        {/* Mancha 6 - naranja media derecha */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '480px',
               right: '15%',
               width: '105px',
               height: '100px',
               background: 'radial-gradient(ellipse at 48% 52%, rgba(251, 146, 60, 0.42) 0%, rgba(251, 146, 60, 0.20) 52%, transparent 76%)',
               filter: 'blur(1.1px)',
               borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
               transform: 'rotate(-20deg)'
             }} />

        {/* Mancha 7 - verde claro inferior izquierda */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               bottom: '180px',
               left: '10%',
               width: '115px',
               height: '110px',
               background: 'radial-gradient(ellipse at 50% 50%, rgba(134, 239, 172, 0.38) 0%, rgba(134, 239, 172, 0.18) 52%, transparent 80%)',
               filter: 'blur(1.2px)',
               borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
               transform: 'rotate(12deg)'
             }} />

        {/* Mancha 8 - azul oscuro inferior centro */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               bottom: '140px',
               left: '45%',
               width: '100px',
               height: '95px',
               background: 'radial-gradient(ellipse at 50% 50%, rgba(30, 144, 255, 0.35) 0%, rgba(30, 144, 255, 0.16) 54%, transparent 78%)',
               filter: 'blur(1.1px)',
               borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
               transform: 'rotate(-18deg)'
             }} />

        {/* Mancha 9 - rosa oscura inferior derecha */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               bottom: '160px',
               right: '10%',
               width: '120px',
               height: '115px',
               background: 'radial-gradient(ellipse at 48% 52%, rgba(244, 63, 94, 0.40) 0%, rgba(244, 63, 94, 0.19) 50%, transparent 75%)',
               filter: 'blur(1.2px)',
               borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
               transform: 'rotate(15deg)'
             }} />

        {/* Mancha 10 - amarilla clara derecha media */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '250px',
               right: '3%',
               width: '95px',
               height: '90px',
               background: 'radial-gradient(ellipse at 50% 48%, rgba(253, 224, 71, 0.35) 0%, rgba(253, 224, 71, 0.16) 52%, transparent 76%)',
               filter: 'blur(1px)',
               borderRadius: '55% 45% 48% 52% / 52% 48% 52% 48%',
               transform: 'rotate(-12deg)'
             }} />

        {/* Botón cerrar (X) - Acuarela azul claro */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute w-12 h-12 bg-blue-400 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 z-[60] rounded-lg"
          style={{
            top: '20px',
            right: '20px',
            filter: 'blur(0.3px)'
          }}
        >
          <FaTimes className="text-xl" />
        </motion.button>

        {/* Header azul con nombre de canción */}
        <div className="bg-blue-500 text-white p-6 mb-0 relative z-10 flex flex-col items-center justify-center" style={{ 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 96% 90%, 90% 95%, 82% 93%, 75% 91%, 65% 93%, 55% 95%, 45% 93%, 35% 95%, 25% 92%, 15% 95%, 8% 91%, 3% 88%, 0% 83%)',
          paddingBottom: '40px', 
          minHeight: '120px' 
        }}>
          <h2 className="font-display text-4xl font-bold mb-2">
            {selectedSong.title}
          </h2>
          <p className="text-xl opacity-90">
            {selectedSong.artist}
          </p>
        </div>

        {/* Botón cerrar (X) - Acuarela azul claro */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute w-12 h-12 bg-blue-400 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 z-[60] rounded-lg"
          style={{
            top: '20px',
            right: '20px',
            filter: 'blur(0.3px)'
          }}
        >
          <FaTimes className="text-xl" />
        </motion.button>

        {/* Botón volver - Acuarela azul, alineado con X */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            onBack()
          }}
          className="absolute w-12 h-12 bg-blue-400 text-white flex items-center justify-center shadow-lg z-[60] cursor-pointer rounded-lg"
          style={{
            top: '20px',
            left: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'auto'
          }}
        >
          <span className="text-2xl">←</span>
        </motion.button>

        {/* Header AZUL con borde acuarela */}
        {/* REMOVIDO - El header se vería mejor sin esto */}

        {/* Contenido - Selección de dificultad */}
        <div className="h-full flex flex-col items-center justify-start px-8 relative z-10" style={{ paddingTop: '150px' }}>
          <h2 className="text-4xl font-bold mb-2 text-gray-900">
            Selecciona Dificultad
          </h2>
          
          <p className="text-base mb-4 text-gray-600">
            Elige el nivel de desafío
          </p>

          {/* Grid de dificultades */}
          <div className="flex gap-6 justify-center max-w-4xl w-full">
            {/* NORMAL */}
            <DifficultyCard
              title="NORMAL"
              color="yellow"
              circleColor="bg-yellow-400"
              info={['~750 notas', '2.3 notas/seg']}
              description="Ritmo desafiante que requiere práctica."
              onClick={() => onSelectDifficulty('medio')}
            />

            {/* DIFÍCIL */}
            <DifficultyCard
              title="DIFÍCIL"
              color="red"
              circleColor="bg-red-400"
              info={['~1,125 notas', '3.5 notas/seg']}
              description="Solo para expertos. Máxima precisión requerida."
              onClick={() => onSelectDifficulty('dificil')}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Card de dificultad con estética acuarela de colores
const DifficultyCard = ({ title, color, circleColor, info, description, onClick }) => {
  // Definir colores de fondo acuarela según dificultad - MÁS SATURADOS
  const backgroundColors = {
    green: '#A8E6CF', // Verde pastel SÓLIDO
    yellow: '#FFE5A0', // Amarillo pastel SÓLIDO
    red: '#FFB3BA' // Rosa/rojo pastel SÓLIDO
  }

  const textColors = {
    green: '#2d5a45',
    yellow: '#8a6f3d',
    red: '#8a3d45'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative p-6 rounded-3xl shadow-lg transition-all w-96"
      style={{
        background: backgroundColors[color],
        backdropFilter: 'blur(5px)',
        filter: 'blur(0.5px) contrast(1.05)',
        boxShadow: `0 12px 40px rgba(0, 0, 0, 0.2), inset 0 2px 12px ${backgroundColors[color]}`
      }}
    >
      {/* Manchas de acuarela decorativas */}
      <div className="absolute top-2 right-3 opacity-40 pointer-events-none rounded-full" 
           style={{ 
             width: '70px', 
             height: '65px',
             background: `radial-gradient(circle at 40% 40%, ${backgroundColors[color]}, transparent 65%)`,
             filter: 'blur(18px)'
           }} />
      <div className="absolute bottom-4 left-4 opacity-35 pointer-events-none rounded-full" 
           style={{ 
             width: '55px', 
             height: '50px',
             background: `radial-gradient(circle at 60% 50%, ${backgroundColors[color]}, transparent 70%)`,
             filter: 'blur(15px)'
           }} />

      {/* Círculo de color - estilo acuarela */}
      <div className="flex justify-center mb-4 relative z-10">
        <div 
          className={`w-20 h-20 ${circleColor} rounded-full`}
          style={{
            filter: 'blur(0.3px)',
            boxShadow: `0 8px 24px ${backgroundColors[color]}80, inset 0 2px 10px rgba(255, 255, 255, 0.5)`
          }}
        />
      </div>

      {/* Título */}
      <h3 className="text-3xl font-bold mb-2 relative z-10" style={{ color: textColors[color] }}>
        {title}
      </h3>

      {/* Info */}
      <div className="relative z-10">
        {info.map((line, index) => (
          <p key={index} className={index === 0 ? "text-base mb-1" : "text-sm mb-1"} style={{ color: '#4a4a4a' }}>
            {line}
          </p>
        ))}
      </div>

      {/* Descripción con checkmarks */}
      <div className="text-sm leading-relaxed mt-3 relative z-10" style={{ color: '#6a6a6a' }}>
        {description.split('.').filter(d => d.trim()).map((line, i) => (
          <div key={i} className="mb-1">✓ {line.trim()}</div>
        ))}
      </div>
    </motion.button>
  )
}

export default RhythmGameModal
