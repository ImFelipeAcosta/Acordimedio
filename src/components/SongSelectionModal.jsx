import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { FaTimes, FaMusic, FaPlay, FaClock } from 'react-icons/fa'
import { TrendingUp } from 'lucide-react'

const SongSelectionModal = ({ isOpen, onClose, onSelectSong }) => {
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(true)

  // Debug log
  console.log('🎵 SongSelectionModal - isOpen:', isOpen)

  useEffect(() => {
    if (isOpen) {
      console.log('📂 Cargando canciones...')
      loadSongs()
    }
  }, [isOpen])

  const loadSongs = async () => {
    try {
      setLoading(true);
      
      // Cargar todos los charts disponibles
      const charts = [
        'El Condor Legendario, Los Hermanos Zuleta - Letra Oficial.json',
        'El Testamento.json',
        'La Plata, Diomedes Díaz - Letra Oficial.json',
        'Muere Una Flor, Binomio De Oro, Video Letra - Sentir Vallenato.json',
        'Niña Bonita, Binomio De Oro De América, Video Letra - Sentir Vallenato.json',
        'Matilde lina.json'
      ];
      
      // También intentar cargar el chart_acordeon.json desde /public
      const additionalCharts = [];

      console.log('📋 Intentando cargar', charts.length + additionalCharts.length, 'canciones');

      const songsData = [];

      // Cargar charts desde /charts/
      for (const chartFile of charts) {
        try {
          const url = `/charts/${chartFile}`;
          console.log(`� Intentando cargar URL: ${url}`);
          const response = await fetch(url);
          console.log(`📄 Respuesta para ${chartFile}:`, {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Datos cargados para ${chartFile}:`, data.metadata);
            songsData.push({
              id: chartFile.replace('.json', ''),
              filename: chartFile,
              ...data.metadata,
              chart: data.chart,
              config: data.config
            });
          } else {
            console.error(`❌ Error HTTP ${response.status} para ${chartFile}`);
          }
        } catch (error) {
          console.error(`❌ Error al cargar ${chartFile}:`, error);
        }
      }
      
      // Cargar charts adicionales desde /public
      for (const chartFile of additionalCharts) {
        try {
          const url = `/${chartFile}`;
          console.log(`🔍 Intentando cargar URL: ${url}`);
          const response = await fetch(url);
          console.log(`📄 Respuesta para ${chartFile}:`, {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Datos cargados para ${chartFile}:`, data.metadata);
            songsData.push({
              id: chartFile.replace('.json', ''),
              filename: chartFile,
              ...data.metadata,
              chart: data.chart,
              config: data.config
            });
          } else {
            console.error(`❌ Error HTTP ${response.status} para ${chartFile}`);
          }
        } catch (error) {
          console.error(`❌ Error al cargar ${chartFile}:`, error);
        }
      }

      console.log('🎵 Total de canciones cargadas:', songsData.length);
      console.log('📝 Lista de canciones:', songsData.map(s => s.title || s.id));
      setSongs(songsData);
      setLoading(false);
    } catch (error) {
      console.error('💥 Error crítico al cargar canciones:', error);
      setLoading(false);
    }
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const handleConfirm = () => {
    if (selectedSong) {
      onSelectSong(selectedSong);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'facil':
        return 'text-green-600 bg-green-100';
      case 'medio':
        return 'text-yellow-600 bg-yellow-100';
      case 'dificil':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'facil':
        return 'Fácil';
      case 'medio':
        return 'Medio';
      case 'dificil':
        return 'Difícil';
      default:
        return difficulty;
    }
  };

  if (!isOpen) return null

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
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full relative"
        style={{ maxHeight: '90vh', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenedor con scroll interno */}
        <div 
          className="overflow-y-auto overflow-x-hidden max-h-[90vh] relative"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#3b82f6 #f3f4f6'
          }}
        >
        {/* Manchas de acuarela decorativas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          {/* Mancha naranja - superior izquierda */}
          <div className="absolute pointer-events-none z-0"
               style={{
                 top: '80px',
                 left: '8%',
                 width: '180px',
                 height: '170px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 165, 0, 0.45) 0%, rgba(255, 165, 0, 0.25) 45%, transparent 75%)',
                 filter: 'blur(1.2px)',
                 borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(-15deg)'
               }} />
          
          {/* Mancha amarillo - superior derecha */}
          <div className="absolute pointer-events-none z-0"
               style={{
                 top: '120px',
                 right: '10%',
                 width: '160px',
                 height: '155px',
                 background: 'radial-gradient(ellipse at 48% 52%, rgba(255, 229, 160, 0.48) 0%, rgba(255, 229, 160, 0.28) 42%, transparent 72%)',
                 filter: 'blur(1px)',
                 borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
                 transform: 'rotate(20deg)'
               }} />
          
          {/* Mancha rosa coral - medio */}
          <div className="absolute pointer-events-none z-0"
               style={{
                 top: '400px',
                 left: '12%',
                 width: '145px',
                 height: '140px',
                 background: 'radial-gradient(ellipse at 52% 48%, rgba(255, 179, 186, 0.42) 0%, rgba(255, 179, 186, 0.22) 48%, transparent 76%)',
                 filter: 'blur(0.95px)',
                 borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
                 transform: 'rotate(-22deg)'
               }} />
          
          {/* Mancha verde menta - medio derecha */}
          <div className="absolute pointer-events-none z-0"
               style={{
                 top: '500px',
                 right: '8%',
                 width: '170px',
                 height: '165px',
                 background: 'radial-gradient(ellipse at 50% 48%, rgba(168, 230, 207, 0.46) 0%, rgba(168, 230, 207, 0.26) 44%, transparent 74%)',
                 filter: 'blur(1.1px)',
                 borderRadius: '55% 45% 48% 52% / 52% 48% 52% 48%',
                 transform: 'rotate(18deg)'
               }} />
          
          {/* Mancha azul pastel - inferior */}
          <div className="absolute pointer-events-none z-0"
               style={{
                 bottom: '100px',
                 left: '25%',
                 width: '155px',
                 height: '150px',
                 background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 212, 232, 0.38) 0%, rgba(184, 212, 232, 0.18) 50%, transparent 78%)',
                 filter: 'blur(1px)',
                 borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%',
                 transform: 'rotate(-28deg)'
               }} />
        </div>

        {/* Contenido con z-10 */}
        <div className="relative z-10">
        {/* Botón cerrar con forma acuarela - AZUL CLARO como LocationModal */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute w-12 h-12 bg-blue-400 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 rounded-lg"
          style={{
            top: '20px',
            right: '20px',
            filter: 'blur(0.3px)'
          }}
        >
          <FaTimes className="text-xl" />
        </motion.button>

        {/* Header con estilo azul acuarela - con borde irregular */}
        <div 
          className="bg-blue-500 text-white p-6 mb-0 relative z-10"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 96% 90%, 90% 95%, 82% 93%, 75% 91%, 65% 93%, 55% 95%, 45% 93%, 35% 95%, 25% 92%, 15% 95%, 8% 91%, 3% 88%, 0% 83%)',
            paddingBottom: '40px'
          }}
        >
          <div className="flex items-center gap-4">
            <FaMusic className="text-5xl" />
            <div>
              <h2 className="font-display text-4xl font-bold">SELECCIONA UNA CANCIÓN</h2>
              <p className="text-xl opacity-90">Elige tu favorita</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8 relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
              />
              <p className="text-gray-600 text-lg">Cargando canciones...</p>
            </div>
          ) : songs.length === 0 ? (
            <div className="text-center py-16">
              <FaMusic className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No se encontraron canciones</p>
              <p className="text-gray-500 text-sm mt-2">Ejecuta el convertidor primero</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {songs.map((song) => (
                <motion.div
                  key={song.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSongSelect(song)}
                  className={`cursor-pointer transition-all duration-300 rounded-2xl p-6 border-3 ${
                    selectedSong?.id === song.id
                      ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-500 shadow-2xl'
                      : 'bg-white border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                  }`}
                  style={{
                    border: selectedSong?.id === song.id ? '3px solid #3B82F6' : '2px solid #E5E7EB'
                  }}
                >
                  {/* Título de la canción */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {song.title}
                      </h3>
                      <p className="text-lg text-gray-600">{song.artist || 'Acordeón Vallenato'}</p>
                    </div>
                    {selectedSong?.id === song.id && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleConfirm()
                        }}
                        className="ml-3 bg-blue-500 rounded-full p-3 hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        title="Click para continuar"
                      >
                        <FaPlay className="w-6 h-6 text-white" />
                      </motion.button>
                    )}
                  </div>

                  {/* Información de la canción */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center bg-white/50 rounded-xl p-3">
                      <FaClock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-1">Duración</p>
                      <p className="text-lg font-bold text-gray-700">
                        {Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}
                      </p>
                    </div>

                    <div className="text-center bg-white/50 rounded-xl p-3">
                      <FaMusic className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-1">Notas</p>
                      <p className="text-lg font-bold text-gray-700">{song.total_notes}</p>
                    </div>

                    <div className="text-center bg-white/50 rounded-xl p-3">
                      <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-1">Dificultad</p>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${getDifficultyColor(song.difficulty)}`}>
                        {getDifficultyLabel(song.difficulty)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con botones estilo acuarela - ELIMINADO */}
        {/* Los botones de cancelar y continuar se han quitado ya que el botón X cierra la ventana 
            y el botón de play en la tarjeta seleccionada continúa el juego */}
        </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

SongSelectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectSong: PropTypes.func.isRequired,
};

export default SongSelectionModal;
