'use client';

export default function HistoryPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-90 py-10 px-4 sm:py-16">
      <div className="w-full max-w-screen-md sm:max-w-screen-lg p-4 sm:p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-200 text-center">
          Aprende sobre el Tenis de Mesa 🏓
        </h1>

        <section className="text-gray-400 space-y-4 sm:space-y-6">
          {/* Historia */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-300">Historia del tenis de mesa</h2>
          <p className="text-sm sm:text-base">
            El tenis de mesa tiene sus raíces en Inglaterra a finales del siglo XIX. Surgió como una alternativa de tenis tradicional para jugar en interiores, utilizando pelotas de corcho y paletas rudimentarias. Durante los años 1920, el deporte comenzó a formalizarse con la creación de la Federación Internacional de Tenis de Mesa (ITTF), y a partir de 1988, el tenis de mesa se convirtió en un deporte olímpico, debutando en los Juegos de Seúl.
          </p>

          {/* Reglas */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-300">Reglamento oficial</h2>
          <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-sm sm:text-base">
            <li>El juego se disputa en sets de 11 puntos, con necesidad de ganar por diferencia de 2 puntos.</li>
            <li>El saque se alterna cada dos turnos entre los jugadores y debe lanzarse desde la palma abierta.</li>
            <li>La pelota debe golpear primero en el lado del sacador antes de cruzar la red.</li>
          </ul>

          {/* Técnicas de juego */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-300">Técnicas y estrategias</h2>
          <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-sm sm:text-base">
            <li><strong>Juego ofensivo:</strong> Golpes rápidos y agresivos como el &quot;topspin&quot;.</li>
            <li><strong>Juego defensivo:</strong> Bloquear ataques rivales con golpes como el &quot;chop&quot; o el &quot;push&quot;.</li>
          </ul>

          {/* Equipamiento */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-300">Equipamiento necesario</h2>
          <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-sm sm:text-base">
            <li><strong>Palas:</strong> Disponibles con diferentes tipos de gomas según la velocidad y efecto.</li>
            <li><strong>Mesa:</strong> Dimensiones oficiales de 2.74m x 1.525m con altura de 76cm.</li>
            <li><strong>Pelotas:</strong> Hechas de plástico, con un diámetro de 40mm y peso de 2.7g.</li>
            <li><strong>Red:</strong> Debe tener una altura de 15.25cm y estar tensada adecuadamente.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
