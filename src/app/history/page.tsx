'use client'

export default function HistoryPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-90 py-16">
      <div className="w-full max-w-5xl p-12 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl text-left overflow-hidden">
        <h1 className="text-4xl font-bold mb-8 text-gray-200 text-center">Aprende sobre el Tenis de Mesa</h1>

        <section className="text-gray-400 space-y-6">
          {/* Historia */}
          <h2 className="text-2xl font-semibold text-gray-300">Historia del tenis de mesa</h2>
          <p>
            El tenis de mesa tiene sus raíces en Inglaterra a finales del siglo XIX. Surgió como una alternativa de tenis tradicional para jugar en interiores, utilizando pelotas de corcho y paletas rudimentarias. Durante los años 1920, el deporte comenzó a formalizarse con la creación de la Federación Internacional de Tenis de Mesa (ITTF), y a partir de 1988, el tenis de mesa se convirtió en un deporte olímpico, debutando en los Juegos de Seúl.
          </p>

          {/* Reglas */}
          <h2 className="text-2xl font-semibold text-gray-300">Reglamento oficial</h2>
          <p>El tenis de mesa sigue un conjunto de reglas establecido por la ITTF:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>El juego se disputa en sets de 11 puntos, con necesidad de ganar por diferencia de 2 puntos.</li>
            <li>El saque se alterna cada dos turnos entre los jugadores y debe lanzarse desde la palma abierta.</li>
            <li>La pelota debe golpear primero en el lado del sacador antes de cruzar la red.</li>
            <li>Los partidos pueden ser al mejor de 3, 5 o 7 sets, dependiendo del torneo.</li>
            <li>En dobles, los jugadores deben alternar golpes entre sí en cada turno.</li>
          </ul>

          {/* Técnicas de juego */}
          <h2 className="text-2xl font-semibold text-gray-300">Técnicas y estrategias en tenis de mesa</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Juego ofensivo:</strong> Implica golpes rápidos y agresivos como el "topspin" para dificultar la defensa del oponente.</li>
            <li><strong>Juego defensivo:</strong> Consiste en bloquear los ataques rivales con golpes como el "chop" o el "push".</li>
            <li><strong>Efectos en la pelota:</strong> Se pueden aplicar efectos como topspin, backspin y sidespin para cambiar la trayectoria y velocidad.</li>
            <li><strong>Colocación estratégica:</strong> Enviar la pelota a los extremos de la mesa puede generar errores en el oponente.</li>
          </ul>

          {/* Equipamiento */}
          <h2 className="text-2xl font-semibold text-gray-300">Equipamiento necesario</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Palas:</strong> Disponibles con diferentes tipos de gomas según la velocidad y el efecto deseado.</li>
            <li><strong>Mesa:</strong> Dimensiones oficiales de 2.74m de largo x 1.525m de ancho con una altura de 76cm.</li>
            <li><strong>Pelotas:</strong> Normalmente de 40 mm de diámetro, hechas de celuloide o plástico ABS.</li>
            <li><strong>Red:</strong> Debe tener una altura de 15.25 cm, dividiendo la mesa en dos mitades iguales.</li>
          </ul>

          {/* Curiosidades */}
          <h2 className="text-2xl font-semibold text-gray-300">Curiosidades</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>El punto más largo en un partido profesional duró 10 minutos y 13 segundos.</li>
            <li>China ha ganado más de 50 medallas olímpicas en tenis de mesa.</li>
            <li>La velocidad promedio de una pelota en un partido profesional puede alcanzar más de 100 km/h.</li>
            <li>Las palas modernas pueden incluir materiales como fibras de carbono para mejorar el control y la velocidad.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
