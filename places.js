// Datos curados por ciudad. Editá libremente.
// Las claves coinciden con el nombre de la ciudad en el Google Sheet (en minúsculas).
// Para cada actividad: name, desc, cost ("Gratis" o "€X"), time, imperdible, booking, bookingUrl

const PLACES = {

  'luxemburgo': {
    station: 'Gare de Luxembourg',
    activities: [
      {
        name: 'Chemin de la Corniche',
        desc: 'El "balcón más bello de Europa" — vista del Grund y las fortificaciones.',
        cost: 'Gratis', time: '30 min', imperdible: true,
      },
      {
        name: 'Casemates du Bock',
        desc: 'Túneles fortificados excavados en la roca con vistas espectaculares.',
        cost: '€8', time: '1h', imperdible: true,
      },
      {
        name: 'Vallée du Grund',
        desc: 'Bajada al barrio antiguo del río Alzette, súper pintoresco.',
        cost: 'Gratis', time: '1h',
      },
      {
        name: 'Palais Grand-Ducal',
        desc: 'Residencia del Gran Duque. Solo exterior salvo en julio/agosto.',
        cost: 'Gratis', time: '15 min',
      },
    ],
  },

  'metz': {
    station: 'Gare de Metz-Ville',
    activities: [
      {
        name: 'Cathédrale Saint-Étienne',
        desc: 'Vitrales de Chagall y Cocteau. La llaman "la linterna del Buen Dios".',
        cost: 'Gratis', time: '45 min', imperdible: true,
      },
      {
        name: 'Centre Pompidou-Metz',
        desc: 'Museo de arte moderno con arquitectura impresionante.',
        cost: '€12', time: '2h',
      },
      {
        name: 'Place Saint-Louis',
        desc: 'Plaza medieval con arcadas, una de las más antiguas de Francia.',
        cost: 'Gratis', time: '20 min',
      },
      {
        name: 'Plan d\'Eau y Temple Neuf',
        desc: 'Paseo por el lago con el templo protestante reflejado, foto clásica.',
        cost: 'Gratis', time: '30 min',
      },
    ],
  },

  'estrasburgo': {
    station: 'Gare de Strasbourg',
    activities: [
      {
        name: 'Cathédrale Notre-Dame de Strasbourg',
        desc: 'Reloj astronómico (medio día a las 12:30). Subir a la plataforma vale la pena.',
        cost: 'Gratis (€8 torre)', time: '1h', imperdible: true,
      },
      {
        name: 'Petite France',
        desc: 'Barrio de canales con casas con entramado de madera. Es la postal.',
        cost: 'Gratis', time: '1-2h', imperdible: true,
      },
      {
        name: 'Batorama (paseo en barco)',
        desc: 'Recorrido en bote por los canales — la mejor vista de la ciudad.',
        cost: '€16', time: '1h 10min',
      },
      {
        name: 'Excursión a Colmar',
        desc: 'Pueblo de cuento (inspiró "La Bella y la Bestia"). Tren ~30 min.',
        cost: '€15 tren', time: 'Medio día', imperdible: true,
      },
      {
        name: 'Parlamento Europeo',
        desc: 'Tour gratis al hemiciclo. Hay que anotarse online con antelación.',
        cost: 'Gratis', time: '1h',
        booking: 'Reserva online previa',
        bookingUrl: 'https://visiting.europarl.europa.eu/en/visitor-offer/strasbourg',
      },
      {
        name: 'Place Kléber',
        desc: 'Plaza principal — en diciembre tiene el mercado navideño más famoso.',
        cost: 'Gratis', time: '20 min',
      },
    ],
  },

  'berna': {
    station: 'Bern Hauptbahnhof',
    activities: [
      {
        name: 'Zytglogge (Torre del Reloj)',
        desc: 'Reloj astronómico medieval — el espectáculo arranca 4 min antes de cada hora.',
        cost: 'Gratis exterior · €20 tour interior', time: '30 min', imperdible: true,
      },
      {
        name: 'Casco Antiguo (Patrimonio UNESCO)',
        desc: 'Arcadas cubiertas de 6 km, fuentes pintadas del siglo XVI.',
        cost: 'Gratis', time: '1-2h', imperdible: true,
      },
      {
        name: 'BärenPark (Foso de los Osos)',
        desc: 'Los osos, símbolo de Berna, viven en un parque junto al río Aare.',
        cost: 'Gratis', time: '30 min',
      },
      {
        name: 'Catedral Münster',
        desc: 'Subir los 312 escalones de la torre más alta de Suiza por vistas 360°.',
        cost: '€7 torre', time: '45 min',
      },
      {
        name: 'Paseo del río Aare',
        desc: 'El río turquesa que rodea la ciudad. En verano los locales se tiran y flotan.',
        cost: 'Gratis', time: '1h',
      },
    ],
  },

  'zurich': {
    station: 'Zürich Hauptbahnhof',
    activities: [
      {
        name: 'Lago de Zúrich (Bürkliplatz)',
        desc: 'Paseo costero con vistas a los Alpes en días claros.',
        cost: 'Gratis', time: '1-2h', imperdible: true,
      },
      {
        name: 'Bahnhofstrasse',
        desc: 'Una de las calles comerciales más caras del mundo.',
        cost: 'Gratis (ver vidrieras)', time: '1h',
      },
      {
        name: 'Grossmünster',
        desc: 'Catedral del siglo XII. Subir las torres da vista al casco viejo y al lago.',
        cost: '€5 torres', time: '45 min',
      },
      {
        name: 'Lindt Home of Chocolate',
        desc: 'Museo con la fuente de chocolate más alta del mundo. Degustación incluida.',
        cost: '€18', time: '1.5h', imperdible: true,
        booking: 'Reservar día y hora online',
        bookingUrl: 'https://www.lindt-home-of-chocolate.com/',
      },
      {
        name: 'Uetliberg (mirador)',
        desc: 'Cerro con vista panorámica. Tren S10 desde la estación central, 25 min.',
        cost: '€10 tren', time: '2h',
      },
      {
        name: 'Vaduz (Liechtenstein)',
        desc: 'Capital del principado. Bus directo desde Sargans (1h tren + 30 min bus).',
        cost: '€40 transporte', time: 'Medio día',
      },
    ],
  },

  'salzburgo': {
    station: 'Salzburg Hauptbahnhof',
    activities: [
      {
        name: 'Festung Hohensalzburg',
        desc: 'Fortaleza del 1077 sobre la ciudad. Funicular incluido en el ticket.',
        cost: '€17', time: '2-3h', imperdible: true,
      },
      {
        name: 'Mirabellgarten',
        desc: 'Jardines barrocos — acá filmaron "Do-Re-Mi" de Sonido de la Música.',
        cost: 'Gratis', time: '45 min', imperdible: true,
      },
      {
        name: 'Mozarts Geburtshaus',
        desc: 'Casa natal de Mozart (1756) en Getreidegasse 9. Manuscritos originales.',
        cost: '€13.5', time: '1h',
      },
      {
        name: 'Getreidegasse',
        desc: 'Calle peatonal con carteles de hierro forjado, la postal de Salzburgo.',
        cost: 'Gratis', time: '30 min',
      },
      {
        name: 'Mönchsberg (mirador)',
        desc: 'Mejor vista de la ciudad. Subís por ascensor o caminando.',
        cost: '€3.7 ascensor', time: '1h',
      },
      {
        name: 'Sound of Music Tour',
        desc: 'Tour por las locaciones de la peli. Termina en el Lago Wolfgang.',
        cost: '€60', time: '4h',
        booking: 'Reservar online',
        bookingUrl: 'https://www.panoramatours.com/en/salzburg/the-original-sound-of-music-tour/',
      },
    ],
  },

  'viena': {
    station: 'Wien Hauptbahnhof',
    activities: [
      {
        name: 'Schloss Schönbrunn',
        desc: 'Palacio imperial con 1.441 salas. Recorrer al menos los Jardines y la Gloriette.',
        cost: '€32 Grand Tour · Jardines gratis', time: '3-4h', imperdible: true,
        booking: 'Reservar día y hora online',
        bookingUrl: 'https://www.schoenbrunn.at/en/tickets-prices/',
      },
      {
        name: 'Stephansdom',
        desc: 'Catedral gótica. Subir la torre sur (343 escalones) por la mejor vista.',
        cost: 'Gratis · €6 torre', time: '1h', imperdible: true,
      },
      {
        name: 'Café Sacher',
        desc: 'Torta Sacher original (1832) frente a la Ópera. Hay que hacer cola.',
        cost: '€10 (torta + café)', time: '45 min', imperdible: true,
      },
      {
        name: 'Belvedere (El Beso de Klimt)',
        desc: 'Palacio + museo con la colección de Klimt y Schiele.',
        cost: '€17.5', time: '2h',
        booking: 'Online ahorra cola',
        bookingUrl: 'https://www.belvedere.at/en/tickets',
      },
      {
        name: 'Naschmarkt',
        desc: 'Mercado callejero con comida del mundo. Almorzar ahí es plan.',
        cost: 'Gratis (€15 comer)', time: '1-2h',
      },
      {
        name: 'Hofburg & Sisi Museum',
        desc: 'Palacio de invierno de los Habsburgo, con joyas imperiales y aposentos de Sisi.',
        cost: '€19', time: '2h',
      },
    ],
  },

  'bratislava': {
    station: 'Bratislava hlavná stanica',
    activities: [
      {
        name: 'Hrad Bratislava (Castillo)',
        desc: 'Castillo blanco sobre la ciudad. Vistas hasta Austria y Hungría en días claros.',
        cost: 'Gratis parque · €12 museo', time: '1.5h', imperdible: true,
      },
      {
        name: 'Staré Mesto (Casco Antiguo)',
        desc: 'Compacto y caminable. Plaza Hlavné námestie es el corazón.',
        cost: 'Gratis', time: '2h', imperdible: true,
      },
      {
        name: 'Čumil ("Man at Work")',
        desc: 'La estatua más fotografiada — un obrero asomado de una alcantarilla.',
        cost: 'Gratis', time: '5 min',
      },
      {
        name: 'UFO Observation Deck',
        desc: 'Mirador sobre el puente SNP — el más alto de la ciudad.',
        cost: '€10', time: '45 min',
      },
    ],
  },

  'budapest': {
    station: 'Budapest-Keleti pályaudvar',
    activities: [
      {
        name: 'Termas Széchenyi',
        desc: 'El balneario neobarroco más grande de Europa. Pileta exterior incluso en invierno.',
        cost: '€32', time: '3h', imperdible: true,
        booking: 'Reservar online evita cola',
        bookingUrl: 'https://www.szechenyibath.com/',
      },
      {
        name: 'Parlamento Húngaro',
        desc: 'El edificio neogótico sobre el Danubio. Solo se entra con tour guiado.',
        cost: '€16', time: '45 min', imperdible: true,
        booking: 'Reservar 2-3 semanas antes',
        bookingUrl: 'https://jegymester.hu/eventCategory/35021/parliament-visit',
      },
      {
        name: 'Halászbástya (Bastión de los Pescadores)',
        desc: 'Mirador neogótico sobre el Danubio en el lado Buda. Mágico de noche.',
        cost: 'Gratis (€5 torres altas)', time: '1h', imperdible: true,
      },
      {
        name: 'Crucero nocturno por el Danubio',
        desc: 'Ver el Parlamento iluminado desde el río. ~1h con copa de bienvenida.',
        cost: '€20', time: '1h',
        booking: 'Reservar online',
        bookingUrl: 'https://www.legenda.hu/en/',
      },
      {
        name: 'Szimpla Kert (ruin bar)',
        desc: 'El primer "ruin bar" — una fábrica abandonada llena de objetos kitsch.',
        cost: 'Entrada gratis (tragos €5)', time: '2h',
      },
      {
        name: 'Mercado Central (Nagy Vásárcsarnok)',
        desc: 'Mercado neogótico. Probar lángos en la planta de arriba.',
        cost: 'Gratis (comer €8)', time: '1h',
      },
    ],
  },

  'praga': {
    station: 'Praha hlavní nádraží',
    activities: [
      {
        name: 'Karlův most (Puente de Carlos)',
        desc: 'Puente del siglo XIV con 30 estatuas. Ir al amanecer para verlo sin gente.',
        cost: 'Gratis', time: '45 min', imperdible: true,
      },
      {
        name: 'Reloj Astronómico (Staroměstský orloj)',
        desc: 'El show de los Doce Apóstoles cada hora en punto, desde 1410.',
        cost: 'Gratis', time: '20 min', imperdible: true,
      },
      {
        name: 'Pražský hrad (Castillo de Praga)',
        desc: 'El complejo de castillos más grande del mundo. Catedral San Vito imperdible.',
        cost: '€20', time: '3h', imperdible: true,
      },
      {
        name: 'Josefov (Barrio Judío)',
        desc: 'Sinagogas y el cementerio antiguo más impresionante de Europa.',
        cost: '€20 combo', time: '2h',
      },
      {
        name: 'U Fleků',
        desc: 'Cervecería de 1499. Cerveza negra exclusiva, ambiente medieval.',
        cost: '€15 cena', time: '1.5h',
      },
      {
        name: 'Tančící dům (Casa Danzante)',
        desc: 'Edificio deconstructivista de Gehry. Subir al rooftop bar por la vista.',
        cost: 'Gratis exterior', time: '30 min',
      },
    ],
  },

  'amsterdam': {
    station: 'Amsterdam Centraal',
    activities: [
      {
        name: 'Anne Frank Huis',
        desc: 'La casa donde se escondió Anne Frank durante la WWII. Visita muy emotiva.',
        cost: '€16', time: '1h', imperdible: true,
        booking: 'IMPRESCINDIBLE reservar online 6 semanas antes',
        bookingUrl: 'https://www.annefrank.org/en/museum/tickets/',
      },
      {
        name: 'Rijksmuseum',
        desc: 'Maestros holandeses: La Ronda de Noche de Rembrandt y La Lechera de Vermeer.',
        cost: '€25', time: '3h', imperdible: true,
        booking: 'Reservar día y hora online',
        bookingUrl: 'https://www.rijksmuseum.nl/en/tickets',
      },
      {
        name: 'Van Gogh Museum',
        desc: 'La mayor colección de Van Gogh del mundo. 200+ pinturas.',
        cost: '€22', time: '2h', imperdible: true,
        booking: 'Reservar online OBLIGATORIO',
        bookingUrl: 'https://www.vangoghmuseum.nl/en/visit/tickets',
      },
      {
        name: 'Paseo en barco por los canales',
        desc: 'Los canales son patrimonio UNESCO. Hay tours de día y de noche con luces.',
        cost: '€18-25', time: '1.5h', imperdible: true,
      },
      {
        name: 'Vondelpark',
        desc: 'El Central Park de Amsterdam. Alquilar bici y dar la vuelta.',
        cost: 'Gratis (€10 bici)', time: '2h',
      },
      {
        name: 'Jordaan',
        desc: 'Barrio bohemio con galerías, cafés y los nine streets — zona de compras.',
        cost: 'Gratis explorar', time: '2h',
      },
    ],
  },

};
