# 🎵 Historia del Acordeón en Colombia - Mapa Interactivo

Aplicación web interactiva sobre la historia del acordeón en Colombia, desarrollada con React, Vite, Tailwind CSS y Framer Motion.

## 🎯 Características

- ✨ **Página de Bienvenida** con animaciones atractivas
- 🗺️ **Mapa Interactivo** con 5 ubicaciones clave de Colombia
- 📍 **Marcadores Animados** con información detallada de cada región
- 🎬 **Modal de Documental** con reproductor de video
- 🎮 **Juego de Trivia** interactivo sobre la historia del acordeón
- 🎵 **Juego de Ritmo** estilo Guitar Hero con canciones vallenatas
  - ✅ Selector de canciones con estética acuarela
  - ✅ Sistema TAP (notas cortas) y HOLD (notas largas)
  - ✅ 5+ canciones vallenatas clásicas
  - ✅ Conversión automática MP3 → Chart JSON
  - ✅ Sistema de puntuación y combos
- 📱 **Diseño Responsive** adaptable a todos los dispositivos
- 🎨 **Animaciones Fluidas** con Framer Motion
- 🔗 **Enlaces a Redes Sociales** (TikTok, Instagram, YouTube)

## 📋 Estructura del Proyecto

```
acordeon-colombia/
├── public/
│   ├── Mapa.jpg                 # Imagen del mapa
│   └── charts/                  # Charts del juego de ritmo (JSON)
├── src/
│   ├── assets/
│   │   └── music/               # Canciones MP3 para el juego
│   ├── components/
│   │   ├── Header.jsx           # Barra superior con logo y redes
│   │   ├── LocationModal.jsx    # Modal de información de ubicaciones
│   │   ├── DocumentalModal.jsx  # Modal del documental
│   │   ├── GameModal.jsx        # Modal del juego de trivia
│   │   ├── RhythmGameModal.jsx  # Juego de ritmo (Guitar Hero)
│   │   └── SongSelectionModal.jsx # Selector de canciones
│   ├── pages/
│   │   ├── Welcome.jsx          # Página de bienvenida
│   │   └── MapaInteractivo.jsx  # Página principal con el mapa
│   ├── App.jsx                  # Rutas principales
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales
├── tools/
│   ├── convertidor_mejorado.py  # Convertidor MP3 → JSON
│   └── requirements.txt         # Dependencias Python
├── INSTALAR_DEPENDENCIAS.bat    # Script de instalación Python
├── CONVERTIR_CANCIONES.bat      # Script de conversión
├── INICIAR.bat                  # Script para iniciar el juego
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Instalación y Uso

### 1. Instalar dependencias de Node.js

```bash
npm install
```

### 2. Instalar dependencias de Python (para el convertidor de canciones)

```bash
# Ejecuta el script (Windows):
INSTALAR_DEPENDENCIAS.bat

# O manualmente:
pip install librosa numpy scipy soundfile
```

### 3. Convertir las canciones (generar charts del juego de ritmo)

```bash
# Ejecuta el script (Windows):
CONVERTIR_CANCIONES.bat

# O manualmente:
python tools/convertidor_mejorado.py --all
```

Este paso analiza los archivos MP3 en `src/assets/music/` y genera archivos JSON en `public/charts/`.

### 4. Agregar el mapa

Coloca tu archivo `Mapa.jpg` en la carpeta `public/`

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev

# O usa el script:
INICIAR.bat
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

### 6. Compilar para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### 7. Vista previa de la compilación

```bash
npm run preview
```

## 📦 Dependencias Principales

### Frontend
- **React 18.3** - Framework principal
- **React Router DOM** - Navegación entre páginas
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones y transiciones
- **React Icons** - Iconos (TikTok, Instagram, YouTube, etc.)
- **Lucide React** - Iconos adicionales para el selector de canciones
- **Vite** - Herramienta de construcción rápida

### Backend/Procesamiento (Python)
- **librosa** - Análisis de audio para detección de notas
- **numpy** - Cálculos numéricos
- **scipy** - Procesamiento de señales
- **soundfile** - Lectura de archivos de audio

## 🎨 Paleta de Colores

- **Primary (Dorado):** #d4af37
- **Secondary (Marrón):** #8b4513
- **Accent (Naranja):** #ff6b35
- **Fondos:** Gradientes de amber, orange y yellow

## 📍 Ubicaciones en el Mapa

1. **Valledupar (Cesar)** - Cuna del vallenato
2. **Barranquilla (Atlántico)** - Carnaval y acordeón
3. **Santa Marta (Magdalena)** - Ciudad histórica
4. **Riohacha (La Guajira)** - Cultura wayúu
5. **Montería (Córdoba)** - Capital ganadera

## 🎮 Características del Juego de Ritmo

### Mecánicas:
- **Notas TAP**: Presiona A/S/D/F una vez cuando llegue la nota
- **Notas HOLD**: Mantén presionada la tecla durante el tiempo indicado
- **4 Carriles**: A (verde), S (rojo), D (amarillo), F (azul)
- **Sistema de Puntuación**:
  - Perfect! = 200 puntos
  - Great! = 150 puntos
  - Good = 100 puntos
  - Bonus por completar HOLDs
- **Sistema de Combos**: Acumula golpes perfectos consecutivos
- **Selector de Canciones**: Elige entre múltiples canciones vallenatas

### Canciones Disponibles:
1. El Cóndor Legendario - Los Hermanos Zuleta
2. El Testamento
3. La Plata - Diomedes Díaz
4. Matilde Lina
5. Muere Una Flor - Binomio De Oro
6. Niña Bonita - Binomio De Oro De América

### Agregar Más Canciones:
1. Coloca archivos MP3 en `src/assets/music/`
2. Ejecuta `CONVERTIR_CANCIONES.bat`
3. Los charts se generan automáticamente en `public/charts/`
4. ¡Recarga el juego y aparecerán!

## 🎮 Características del Juego de Trivia

- Trivia de 5 preguntas
- Sistema de puntuación
- Retroalimentación inmediata
- Opción de reiniciar
- Preguntas sobre historia y cultura del acordeón

## 🎬 Características del Documental

- Reproductor de video integrado
- Capítulos navegables
- Descripción detallada
- Créditos completos
- Interfaz intuitiva

## 🔧 Personalización

### Cambiar ubicaciones del mapa

Edita el archivo `src/pages/MapaInteractivo.jsx` y modifica el array `locations`:

```javascript
const locations = [
  {
    id: 1,
    name: 'Nombre de la Ciudad',
    region: 'Departamento',
    position: { top: '35%', left: '25%' }, // Ajusta las coordenadas
    description: 'Descripción breve',
    history: 'Historia detallada',
    images: ['imagen1.jpg', 'imagen2.jpg'],
    color: 'bg-red-500' // Color del marcador
  },
  // ... más ubicaciones
]
```

### Cambiar enlaces de redes sociales

Edita el archivo `src/components/Header.jsx`:

```javascript
const socialLinks = [
  { icon: FaTiktok, url: 'tu-url-tiktok', color: 'hover:bg-black' },
  { icon: FaInstagram, url: 'tu-url-instagram', color: 'hover:bg-gradient-to-r...' },
  { icon: FaYoutube, url: 'tu-url-youtube', color: 'hover:bg-red-600' },
]
```

### Agregar video del documental

En `src/components/DocumentalModal.jsx`, reemplaza el placeholder con un iframe de YouTube u otro servicio:

```javascript
<iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed/TU_VIDEO_ID"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
```

### Modificar preguntas del juego

Edita el array `questions` en `src/components/GameModal.jsx`:

```javascript
const questions = [
  {
    question: '¿Tu pregunta aquí?',
    options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'],
    correct: 1 // Índice de la respuesta correcta (0-3)
  },
  // ... más preguntas
]
```

## 📱 Responsive Design

La aplicación está completamente optimizada para:

- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Escritorio (1024px+)
- 🖥️ Pantallas grandes (1920px+)

## ⚡ Optimización

- Lazy loading de componentes
- Animaciones optimizadas con Framer Motion
- Imágenes responsive
- CSS optimizado con Tailwind
- Build rápido con Vite

## 🎯 Próximas Mejoras

- [ ] Editor visual de charts para el juego de ritmo
- [ ] Multiplicador de dificultad en el juego de ritmo
- [ ] Tabla de clasificación con mejores puntuaciones
- [ ] Más canciones vallenatas
- [ ] Integrar reproductor de música de cada región
- [ ] Agregar más juegos interactivos
- [ ] Sistema de favoritos
- [ ] Compartir en redes sociales
- [ ] Modo oscuro
- [ ] Multiidioma (español/inglés)

## 📚 Documentación Adicional

- **INSTRUCCIONES-RAPIDAS.md** - Guía de inicio rápido
- **GUIA-CONVERTIDOR.md** - Documentación del convertidor de canciones
- **GUIA-JUEGO-RITMO.md** - Características completas del juego
- **RESUMEN-SISTEMA-RITMO.md** - Resumen técnico del sistema
- **RESUMEN-FINAL.md** - Resumen ejecutivo completo

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando React, Tailwind CSS y Framer Motion.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias.

---

**¡Disfruta explorando la historia del acordeón en Colombia!** 🎵🇨🇴
