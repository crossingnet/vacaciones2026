// Datos curados por ciudad. Editá libremente.
// Las claves coinciden con el nombre de la ciudad en el Google Sheet (en minúsculas).
// Para cada actividad: name, desc, cost ("Gratis" o "€X"), time, imperdible, booking, bookingUrl, history

const FLIGHTS = {
  outbound: {
    label: 'Vuelo de ida',
    airline: 'KLM',
    flight: 'KL702',
    booking: 'X6G5YP',
    aircraft: null,
    from: { airport: 'EZE', city: 'Buenos Aires', country: 'Argentina', y: 2026, m: 5, d: 9, time: '15:05' },
    to:   { airport: 'AMS', city: 'Ámsterdam',    country: 'Países Bajos', y: 2026, m: 5, d: 10, time: '09:10' },
    duration: '13h 05min',
  },
  return: {
    label: 'Vuelo de vuelta',
    airline: 'KLM',
    flight: 'KL701',
    booking: 'X6G5YP',
    aircraft: 'Boeing 777-200',
    from: { airport: 'AMS', city: 'Ámsterdam',    country: 'Países Bajos', y: 2026, m: 5, d: 29, time: '21:10' },
    to:   { airport: 'EZE', city: 'Buenos Aires', country: 'Argentina', y: 2026, m: 5, d: 30, time: '~06:00', estimated: true },
    duration: '~13h 50min',
  },
};

// Traslados entre paradas. La clave es la ciudad de DESTINO (minúsculas).
// El traslado aparece como rectángulo justo arriba de la tarjeta de esa ciudad.
// Tickets comprados en Omio. Una vez que tengas los horarios reales, llename:
//   departure (hora salida), arrival (hora llegada), duration, transfers, bookingRef
const TRANSITS = {
  'luxemburgo': {
    date: { y: 2026, m: 5, d: 10 },
    from: { name: 'Aeropuerto de Schiphol', code: 'AMS' },
    to:   { name: 'Estación Luxemburgo', code: 'LUX' },
    mode: 'Tren',
    departure: '11:12',
    arrival: '16:49',
    duration: '5h 37min',
    transfers: 'Bruselas-Midi · 21 min de transbordo (Eurocity Direct 9532 → Intercity 2113)',
    bookedAt: 'Omio',
    note: 'Tren Eurocity Direct 9532 desde Schiphol. Transbordo en Bruselas-Midi. Luego Intercity 2113 hasta Luxemburgo (3h 17min).',
  },
  'metz': {
    date: { y: 2026, m: 5, d: 11 },
    from: { name: 'Luxemburgo', code: 'LUX' },
    to:   { name: 'Metz-Ville', code: 'MET' },
    mode: 'Tren',
    departure: '15:15',
    arrival: '16:14',
    duration: '59 min',
    bookedAt: 'Omio',
  },
  'estrasburgo': {
    date: { y: 2026, m: 5, d: 12 },
    from: { name: 'Metz-Ville', code: 'MET' },
    to:   { name: 'Estrasburgo', code: 'STR' },
    mode: 'Tren',
    departure: '12:10',
    arrival: '12:58',
    duration: '48 min',
    bookedAt: 'Omio',
  },
  'berna': {
    date: { y: 2026, m: 5, d: 14 },
    from: { name: 'Estrasburgo', code: 'STR' },
    to:   { name: 'Bern Hauptbahnhof', code: 'BRN' },
    mode: 'Tren',
    departure: '10:52',
    arrival: '14:56',
    duration: '4h 04min',
    bookedAt: 'Omio',
  },
  'zurich': {
    date: { y: 2026, m: 5, d: 15 },
    from: { name: 'Bern Hauptbahnhof', code: 'BRN' },
    to:   { name: 'Zúrich HB', code: 'ZUR' },
    mode: 'Tren',
    departure: '11:36',
    arrival: '12:54',
    duration: '1h 18min',
    bookedAt: 'Omio',
  },
  'salzburgo': {
    date: { y: 2026, m: 5, d: 17 },
    from: { name: 'Zúrich HB', code: 'ZUR' },
    to:   { name: 'Salzburg Hbf', code: 'SZG' },
    mode: 'Tren',
    departure: '08:32',
    arrival: '15:02',
    duration: '6h 30min',
    bookedAt: 'Omio',
  },
  'viena': {
    date: { y: 2026, m: 5, d: 19 },
    from: { name: 'Salzburg Hbf', code: 'SZG' },
    to:   { name: 'Wien Hauptbahnhof', code: 'VIE' },
    mode: 'Tren',
    departure: '08:11',
    arrival: '11:03',
    duration: '2h 52min',
    bookedAt: 'Omio',
  },
  'bratislava': {
    date: { y: 2026, m: 5, d: 21 },
    from: { name: 'Wien Hauptbahnhof', code: 'VIE' },
    to:   { name: 'Bratislava-Petržalka', code: 'BTS' },
    mode: 'Tren',
    departure: '09:45',
    arrival: '10:44',
    duration: '59 min',
    bookedAt: 'Omio',
    note: 'Llega a Petržalka (sur del Danubio). Bus 80 o caminar 20 min al casco antiguo.',
  },
  'budapest': {
    date: { y: 2026, m: 5, d: 22 },
    from: { name: 'Bratislava (Bus Station)', code: 'BTS' },
    to:   { name: 'Budapest-Kelenföld', code: 'BUD' },
    mode: 'Autobús',
    departure: '10:00',
    arrival: '12:25',
    duration: '2h 25min',
    bookedAt: 'Omio',
    note: 'Sale desde Mlynské nivy (estación de buses Bratislava). Kelenföld está en Buda — metro M4 al centro.',
  },
  'praga': {
    date: { y: 2026, m: 5, d: 24 },
    from: { name: 'Budapest', code: 'BUD' },
    to:   { name: 'Praha-Holešovice', code: 'PRG' },
    mode: 'Tren',
    departure: '07:30',
    arrival: '14:26',
    duration: '6h 56min',
    bookedAt: 'Omio',
    note: 'Llega a Holešovice (norte de Praga, metro C). Salida TEMPRANA — estar en estación a las 07:00.',
  },
  'amsterdam': {
    date: { y: 2026, m: 5, d: 27 },
    from: { name: 'Aeropuerto de Praga (Ruzyně)', code: 'PRG' },
    to:   { name: 'Aeropuerto Schiphol', code: 'AMS' },
    mode: 'Vuelo',
    departure: '14:30',
    arrival: '16:00',
    duration: '~1h 30min',
    bookedAt: null,
    bookingRef: null,
    note: null,
    pending: true,
  },
};

