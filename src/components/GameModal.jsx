import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTimes, FaGamepad, FaTrophy, FaRedo } from 'react-icons/fa'
import { GiAccordion } from 'react-icons/gi'

const GameModal = ({ onClose }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState([])

  const allQuestions = [
    {
      question: '¿En qué ciudad se celebra el Festival de la Leyenda Vallenata?',
      options: ['Barranquilla', 'Valledupar', 'Cartagena', 'Santa Marta'],
      correct: 1
    },
    {
      question: '¿Qué género musical colombiano está más asociado al acordeón?',
      options: ['Cumbia', 'Vallenato', 'Salsa', 'Bambuco'],
      correct: 1
    },
    {
      question: '¿De qué continente llegó el acordeón a Colombia?',
      options: ['Asia', 'África', 'Europa', 'Oceanía'],
      correct: 2
    },
    {
      question: '¿Cuál es la ciudad más antigua de Colombia mencionada en el mapa?',
      options: ['Valledupar', 'Santa Marta', 'Barranquilla', 'Montería'],
      correct: 1
    },
    {
      question: '¿Qué evento de Barranquilla es Patrimonio de la Humanidad?',
      options: ['Festival Vallenato', 'Carnaval', 'Feria de las Flores', 'Festival del Porro'],
      correct: 1
    },
    {
      question: '¿Cuántos botones tiene un acordeón vallenato tradicional?',
      options: ['21 botones', '31 botones', '41 botones', '51 botones'],
      correct: 1
    },
    {
      question: '¿En qué siglo llegó el acordeón a Colombia?',
      options: ['Siglo XVII', 'Siglo XVIII', 'Siglo XIX', 'Siglo XX'],
      correct: 2
    },
    {
      question: '¿Cuál es uno de los ritmos tradicionales del vallenato?',
      options: ['Tango', 'Paseo', 'Bolero', 'Ranchera'],
      correct: 1
    },
    {
      question: '¿Qué instrumento acompaña al acordeón en el conjunto vallenato?',
      options: ['Guitarra', 'Caja vallenata', 'Violín', 'Flauta'],
      correct: 1
    },
    {
      question: '¿Quién es considerado el Rey del Vallenato?',
      options: ['Carlos Vives', 'Diomedes Díaz', 'Silvestre Dangond', 'Jorge Celedón'],
      correct: 1
    },
    {
      question: '¿En qué región de Colombia es más popular el acordeón?',
      options: ['Región Andina', 'Región Pacífica', 'Región Caribe', 'Región Amazónica'],
      correct: 2
    },
    {
      question: '¿Cuál es el nombre del acordeón de teclas utilizado en Colombia?',
      options: ['Acordeón de piano', 'Acordeón cromático', 'Acordeón diatónico', 'Bandonéon'],
      correct: 2
    },
    {
      question: '¿En qué año se declaró el vallenato Patrimonio Cultural Inmaterial?',
      options: ['2005', '2010', '2015', '2020'],
      correct: 2
    },
    {
      question: '¿Qué ciudad es conocida como la capital del vallenato?',
      options: ['Barranquilla', 'Cartagena', 'Valledupar', 'Santa Marta'],
      correct: 2
    },
    {
      question: '¿Cuántos tipos de aire tiene el vallenato tradicional?',
      options: ['2', '4', '6', '8'],
      correct: 1
    }
  ]

  useEffect(() => {
    // Mezclar preguntas al iniciar
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10)
    setShuffledQuestions(shuffled)
  }, [])

  const questions = shuffledQuestions

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetGame = () => {
    setGameStarted(false)
    setScore(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    // Mezclar preguntas nuevamente
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10)
    setShuffledQuestions(shuffled)
  }

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
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenedor sin scroll */}
        <div 
          className="relative z-0"
        >
      {/* Botón Cerrar */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute w-12 h-12 text-white flex items-center justify-center shadow-lg hover:brightness-110 z-50 rounded-lg"
        style={{
          top: '20px',
          right: '20px',
          backgroundColor: gameStarted
            ? currentQuestion === 0 ? '#F59E0B' :
              currentQuestion === 1 ? '#EF4444' :
              currentQuestion === 2 ? '#10B981' :
              currentQuestion === 3 ? '#3B82F6' :
              currentQuestion === 4 ? '#EC4899' :
              currentQuestion === 5 ? '#14B8A6' :
              currentQuestion === 6 ? '#F97316' :
              currentQuestion === 7 ? '#8B5CF6' :
              currentQuestion === 8 ? '#06B6D4' :
              '#6366F1'
            : '#FCD34D'
        }}
      >
        <FaTimes className="text-xl" />
      </motion.button>          {/* Manchas de acuarela - DIRECTAMENTE dentro del scroll */}
          {/* Mancha amarilla dorada - superior izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '180px',
                 left: '8%',
                 width: '200px',
                 height: '190px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(251, 191, 36, 0.55) 0%, rgba(251, 191, 36, 0.28) 45%, transparent 75%)',
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
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(251, 146, 60, 0.50) 0%, rgba(251, 146, 60, 0.25) 42%, transparent 72%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(20deg)'
               }} />
          
          {/* Mancha verde lima - medio izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '400px',
                 left: '12%',
                 width: '165px',
                 height: '155px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(163, 230, 53, 0.48) 0%, rgba(163, 230, 53, 0.24) 48%, transparent 76%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
                 transform: 'rotate(-22deg)'
               }} />
          
          {/* Mancha azul cielo - medio derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '500px',
                 right: '8%',
                 width: '185px',
                 height: '175px',
                 background: 'radial-gradient(ellipse at 50% 48%, rgba(96, 165, 250, 0.52) 0%, rgba(96, 165, 250, 0.26) 44%, transparent 74%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '55% 45% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(18deg)'
               }} />
          
          {/* Mancha rosa - medio */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '650px',
                 left: '15%',
                 width: '170px',
                 height: '160px',
                 background: 'radial-gradient(ellipse at 45% 55%, rgba(244, 114, 182, 0.50) 0%, rgba(244, 114, 182, 0.25) 45%, transparent 75%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
                 transform: 'rotate(-18deg)'
               }} />
          
          {/* Mancha turquesa - superior centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '300px',
                 left: '42%',
                 width: '155px',
                 height: '145px',
                 background: 'radial-gradient(ellipse at 52% 50%, rgba(45, 212, 191, 0.48) 0%, rgba(45, 212, 191, 0.24) 48%, transparent 78%)',
                 filter: 'blur(1.1px)',
                 borderRadius: '50% 50% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(28deg)'
               }} />
          
          {/* Mancha lila - medio centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '550px',
                 left: '32%',
                 width: '175px',
                 height: '165px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(167, 139, 250, 0.46) 0%, rgba(167, 139, 250, 0.23) 42%, transparent 72%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '52% 48% 48% 52% / 50% 50% 50% 50%',
                 transform: 'rotate(-25deg)'
               }} />
          
          {/* Mancha amarillo limón - inferior */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '800px',
                 right: '12%',
                 width: '165px',
                 height: '155px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(253, 224, 71, 0.50) 0%, rgba(253, 224, 71, 0.25) 46%, transparent 76%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '45% 55% 52% 48% / 55% 45% 55% 45%',
                 transform: 'rotate(15deg)'
               }} />
          
          {/* Mancha verde menta - inferior izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '900px',
                 left: '18%',
                 width: '145px',
                 height: '138px',
                 background: 'radial-gradient(ellipse at 45% 50%, rgba(134, 239, 172, 0.45) 0%, rgba(134, 239, 172, 0.22) 48%, transparent 76%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                 transform: 'rotate(-12deg)'
               }} />
          
          {/* Mancha coral - inferior centro */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1000px',
                 left: '35%',
                 width: '150px',
                 height: '142px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(248, 113, 113, 0.48) 0%, rgba(248, 113, 113, 0.24) 45%, transparent 75%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                 transform: 'rotate(22deg)'
               }} />
          
          {/* Mancha melocotón - superior */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '150px',
                 right: '25%',
                 width: '158px',
                 height: '150px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 183, 77, 0.52) 0%, rgba(255, 183, 77, 0.26) 48%, transparent 78%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '48% 52% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-20deg)'
               }} />
          
          {/* Mancha cyan - medio */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '700px',
                 right: '30%',
                 width: '162px',
                 height: '154px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(34, 211, 238, 0.50) 0%, rgba(34, 211, 238, 0.25) 45%, transparent 75%)',
                 filter: 'blur(1.3px)',
                 borderRadius: '52% 48% 50% 50% / 50% 50% 50% 50%',
                 transform: 'rotate(16deg)'
               }} />
          
          {/* Mancha lavanda - inferior derecha */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '1050px',
                 right: '15%',
                 width: '172px',
                 height: '164px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(196, 181, 253, 0.52) 0%, rgba(196, 181, 253, 0.26) 48%, transparent 78%)',
                 filter: 'blur(1.4px)',
                 borderRadius: '48% 52% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-20deg)'
               }} />
          
          {/* Mancha índigo - superior izquierda */}
          <div className="absolute pointer-events-none z-[1]"
               style={{
                 top: '250px',
                 left: '20%',
                 width: '152px',
                 height: '145px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(129, 140, 248, 0.48) 0%, rgba(129, 140, 248, 0.24) 46%, transparent 76%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                 transform: 'rotate(24deg)'
               }} />

          {/* Header con color dinámico según pregunta */}
          <div className="relative flex-shrink-0 rounded-b-3xl"
               style={{
                 background: !gameStarted ? '#F59E0B' : 
                            currentQuestion === 0 ? '#F59E0B' :
                            currentQuestion === 1 ? '#EF4444' :
                            currentQuestion === 2 ? '#10B981' :
                            currentQuestion === 3 ? '#3B82F6' :
                            currentQuestion === 4 ? '#EC4899' :
                            currentQuestion === 5 ? '#14B8A6' :
                            currentQuestion === 6 ? '#F97316' :
                            currentQuestion === 7 ? '#8B5CF6' :
                            currentQuestion === 8 ? '#06B6D4' :
                            '#6366F1',
                 clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 96% 94%, 90% 100%, 82% 98%, 75% 95%, 65% 98%, 55% 100%, 45% 97%, 35% 99%, 25% 96%, 15% 100%, 8% 95%, 3% 92%, 0% 88%)',
                 paddingBottom: '20px',
                 transition: 'background 0.5s ease'
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
                  <FaGamepad className="text-4xl" />
                </div>
              </div>
              <div>
                <h2 className="font-display text-4xl font-bold text-white drop-shadow-lg">TRIVIA</h2>
                <p className="text-xl text-white/90 drop-shadow">Demuestra tu conocimiento</p>
              </div>
            </div>
          </div>

          {/* Contenido con padding */}
          <div className="px-6 py-8 relative z-10">
        {/* Contenido del juego */}
        {!gameStarted && !showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h3 className="text-4xl font-bold text-gray-800 mb-3">
              Responde 10 preguntas sobre la historia del acordeón en Colombia
            </h3>
            <div className="bg-amber-50 p-6 rounded-xl">
              <h4 className="font-bold text-xl text-gray-800 mb-3">Instrucciones:</h4>
              <ul className="text-left text-gray-700 space-y-2 text-lg">
                <li>• Tendrás 10 preguntas de opción múltiple</li>
                <li>• Selecciona la respuesta correcta</li>
                <li>• Acumula puntos por cada respuesta correcta</li>
                <li>• ¡Diviértete aprendiendo!</li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameStarted(true)}
              className="text-white font-bold text-2xl px-16 py-5 mx-auto transition-all flex items-center justify-center mt-4 rounded-2xl"
              style={{
                background: '#F59E0B',
                filter: 'blur(0.4px)',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                border: 'none'
              }}
            >
              COMENZAR JUEGO
            </motion.button>
          </motion.div>
        )}

        {/* Preguntas */}
        {gameStarted && !showResult && (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 p-8"
          >
            {/* Progreso */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaTrophy className="text-3xl text-primary" />
                <span className="text-3xl font-bold text-gray-800">
                  Puntos: {score}
                </span>
              </div>
              <div className="text-xl font-semibold text-gray-600">
                Pregunta {currentQuestion + 1} de {questions.length}
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  backgroundColor: currentQuestion === 0 ? '#F59E0B' :
                                   currentQuestion === 1 ? '#EF4444' :
                                   currentQuestion === 2 ? '#10B981' :
                                   currentQuestion === 3 ? '#3B82F6' :
                                   currentQuestion === 4 ? '#EC4899' :
                                   currentQuestion === 5 ? '#14B8A6' :
                                   currentQuestion === 6 ? '#F97316' :
                                   currentQuestion === 7 ? '#8B5CF6' :
                                   currentQuestion === 8 ? '#06B6D4' :
                                   '#6366F1'
                }}
                transition={{ backgroundColor: { duration: 0.5 } }}
                className="h-full"
              />
            </div>

            {/* Pregunta */}
            <motion.div 
              animate={{ 
                backgroundColor: currentQuestion === 0 ? '#fef3c7' :  // yellow-100
                                 currentQuestion === 1 ? '#fee2e2' :  // red-100
                                 currentQuestion === 2 ? '#d1fae5' :  // green-100
                                 currentQuestion === 3 ? '#dbeafe' :  // blue-100
                                 currentQuestion === 4 ? '#fbcfe8' :  // pink-100
                                 currentQuestion === 5 ? '#ccfbf1' :  // teal-100
                                 currentQuestion === 6 ? '#fed7aa' :  // orange-100
                                 currentQuestion === 7 ? '#f3e8ff' :  // purple-100
                                 currentQuestion === 8 ? '#cffafe' :  // cyan-100
                                 '#e0e7ff'                            // indigo-100
              }}
              transition={{ backgroundColor: { duration: 0.5 } }}
              className="p-7 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 text-center">
                {questions[currentQuestion].question}
              </h3>
            </motion.div>

            {/* Opciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectedAnswer === null && handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-6 rounded-xl font-semibold text-xl transition-all ${
                    selectedAnswer === null
                      ? 'bg-white hover:bg-amber-50 border-2 border-gray-300 hover:border-primary text-gray-800'
                      : selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-500 text-white border-2 border-green-600'
                        : 'bg-red-500 text-white border-2 border-red-600'
                      : index === questions[currentQuestion].correct
                      ? 'bg-green-500 text-white border-2 border-green-600'
                      : 'bg-gray-200 text-gray-500 border-2 border-gray-300'
                  }`}
                >
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-xl text-center font-semibold text-lg ${
                  selectedAnswer === questions[currentQuestion].correct
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {selectedAnswer === questions[currentQuestion].correct
                  ? '¡Correcto!'
                  : 'Incorrecto. La respuesta correcta es: ' + 
                    questions[currentQuestion].options[questions[currentQuestion].correct]}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Resultados */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 p-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <FaTrophy className="text-9xl text-primary mx-auto" />
            </motion.div>

            <h3 className="text-5xl font-bold text-gray-800">
              ¡Juego Completado!
            </h3>

            <div className="bg-amber-50 p-10 rounded-2xl">
              <p className="text-7xl font-bold text-gray-800 mb-4">
                {score} / {questions.length}
              </p>
              <p className="text-3xl text-gray-600">
                {score === questions.length
                  ? '¡Perfecto! Eres un experto'
                  : score >= 3
                  ? '¡Muy bien! Buen conocimiento'
                  : '¡Sigue aprendiendo!'}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="text-white font-bold flex items-center gap-2 text-xl px-8 py-4 transition-all rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  filter: 'blur(0.4px)',
                  boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                  border: 'none'
                }}
              >
                <FaRedo />
                JUGAR DE NUEVO
              </motion.button>
            </div>
          </motion.div>
        )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameModal
