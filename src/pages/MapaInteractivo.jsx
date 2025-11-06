import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGamepad, FaFilm, FaGuitar } from 'react-icons/fa'
import Header from '../components/Header'
import LocationModal from '../components/LocationModal'
import DocumentalModal from '../components/DocumentalModal'
import GameModal from '../components/GameModal'
import RhythmGameModal from '../components/RhythmGameModal'

const MapaInteractivo = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showDocumental, setShowDocumental] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [showRhythmGame, setShowRhythmGame] = useState(false)

  // Reanudar la música cuando se monta el mapa
  useEffect(() => {
    if (window.audioController) {
      window.audioController.play()
    }
  }, [])

  // Datos de las 5 ubicaciones
  const locations = [
    {
      id: 1,
      name: 'Valledupar',
      region: 'Cesar',
      position: { top: '26%', left: '15%' },
      description: 'Valledupar, en el corazón del valle del río Cesar, es reconocida mundialmente como la cuna del vallenato, género musical que tiene al acordeón como su alma y protagonista. En esta ciudad, el sonido del acordeón no es solo música, es la banda sonora de la vida cotidiana; se escucha en las casas, en las plazas y, por supuesto, en cada parranda. Valledupar vive y respira al compás del acordeón, un instrumento que narra las historias, mitos y leyendas de su gente. La ciudad se ha entregado de tal manera al acordeón que su identidad está intrínsecamente ligada a sus notas.',
      history: 'Aunque el acordeón llegó a Colombia a finales del siglo XIX por puertos como Riohacha y Santa Marta, fue en la región del antiguo Magdalena Grande, y especialmente en Valledupar, donde encontró un terreno fértil para florecer. Los juglares vallenatos, cronistas ambulantes, adoptaron este instrumento de origen europeo para contar sus historias, reemplazando a la guitarra por su mayor sonoridad y versatilidad. Estos músicos se convirtieron en figuras centrales de la cultura local, llevando noticias y entretenimiento de pueblo en pueblo. La creación del Festival de la Leyenda Vallenata en 1968 consolidó a Valledupar como el epicentro de la música de acordeón. Este evento, que corona anualmente al "Rey Vallenato", no solo celebra la destreza de los acordeoneros, sino que preserva los cuatro aires tradicionales del vallenato: paseo, merengue, son y puya. La cultura vallenata, con el acordeón como estandarte, fue declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2015.',
      curiosity: 'Valledupar alberga la "Casa Beto Murgas - Museo del Acordeón", un lugar único donde se puede apreciar la evolución de este instrumento. Una de las joyas de su colección es un acordeón que data de 1829, considerado el más antiguo del mundo y fabricado por Cyrill Demian, el inventor del instrumento en Viena.',
      images: ['Valledupar1.png', 'Valledupar2.png'],
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Riohacha',
      region: 'La Guajira',
      position: { top: '80%', left: '15%' },
      description: 'Riohacha, la capital del departamento de La Guajira, es un punto geográfico y cultural clave en la historia del acordeón en Colombia. Ubicada en una península desértica frente al mar Caribe y cuna de la fascinante cultura Wayúu, esta ciudad portuaria fue uno de los primeros lugares del país en recibir y adoptar el sonido del acordeón.',
      history: 'La teoría más aceptada, respaldada por registros históricos, indica que el acordeón llegó a Colombia a mediados del siglo XIX. El dato más antiguo de la importación de este instrumento data de 1856 y corresponde a registros de impuestos pagados en la aduana de Riohacha. Comerciantes europeos, principalmente alemanes e italianos, introdujeron el acordeón en la región, donde fue rápidamente adoptado por la cultura local. Es en La Guajira donde nace una de las leyendas más importantes del folclor vallenato: la de Francisco "El Hombre". Se cuenta que Francisco Moscote Guerra, un juglar nacido en 1849, se enfrentó en un duelo de acordeones con el diablo y lo venció al tocar el Credo al revés. Esta leyenda, inmortalizada por Gabriel García Márquez en "Cien años de soledad", simboliza el poder del bien sobre el mal a través de la música del acordeón y posiciona a La Guajira como una tierra mítica para el vallenato.',
      curiosity: 'Aunque el vallenato no es originario de la cultura Wayúu, la comunidad indígena más grande de Colombia que habita en La Guajira, ha habido un interesante intercambio cultural. El acordeón se ha integrado en algunas de sus festividades y celebraciones, mostrando la capacidad de este instrumento para trascender fronteras culturales dentro del mismo territorio colombiano.',
      images: ['Riohacha1.png', 'Riohacha2.png'],
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Barranquilla',
      region: 'Atlántico',
      position: { top: '52%', left: '76%' },
      description: 'Barranquilla, conocida como la "Puerta de Oro de Colombia", es una ciudad vibrante y festiva donde el acordeón adquiere un carácter alegre y carnavalero. Aunque no es la cuna del vallenato, sí es un escenario crucial para su difusión y transformación. Aquí, el acordeón no solo interpreta paseos y merengues, sino que se fusiona con cumbias y otros ritmos caribeños, convirtiéndose en un pilar de la música del Carnaval de Barranquilla.',
      history: 'Desde finales del siglo XIX, Barranquilla, a través de su puerto de Sabanilla, también fue una de las vías de entrada de acordeones al país. La ciudad se convirtió en un punto de encuentro de diversas culturas y músicas, lo que permitió que el acordeón se integrara en diferentes formatos musicales más allá del vallenato. En el Carnaval de Barranquilla, el acordeón es protagonista en cumbiambas y desfiles, y es el instrumento central del Festival de Orquestas, donde se premia a los mejores intérpretes con el prestigioso "Congo de Oro". Músicos como Aníbal Velásquez y Alfredo Gutiérrez son figuras emblemáticas que representan el sonido del acordeón barranquillero. Gutiérrez, tres veces Rey Vallenato, es especialmente reconocido por su estilo auténtico y su capacidad para abarcar múltiples géneros, lo que lo convierte en parte esencial del espíritu del carnaval.',
      curiosity: 'El cantautor Diomedes Díaz, una de las figuras más importantes del vallenato, compuso la canción "Regalo a Barranquilla" en 1983. La historia cuenta que, estando en pleno carnaval, se enteró de que el Binomio de Oro probablemente ganaría el Congo de Oro. Para competir, compuso rápidamente la canción mencionando a personajes representativos de la ciudad, demostrando la importancia de la capital del Atlántico como plaza para los músicos vallenatos.',
      images: ['Barranquilla1.png', 'Barranquila2.png'],
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Santa Marta',
      region: 'Magdalena',
      position: { top: '33%', left: '50%' },
      description: 'Santa Marta, la ciudad más antigua de Colombia, no solo es famosa por sus playas y la majestuosa Sierra Nevada, sino también por ser uno de los primeros lugares en el país donde se escucharon las notas de un acordeón. Este instrumento se arraigó profundamente en la música de la región conocida como el Magdalena Grande, que abarcaba los actuales departamentos de Magdalena, Cesar y La Guajira.',
      history: 'La primera referencia documentada del acordeón en Colombia data de la década de 1860 y proviene del viajero francés Charles Saffray, quien escuchó su sonido al desembarcar en Santa Marta. Aunque no ofreció más detalles, este registro sitúa a la ciudad como un punto pionero en la historia del instrumento en el país. El acordeón se difundió a través del río Magdalena gracias a las compañías de navegación, convirtiéndose en el instrumento preferido de los músicos de los pueblos ribereños. Antes de que el vallenato se consolidara como género, el acordeón ya animaba las "cumbiambas", las fiestas populares de finales del siglo XIX. La música de acordeón de esta región, a menudo llamada "música de provincia", fue fundamental para el desarrollo de lo que hoy conocemos como vallenato.',
      curiosity: 'Una de las teorías sobre la llegada del acordeón a la región del Magdalena sugiere que las fábricas alemanas, al ver que el acordeón de botones no era popular en Europa, buscaron nuevos mercados en América. Lo introdujeron a través de inmigrantes y comerciantes que llegaron a los puertos del Caribe colombiano, encontrando en la cultura popular un lugar donde prosperar.',
      images: ['SantaMarta1.png', 'SantaMarta2.png'],
      color: 'bg-yellow-500'
    },
    {
      id: 5,
      name: 'Bogotá',
      region: 'Cundinamarca',
      position: { top: '22%', left: '73%' },
      description: 'Bogotá, la capital de Colombia, representa la expansión y la resignificación del acordeón vallenato. A miles de kilómetros de su cuna caribeña, el acordeón ha encontrado en esta metrópoli andina un segundo hogar. Aquí, el vallenato no solo se escucha, sino que se estudia, se interpreta y se fusiona, convirtiéndose en un fenómeno cultural que une a personas de todas las regiones del país.',
      history: 'La migración de costeños a Bogotá durante el siglo XX trajo consigo la música vallenata. Lo que comenzó como una expresión musical regional, poco a poco fue ganando espacios en la capital, especialmente a partir de la popularización del género en la radio y la televisión. Hoy en día, Bogotá cuenta con una vibrante escena vallenata, con numerosos bares, discotecas y eventos dedicados a esta música. La capital es también un importante centro de formación para nuevos acordeoneros. Existen diversas academias y escuelas de música que ofrecen cursos de acordeón vallenato, lo que demuestra el profundo arraigo que ha alcanzado este instrumento en la ciudad. Eventos como "Vallenato al Parque" reúnen a miles de aficionados y demuestran la acogida masiva del género en la capital.',
      curiosity: 'A pesar de ser una ciudad del interior, Bogotá se ha convertido en una plaza tan importante para el vallenato que muchos artistas la consideran fundamental para el éxito de sus carreras. La capital del país es un reflejo de cómo el acordeón y su música superaron las barreras geográficas para convertirse en un verdadero símbolo nacional, capaz de emocionar tanto a un costeño a orillas del mar como a un cachaco en medio de las montañas.',
      images: ['Bogota1.png', 'Bogota2.png'],
      color: 'bg-blue-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />

      {/* Contenedor del mapa */}
      <div className="fixed inset-0 pt-20 pb-4 flex items-center justify-center bg-white overflow-visible">
        {/* Muchísimas manchas de acuarela con mayor opacidad */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Acuarelas con mayor opacidad y muchas más */}
          <div className="absolute" style={{ width: '220px', height: '200px', top: '5%', left: '3%', background: 'rgba(251, 191, 36, 0.18)', borderRadius: '45% 55% 40% 60% / 50% 45% 55% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '190px', height: '180px', top: '12%', right: '5%', background: 'rgba(96, 165, 250, 0.16)', borderRadius: '60% 40% 55% 45% / 45% 60% 40% 55%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '210px', height: '195px', bottom: '8%', left: '6%', background: 'rgba(168, 85, 247, 0.17)', borderRadius: '50% 50% 45% 55% / 55% 50% 50% 45%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '185px', height: '175px', bottom: '10%', right: '4%', background: 'rgba(236, 72, 153, 0.16)', borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '200px', height: '190px', top: '35%', left: '2%', background: 'rgba(74, 222, 128, 0.15)', borderRadius: '55% 45% 60% 40% / 50% 55% 45% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '195px', height: '185px', top: '42%', right: '3%', background: 'rgba(251, 146, 60, 0.17)', borderRadius: '45% 55% 45% 55% / 55% 45% 55% 45%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '180px', height: '170px', top: '60%', left: '48%', transform: 'translateX(-50%)', background: 'rgba(244, 114, 182, 0.16)', borderRadius: '50% 50% 40% 60% / 45% 55% 45% 55%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '205px', height: '195px', top: '20%', left: '45%', transform: 'translateX(-50%)', background: 'rgba(34, 211, 238, 0.17)', borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '175px', height: '165px', top: '15%', left: '28%', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '55% 45% 55% 45% / 60% 40% 60% 40%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '190px', height: '180px', bottom: '15%', left: '22%', background: 'rgba(192, 132, 252, 0.16)', borderRadius: '40% 60% 45% 55% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '195px', height: '185px', top: '50%', right: '23%', background: 'rgba(251, 191, 36, 0.15)', borderRadius: '50% 50% 55% 45% / 45% 55% 45% 55%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '200px', height: '190px', bottom: '22%', right: '28%', background: 'rgba(74, 222, 128, 0.17)', borderRadius: '45% 55% 50% 50% / 55% 45% 55% 45%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '170px', height: '160px', top: '8%', left: '15%', background: 'rgba(139, 92, 246, 0.16)', borderRadius: '60% 40% 60% 40% / 50% 55% 45% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '185px', height: '175px', top: '28%', right: '18%', background: 'rgba(248, 113, 113, 0.17)', borderRadius: '50% 50% 45% 55% / 60% 40% 60% 40%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '195px', height: '185px', bottom: '35%', left: '12%', background: 'rgba(147, 197, 253, 0.16)', borderRadius: '55% 45% 40% 60% / 45% 55% 45% 55%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '180px', height: '170px', bottom: '5%', right: '15%', background: 'rgba(253, 186, 116, 0.17)', borderRadius: '40% 60% 55% 45% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          
          {/* Más acuarelas adicionales */}
          <div className="absolute" style={{ width: '165px', height: '155px', top: '3%', left: '10%', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '48% 52% 55% 45% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '175px', height: '165px', top: '18%', right: '8%', background: 'rgba(249, 115, 22, 0.16)', borderRadius: '55% 45% 50% 50% / 48% 52% 48% 52%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '190px', height: '180px', top: '48%', left: '8%', background: 'rgba(217, 70, 239, 0.17)', borderRadius: '52% 48% 45% 55% / 55% 45% 55% 45%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '160px', height: '150px', bottom: '18%', right: '10%', background: 'rgba(59, 130, 246, 0.16)', borderRadius: '45% 55% 52% 48% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '185px', height: '175px', top: '25%', left: '18%', background: 'rgba(236, 72, 153, 0.15)', borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '170px', height: '160px', top: '55%', right: '12%', background: 'rgba(132, 204, 22, 0.16)', borderRadius: '48% 52% 50% 50% / 45% 55% 45% 55%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '195px', height: '185px', bottom: '28%', left: '15%', background: 'rgba(244, 63, 94, 0.17)', borderRadius: '55% 45% 48% 52% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '180px', height: '170px', top: '38%', left: '35%', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '50% 50% 55% 45% / 52% 48% 52% 48%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '175px', height: '165px', bottom: '12%', left: '25%', background: 'rgba(14, 165, 233, 0.16)', borderRadius: '45% 55% 50% 50% / 48% 52% 48% 52%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '165px', height: '155px', top: '65%', right: '20%', background: 'rgba(234, 179, 8, 0.17)', borderRadius: '52% 48% 52% 48% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '190px', height: '180px', top: '10%', left: '40%', background: 'rgba(220, 38, 38, 0.15)', borderRadius: '48% 52% 45% 55% / 55% 45% 55% 45%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '200px', height: '190px', bottom: '25%', right: '8%', background: 'rgba(16, 185, 129, 0.16)', borderRadius: '50% 50% 52% 48% / 48% 52% 48% 52%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '155px', height: '145px', top: '45%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(251, 113, 133, 0.17)', borderRadius: '55% 45% 50% 50% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '185px', height: '175px', bottom: '40%', left: '5%', background: 'rgba(96, 165, 250, 0.15)', borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '170px', height: '160px', top: '32%', right: '25%', background: 'rgba(253, 224, 71, 0.16)', borderRadius: '45% 55% 55% 45% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '195px', height: '185px', bottom: '3%', left: '35%', background: 'rgba(168, 85, 247, 0.17)', borderRadius: '52% 48% 50% 50% / 48% 52% 48% 52%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '160px', height: '150px', top: '22%', left: '52%', background: 'rgba(34, 211, 238, 0.15)', borderRadius: '48% 52% 52% 48% / 55% 45% 55% 45%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '180px', height: '170px', bottom: '50%', right: '5%', background: 'rgba(251, 146, 60, 0.16)', borderRadius: '50% 50% 45% 55% / 50% 50% 50% 50%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '175px', height: '165px', top: '72%', left: '18%', background: 'rgba(74, 222, 128, 0.17)', borderRadius: '55% 45% 48% 52% / 52% 48% 52% 48%', filter: 'blur(10px)' }} />
          <div className="absolute" style={{ width: '190px', height: '180px', top: '5%', right: '22%', background: 'rgba(244, 114, 182, 0.15)', borderRadius: '50% 50% 50% 50% / 45% 55% 45% 55%', filter: 'blur(10px)' }} />

          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="watercolor-effect" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed="5"/>
                <feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"/>
                <feGaussianBlur stdDeviation="3"/>
              </filter>
              
              <radialGradient id="splash-red">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35"/>
                <stop offset="50%" stopColor="#dc2626" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
              </radialGradient>
              
              <radialGradient id="splash-yellow">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
              </radialGradient>
              
              <radialGradient id="splash-blue">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32"/>
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.24"/>
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
              </radialGradient>
              
              <radialGradient id="splash-orange">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0"/>
              </radialGradient>
              
              <radialGradient id="splash-green">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.32"/>
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
              </radialGradient>
              
              <radialGradient id="splash-purple">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.28"/>
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0"/>
              </radialGradient>
              
              <radialGradient id="splash-pink">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0"/>
              </radialGradient>
              
              <radialGradient id="splash-cyan">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32"/>
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
              </radialGradient>
            </defs>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
          style={{ width: '99%', height: '99%', overflow: 'visible' }}
        >
          <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
            <img
              src="/src/assets/images/Mapa.png"
              alt="Mapa de Colombia"
              className="w-full h-full object-contain"
              style={{ display: 'block' }}
            />

            {/* Marcadores de ubicación con estilo acuarela personalizado */}
            {locations.map((location, index) => {
              // Definir colores personalizados para cada ubicación
              const watercolorStyles = {
                1: { // Valledupar - Rojo
                  primary: '#ef4444',
                  secondary: '#dc2626',
                  stops: [
                    { offset: '0%', color: '#f87171', opacity: 0.9 },
                    { offset: '50%', color: '#ef4444', opacity: 0.7 },
                    { offset: '100%', color: '#dc2626', opacity: 0.5 }
                  ]
                },
                2: { // Riohacha - Morado
                  primary: '#a855f7',
                  secondary: '#9333ea',
                  stops: [
                    { offset: '0%', color: '#c084fc', opacity: 0.9 },
                    { offset: '50%', color: '#a855f7', opacity: 0.7 },
                    { offset: '100%', color: '#9333ea', opacity: 0.5 }
                  ]
                },
                3: { // Barranquilla - Verde
                  primary: '#22c55e',
                  secondary: '#16a34a',
                  stops: [
                    { offset: '0%', color: '#4ade80', opacity: 0.9 },
                    { offset: '50%', color: '#22c55e', opacity: 0.7 },
                    { offset: '100%', color: '#16a34a', opacity: 0.5 }
                  ]
                },
                4: { // Santa Marta - Amarillo
                  primary: '#eab308',
                  secondary: '#ca8a04',
                  stops: [
                    { offset: '0%', color: '#fbbf24', opacity: 0.9 },
                    { offset: '50%', color: '#eab308', opacity: 0.7 },
                    { offset: '100%', color: '#ca8a04', opacity: 0.5 }
                  ]
                },
                5: { // Bogotá - Azul
                  primary: '#3b82f6',
                  secondary: '#2563eb',
                  stops: [
                    { offset: '0%', color: '#60a5fa', opacity: 0.9 },
                    { offset: '50%', color: '#3b82f6', opacity: 0.7 },
                    { offset: '100%', color: '#2563eb', opacity: 0.5 }
                  ]
                }
              }

              const style = watercolorStyles[location.id]

              return (
                <motion.div
                  key={location.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  style={{
                    position: 'absolute',
                    top: location.position.top,
                    left: location.position.left,
                    transform: 'translate(-50%, -100%)'
                  }}
                  className="cursor-pointer group relative"
                  onClick={() => setSelectedLocation(location)}
                  whileHover="hover"
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3
                      }
                    }}
                    className="relative"
                  >
                    {/* Pin de ubicación estilo acuarela SVG - LIMPIO sin efectos */}
                    <svg width="70" height="90" viewBox="0 0 70 90" className="drop-shadow-2xl">
                      <defs>
                        {/* Filtro de acuarela avanzado */}
                        <filter id={`watercolor-advanced-${location.id}`} x="-50%" y="-50%" width="200%" height="200%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed={location.id} result="noise"/>
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
                          <feGaussianBlur stdDeviation="1.2"/>
                        </filter>
                        
                        {/* Gradiente personalizado para cada ubicación */}
                        <linearGradient id={`gradient-pin-${location.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          {style.stops.map((stop, i) => (
                            <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity}/>
                          ))}
                        </linearGradient>
                        
                        {/* Gradiente para brillo */}
                        <radialGradient id={`shine-${location.id}`} cx="30%" cy="30%">
                          <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="white" stopOpacity="0"/>
                        </radialGradient>
                      </defs>
                      
                      {/* Capa base del pin con textura de acuarela */}
                      <path
                        d="M35 8 C 22 8, 12 18, 12 31 C 12 42, 24 60, 35 80 C 46 60, 58 42, 58 31 C 58 18, 48 8, 35 8 Z"
                        fill={`url(#gradient-pin-${location.id})`}
                        filter={`url(#watercolor-advanced-${location.id})`}
                        stroke="white"
                        strokeWidth="3"
                        strokeOpacity="0.8"
                      />
                      
                      {/* Capa de textura adicional */}
                      <path
                        d="M35 10 C 23 10, 14 19, 14 31 C 14 41, 25 58, 35 76 C 45 58, 56 41, 56 31 C 56 19, 47 10, 35 10 Z"
                        fill={`url(#gradient-pin-${location.id})`}
                        filter={`url(#watercolor-advanced-${location.id})`}
                        opacity="0.6"
                      />
                      
                      {/* Brillo superior */}
                      <ellipse
                        cx="30"
                        cy="22"
                        rx="12"
                        ry="10"
                        fill={`url(#shine-${location.id})`}
                      />
                      
                      {/* Círculo interior blanco */}
                      <circle
                        cx="35"
                        cy="30"
                        r="11"
                        fill="white"
                        opacity="0.95"
                        filter="url(#watercolor-advanced-{location.id})"
                      />
                      
                      {/* Círculo de color interno */}
                      <circle
                        cx="35"
                        cy="30"
                        r="8"
                        fill={style.primary}
                        opacity="0.8"
                      />
                    </svg>
                    
                    {/* Tooltip mejorado con región y efecto acuarela */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-[9999]">
                      <div className="relative">
                        <svg width="140" height="70" className="drop-shadow-2xl">
                          <defs>
                            {/* Filtro de acuarela para el tooltip */}
                            <filter id={`watercolor-tooltip-${location.id}`} x="-50%" y="-50%" width="200%" height="200%">
                              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed={location.id}/>
                              <feDisplacementMap in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G"/>
                              <feGaussianBlur stdDeviation="1"/>
                            </filter>
                            
                            {/* Gradiente para el fondo del tooltip */}
                            <linearGradient id={`tooltip-gradient-${location.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={style.primary} stopOpacity="0.98"/>
                              <stop offset="100%" stopColor={style.secondary} stopOpacity="0.98"/>
                            </linearGradient>
                          </defs>
                          
                          {/* Fondo con efecto acuarela */}
                          <rect 
                            x="10" 
                            y="3" 
                            width="120" 
                            height="52" 
                            rx="8" 
                            fill={`url(#tooltip-gradient-${location.id})`}
                            filter={`url(#watercolor-tooltip-${location.id})`}
                          />
                          
                          {/* Flecha del tooltip */}
                          <polygon
                            points="65,55 70,65 75,55"
                            fill={style.primary}
                            filter={`url(#watercolor-tooltip-${location.id})`}
                          />
                          
                          {/* Texto del tooltip */}
                          <text 
                            x="70" 
                            y="23" 
                            textAnchor="middle" 
                            fill="white" 
                            className="font-bold"
                            style={{ fontSize: '13px' }}
                          >
                            {location.name}
                          </text>
                          <text 
                            x="70" 
                            y="40" 
                            textAnchor="middle" 
                            fill="white" 
                            className="font-medium"
                            style={{ fontSize: '10px', opacity: 0.9 }}
                          >
                            {location.region}
                          </text>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Botones flotantes */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 z-40 px-4"
      >
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowGame(true)}
          className="flex items-center gap-2 shadow-2xl text-base px-8 py-4 text-white font-bold"
          style={{
            background: '#CA8A04',
            clipPath: 'polygon(3% 12%, 8% 5%, 15% 2%, 25% 0%, 35% 2%, 50% 0%, 65% 2%, 75% 1%, 85% 4%, 92% 10%, 97% 18%, 100% 30%, 99% 45%, 100% 60%, 98% 75%, 100% 88%, 94% 95%, 85% 98%, 72% 100%, 58% 99%, 45% 100%, 32% 98%, 20% 100%, 12% 96%, 6% 90%, 2% 80%, 0% 65%, 1% 50%, 0% 35%, 2% 20%)',
            filter: 'blur(0.4px)',
            boxShadow: '0 8px 24px rgba(202, 138, 4, 0.5)'
          }}
        >
          <FaGamepad className="text-xl" />
          <span>TRIVIA</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowRhythmGame(true)}
          className="flex items-center gap-2 shadow-2xl text-base px-8 py-4 text-white font-bold"
          style={{
            background: '#2563EB',
            clipPath: 'polygon(3% 12%, 8% 5%, 15% 2%, 25% 0%, 35% 2%, 50% 0%, 65% 2%, 75% 1%, 85% 4%, 92% 10%, 97% 18%, 100% 30%, 99% 45%, 100% 60%, 98% 75%, 100% 88%, 94% 95%, 85% 98%, 72% 100%, 58% 99%, 45% 100%, 32% 98%, 20% 100%, 12% 96%, 6% 90%, 2% 80%, 0% 65%, 1% 50%, 0% 35%, 2% 20%)',
            filter: 'blur(0.4px)',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.5)'
          }}
        >
          <FaGuitar className="text-xl" />
          <span>RITMO</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDocumental(true)}
          className="flex items-center gap-2 shadow-2xl text-base px-8 py-4 text-white font-bold"
          style={{
            background: '#DC2626',
            clipPath: 'polygon(3% 12%, 8% 5%, 15% 2%, 25% 0%, 35% 2%, 50% 0%, 65% 2%, 75% 1%, 85% 4%, 92% 10%, 97% 18%, 100% 30%, 99% 45%, 100% 60%, 98% 75%, 100% 88%, 94% 95%, 85% 98%, 72% 100%, 58% 99%, 45% 100%, 32% 98%, 20% 100%, 12% 96%, 6% 90%, 2% 80%, 0% 65%, 1% 50%, 0% 35%, 2% 20%)',
            filter: 'blur(0.4px)',
            boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5)'
          }}
        >
          <FaFilm className="text-xl" />
          <span>DOCUMENTAL</span>
        </motion.button>
      </motion.div>

      {/* Modales */}
      <AnimatePresence>
        {selectedLocation && (
          <LocationModal
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        )}

        {showDocumental && (
          <DocumentalModal onClose={() => setShowDocumental(false)} />
        )}

        {showGame && (
          <GameModal onClose={() => setShowGame(false)} />
        )}

        {showRhythmGame && (
          <RhythmGameModal onClose={() => setShowRhythmGame(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default MapaInteractivo