// Hoteles por ciudad. Clave = ciudad (minúsculas).
const HOTELS = {
  'luxemburgo': {
    name: 'Modern Studio Near Gare & City Center, Wi-Fi',
    address: 'Rue de Vianden 45, Hollerich, Luxembourg, 2680',
    phone: '+33 7 55 54 60 13',
    bookingRef: '6773096856',
    pin: '8130',
    notes: '1 noche · barrio Hollerich (al lado de la estación, 15 min al casco histórico)',
  },
  'metz': {
    name: 'Hôtel Escurial - Centre Gare',
    rating: '3★',
    address: '18 Rue Pasteur, Metz, 57000, Francia',
    phone: '+33 387697334',
    bookingRef: '5045617669',
    pin: '4313',
    notes: 'Standard Double Room €96.35 · 1 noche',
  },
  'estrasburgo': {
    name: 'Citadines Kléber Strasbourg',
    rating: '3★',
    address: '50-54 Rue Du Jeu Des Enfants, Estrasburgo, 67000, Francia',
    phone: '+33 3 90 22 47 00',
    bookingRef: '5321045626',
    pin: '0809',
    notes: 'Standard Studio €184.55 · 2 noches',
  },
  'berna': {
    name: 'NH Bern The Bristol',
    rating: '4★',
    address: 'Schauplatzgasse 10, Rotes Quartier, Bern, 3011, Suiza',
    phone: '+41 313102266',
    bookingRef: '5986065525',
    pin: '6217',
    notes: 'Standard Double Room CHF 140.03 · 1 noche',
  },
  'zurich': {
    name: 'easyHotel Zürich City Main Station',
    rating: '3★',
    address: '33 Klingenstrasse, Zurich, 8005, Suiza',
    phone: '+41 43 322 05 51',
    bookingRef: '6137402424',
    pin: '7861',
    notes: '1 Double Room · 2 noches',
  },
  'salzburgo': {
    name: 'Cocoon Salzburg',
    rating: '4★ · 8.6',
    address: '29 Rainerstraße, Elisabeth-Vorstadt, 5020 Salzburg, Austria',
    phone: '+43 664 88168519',
    bookingRef: '8278380014599652774',
    pin: '950832',
    notes: 'Twin Room · 2 noches · desayuno US$26/p aparte',
  },
  'viena': {
    name: 'FortyPlusOne Hotel Vienna',
    address: 'Schönbrunner Straße 41, 05. Margareten, Vienna, 1050, Austria',
    phone: '+43 6764141066',
    bookingRef: '5986000607',
    pin: '2906',
    notes: '1 Twin Room · 2 noches · +10% VAT · +3.20% City tax',
  },
  'bratislava': {
    name: 'Park Inn by Radisson Danube Bratislava',
    address: 'Rybné námestie 1, Bratislava, 813 38, Eslovaquia',
    phone: '+421 2/593 400 00',
    bookingRef: '5881072658',
    pin: '6804',
    notes: '1 noche · sobre el Danubio, al lado del casco antiguo',
  },
  'praga': {
    name: 'Perla Hotel',
    rating: '4★',
    address: 'Perlova 1, Prague 1, 110 00, República Checa',
    phone: '+420 227022077',
    bookingRef: '5740113078',
    pin: '3461',
    notes: 'Double/Twin Room €314.60 + €37.75 VAT · 3 noches',
  },
};

