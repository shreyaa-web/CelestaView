const planetData = {
  // 🌍 Planets
  mercury: {
    title: "Mercury",
    fact: "☿ Mercury has no atmosphere to retain heat.",
    description:
      "Mercury is the closest planet to the Sun. It’s dry, cratered, and extremely hot or cold depending on the side facing the Sun.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    source: "https://solarsystem.nasa.gov/planets/mercury/overview/",
  },
  venus: {
    title: "Venus",
    fact: "♀️ Venus spins backward compared to most planets.",
    description:
      "Venus has a crushing atmosphere and surface temperatures hot enough to melt lead. It’s the hottest planet in the solar system.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    source: "https://solarsystem.nasa.gov/planets/venus/overview/",
  },
  earth: {
    title: "Earth",
    fact: "🌍 Earth is the only planet known to support life.",
    description:
      "Earth is a water-rich, oxygen-breathing haven for life, protected by its atmosphere and magnetic field.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
    source: "https://solarsystem.nasa.gov/planets/earth/overview/",
  },
  mars: {
    title: "Mars",
    fact: "🔴 Mars has the largest volcano in the solar system.",
    description:
      "Mars is a dusty red planet with polar ice caps, deep canyons, and a history of water flow.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    source: "https://solarsystem.nasa.gov/planets/mars/overview/",
  },
  jupiter: {
    title: "Jupiter",
    fact: "🪐 Jupiter has at least 92 moons!",
    description:
      "Jupiter is a giant ball of gas with swirling storms, including the iconic Great Red Spot.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
    source: "https://solarsystem.nasa.gov/planets/jupiter/overview/",
  },
  saturn: {
    title: "Saturn",
    fact: "💍 Saturn's rings are made of ice and rock.",
    description:
      "Saturn is a gas giant surrounded by dazzling rings and dozens of moons.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    source: "https://solarsystem.nasa.gov/planets/saturn/overview/",
  },
  uranus: {
    title: "Uranus",
    fact: "🌀 Uranus rotates on its side.",
    description:
      "Uranus has faint rings and a cold, methane-rich atmosphere giving it a pale cyan color.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
    source: "https://solarsystem.nasa.gov/planets/uranus/overview/",
  },
  neptune: {
    title: "Neptune",
    fact: "🔵 Neptune has the fastest winds in the solar system.",
    description:
      "This ice giant is dark, cold, and whipped by winds over 1,200 mph.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
    source: "https://solarsystem.nasa.gov/planets/neptune/overview/",
  },

  // 🌕 Moons
  moon: {
    title: "The Moon",
    fact: "🌕 The Moon is slowly drifting away from Earth.",
    description:
      "Earth’s only natural satellite, the Moon stabilizes our rotation and influences tides.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    source: "https://solarsystem.nasa.gov/moons/earths-moon/overview/",
  },
  europa: {
    title: "Europa",
    fact: "🧊 Europa may have a subsurface ocean beneath its icy crust.",
    description:
      "One of Jupiter’s most intriguing moons, Europa could harbor life beneath its frozen surface.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/Europa-moon.jpg",
    source: "https://solarsystem.nasa.gov/moons/jupiter-moons/europa/overview/",
  },
  titan: {
    title: "Titan",
    fact: "🌑 Titan has lakes of liquid methane.",
    description:
      "Saturn’s largest moon, Titan has a thick atmosphere and weather similar to Earth — but with methane instead of water.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Titan_Cassini.jpg",
    source: "https://solarsystem.nasa.gov/moons/saturn-moons/titan/overview/",
  },
  ganymede: {
    title: "Ganymede",
    fact: "🌕 Ganymede is the largest moon in the solar system.",
    description:
      "Bigger than Mercury, Ganymede has a magnetic field and may hide a deep saltwater ocean.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Ganymede_g1_true-edit1.jpg",
    source:
      "https://solarsystem.nasa.gov/moons/jupiter-moons/ganymede/overview/",
  },

  // 🛰 Artificial Satellites
  iss: {
    title: "International Space Station (ISS)",
    fact: "🛰️ The ISS orbits Earth every 90 minutes.",
    description:
      "The ISS is a multi-national laboratory in low Earth orbit, supporting science and international collaboration.",

    image:
      "https://www.nasa.gov/wp-content/uploads/2023/02/International-Space-Station-in-2021.jpg",
    source: "https://www.nasa.gov/mission_pages/station/main/index.html",
  },
  hubble: {
    title: "Hubble Space Telescope",
    fact: "🔭 Hubble has captured over 1.5 million observations!",
    description:
      "Launched in 1990, Hubble has revealed stunning images of deep space, galaxies, and nebulae.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HST-SM4.jpeg",
    source: "https://www.nasa.gov/mission_pages/hubble/main/index.html",
  },
  // 🪨 Asteroids
  vesta: {
    title: "Vesta",
    fact: "🪨 Vesta is the second-largest asteroid and has its own gravity.",
    description:
      "Discovered in 1807, Vesta is nearly spherical and shows signs of ancient lava flows — making it more like a protoplanet.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Vesta_in_natural_color.jpg",
    source: "https://science.nasa.gov/solar-system/asteroids/4-vesta/",
  },
  pallas: {
    title: "Pallas",
    fact: "🪨 Pallas is the third-largest asteroid and highly tilted in orbit.",
    description:
      "Named after the goddess Pallas Athena, Pallas is irregularly shaped and one of the most massive asteroids in the belt.",
    image: "https://scx2.b-cdn.net/gfx/news/hires/2011/astronomerss.jpg",
    source: "https://en.wikipedia.org/wiki/2_Pallas",
  },
  eros: {
    title: "Eros",
    fact: "💫 Eros was the first asteroid orbited by a spacecraft (NEAR Shoemaker).",
    description:
      "Eros is an elongated asteroid that crosses Mars’s orbit. It was explored up close in 2000–2001.",
    image:
      "https://www.rocketstem.org/wp-content/uploads/2020/01/eros_near.jpg",
    source: "https://en.wikipedia.org/wiki/433_Eros",
  },
  itokawa: {
    title: "Itokawa",
    fact: "🛰️ Itokawa was the first asteroid to be sampled and returned to Earth (by Hayabusa).",
    description:
      "Itokawa is a tiny, peanut-shaped asteroid visited in 2005. It helped scientists study asteroid surfaces.",
    image:
      "https://www.freethink.com/wp-content/uploads/2023/01/rubble-pile-asteroid-1.jpeg?quality=75&w=330",
    source: "https://science.nasa.gov/solar-system/asteroids/25143-itokawa/",
  },
  bennu: {
    title: "Bennu",
    fact: "🧪 NASA brought pieces of Bennu back to Earth in 2023!",
    description:
      "Bennu is a small, ancient asteroid that may one day collide with Earth. OSIRIS-REx collected a sample in 2020.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/BennuAsteroid.jpg",
    source:
      "https://solarsystem.nasa.gov/asteroids-comets-and-meteors/asteroids/101955-bennu/overview/",
  },
  pluto: {
    title: "Pluto",
    fact: "❄️ Pluto was reclassified as a dwarf planet in 2006.",
    description:
      "Pluto is a dwarf planet in the Kuiper Belt. Though small, it has mountains, ice plains, and possibly an underground ocean. It was famously visited by NASA’s New Horizons mission in 2015.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Nh-pluto-in-true-color_2x_JPEG-edit-frame.jpg",
    source:
      "https://solarsystem.nasa.gov/planets/dwarf-planets/pluto/overview/",
  },
};

export default planetData;
