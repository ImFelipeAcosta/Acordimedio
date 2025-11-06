// Utilidad para analizar audio y detectar beats del acordeón
// Este módulo analiza el archivo de audio para generar notas automáticamente

export class AudioAnalyzer {
  constructor(audioPath) {
    this.audioPath = audioPath
    this.audioContext = null
    this.audioBuffer = null
  }

  // Cargar archivo de audio
  async loadAudio() {
    try {
      // Crear contexto de audio
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Fetch del archivo de audio
      const response = await fetch(this.audioPath)
      const arrayBuffer = await response.arrayBuffer()
      
      // Decodificar audio
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      
      return this.audioBuffer
    } catch (error) {
      console.error('Error cargando audio:', error)
      throw error
    }
  }

  // Analizar beats y frecuencias del acordeón
  analyzeBeats(threshold = 0.8, minTimeBetweenBeats = 0.3) {
    if (!this.audioBuffer) {
      throw new Error('Audio no cargado')
    }

    const channelData = this.audioBuffer.getChannelData(0) // Canal mono
    const sampleRate = this.audioBuffer.sampleRate
    const bufferLength = channelData.length
    
    // Tamaño de ventana para análisis (en samples)
    const windowSize = Math.floor(sampleRate * 0.05) // 50ms
    const hopSize = Math.floor(windowSize / 2)
    
    const beats = []
    let lastBeatTime = -1
    
    // Analizar energía en ventanas
    for (let i = 0; i < bufferLength - windowSize; i += hopSize) {
      let energy = 0
      
      // Calcular energía RMS de la ventana
      for (let j = 0; j < windowSize; j++) {
        const sample = channelData[i + j]
        energy += sample * sample
      }
      
      energy = Math.sqrt(energy / windowSize)
      
      // Detectar picos de energía (beats)
      const currentTime = i / sampleRate
      
      if (energy > threshold && (currentTime - lastBeatTime) > minTimeBetweenBeats) {
        beats.push({
          time: currentTime,
          energy: energy
        })
        lastBeatTime = currentTime
      }
    }
    
    return beats
  }

  // Analizar frecuencias específicas del acordeón (rango típico: 100Hz - 1000Hz)
  analyzeAccordionFrequencies() {
    if (!this.audioBuffer) {
      throw new Error('Audio no cargado')
    }

    const channelData = this.audioBuffer.getChannelData(0)
    const sampleRate = this.audioBuffer.sampleRate
    const fftSize = 2048
    
    const notes = []
    
    // Crear analizador offline
    const offlineContext = new OfflineAudioContext(
      1, 
      this.audioBuffer.length, 
      sampleRate
    )
    
    const source = offlineContext.createBufferSource()
    source.buffer = this.audioBuffer
    
    const analyzer = offlineContext.createAnalyser()
    analyzer.fftSize = fftSize
    
    source.connect(analyzer)
    analyzer.connect(offlineContext.destination)
    
    source.start(0)
    
    return offlineContext.startRendering().then(() => {
      // Analizar espectro de frecuencias
      const frequencyData = new Uint8Array(analyzer.frequencyBinCount)
      analyzer.getByteFrequencyData(frequencyData)
      
      // Buscar picos en rango de acordeón
      for (let i = 0; i < frequencyData.length; i++) {
        const frequency = (i * sampleRate) / fftSize
        
        // Rango típico de acordeón
        if (frequency >= 100 && frequency <= 1000 && frequencyData[i] > 150) {
          notes.push({
            frequency: frequency,
            amplitude: frequencyData[i],
            time: 0 // Se calculará después
          })
        }
      }
      
      return notes
    })
  }

  // Generar patrón de notas para el juego basado en análisis
  generateGamePattern(beats, lanes = 4) {
    const gameNotes = []
    let noteId = 0
    
    beats.forEach((beat, index) => {
      // Asignar carril basado en energía y posición
      const lane = index % lanes
      
      // Determinar duración basada en energía
      let duration = 0
      if (beat.energy > 1.2) {
        duration = 1.73 // Nota larga
      } else if (beat.energy > 0.9) {
        duration = 0.86 // Nota media
      }
      // Si energy <= 0.9, duration = 0 (nota corta)
      
      gameNotes.push({
        id: noteId++,
        time: beat.time,
        lane: lane,
        duration: duration,
        combo: [] // Sin combo por defecto
      })
    })
    
    return gameNotes
  }

  // Función principal para análisis completo
  async analyzeAndGeneratePattern() {
    await this.loadAudio()
    const beats = this.analyzeBeats(0.8, 0.3)
    const pattern = this.generateGamePattern(beats, 4)
    
    return {
      beats: beats,
      pattern: pattern,
      duration: this.audioBuffer.duration,
      sampleRate: this.audioBuffer.sampleRate
    }
  }
}

// Función helper para usar en el componente
export async function analyzeVideoAudio(videoPath) {
  const analyzer = new AudioAnalyzer(videoPath)
  return await analyzer.analyzeAndGeneratePattern()
}
