import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Welcome from './pages/Welcome'
import MapaInteractivo from './pages/MapaInteractivo'

function App() {
  const audioRef = useRef(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // Inicializar el audio cuando monta el componente
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.05
      audio.loop = true
    }
  }, [])

  // Exponer métodos globales para controlar el audio
  useEffect(() => {
    window.audioController = {
      play: () => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => console.log('Error al reproducir:', err))
          setIsAudioPlaying(true)
        }
      },
      pause: () => {
        if (audioRef.current) {
          audioRef.current.pause()
          setIsAudioPlaying(false)
        }
      },
      stop: () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          setIsAudioPlaying(false)
        }
      },
      fadeOut: (duration = 1000) => {
        return new Promise((resolve) => {
          if (!audioRef.current) {
            resolve()
            return
          }

          const audio = audioRef.current
          const startVolume = audio.volume
          const steps = 50
          const stepDuration = duration / steps
          let currentStep = 0

          const fadeInterval = setInterval(() => {
            currentStep++
            audio.volume = startVolume * (1 - currentStep / steps)

            if (currentStep >= steps) {
              clearInterval(fadeInterval)
              audio.pause()
              audio.volume = startVolume
              setIsAudioPlaying(false)
              resolve()
            }
          }, stepDuration)
        })
      },
      fadeIn: (duration = 1000) => {
        return new Promise((resolve) => {
          if (!audioRef.current) {
            resolve()
            return
          }

          const audio = audioRef.current
          const targetVolume = 0.05 // 5% - el volumen original
          audio.volume = 0
          audio.play().catch((err) => console.log('Error al reproducir:', err))
          setIsAudioPlaying(true)

          const steps = 50
          const stepDuration = duration / steps
          let currentStep = 0

          const fadeInterval = setInterval(() => {
            currentStep++
            audio.volume = targetVolume * (currentStep / steps)

            if (currentStep >= steps) {
              clearInterval(fadeInterval)
              audio.volume = targetVolume
              resolve()
            }
          }, stepDuration)
        })
      }
    }

    return () => {
      delete window.audioController
    }
  }, [])

  return (
    <>
      {/* Audio global que persiste entre rutas */}
      <audio 
        ref={audioRef}
        src="/CancionVallenato.mp3"
        preload="auto"
        loop
        onPlay={() => console.log('▶️ Audio en reproducción')}
        onPause={() => console.log('⏸️ Audio pausado')}
        onError={(e) => console.error('❌ Error al cargar audio:', e)}
        onCanPlay={() => console.log('✅ Audio listo para reproducir')}
      />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/mapa" element={<MapaInteractivo />} />
        {/* Redirect any other route to welcome page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
