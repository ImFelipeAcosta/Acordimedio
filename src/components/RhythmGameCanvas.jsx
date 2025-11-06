import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPlay, FaPause, FaRedo, FaArrowLeft } from 'react-icons/fa'

const RhythmGameCanvas = ({ onClose, onBack, onBackToSongs, onBackToMap, selectedDifficulty, selectedSong }) => {
  const [gameState, setGameState] = useState('playing') // playing, paused, ended, game-over
  const [difficulty, setDifficulty] = useState(selectedDifficulty || 'medio')
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [comboMode, setComboMode] = useState(false) // Modo combo especial
  const [perfectStreak, setPerfectStreak] = useState(0) // Racha de perfectos
  const [failStreak, setFailStreak] = useState(0) // Racha de misses/casi
  const [missStreak, setMissStreak] = useState(0) // Contador de MISS seguidos
  const [almostStreak, setAlmostStreak] = useState(0) // Contador de CASI... seguidos
  const [chartData, setChartData] = useState(null)
  const [hitFeedback, setHitFeedback] = useState([])
  
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const gameLoopRef = useRef(null)
  const notesRef = useRef([])
  const keysPressed = useRef({ a: false, s: false, j: false, k: false })
  const activeHolds = useRef({}) // Trackear hold notes activas: { noteId: { startTime, lane, note } }
  const noteIdCounter = useRef(0)
  const lastTimeRef = useRef(0)
  const startTimeRef = useRef(0)

  // Configuración del juego
  const CONFIG = {
    canvas: {
      width: 1400,
      height: 900
    },
    lanes: [
      { key: 'a', x: 250, color: '#A8E6CF', label: 'A' }, // Verde agua suave
      { key: 's', x: 550, color: '#FFB3BA', label: 'S' }, // Rosa salmón
      { key: 'j', x: 850, color: '#FFE5A0', label: 'J' }, // Amarillo mostaza
      { key: 'k', x: 1150, color: '#B8D4E8', label: 'K' }  // Azul pastel
    ],
    hitZone: 800,
    hitTolerance: 40,
    noteSpeed: 200, // píxeles por segundo
    noteSize: 80,
    noteAppearDistance: 3.5 // segundos antes
  }

  // Cargar chart al montar el componente
  useEffect(() => {
    if (selectedDifficulty) {
      const chartFiles = {
        facil: '/chart_facil.json',
        medio: '/chart_medio.json',
        dificil: '/chart_dificil.json'
      }
      
      console.log('🎮 Cargando chart:', chartFiles[selectedDifficulty])
      
      fetch(chartFiles[selectedDifficulty])
        .then(res => res.json())
        .then(data => {
          console.log('✅ Chart cargado:', data)
          setChartData(data)
          // Iniciar juego automáticamente
          setTimeout(() => {
            startGame()
          }, 100)
        })
        .catch(error => {
          console.error('❌ Error cargando chart:', error)
        })
    }
  }, [selectedDifficulty])

  // Construir ruta del audio basándose en selectedSong
  const getAudioPath = () => {
    if (!selectedSong) return null
    
    // Si tiene audio_file en metadata, usarlo
    if (selectedSong.audio_file) {
      const filename = selectedSong.audio_file.split('/').pop()
      console.log('🎵 Usando audio_file:', filename)
      return `/music/${filename}`
    }
    
    // Si tiene filename (nombre del JSON), usarlo
    if (selectedSong.filename) {
      const audioName = selectedSong.filename.replace('.json', '.mp3')
      console.log('🎵 Usando filename:', audioName)
      return `/music/${audioName}`
    }
    
    // Fallback: usar title
    console.log('🎵 Usando title:', selectedSong.title)
    return `/music/${encodeURIComponent(selectedSong.title)}.mp3`
  }

  // Inicializar canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = CONFIG.canvas.width
    canvas.height = CONFIG.canvas.height

    // Fondo con textura acuarela
    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Pausar música cuando sea game-over
  useEffect(() => {
    if (gameState === 'game-over') {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [gameState])

  // Manejar teclas
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      
      // ESC para pausar/despausar
      if (key === 'escape') {
        e.preventDefault()
        if (gameState === 'playing') {
          pauseGame()
        } else if (gameState === 'paused') {
          resumeGame()
        }
        return
      }
      
      if (['a', 's', 'j', 'k'].includes(key) && !keysPressed.current[key]) {
        keysPressed.current[key] = true
        checkNoteHit(key, 'down')
      }
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (['a', 's', 'j', 'k'].includes(key)) {
        keysPressed.current[key] = false
        checkNoteRelease(key)
      }
    }

    if (gameState === 'playing' || gameState === 'paused') {
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState])

  // Verificar hit de nota (keydown)
  const checkNoteHit = (key, eventType) => {
    const laneIndex = CONFIG.lanes.findIndex(lane => lane.key === key)
    const hitZone = CONFIG.hitZone
    const tolerance = CONFIG.hitTolerance

    const notes = notesRef.current
    const hitNote = notes.find(note => 
      note.lane === laneIndex && 
      Math.abs(note.y - hitZone) < tolerance &&
      !note.hit
    )

    if (hitNote) {
      const isHoldNote = hitNote.duration && hitNote.duration > 1.0
      
      if (isHoldNote) {
        // Nota larga: iniciar hold
        hitNote.hit = true
        hitNote.holdStartTime = Date.now()
        activeHolds.current[hitNote.id] = {
          note: hitNote,
          lane: laneIndex,
          startTime: Date.now(),
          expectedDuration: hitNote.duration * 1000 // ms
        }
        
        // No mostrar feedback para hold notes (ya no tienen visual)
        // Solo contamos silenciosamente el hold
        
      } else {
        // Nota normal: hit instantáneo
        hitNote.hit = true
        
        const distance = Math.abs(hitNote.y - hitZone)
        let points = 0
        let rating = 'MISS'
        let isPerfect = false
        
        if (distance < 5) {
          points = 100
          rating = '¡Perfecto!'
          isPerfect = true
        } else if (distance < 15) {
          points = 50
          rating = '¡Genial!'
        } else if (distance < 25) {
          points = 15
          rating = 'Bien'
        } else if (distance < 40) {
          rating = 'Casi...'
          points = 0
        }

        // Sistema de racha perfecta para modo combo
        if (isPerfect) {
          setPerfectStreak(prev => {
            const newStreak = prev + 1
            // Activar modo combo con 15 perfectos seguidos
            if (newStreak >= 15 && !comboMode) {
              setComboMode(true)
            }
            return newStreak
          })
          // Resetear streak cuando hay un hit perfecto
          setMissStreak(0)
          setAlmostStreak(0)
        } else {
          setPerfectStreak(0)
          if (comboMode) {
            setComboMode(false)
          }
          // Incrementar streaks según el tipo de fallo
          if (rating === 'Casi...') {
            setAlmostStreak(prev => {
              const newAlmostStreak = prev + 1
              // Resetear miss streak
              setMissStreak(0)
              // Si alcanza 20 CASI... seguidos, game over
              if (newAlmostStreak >= 20) {
                setGameState('game-over')
              }
              return newAlmostStreak
            })
          } else if (rating === 'Bien' || rating === 'Genial') {
            // Resetear ambos streaks en Bien o Genial
            setMissStreak(0)
            setAlmostStreak(0)
          }
        }

        // Multiplicador de puntos si está en modo combo
        const multiplier = comboMode ? 2 : 1
        const finalPoints = points * multiplier

        setScore(prev => prev + finalPoints)
        setCombo(prev => {
          const newCombo = prev + 1
          setMaxCombo(current => Math.max(current, newCombo))
          return newCombo
        })

        // Feedback visual
        const feedbackId = Date.now()
        setHitFeedback(prev => [...prev, { 
          id: feedbackId, 
          lane: laneIndex, 
          rating, 
          points: finalPoints,
          timestamp: Date.now(),
          comboMode: comboMode
        }])
        
        setTimeout(() => {
          setHitFeedback(prev => prev.filter(f => f.id !== feedbackId))
        }, 800)

        // Efecto de partículas en canvas
        createHitParticles(CONFIG.lanes[laneIndex].x, hitZone, CONFIG.lanes[laneIndex].color, comboMode)
      }
    } else {
      // Miss - no hay nota cerca para golpear
      setCombo(0)
      setPerfectStreak(0)
      setComboMode(false)
      // Incrementar miss streak
      setMissStreak(prev => {
        const newMissStreak = prev + 1
        // Resetear almost streak
        setAlmostStreak(0)
        // Si alcanza 10 MISS seguidos, game over
        if (newMissStreak >= 10) {
          setGameState('game-over')
        }
        return newMissStreak
      })
    }
  }

  // Verificar release de nota larga (keyup)
  const checkNoteRelease = (key) => {
    const laneIndex = CONFIG.lanes.findIndex(lane => lane.key === key)
    
    // Buscar hold note activa en este lane
    const holdEntry = Object.entries(activeHolds.current).find(([id, hold]) => hold.lane === laneIndex)
    
    if (holdEntry) {
      const [noteId, hold] = holdEntry
      const heldDuration = Date.now() - hold.startTime
      const expectedDuration = hold.expectedDuration
      
      // Calcular puntuación basada en % de duración mantenida
      const heldPercentage = Math.min(heldDuration / expectedDuration, 1)
      let points = 0
      let rating = 'Fail'
      let isPerfect = false
      
      if (heldPercentage >= 0.95) {
        points = 250
        rating = '¡Perfecto!'
        isPerfect = true
      } else if (heldPercentage >= 0.85) {
        points = 150
        rating = '¡Genial!'
      } else if (heldPercentage >= 0.7) {
        points = 75
        rating = 'Bien'
      } else if (heldPercentage >= 0.5) {
        points = 25
        rating = 'OK'
      }
      
      // Sistema de racha perfecta
      if (isPerfect) {
        setPerfectStreak(prev => {
          const newStreak = prev + 1
          if (newStreak >= 15 && !comboMode) {
            setComboMode(true)
          }
          return newStreak
        })
      } else {
        setPerfectStreak(0)
        if (comboMode) {
          setComboMode(false)
        }
      }
      
      // Multiplicador combo
      const multiplier = comboMode ? 2 : 1
      const finalPoints = points * multiplier
      
      setScore(prev => prev + finalPoints)
      if (points > 0) {
        setCombo(prev => {
          const newCombo = prev + 1
          setMaxCombo(current => Math.max(current, newCombo))
          return newCombo
        })
      } else {
        setCombo(0)
      }
      
      // Feedback visual
      const feedbackId = Date.now()
      setHitFeedback(prev => [...prev, { 
        id: feedbackId, 
        lane: laneIndex, 
        rating, 
        points: finalPoints,
        timestamp: Date.now(),
        comboMode: comboMode
      }])
      
      setTimeout(() => {
        setHitFeedback(prev => prev.filter(f => f.id !== feedbackId))
      }, 800)
      
      // Partículas
      createHitParticles(CONFIG.lanes[laneIndex].x, CONFIG.hitZone, CONFIG.lanes[laneIndex].color, comboMode)
      
      // Limpiar hold
      delete activeHolds.current[noteId]
    }
  }

  // Crear partículas al golpear
  const createHitParticles = (x, y, color, isComboMode = false) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const particleCount = isComboMode ? 20 : 12 // Más partículas en modo combo
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 / particleCount) * i
      const velocity = isComboMode ? 5 : 3
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity
      
      // Dibujar partícula
      setTimeout(() => {
        ctx.save()
        ctx.globalAlpha = 0.6
        ctx.fillStyle = isComboMode ? '#FFD700' : color // Dorado en modo combo
        ctx.beginPath()
        ctx.arc(x + vx * 10, y + vy * 10, isComboMode ? 6 : 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }, i * 20)
    }
  }

  // Dibujar nota con estética acuarela
  const drawNote = (ctx, note, lane) => {
    const x = lane.x
    const y = note.y
    const size = CONFIG.noteSize
    
    ctx.save()

    // NOTA (cabeza) - SIEMPRE con estilo acuarela circular
    // Sombra suave
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetY = 4

    // Forma irregular (acuarela)
    ctx.beginPath()
    
    // Crear forma orgánica con curvas
    const irregularity = 3
    ctx.moveTo(x - size/2 + Math.random() * irregularity, y - size/2)
    
    // Bordes irregulares simulando acuarela
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i
      const radius = size/2 + (Math.random() - 0.5) * irregularity
      const px = x + Math.cos(angle) * radius
      const py = y + Math.sin(angle) * radius
      
      if (i === 0) {
        ctx.moveTo(px, py)
      } else {
        // Curvas bezier para suavidad
        const prevAngle = (Math.PI * 2 / 8) * (i - 1)
        const cpx = x + Math.cos((angle + prevAngle) / 2) * (radius * 1.1)
        const cpy = y + Math.sin((angle + prevAngle) / 2) * (radius * 1.1)
        ctx.quadraticCurveTo(cpx, cpy, px, py)
      }
    }
    ctx.closePath()

    // Relleno con gradiente suave (acuarela)
    const gradient = ctx.createRadialGradient(x - size/4, y - size/4, 0, x, y, size/2)
    gradient.addColorStop(0, lane.color + 'FF') // Color base
    gradient.addColorStop(0.6, lane.color + 'CC') // Más transparente
    gradient.addColorStop(1, lane.color + '88') // Muy transparente en bordes
    
    ctx.fillStyle = gradient
    ctx.fill()

    // Borde suave difuminado
    ctx.strokeStyle = lane.color + '40'
    ctx.lineWidth = 2
    ctx.stroke()

    // Manchas de acuarela (textura)
    ctx.globalAlpha = 0.3
    for (let i = 0; i < 3; i++) {
      const spotX = x + (Math.random() - 0.5) * size * 0.6
      const spotY = y + (Math.random() - 0.5) * size * 0.6
      const spotSize = Math.random() * 8 + 4
      
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(spotX, spotY, spotSize, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1

    // Nota musical (♪)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 32px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('♪', x, y)

    ctx.restore()
  }

  // Dibujar cola de nota sostenida
  const drawNoteTail = (ctx, x, y, height, color) => {
    ctx.save()
    
    const width = CONFIG.noteSize * 0.8
    
    // Gradiente vertical
    const gradient = ctx.createLinearGradient(x, y, x, y + height)
    gradient.addColorStop(0, color + 'AA')
    gradient.addColorStop(1, color + '00')
    
    ctx.fillStyle = gradient
    
    // Rectángulo con bordes redondeados
    const radius = 8
    ctx.beginPath()
    ctx.moveTo(x - width/2 + radius, y)
    ctx.lineTo(x + width/2 - radius, y)
    ctx.quadraticCurveTo(x + width/2, y, x + width/2, y + radius)
    ctx.lineTo(x + width/2, y + height - radius)
    ctx.quadraticCurveTo(x + width/2, y + height, x + width/2 - radius, y + height)
    ctx.lineTo(x - width/2 + radius, y + height)
    ctx.quadraticCurveTo(x - width/2, y + height, x - width/2, y + height - radius)
    ctx.lineTo(x - width/2, y + radius)
    ctx.quadraticCurveTo(x - width/2, y, x - width/2 + radius, y)
    ctx.closePath()
    ctx.fill()
    
    ctx.restore()
  }

  // Dibujar zona de hit con estética acuarela
  const drawHitZone = (ctx) => {
    const y = CONFIG.hitZone
    
    CONFIG.lanes.forEach(lane => {
      const x = lane.x
      const size = CONFIG.noteSize + 10
      
      ctx.save()
      
      // Forma del receptor con acuarela
      ctx.beginPath()
      
      // Bordes irregulares
      const irregularity = 4
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i
        const radius = size/2 + (Math.sin(i * 2) * irregularity)
        const px = x + Math.cos(angle) * radius
        const py = y + Math.sin(angle) * radius
        
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      
      // Relleno con opacidad baja
      ctx.fillStyle = lane.color + '30'
      ctx.fill()
      
      // Borde
      ctx.strokeStyle = lane.color + '80'
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Tecla en el centro
      const isPressed = keysPressed.current[lane.key]
      ctx.fillStyle = isPressed ? '#ffffff' : lane.color
      ctx.globalAlpha = isPressed ? 0.9 : 0.7
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(lane.label, x, y)
      
      ctx.restore()
    })
  }

  // Dibujar líneas de carriles (suaves)
  const drawLanes = (ctx) => {
    ctx.save()
    ctx.strokeStyle = '#444444'
    ctx.lineWidth = 1
    ctx.globalAlpha = 0.3
    
    CONFIG.lanes.forEach(lane => {
      ctx.beginPath()
      ctx.moveTo(lane.x, 0)
      ctx.lineTo(lane.x, CONFIG.canvas.height)
      ctx.stroke()
    })
    
    ctx.restore()
  }

  // Loop principal del juego (Canvas rendering)
  useEffect(() => {
    console.log('🔄 useEffect gameLoop:', { gameState, hasCanvas: !!canvasRef.current, hasVideo: !!videoRef.current, hasChart: !!chartData })
    
    if (gameState !== 'playing' || !canvasRef.current || !chartData) {
      console.log('⚠️ Condiciones no cumplidas para iniciar gameLoop')
      return
    }

    console.log('✅ Iniciando gameLoop...')
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const video = videoRef.current

    // Inicializar notas
    notesRef.current = []
    noteIdCounter.current = 0
    
    // Tiempo de inicio del juego
    const startTime = performance.now()

    const gameLoop = (timestamp) => {
      // No continuar el loop si no estamos jugando, pausados, o en game-over
      if (gameState !== 'playing' && gameState !== 'paused' && gameState !== 'game-over') {
        return
      }

      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaTime = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp

      // Usar tiempo del audio si existe, sino del video, sino tiempo transcurrido
      const currentTime = audioRef.current 
        ? audioRef.current.currentTime 
        : video 
          ? video.currentTime 
          : (timestamp - startTimeRef.current) / 1000

      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Fondo
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar carriles
      drawLanes(ctx)

      // Generar nuevas notas
      chartData.chart.forEach(pattern => {
        const noteAppearTime = pattern.time - CONFIG.noteAppearDistance
        
        if (currentTime >= noteAppearTime && currentTime < pattern.time + 0.1) {
          const exists = notesRef.current.some(n => 
            Math.abs(n.spawnTime - pattern.time) < 0.1 && n.lane === pattern.button
          )
          
          if (!exists) {
            notesRef.current.push({
              id: noteIdCounter.current++,
              lane: pattern.button,
              y: 0,
              spawnTime: pattern.time,
              duration: pattern.duration || 0,
              hit: false
            })
          }
        }
      })

      // Actualizar y dibujar notas
      notesRef.current = notesRef.current.filter(note => {
        if (note.hit) return false
        
        // Mover nota
        note.y += CONFIG.noteSpeed * deltaTime

        // Eliminar si salió de pantalla
        if (note.y > CONFIG.canvas.height + 50) {
          setCombo(0) // Nota perdida
          setPerfectStreak(0)
          if (comboMode) {
            setComboMode(false)
          }
          
          // Incrementar Miss Streak
          setMissStreak(prev => {
            const newMissStreak = prev + 1
            // Resetear almost streak cuando hay un miss
            setAlmostStreak(0)
            // Si alcanza 10 MISS seguidos, game over
            if (newMissStreak >= 10) {
              setGameState('game-over')
            }
            return newMissStreak
          })
          
          // Mostrar feedback de MISS
          const lane = CONFIG.lanes[note.lane]
          const feedbackId = Date.now()
          setHitFeedback(prev => [...prev, { 
            id: feedbackId, 
            lane: note.lane, 
            rating: '¡MISS!',
            points: 0,
            timestamp: Date.now(),
            comboMode: false,
            isMiss: true
          }])
          
          setTimeout(() => {
            setHitFeedback(prev => prev.filter(f => f.id !== feedbackId))
          }, 800)
          
          return false
        }

        // Dibujar nota
        const lane = CONFIG.lanes[note.lane]
        if (lane) {
          drawNote(ctx, note, lane)
        }

        return true
      })

      // Dibujar zona de hit
      drawHitZone(ctx)

      // Continuar loop
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState, chartData])

  // Cargar high scores desde localStorage
  const loadHighScores = () => {
    const saved = localStorage.getItem('rhythmGameHighScores')
    if (saved) {
      return JSON.parse(saved)
    }
    return { facil: 0, medio: 0, dificil: 0 }
  }

  // Guardar high score
  const saveHighScore = (difficulty, score) => {
    const highScores = loadHighScores()
    if (score > highScores[difficulty]) {
      highScores[difficulty] = score
      localStorage.setItem('rhythmGameHighScores', JSON.stringify(highScores))
      return true // Es nuevo récord
    }
    return false
  }

  // Controles del juego
  const startGame = () => {
    console.log('🎮 Iniciando juego...')
    setGameState('playing')
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    notesRef.current = []
    lastTimeRef.current = 0
    startTimeRef.current = performance.now()
    
    // Reproducir audio si existe
    if (audioRef.current) {
      console.log('🔊 Intentando reproducir audio...')
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.25
      audioRef.current.play()
        .then(() => {
          console.log('✅ Audio iniciado exitosamente')
          console.log('🔊 Volumen:', audioRef.current.volume)
          console.log('🔊 Duración:', audioRef.current.duration)
        })
        .catch(err => {
          console.error('❌ Error al iniciar audio:', err)
          console.log('💡 Intenta hacer clic en la página primero para permitir audio')
        })
    } else {
      console.warn('⚠️ audioRef.current es null')
    }
    
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
        .then(() => console.log('✅ Video iniciado'))
        .catch(err => console.error('❌ Error al iniciar video:', err))
    }
  }

  const pauseGame = () => {
    setGameState('paused')
    if (audioRef.current) audioRef.current.pause()
    if (videoRef.current) videoRef.current.pause()
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }
  }

  const resumeGame = () => {
    setGameState('playing')
    if (audioRef.current) audioRef.current.play()
    if (videoRef.current) videoRef.current.play()
    lastTimeRef.current = performance.now()
    gameLoop()
  }

  const restartGame = () => {
    // Limpiar estado del juego
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setPerfectStreak(0)
    setMissStreak(0) // Resetear MISS
    setAlmostStreak(0) // Resetear CASI...
    setComboMode(false)
    notesRef.current = []
    activeHolds.current = {}
    setHitFeedback([])
    
    // Reiniciar audio y video
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.pause()
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.pause()
    }
    
    // Reiniciar el juego
    startGame()
  }

  const quitGame = () => {
    console.log('🔙 Saliendo del juego...')
    // Limpiar todo
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setPerfectStreak(0)
    setComboMode(false)
    notesRef.current = []
    activeHolds.current = {}
    setHitFeedback([])
    
    // Hacer fade in de la música de fondo cuando se sale del gameplay
    if (window.audioController && window.audioController.fadeIn) {
      window.audioController.fadeIn(1000)
    } else if (window.audioController) {
      window.audioController.play()
    }
    
    // Volver a la pantalla anterior
    if (onBack) {
      onBack()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => {
        // Solo cerrar si clickeas fuera y NO estás jugando
        if (gameState !== 'playing') {
          onClose()
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[70vw] h-[85vh] shadow-2xl overflow-visible bg-white rounded-3xl"
      >
        {/* Manchas de acuarela decorativas */}
        <div className="absolute top-10 left-16 rounded-full opacity-20 pointer-events-none"
             style={{
               width: '220px',
               height: '210px',
               background: 'radial-gradient(circle at 45% 40%, #A8E6CF, transparent 65%)',
               filter: 'blur(40px)',
               zIndex: 0
             }} />
        <div className="absolute bottom-20 right-24 rounded-full opacity-20 pointer-events-none"
             style={{
               width: '240px',
               height: '230px',
               background: 'radial-gradient(circle at 50% 55%, #FFE5A0, transparent 70%)',
               filter: 'blur(45px)',
               zIndex: 0
             }} />
        <div className="absolute top-1/3 right-20 rounded-full opacity-18 pointer-events-none"
             style={{
               width: '180px',
               height: '170px',
               background: 'radial-gradient(circle at 40% 50%, #FFB3BA, transparent 65%)',
               filter: 'blur(35px)',
               zIndex: 0
             }} />
        <div className="absolute bottom-1/4 left-28 rounded-full opacity-19 pointer-events-none"
             style={{
               width: '200px',
               height: '190px',
               background: 'radial-gradient(circle at 55% 45%, #B8D4E8, transparent 68%)',
               filter: 'blur(38px)',
               zIndex: 0
             }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-16 pointer-events-none"
             style={{
               width: '260px',
               height: '250px',
               background: 'radial-gradient(circle at 48% 52%, #DDA4EE, transparent 72%)',
               filter: 'blur(50px)',
               zIndex: 0
             }} />
        
        {/* Botón cerrar - Forma acuarela */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (gameState !== 'game-over') {
              onClose()
            }
          }}
          className={`absolute w-16 h-16 bg-red-400 hover:bg-red-500 text-white flex items-center justify-center transition-all shadow-lg z-50 cursor-pointer rounded-lg ${
            gameState === 'game-over' ? 'opacity-30 blur-sm pointer-events-none' : ''
          }`}
          style={{
            top: '15px',
            right: '25px',
            pointerEvents: gameState === 'game-over' ? 'none' : 'auto'
          }}
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Botón volver atrás - Forma acuarela */}
        <motion.button
          whileHover={{ scale: gameState !== 'game-over' ? 1.05 : 1 }}
          whileTap={{ scale: gameState !== 'game-over' ? 0.95 : 1 }}
          onClick={(e) => {
            e.stopPropagation()
            if (gameState !== 'game-over') {
              quitGame()
            }
          }}
          className={`absolute w-16 h-16 bg-blue-400 hover:bg-blue-500 text-white flex items-center justify-center transition-all shadow-lg z-[60] cursor-pointer rounded-lg ${
            gameState === 'game-over' ? 'opacity-30 blur-sm pointer-events-none' : ''
          }`}
          style={{
            top: '15px',
            left: '25px',
            pointerEvents: gameState === 'game-over' ? 'none' : 'auto'
          }}
        >
          <FaArrowLeft className="text-2xl" />
        </motion.button>

        {/* HUD - Score, Combo - Solo visible durante el juego */}
        {gameState === 'playing' && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-4">
          {/* SCORE - Forma acuarela */}
          <div className="bg-white/95 backdrop-blur-sm px-8 py-4 shadow-xl rounded-xl">
            <div className="text-green-600 text-base font-bold mb-2">SCORE</div>
            <div className="text-gray-800 text-4xl font-bold">{score}</div>
          </div>
          
          {/* COMBO con barra de progreso - Forma acuarela */}
          <div className="relative bg-white/95 backdrop-blur-sm px-8 py-4 shadow-xl rounded-xl">
            {/* SVG Barra circular de progreso */}
            {!comboMode && perfectStreak > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="50"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="5"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="50"
                  fill="none"
                  stroke={perfectStreak < 5 ? '#A8E6CF' : perfectStreak < 10 ? '#FFE5A0' : '#FFB3BA'}
                  strokeWidth="5"
                  strokeDasharray={`${(perfectStreak / 15) * 314} 314`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.3s ease, stroke 0.3s ease' }}
                />
              </svg>
            )}
            
            <div className="text-yellow-600 text-base font-bold mb-2">COMBO</div>
            <div className="text-gray-800 text-4xl font-bold">x{combo}</div>
            
            {/* Indicador numérico de progreso */}
            {!comboMode && perfectStreak > 0 && perfectStreak < 15 && (
              <div className="text-sm text-gray-500 mt-2">{perfectStreak}/15</div>
            )}
          </div>
          
          {/* MAX - Con clip-path acuarela */}
          <div className="bg-white/95 backdrop-blur-sm px-8 py-4 shadow-xl rounded-xl">
            <div className="text-red-400 text-base font-bold mb-2">MAX</div>
            <div className="text-gray-800 text-4xl font-bold">x{maxCombo}</div>
          </div>
          
          {/* Indicador de MODO COMBO */}
          {comboMode && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="bg-yellow-200 backdrop-blur-sm px-8 py-4 shadow-2xl rounded-xl"
            >
              <div className="text-orange-700 text-base font-bold mb-2">⚡ MODO COMBO ⚡</div>
              <div className="text-gray-800 text-3xl font-bold">x2 PUNTOS</div>
            </motion.div>
          )}
          
          {/* Indicador de racha perfecta */}
          {perfectStreak >= 5 && perfectStreak < 15 && (
            <div className="bg-purple-200/95 backdrop-blur-sm px-6 py-3 shadow-xl rounded-xl">
              <div className="text-purple-700 text-sm font-bold">Racha: {perfectStreak} 🔥</div>
            </div>
          )}
        </div>
        )}

        {/* Audio de la canción */}
        {selectedSong && getAudioPath() && (
          <audio
            ref={audioRef}
            src={getAudioPath()}
            onEnded={() => {
              console.log('🎵 Audio terminado')
              setGameState('ended')
              // Guardar high score
              if (difficulty) {
                saveHighScore(difficulty, score)
              }
            }}
            onError={(e) => {
              console.error('❌ Error al cargar audio:', e)
              console.log('🔍 Audio src:', getAudioPath())
              console.log('🔍 selectedSong completo:', selectedSong)
            }}
            onLoadedData={() => {
              console.log('✅ Audio cargado correctamente:', getAudioPath())
            }}
          />
        )}

        {/* Video (oculto pero reproduce audio) */}
        <video
          ref={videoRef}
          src="/Niña.mp4"
          className="absolute -z-10 opacity-0"
          onEnded={() => {
            setGameState('ended')
            // Guardar high score
            if (difficulty) {
              saveHighScore(difficulty, score)
            }
          }}
        />

        {/* Canvas del juego - Solo visible cuando está jugando */}
        {gameState === 'playing' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={1400}
              height={900}
              className="rounded-xl shadow-2xl"
            style={{ 
              background: '#1a1a1a',
              border: '4px solid #d4cfc7',
              width: '95%',
              height: '90%',
              objectFit: 'contain'
            }}
          />
          </div>
        )}

        {/* Feedback de hits */}
        <AnimatePresence>
          {hitFeedback.map(feedback => {
            const lane = CONFIG.lanes[feedback.lane]
            const x = lane ? (lane.x / CONFIG.canvas.width) * 100 : 50
            
            return (
              <motion.div
                key={feedback.id}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={{ y: -100, opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute pointer-events-none z-30"
                style={{ 
                  left: `calc(50% + ${(x - 50)}%)`,
                  top: '60%',
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="text-center">
                  <div className={`text-3xl font-bold drop-shadow-lg ${
                    feedback.isMiss ? 'text-red-500' :
                    feedback.comboMode ? 'text-yellow-300' : 'text-yellow-400'
                  }`}>
                    {feedback.rating} {feedback.comboMode && '⚡'} {feedback.isMiss && '✗'}
                  </div>
                  {!feedback.isMiss && (
                    <div className={`text-xl font-bold drop-shadow-lg ${feedback.comboMode ? 'text-orange-300' : 'text-white'}`}>
                      +{feedback.points} {feedback.comboMode && 'x2'}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* PANTALLAS con estética acuarela */}
        {gameState === 'paused' && (
          <PausedScreen 
            onResume={resumeGame}
            onRestart={restartGame}
            onQuit={quitGame}
            audioRef={audioRef}
            videoRef={videoRef}
          />
        )}

        {gameState === 'game-over' && (
          <GameOverModal
            score={score}
            onRetry={restartGame}
            onSelectOtherSong={() => {
              quitGame()
              if (onBackToSongs) {
                onBackToSongs()
              }
            }}
            onBackToMap={() => {
              quitGame()
              if (onBackToMap) {
                onBackToMap()
              }
            }}
          />
        )}

        {gameState === 'ended' && (
          <EndedScreen 
            score={score}
            maxCombo={maxCombo}
            onRestart={restartGame}
            onQuit={quitGame}
            isNewRecord={difficulty && score > loadHighScores()[difficulty]}
            highScore={difficulty ? loadHighScores()[difficulty] : 0}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// Pantalla Ready
const ReadyScreen = ({ chartData, onStart, onBack, highScore, difficulty }) => {
  const difficultyLabels = {
    facil: 'Fácil',
    medio: 'Medio',
    dificil: 'Difícil'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center z-30 bg-black/50 backdrop-blur-sm"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full mx-8">
        {/* Manchas de acuarela sutiles */}
        <div className="absolute top-6 right-8 rounded-full opacity-10 pointer-events-none w-40 h-40"
             style={{
               background: 'radial-gradient(circle, #A8E6CF 0%, transparent 70%)',
               filter: 'blur(35px)',
               zIndex: 0
             }} />
        <div className="absolute bottom-10 left-10 rounded-full opacity-8 pointer-events-none w-48 h-48"
             style={{
               background: 'radial-gradient(circle, #FFE5A0 0%, transparent 70%)',
               filter: 'blur(40px)',
               zIndex: 0
             }} />
        <div className="absolute top-1/2 left-6 rounded-full opacity-6 pointer-events-none w-32 h-32"
             style={{
               background: 'radial-gradient(circle, #FFB3BA 0%, transparent 70%)',
               filter: 'blur(30px)',
               zIndex: 0
             }} />
        
        <div className="relative z-10 text-center">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block px-12 py-6 mb-8 shadow-lg bg-yellow-200 rounded-2xl"
          style={{
            boxShadow: '0 8px 32px rgba(251, 191, 36, 0.4), inset 0 2px 10px rgba(255, 229, 160, 0.35)'
          }}
        >
          <h2 className="text-5xl font-bold" style={{ color: '#8a6f3d', fontFamily: 'Georgia, serif' }}>
            ¡Listo para jugar!
          </h2>
        </motion.div>

        {chartData && (
          <div className="mb-8 space-y-4">
            {/* Info del chart */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-md border-2 border-amber-200">
              <div className="text-3xl font-bold mb-3" style={{ color: '#4a4a4a' }}>
                {chartData.metadata.title}
              </div>
              <div className="text-xl mb-2" style={{ color: '#6a6a6a' }}>
                🎵 {chartData.metadata.total_notes} notas • {difficultyLabels[difficulty]}
              </div>
              <div className="text-lg" style={{ color: '#8a8a8a' }}>
                ⏱️ Duración: {Math.floor(chartData.metadata.duration / 60)}:{(chartData.metadata.duration % 60).toFixed(0).padStart(2, '0')}
              </div>
            </div>
            
            {/* High Score */}
            {highScore > 0 && (
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="p-4 bg-yellow-50 rounded-xl shadow-md border-2 border-yellow-300">
                <div className="text-sm font-bold mb-1" style={{ color: '#8a7040' }}>
                  🏆 MEJOR PUNTUACIÓN
                </div>
                <div className="text-2xl font-bold" style={{ color: '#d4a373' }}>
                  {highScore}
                </div>
              </motion.div>
            )}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-16 py-5 font-bold text-2xl rounded-2xl mb-4 flex items-center gap-4 mx-auto"
          style={{
            background: '#A8E6CF',
            color: '#1e5a3d',
            border: 'none',
            boxShadow: '0 4px 16px rgba(168, 230, 207, 0.4)'
          }}
        >
          <FaPlay />
          <span>COMENZAR</span>
        </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Pantalla Paused
const PausedScreen = ({ onResume, onRestart, onQuit, audioRef, videoRef }) => {
  // Inicializar el volumen con el valor actual del audio
  const initialVolume = audioRef?.current ? Math.round(audioRef.current.volume * 100) : 100
  const [volume, setVolume] = useState(initialVolume)
  
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume / 100
    }
    if (videoRef?.current) {
      videoRef.current.volume = volume / 100
    }
  }, [volume, audioRef, videoRef])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center z-[100] bg-black/70 backdrop-blur-md rounded-3xl"
    >
      <div className="text-center px-8 relative z-[110]">
        <h2 className="text-6xl font-bold mb-12 relative z-[120]" style={{ color: '#ffffff', textShadow: '3px 3px 12px rgba(0,0,0,0.8)' }}>PAUSA</h2>
        
        {/* Control de volumen */}
        <div className="mb-10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl relative z-[120] bg-purple-300/85 border-2 border-purple-400">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              <span className="text-white text-xl font-bold">Volumen</span>
            </div>
            <span className="text-white text-3xl font-bold">{volume}%</span>
          </div>
          
          {/* Contenedor de la barra con estilo acuarela */}
          <div className="relative w-full h-8">
            {/* Fondo de la barra con forma de acuarela */}
            <div 
              className="absolute inset-0 rounded-full shadow-inner"
              style={{
                background: 'rgba(255, 255, 255, 0.2)'
              }}
            />
            
            {/* Barra de progreso */}
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-gray-100 rounded-full shadow-lg transition-all duration-300"
              style={{
                width: `${volume}%`,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)'
              }}
            />
            
            {/* Input range invisible sobre la barra */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>
        
        <div className="flex gap-6 justify-center relative z-[120]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResume}
            className="px-8 py-4 font-bold text-xl relative z-[130] bg-green-400 text-green-900 rounded-3xl shadow-lg hover:shadow-xl transition-all"
          >
            <FaPlay className="inline mr-3" /> Continuar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="px-8 py-4 font-bold text-xl relative z-[130] bg-yellow-300 text-yellow-900 rounded-3xl shadow-lg hover:shadow-xl transition-all"
          >
            <FaRedo className="inline mr-3" /> Reiniciar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuit}
            className="px-8 py-4 font-bold text-xl relative z-[130] bg-pink-300 text-pink-900 rounded-3xl shadow-lg hover:shadow-xl transition-all"
          >
            <FaTimes className="inline mr-2" /> Salir
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Pantalla Ended
const EndedScreen = ({ score, maxCombo, onRestart, onQuit, isNewRecord, highScore }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center z-30"
      style={{
        background: 'radial-gradient(circle, rgba(255, 179, 186, 0.3), transparent 70%), linear-gradient(135deg, #f5f3f0 0%, #e8e5e0 100%)'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full mx-4 rounded-3xl shadow-2xl bg-white overflow-hidden"
      >
        {/* Manchas de acuarela decorativas */}
        {/* Mancha verde - superior izquierda */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '50px',
               left: '5%',
               width: '200px',
               height: '190px',
               background: 'radial-gradient(ellipse at 50% 50%, rgba(168, 230, 207, 0.55) 0%, rgba(168, 230, 207, 0.28) 45%, transparent 75%)',
               filter: 'blur(1.5px)',
               borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
               transform: 'rotate(-15deg)'
             }} />
        
        {/* Mancha amarilla - superior derecha */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '80px',
               right: '8%',
               width: '180px',
               height: '170px',
               background: 'radial-gradient(ellipse at 48% 52%, rgba(251, 191, 36, 0.50) 0%, rgba(251, 191, 36, 0.25) 42%, transparent 72%)',
               filter: 'blur(1.2px)',
               borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%',
               transform: 'rotate(20deg)'
             }} />
        
        {/* Mancha rosa - medio derecha */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '300px',
               right: '10%',
               width: '170px',
               height: '160px',
               background: 'radial-gradient(ellipse at 45% 55%, rgba(244, 114, 182, 0.50) 0%, rgba(244, 114, 182, 0.25) 45%, transparent 75%)',
               filter: 'blur(1.2px)',
               borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
               transform: 'rotate(-18deg)'
             }} />

        {/* Contenido */}
        <div className="relative z-10 p-12 text-center">
          {/* Título con fuente del menú de pausa */}
          <h2 className="text-6xl font-bold mb-8" style={{ color: '#ffffff', textShadow: '3px 3px 12px rgba(0,0,0,0.8)' }}>
            ¡Completado!
          </h2>
          
          {/* Indicador de nuevo récord */}
          {isNewRecord && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="mb-6 p-4 shadow-2xl rounded-3xl bg-gradient-to-r from-yellow-300 to-orange-300 border-4 border-orange-500"
            >
              <div className="text-2xl font-bold" style={{ color: '#8B4513' }}>
                ¡NUEVO RÉCORD!
              </div>
            </motion.div>
          )}
          
          {/* Estadísticas con esquinas redondeadas */}
          <div className="mb-8 space-y-3">
            <div className="p-6 shadow-lg rounded-3xl bg-white/90 border-4 border-green-300" style={{ borderRadius: '24px' }}>
              <div className="text-sm font-bold mb-2" style={{ color: '#6a6a6a' }}>Puntuación Final</div>
              <div className="text-5xl font-bold" style={{ color: '#22c55e' }}>{score}</div>
              {highScore > 0 && !isNewRecord && (
                <div className="text-sm mt-3" style={{ color: '#8a8a8a' }}>
                  Récord: {highScore}
                </div>
              )}
            </div>
            
            <div className="p-6 shadow-lg rounded-3xl bg-white/90 border-4 border-yellow-300" style={{ borderRadius: '24px' }}>
              <div className="text-sm font-bold mb-2" style={{ color: '#6a6a6a' }}>Combo Máximo</div>
              <div className="text-5xl font-bold" style={{ color: '#eab308' }}>x{maxCombo}</div>
            </div>
          </div>

          {/* Botones separados y con mejor espaciado */}
          <div className="flex gap-4 justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="px-10 py-4 font-bold text-lg bg-green-400 text-green-900 rounded-3xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <FaRedo /> Jugar de nuevo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onQuit}
              className="px-10 py-4 font-bold text-lg bg-pink-400 text-pink-900 rounded-3xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <FaTimes /> Salir
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Modal de Canción Perdida
const GameOverModal = ({ score, onRetry, onSelectOtherSong, onBackToMap }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onSelectOtherSong}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full mx-4 rounded-3xl shadow-2xl bg-white overflow-hidden"
      >
        {/* Manchas de acuarela decorativas */}
        {/* Mancha amarilla dorada - superior izquierda */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '50px',
               left: '5%',
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
               top: '80px',
               right: '8%',
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
               top: '250px',
               left: '10%',
               width: '165px',
               height: '155px',
               background: 'radial-gradient(ellipse at 52% 48%, rgba(163, 230, 53, 0.48) 0%, rgba(163, 230, 53, 0.24) 48%, transparent 76%)',
               filter: 'blur(1.3px)',
               borderRadius: '48% 52% 52% 48% / 50% 50% 50% 50%',
               transform: 'rotate(-22deg)'
             }} />
        
        {/* Mancha rosa - medio derecha */}
        <div className="absolute pointer-events-none z-[1]"
             style={{
               top: '300px',
               right: '10%',
               width: '170px',
               height: '160px',
               background: 'radial-gradient(ellipse at 45% 55%, rgba(244, 114, 182, 0.50) 0%, rgba(244, 114, 182, 0.25) 45%, transparent 75%)',
               filter: 'blur(1.2px)',
               borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
               transform: 'rotate(-18deg)'
             }} />

        {/* Contenido */}
        <div className="relative z-10 p-12 text-center">
          {/* Título */}
          <h2 className="text-5xl font-bold mb-4 text-gray-900">
            ¡Fallaste!
          </h2>

          {/* Mensaje */}
          <p className="text-xl mb-8 text-gray-700">
            Demasiados fallos consecutivos
          </p>

          {/* Estadísticas */}
          <div className="mb-10 bg-gray-50 p-6 rounded-2xl inline-block">
            <div className="text-2xl text-gray-800">
              <span className="font-bold">Puntuación:</span> {score}
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="px-6 py-3 font-bold text-base text-white bg-green-500 hover:bg-green-600 rounded-2xl shadow-lg transition-all w-fit"
              >
                Intentar de nuevo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSelectOtherSong}
                className="px-6 py-3 font-bold text-base text-white bg-blue-500 hover:bg-blue-600 rounded-2xl shadow-lg transition-all w-fit"
              >
                Elegir otra canción
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBackToMap}
              className="px-6 py-3 font-bold text-base text-white bg-orange-500 hover:bg-orange-600 rounded-2xl shadow-lg transition-all w-fit"
            >
              Volver al mapa
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RhythmGameCanvas