const PLACES = {

  'luxemburgo': {
    station: 'Gare de Luxembourg',
    activities: [
      {
        name: 'Chemin de la Corniche',
        desc: 'El "balcón más bello de Europa" — vista del Grund y las fortificaciones.',
        cost: 'Gratis', time: '30 min', imperdible: true,
        history: 'Antigua muralla de los siglos XVII-XVIII construida por españoles y franceses. Luxemburgo fue llamada "la Gibraltar del Norte" por sus 23 km de túneles defensivos.',
      },
      {
        name: 'Casemates du Bock',
        desc: 'Túneles fortificados excavados en la roca con vistas espectaculares.',
        cost: '€8', time: '1h', imperdible: true,
        history: 'Las casamatas se empezaron a excavar en 1644 cuando Luxemburgo estaba bajo dominio español. Llegaron a tener capacidad para 35.000 soldados y 50 cañones.',
      },
      {
        name: 'Vallée du Grund',
        desc: 'Bajada al barrio antiguo del río Alzette, súper pintoresco.',
        cost: 'Gratis', time: '1h',
        history: 'El barrio más antiguo de la ciudad — surgió como asentamiento monástico en el siglo X alrededor de la Abadía de Neumünster.',
      },
      {
        name: 'Palais Grand-Ducal',
        desc: 'Residencia del Gran Duque. Solo exterior salvo en julio/agosto.',
        cost: 'Gratis', time: '15 min',
        history: 'Construido en 1573 como ayuntamiento renacentista flamenco. Es la residencia oficial del Gran Duque desde 1890 — Luxemburgo es la última monarquía gran-ducal del mundo.',
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
        history: 'Catedral gótica construida entre 1220 y 1520. Tiene 6.500 m² de vitrales — la mayor superficie de Europa. Los vitrales modernos de Marc Chagall fueron instalados en los años 60.',
      },
      {
        name: 'Centre Pompidou-Metz',
        desc: 'Museo de arte moderno con arquitectura impresionante.',
        cost: '€12', time: '2h',
        history: 'Inaugurado en 2010 por el arquitecto japonés Shigeru Ban. Su techo en forma de sombrero chino está inspirado en una pieza de mimbre que el arquitecto encontró en París.',
      },
      {
        name: 'Place Saint-Louis',
        desc: 'Plaza medieval con arcadas, una de las más antiguas de Francia.',
        cost: 'Gratis', time: '20 min',
        history: 'Plaza del siglo XIII bordeada por arcadas medievales. Los cambistas lombardos hacían negocios bajo estas mismas arcadas hace 700 años.',
      },
      {
        name: 'Plan d\'Eau y Temple Neuf',
        desc: 'Paseo por el lago con el templo protestante reflejado, foto clásica.',
        cost: 'Gratis', time: '30 min',
        history: 'Templo protestante neorrománico de 1904, construido durante la anexión alemana de Alsacia-Lorena (1871-1918). El reflejo en el agua es la postal de Metz.',
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
        history: 'Construida entre 1015 y 1439. Fue el edificio más alto del mundo durante 227 años (1647-1874). Víctor Hugo la llamó "prodigio de lo gigante y lo delicado".',
      },
      {
        name: 'Petite France',
        desc: 'Barrio de canales con casas con entramado de madera. Es la postal.',
        cost: 'Gratis', time: '1-2h', imperdible: true,
        history: 'Barrio de curtidores, molineros y pescadores del siglo XVI. Las casas tienen techos abiertos para secar pieles — de ahí su forma característica.',
      },
      {
        name: 'Batorama (paseo en barco)',
        desc: 'Recorrido en bote por los canales — la mejor vista de la ciudad.',
        cost: '€16', time: '1h 10min',
        history: 'Recorrido por el río Ill, que dividió Estrasburgo en una isla amurallada durante la Edad Media. La isla central conserva intacto su trazado medieval.',
      },
      {
        name: 'Excursión a Colmar (Sáb 13 Jun)',
        desc: 'Pueblo de cuento (inspiró "La Bella y la Bestia"). 🚆 Ida 09:13→09:42 (TGV 2363, P3F3S8) · Vuelta 15:27→15:54 (TGV 12176, P3H8DF). ~5h 45min en Colmar.',
        cost: 'Tren ida y vuelta (Omio)', time: 'Medio día', imperdible: true,
        history: 'Capital del Alto Rin alsaciano, milagrosamente intacta tras las dos guerras mundiales. Hayao Miyazaki se inspiró en sus calles para "Howl no Ugoku Shiro".',
      },
      {
        name: 'Parlamento Europeo',
        desc: 'Tour gratis al hemiciclo. Hay que anotarse online con antelación.',
        cost: 'Gratis', time: '1h',
        booking: 'Reserva online previa',
        bookingUrl: 'https://visiting.europarl.europa.eu/en/visitor-offer/strasbourg',
        history: 'Sede del Parlamento Europeo desde 1979. Estrasburgo fue elegida como símbolo de la reconciliación franco-alemana post-WWII — la ciudad cambió de manos 4 veces entre 1870 y 1945.',
      },
      {
        name: 'Place Kléber',
        desc: 'Plaza principal — en diciembre tiene el mercado navideño más famoso.',
        cost: 'Gratis', time: '20 min',
        history: 'Lleva el nombre del general Jean-Baptiste Kléber (1753-1800), enterrado bajo su estatua. El "Christkindelsmärik" (mercado navideño) funciona ininterrumpidamente desde 1570.',
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
        history: 'Torre del siglo XIII (1218-1220), originalmente puerta oeste de la ciudad. El reloj astronómico se instaló en 1530 — aún tiene el mecanismo original funcionando.',
      },
      {
        name: 'Casco Antiguo (Patrimonio UNESCO)',
        desc: 'Arcadas cubiertas de 6 km, fuentes pintadas del siglo XVI.',
        cost: 'Gratis', time: '1-2h', imperdible: true,
        history: 'Berna fue fundada en 1191 por el duque Berthold V. El nombre viene del oso (Bär) que cazó al fundarla. Las arcadas cubiertas son de las más largas de Europa.',
      },
      {
        name: 'BärenPark (Foso de los Osos)',
        desc: 'Los osos, símbolo de Berna, viven en un parque junto al río Aare.',
        cost: 'Gratis', time: '30 min',
        history: 'Los osos son símbolo de Berna desde 1224. Desde 1857 vivieron en fosos en pleno centro, hasta que en 2009 los mudaron a este parque moderno de 6.000 m² junto al río.',
      },
      {
        name: 'Catedral Münster',
        desc: 'Subir los 312 escalones de la torre más alta de Suiza por vistas 360°.',
        cost: '€7 torre', time: '45 min',
        history: 'Catedral gótica iniciada en 1421. La torre, de 100m, es la más alta de Suiza y se terminó recién en 1893 — 472 años después del inicio de la obra.',
      },
      {
        name: 'Paseo del río Aare',
        desc: 'El río turquesa que rodea la ciudad. En verano los locales se tiran y flotan.',
        cost: 'Gratis', time: '1h',
        history: 'El río de aguas glaciares verde-turquesa rodea el casco viejo formando una península natural — por eso eligieron este sitio para fundar la ciudad.',
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
        history: 'Lago glacial de 40 km de largo formado en la última era glaciar (hace 10.000 años). En días claros se ven los Alpes y el monte Rigi al sur.',
      },
      {
        name: 'Bahnhofstrasse',
        desc: 'Una de las calles comerciales más caras del mundo.',
        cost: 'Gratis (ver vidrieras)', time: '1h',
        history: 'Inaugurada en 1864 sobre el antiguo foso medieval (Frosch-graben, "foso de las ranas"). Hoy es una de las calles más caras del mundo para el alquiler comercial.',
      },
      {
        name: 'Grossmünster',
        desc: 'Catedral del siglo XII. Subir las torres da vista al casco viejo y al lago.',
        cost: '€5 torres', time: '45 min',
        history: 'Iglesia del siglo XII donde Huldrych Zwingli inició la Reforma Protestante suiza en 1519 — un punto de quiebre en la historia de Europa, paralelo a Lutero en Alemania.',
      },
      {
        name: 'Lindt Home of Chocolate',
        desc: 'Museo con la fuente de chocolate más alta del mundo. Degustación incluida.',
        cost: '€18', time: '1.5h', imperdible: true,
        booking: 'Reservar día y hora online',
        bookingUrl: 'https://www.lindt-home-of-chocolate.com/',
        history: 'Lindt fabrica chocolate desde 1845. Rodolphe Lindt inventó el proceso de "conchado" en 1879 — la técnica que da al chocolate su textura sedosa moderna.',
      },
      {
        name: 'Uetliberg (mirador)',
        desc: 'Cerro con vista panorámica. Tren S10 desde la estación central, 25 min.',
        cost: '€10 tren', time: '2h',
        history: 'La "montaña local" de Zúrich a 871m. Conocido como el "Top of Zürich" — en días claros se ven 4 cantones, los Alpes y hasta Alemania.',
      },
      {
        name: 'Vaduz (Liechtenstein)',
        desc: 'Capital del principado. Bus directo desde Sargans (1h tren + 30 min bus).',
        cost: '€40 transporte', time: 'Medio día',
        history: 'Capital del Principado de Liechtenstein, el sexto país más pequeño del mundo (160 km²). La dinastía Liechtenstein gobierna desde 1719 y vive en el castillo sobre la ciudad.',
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
        history: 'Fortaleza construida en 1077 por los arzobispos-príncipes. Es una de las fortalezas medievales más grandes de Europa y nunca fue conquistada en su historia.',
      },
      {
        name: 'Mirabellgarten',
        desc: 'Jardines barrocos — acá filmaron "Do-Re-Mi" de Sonido de la Música.',
        cost: 'Gratis', time: '45 min', imperdible: true,
        history: 'Encargados en 1606 por el arzobispo Wolf Dietrich von Raitenau para su amante Salome Alt — con quien tuvo 15 hijos a pesar de su voto de celibato.',
      },
      {
        name: 'Mozarts Geburtshaus',
        desc: 'Casa natal de Mozart (1756) en Getreidegasse 9. Manuscritos originales.',
        cost: '€13.5', time: '1h',
        history: 'Wolfgang Amadeus Mozart nació acá el 27 de enero de 1756 a las 8 de la noche. Su familia vivió en este piso durante 26 años — desde 1747 hasta 1773.',
      },
      {
        name: 'Getreidegasse',
        desc: 'Calle peatonal con carteles de hierro forjado, la postal de Salzburgo.',
        cost: 'Gratis', time: '30 min',
        history: 'Calle medieval con casas que datan del siglo XII. Los carteles de hierro forjado eran obligatorios para los analfabetos — cada gremio tenía su símbolo (panadero, sastre, etc.).',
      },
      {
        name: 'Mönchsberg (mirador)',
        desc: 'Mejor vista de la ciudad. Subís por ascensor o caminando.',
        cost: '€3.7 ascensor', time: '1h',
        history: '"Monte de los Monjes" — los monjes benedictinos de la Abadía de San Pedro viven y rezan en sus cuevas desde el año 696 (1.300+ años de presencia continua).',
      },
      {
        name: 'Sound of Music Tour',
        desc: 'Tour por las locaciones de la peli. Termina en el Lago Wolfgang.',
        cost: '€60', time: '4h',
        booking: 'Reservar online',
        bookingUrl: 'https://www.panoramatours.com/en/salzburg/the-original-sound-of-music-tour/',
        history: 'La película de 1965 se basa en la familia von Trapp, que escapó del nazismo en 1938 desde Salzburgo. En Austria es prácticamente desconocida — fue un éxito sobre todo en EEUU.',
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
        history: 'Palacio imperial de verano construido en 1696. María Antonieta vivió acá hasta casarse con Luis XVI a los 14 años. Tiene 1.441 habitaciones — solo el 1% es visitable.',
      },
      {
        name: 'Stephansdom',
        desc: 'Catedral gótica. Subir la torre sur (343 escalones) por la mejor vista.',
        cost: 'Gratis · €6 torre', time: '1h', imperdible: true,
        history: 'Catedral del 1147. Su techo de 230.000 tejas coloridas forma el escudo imperial habsburgo en un lado y las armas de Viena del otro.',
      },
      {
        name: 'Café Sacher',
        desc: 'Torta Sacher original (1832) frente a la Ópera. Hay que hacer cola.',
        cost: '€10 (torta + café)', time: '45 min', imperdible: true,
        history: 'Franz Sacher inventó la torta en 1832 con apenas 16 años, como aprendiz en la corte del príncipe Metternich. Su nieto fundó el hotel y café en 1876.',
      },
      {
        name: 'Belvedere (El Beso de Klimt)',
        desc: 'Palacio + museo con la colección de Klimt y Schiele.',
        cost: '€17.5', time: '2h',
        booking: 'Online ahorra cola',
        bookingUrl: 'https://www.belvedere.at/en/tickets',
        history: 'Palacio barroco construido en 1716 para el príncipe Eugenio de Saboya, héroe militar habsburgo. Hoy alberga "El Beso" de Klimt (1908), pintada con láminas de oro auténtico.',
      },
      {
        name: 'Naschmarkt',
        desc: 'Mercado callejero con comida del mundo. Almorzar ahí es plan.',
        cost: 'Gratis (€15 comer)', time: '1-2h',
        history: 'Mercado de Viena desde 1780 — "naschen" significa "picotear dulces" en alemán. Originalmente vendían leche; hoy es la mayor mezcla gastronómica del mundo en la ciudad.',
      },
      {
        name: 'Hofburg & Sisi Museum',
        desc: 'Palacio de invierno de los Habsburgo, con joyas imperiales y aposentos de Sisi.',
        cost: '€19', time: '2h',
        history: 'Residencia imperial Habsburgo durante 600 años (1273-1918). La emperatriz Elisabeth "Sisi" la habitó y la odió — fue asesinada en Ginebra en 1898 por un anarquista.',
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
        history: 'Castillo cuádruple blanco — destruido por un incendio en 1811 y reconstruido en 1953. Los eslovacos lo llaman cariñosamente "la mesa volcada" por su forma.',
      },
      {
        name: 'Staré Mesto (Casco Antiguo)',
        desc: 'Compacto y caminable. Plaza Hlavné námestie es el corazón.',
        cost: 'Gratis', time: '2h', imperdible: true,
        history: 'Bratislava fue capital del Reino de Hungría entre 1536 y 1783, cuando los turcos ocuparon Buda. Once reyes húngaros fueron coronados en la Catedral San Martín.',
      },
      {
        name: 'Čumil ("Man at Work")',
        desc: 'La estatua más fotografiada — un obrero asomado de una alcantarilla.',
        cost: 'Gratis', time: '5 min',
        history: 'Estatua de bronce instalada en 1997 por el escultor Viktor Hulík. Es una sátira a los trabajadores comunistas que "miraban hacia arriba sin hacer nada".',
      },
      {
        name: 'UFO Observation Deck',
        desc: 'Mirador sobre el puente SNP — el más alto de la ciudad.',
        cost: '€10', time: '45 min',
        history: 'Construido sobre el puente Most SNP en 1972 durante la era soviética. Para construirlo demolieron casi todo el barrio judío histórico — una herida abierta para la ciudad.',
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
        history: 'El balneario más grande de Europa, abierto en 1913. El agua brota a 76°C de manantiales geotérmicos a 1.250m de profundidad. Tiene 18 piscinas y 10 saunas.',
      },
      {
        name: 'Parlamento Húngaro',
        desc: 'El edificio neogótico sobre el Danubio. Solo se entra con tour guiado.',
        cost: '€16', time: '45 min', imperdible: true,
        booking: 'Reservar 2-3 semanas antes',
        bookingUrl: 'https://jegymester.hu/eventCategory/35021/parliament-visit',
        history: 'Edificio neogótico de 1904 inspirado en Westminster. Tiene 691 habitaciones, 27 puertas y mide 268m de largo — el tercer parlamento más grande del mundo.',
      },
      {
        name: 'Halászbástya (Bastión de los Pescadores)',
        desc: 'Mirador neogótico sobre el Danubio en el lado Buda. Mágico de noche.',
        cost: 'Gratis (€5 torres altas)', time: '1h', imperdible: true,
        history: 'Bastión neorrománico construido en 1902. Sus 7 torres representan las 7 tribus magiares que fundaron Hungría en el año 895 al llegar desde Asia Central.',
      },
      {
        name: 'Crucero nocturno por el Danubio',
        desc: 'Ver el Parlamento iluminado desde el río. ~1h con copa de bienvenida.',
        cost: '€20', time: '1h',
        booking: 'Reservar online',
        bookingUrl: 'https://www.legenda.hu/en/',
        history: 'El Danubio divide la ciudad en Buda (montañosa) y Pest (plana). Las dos ciudades estuvieron separadas hasta 1873, cuando se unieron oficialmente en Budapest.',
      },
      {
        name: 'Szimpla Kert (ruin bar)',
        desc: 'El primer "ruin bar" — una fábrica abandonada llena de objetos kitsch.',
        cost: 'Entrada gratis (tragos €5)', time: '2h',
        history: 'Primer "ruin bar" del mundo, abierto en 2002 en una fábrica abandonada del barrio judío. Los jóvenes ocupaban edificios bombardeados en la WWII y nunca demolidos en la era soviética.',
      },
      {
        name: 'Mercado Central (Nagy Vásárcsarnok)',
        desc: 'Mercado neogótico. Probar lángos en la planta de arriba.',
        cost: 'Gratis (comer €8)', time: '1h',
        history: 'Inaugurado en 1897 — Gustave Eiffel diseñó parte de la estructura de hierro. Sobrevivió a las dos guerras mundiales y a la era comunista intacto.',
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
        history: 'Encargado por Carlos IV en 1357. La primera piedra se puso el 9-7-1357 a las 5:31, un palíndromo elegido por los astrólogos para dar buena suerte. Funcionó: 670 años después sigue en pie.',
      },
      {
        name: 'Reloj Astronómico (Staroměstský orloj)',
        desc: 'El show de los Doce Apóstoles cada hora en punto, desde 1410.',
        cost: 'Gratis', time: '20 min', imperdible: true,
        history: 'Construido en 1410, es el reloj astronómico medieval más antiguo aún en funcionamiento. Marca el tiempo zodiacal, el calendario cristiano y la posición del sol y la luna.',
      },
      {
        name: 'Pražský hrad (Castillo de Praga)',
        desc: 'El complejo de castillos más grande del mundo. Catedral San Vito imperdible.',
        cost: '€20', time: '3h', imperdible: true,
        history: 'Sede del poder checo desde el siglo IX. Es el complejo de castillos más grande del mundo (récord Guinness) — 70.000 m². Catedral de San Vito albergó la coronación de los reyes de Bohemia.',
      },
      {
        name: 'Josefov (Barrio Judío)',
        desc: 'Sinagogas y el cementerio antiguo más impresionante de Europa.',
        cost: '€20 combo', time: '2h',
        history: 'Barrio judío desde el siglo XIII. Sobrevivió intacto a la WWII porque Hitler quería convertirlo en "museo de una raza extinta" tras el Holocausto. Tiene la sinagoga activa más antigua de Europa (1270).',
      },
      {
        name: 'U Fleků',
        desc: 'Cervecería de 1499. Cerveza negra exclusiva, ambiente medieval.',
        cost: '€15 cena', time: '1.5h',
        history: 'Cervecería en funcionamiento ininterrumpido desde 1499 — más vieja que la conquista de México por Cortés. Hace su propia cerveza negra "Flekovsky lezak 13°", no se vende en otro lado.',
      },
      {
        name: 'Tančící dům (Casa Danzante)',
        desc: 'Edificio deconstructivista de Gehry. Subir al rooftop bar por la vista.',
        cost: 'Gratis exterior', time: '30 min',
        history: 'Diseñada por Frank Gehry y Vlado Milunić en 1996. Se llama "Fred y Ginger" por los bailarines Fred Astaire y Ginger Rogers — las dos torres parecen bailar juntas.',
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
        history: 'La familia Frank se escondió en el "anexo secreto" desde el 6 de julio de 1942 hasta el 4 de agosto de 1944, cuando fueron delatados. Anne murió en Bergen-Belsen a los 15 años.',
      },
      {
        name: 'Rijksmuseum',
        desc: 'Maestros holandeses: La Ronda de Noche de Rembrandt y La Lechera de Vermeer.',
        cost: '€25', time: '3h', imperdible: true,
        booking: 'Reservar día y hora online',
        bookingUrl: 'https://www.rijksmuseum.nl/en/tickets',
        history: 'Inaugurado en 1885. "La Ronda de Noche" de Rembrandt (1642) es la pieza más famosa de Holanda — mide 4 metros y muestra a la guardia cívica de Ámsterdam.',
      },
      {
        name: 'Van Gogh Museum',
        desc: 'La mayor colección de Van Gogh del mundo. 200+ pinturas.',
        cost: '€22', time: '2h', imperdible: true,
        booking: 'Reservar online OBLIGATORIO',
        bookingUrl: 'https://www.vangoghmuseum.nl/en/visit/tickets',
        history: 'Abrió en 1973 con la colección heredada por Theo, hermano de Vincent. Tiene 200 pinturas y 500 dibujos — Van Gogh pintó 900 obras en solo 10 años antes de suicidarse a los 37.',
      },
      {
        name: 'Paseo en barco por los canales',
        desc: 'Los canales son patrimonio UNESCO. Hay tours de día y de noche con luces.',
        cost: '€18-25', time: '1.5h', imperdible: true,
        history: 'Los canales del Siglo de Oro (siglo XVII) son Patrimonio UNESCO. Se construyeron como anillos concéntricos para defensa y comercio — la idea era una "ciudad capitalista perfecta".',
      },
      {
        name: 'Vondelpark',
        desc: 'El Central Park de Amsterdam. Alquilar bici y dar la vuelta.',
        cost: 'Gratis (€10 bici)', time: '2h',
        history: 'Inaugurado en 1865 — recibe 10 millones de visitas al año. Lleva el nombre del poeta Joost van den Vondel (1587-1679), el "Shakespeare holandés".',
      },
      {
        name: 'Jordaan',
        desc: 'Barrio bohemio con galerías, cafés y los nine streets — zona de compras.',
        cost: 'Gratis explorar', time: '2h',
        history: 'Antiguo barrio obrero del siglo XVII para los inmigrantes hugonotes. Los "Nine Streets" (Negen Straatjes) son nueve callecitas de boutiques entre los canales principales.',
      },
    ],
  },

};
