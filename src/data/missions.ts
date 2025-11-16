import falcon9Image from "@/assets/missions/falcon9.jpg";
import jwstImage from "@/assets/missions/jwst.jpg";
import perseveranceImage from "@/assets/missions/perseverance.jpg";
import issImage from "@/assets/missions/iss.jpg";
import chandrayaan3Image from "@/assets/missions/chandrayaan3.jpg";
import rosettaImage from "@/assets/missions/rosetta.jpg";
import tiangongImage from "@/assets/missions/tiangong.jpg";
import hayabusa2Image from "@/assets/missions/hayabusa2.jpg";
import hubbleImage from "@/assets/missions/hubble.jpg";
import ariane5Image from "@/assets/missions/ariane5.jpg";
import soyuzImage from "@/assets/missions/soyuz.jpg";
import voyagerImage from "@/assets/missions/voyager.jpg";
import apollo11Image from "@/assets/missions/apollo11.jpg";
import marsExpressImage from "@/assets/missions/marsexpress.jpg";
import cassiniImage from "@/assets/missions/cassini.jpg";
import newHorizonsImage from "@/assets/missions/newhorizons.jpg";
import junoImage from "@/assets/missions/juno.jpg";
import curiosityImage from "@/assets/missions/curiosity.jpg";
import parkerSolarProbeImage from "@/assets/missions/parkersolarprobe.jpg";
import galileoImage from "@/assets/missions/galileo.jpg";
import dawnImage from "@/assets/missions/dawn.jpg";
import osirisRexImage from "@/assets/missions/osirisrex.jpg";
import europaClipperImage from "@/assets/missions/europaclipper.jpg";
import artemis1Image from "@/assets/missions/artemis1.jpg";
import bepiColomboImage from "@/assets/missions/bepicolombo.jpg";
import lucyImage from "@/assets/missions/lucy.jpg";
import psycheImage from "@/assets/missions/psyche.jpg";
import dragonflyImage from "@/assets/missions/dragonfly.jpg";
import juiceImage from "@/assets/missions/juice.jpg";
import change5Image from "@/assets/missions/change5.jpg";
import insightImage from "@/assets/missions/insight.jpg";
import keplerImage from "@/assets/missions/kepler.jpg";

export interface Component {
  name: string;
  description: string;
  image: string;
  specifications?: {
    dimensions?: string;
    weight?: string;
    material?: string;
    manufacturer?: string;
    power?: string;
    thrust?: string;
    fuel?: string;
    operatingTemp?: string;
  };
  technicalDetails?: string;
}

export interface OrbitalData {
  altitude: number; // km
  inclination: number; // degrees
  period: number; // minutes
  apogee?: number; // km
  perigee?: number; // km
  velocity: number; // km/s
  lastUpdate: string;
}

export interface Trajectory {
  description: string;
  path: string[];
  landingLocation?: string;
  coordinates?: string;
  currentStatus?: string;
  orbitalData?: OrbitalData;
}

export interface Mission {
  id: string;
  name: string;
  agency: string;
  launchDate: string;
  thumbnail: string;
  description: string;
  briefExplanation: string;
  detailedHistory: string;
  images: string[];
  modelType: "rocket" | "satellite" | "rover" | "station" | "probe";
  components: Component[];
  trajectory: Trajectory;
  videos?: {
    launch?: string;
    landing?: string;
    orbit?: string;
    mission?: string;
  };
}

export const missions: Mission[] = [
  {
    id: "falcon-9",
    name: "Falcon 9",
    agency: "SpaceX",
    launchDate: "June 4, 2010",
    thumbnail: falcon9Image,
    description: "A reusable, two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of people and payloads into Earth orbit and beyond.",
    briefExplanation: "SpaceX's Falcon 9 revolutionized spaceflight by being the first orbital-class rocket capable of reflight. The rocket has become the workhorse of commercial spaceflight, launching satellites, cargo, and crew to the International Space Station.",
    detailedHistory: `The Falcon 9 rocket is a game-changer in the aerospace industry. First launched in 2010, it was designed from the ground up with reusability in mind, a concept that was revolutionary at the time.

The rocket consists of two stages: the first stage is powered by nine Merlin engines and is designed to return to Earth and land vertically, either on land or on autonomous drone ships at sea. This reusability has dramatically reduced the cost of access to space.

SpaceX developed Falcon 9 to transport satellites, cargo, and eventually humans to orbit. The rocket has undergone several iterations, with each version improving upon the last. The Falcon 9 Full Thrust (v1.2) introduced in 2015 featured upgraded engines and propellant densification for increased performance.

Key achievements include:
- First privately developed liquid-fuel rocket to reach orbit (2010)
- First private company to send a spacecraft to the ISS (2012)
- First orbital rocket to achieve a propulsive vertical landing (2015)
- First reuse of an orbital rocket (2017)
- First private company to send astronauts to the ISS (2020)

The Falcon 9 has become the most frequently launched rocket in the world, with over 200 successful missions. Its success has paved the way for even more ambitious projects like Starship, SpaceX's next-generation fully reusable launch system.

The rocket's design philosophy emphasizes simplicity, reliability, and reusability. Each Merlin engine can be throttled, allowing for precise control during ascent and landing. The first stage has successfully landed and been reused multiple times, with some boosters flying over 15 missions.`,
    images: [falcon9Image, falcon9Image, falcon9Image, falcon9Image, falcon9Image, falcon9Image, falcon9Image, falcon9Image],
    modelType: "rocket",
    components: [
      {
        name: "Merlin 1D Engines (9x)",
        description: "LOX/RP-1 engines producing 845 kN thrust each at sea level. Features throttle capability and gimbal control for precision guidance. Designed for reusability with robust construction.",
        image: falcon9Image,
        specifications: {
          dimensions: "1.2m diameter x 3m length (each)",
          weight: "470 kg per engine",
          material: "Inconel superalloy turbopump, regeneratively cooled nozzle",
          manufacturer: "SpaceX (Hawthorne, California)",
          thrust: "845 kN (sea level) / 934 kN (vacuum)",
          fuel: "RP-1 (refined kerosene) / LOX (liquid oxygen)",
          operatingTemp: "Combustion chamber: 3,300°C"
        },
        technicalDetails: "The Merlin 1D features a gas generator cycle with a turbopump that runs on a mixture of fuel and oxidizer. Each engine can gimbal up to 5 degrees for steering. The regenerative cooling system circulates cold fuel through channels in the nozzle walls before combustion."
      },
      {
        name: "Grid Fins",
        description: "Titanium lattice fins that deploy during descent to control the booster's orientation and trajectory. Each fin can rotate independently for precise aerodynamic control.",
        image: falcon9Image,
        specifications: {
          dimensions: "1.2m x 1.5m (each fin)",
          weight: "68 kg per fin",
          material: "Single-piece cast and machined titanium",
          manufacturer: "SpaceX",
          operatingTemp: "Withstands re-entry temps up to 1,500°C"
        },
        technicalDetails: "The grid fins use hydraulic actuators for rotation and are designed to survive multiple re-entries. The lattice structure provides excellent aerodynamic control while minimizing weight. Each fin can independently adjust its angle to provide precise steering authority during descent."
      },
      {
        name: "Landing Legs",
        description: "Four carbon fiber/aluminum landing legs that deploy just before touchdown. Each leg is equipped with shock absorbers to cushion the landing impact.",
        image: falcon9Image,
        specifications: {
          dimensions: "Extended span: 18m diameter",
          weight: "~2,100 kg (all four legs)",
          material: "Carbon fiber skin with aluminum honeycomb core",
          manufacturer: "SpaceX",
          power: "Pneumatic deployment system"
        },
        technicalDetails: "The legs deploy using high-pressure helium stored in composite overwrapped pressure vessels (COPVs). Each leg has crushable aluminum honeycomb shock absorbers that can absorb landing loads up to 6g. The legs fold flat against the booster during ascent to minimize drag."
      },
      {
        name: "Interstage",
        description: "Composite structure connecting first and second stages. Houses pneumatic pushers for stage separation and protects the second stage engine during ascent.",
        image: falcon9Image,
        specifications: {
          dimensions: "3.66m diameter x 6m height",
          weight: "~3,000 kg",
          material: "Carbon fiber composite with aluminum fittings",
          manufacturer: "SpaceX"
        },
        technicalDetails: "The interstage contains eight pneumatic pushers that provide the separation force between stages. It also houses the stage separation system, COPVs for pressurant gas, and avionics. The composite structure is designed to handle the loads during max-Q while remaining lightweight."
      },
      {
        name: "MVac Engine (Second Stage)",
        description: "Upper stage engine optimized for vacuum operation. Produces 934 kN thrust and can restart multiple times for complex orbital maneuvers.",
        image: falcon9Image,
        specifications: {
          dimensions: "2.4m diameter nozzle",
          weight: "470 kg",
          material: "Niobium alloy nozzle extension, Inconel turbopump",
          manufacturer: "SpaceX",
          thrust: "934 kN (vacuum)",
          fuel: "RP-1 / LOX",
          operatingTemp: "Chamber: 3,300°C"
        },
        technicalDetails: "The MVac uses a larger nozzle optimized for vacuum operation, achieving higher specific impulse than the Merlin 1D. It features multiple restart capability essential for complex mission profiles. The radiatively cooled nozzle extension made of niobium alloy can withstand extreme temperatures without active cooling."
      }
    ],
    trajectory: {
      description: "Launches from Cape Canaveral or Vandenberg, ascends to target orbit, deploys payload, and returns first stage to landing zone or drone ship.",
      path: ["Launch Complex 39A/40 (Cape Canaveral) or SLC-4E (Vandenberg)", "Max-Q at ~12km altitude", "MECO (Main Engine Cutoff) at ~80km", "Stage Separation", "Boostback Burn", "Entry Burn at ~70km", "Landing Burn", "Touchdown at Landing Zone or Drone Ship"],
      landingLocation: "Landing Zone 1/2 at Cape Canaveral or Drone Ship in Atlantic/Pacific Ocean",
      coordinates: "28.5°N, 80.5°W (Cape Canaveral) or 34.6°N, 120.6°W (Vandenberg)",
      currentStatus: "Active - Multiple launches per month",
      orbitalData: {
        altitude: 400,
        inclination: 51.6,
        period: 92,
        apogee: 420,
        perigee: 380,
        velocity: 7.66,
        lastUpdate: "2025-01-01T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/Z4TXCZG_NEY",
      landing: "https://www.youtube-nocookie.com/embed/ANv5UfZsvZQ",
      orbit: "https://www.youtube-nocookie.com/embed/sX1Y2JMK6g8",
      mission: "https://www.youtube-nocookie.com/embed/A0FZIwabctw"
    }
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    agency: "NASA / ESA / CSA",
    launchDate: "December 25, 2021",
    thumbnail: jwstImage,
    description: "The James Webb Space Telescope (JWST) is a large, space-based observatory optimized for infrared astronomy, designed to study the early universe, galaxy formation, and exoplanets.",
    briefExplanation: "JWST is the successor to the Hubble Space Telescope, featuring a 6.5-meter primary mirror and advanced instruments to observe the universe in infrared wavelengths, allowing it to see through cosmic dust and study distant objects.",
    detailedHistory: `JWST was developed over two decades with international collaboration between NASA, ESA, and CSA. It was launched on an Ariane 5 rocket and positioned at the second Lagrange point (L2), about 1.5 million kilometers from Earth.

The telescope's segmented primary mirror unfolds after launch, and its sunshield deploys to keep instruments cool. JWST's instruments include cameras and spectrographs that cover near- and mid-infrared wavelengths.

JWST aims to answer fundamental questions about the formation of stars and planets, the evolution of galaxies, and the potential for life on exoplanets. Its advanced technology allows it to observe the universe with unprecedented sensitivity and resolution.

Key milestones:
- Launch and successful deployment in 2021
- First images released in 2022 showcasing deep field views
- Ongoing mission to study exoplanet atmospheres and early galaxies`,
    images: [jwstImage, jwstImage, jwstImage, jwstImage, jwstImage],
    modelType: "satellite",
    components: [
      {
        name: "Primary Mirror",
        description: "Segmented 6.5-meter gold-coated beryllium mirror that collects infrared light with high precision.",
        image: jwstImage,
        specifications: {
          dimensions: "6.5m diameter, 18 hexagonal segments",
          weight: "705 kg total mirror mass",
          material: "Beryllium with gold coating (100 nanometers thick)",
          manufacturer: "Ball Aerospace, Northrop Grumman",
          operatingTemp: "-233°C (40 Kelvin)",
          power: "Passive reflective surface"
        },
        technicalDetails: "Each of the 18 hexagonal segments can be individually adjusted with 7 degrees of freedom using micro-actuators. The ultra-thin gold coating optimizes infrared reflection across 0.6 to 28.5 micrometer wavelengths."
      },
      {
        name: "Sunshield",
        description: "Five-layer, tennis-court-sized shield that blocks heat and light from the Sun and Earth to keep instruments cold.",
        image: jwstImage,
        specifications: {
          dimensions: "21.2m x 14.2m when deployed",
          weight: "~250 kg",
          material: "Kapton (polyimide) with aluminum and doped-silicon coatings",
          manufacturer: "Northrop Grumman",
          operatingTemp: "Hot side: +110°C, Cold side: -233°C"
        },
        technicalDetails: "Each layer is separated by vacuum gaps to minimize heat transfer. The hot side faces the Sun, reaching 110°C, while the cold side maintains instruments at -233°C. Temperature differential across layers exceeds 300°C."
      },
      {
        name: "NIRCam (Near-Infrared Camera)",
        description: "Primary imaging instrument providing high-resolution images in near-infrared wavelengths.",
        image: jwstImage,
        specifications: {
          dimensions: "0.5m x 0.5m x 0.5m",
          weight: "39 kg",
          manufacturer: "University of Arizona, Lockheed Martin",
          operatingTemp: "-234°C",
          power: "3 kW peak during observation"
        },
        technicalDetails: "Contains 10 mercury cadmium telluride (HgCdTe) detector arrays with 2.3 megapixels each. Covers wavelengths from 0.6 to 5 micrometers with coronagraph for exoplanet imaging."
      },
      {
        name: "MIRI (Mid-Infrared Instrument)",
        description: "Mid-Infrared imaging and spectroscopy instrument with active cooling system.",
        image: jwstImage,
        specifications: {
          dimensions: "1.1m x 0.9m x 0.9m",
          weight: "167 kg",
          manufacturer: "ESA consortium, NASA JPL",
          operatingTemp: "-266°C (7 Kelvin)",
          power: "Cryocooler: 170W electrical"
        },
        technicalDetails: "Only instrument requiring active cooling via cryocooler to reach 7 Kelvin. Uses arsenic-doped silicon detectors for 5-28 micrometer wavelength range. Includes coronagraph for direct exoplanet imaging."
      }
    ],
    trajectory: {
      description: "Launched from Kourou, French Guiana, on Ariane 5, traveled to L2 orbit where it remains in a stable gravitational point.",
      path: ["Launch from Kourou", "Trans-L2 Injection", "Mid-course corrections", "Orbit insertion at L2"],
      landingLocation: "Orbit around L2 point, 1.5 million km from Earth",
      coordinates: "L2 Lagrange Point",
      currentStatus: "Active - Operational at L2",
      orbitalData: {
        altitude: 1500000,
        inclination: 0,
        period: 525600,
        velocity: 0.05,
        lastUpdate: "2025-01-01T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/7nT7JGZMbtM",
      orbit: "https://www.youtube-nocookie.com/embed/v6ihVeEoUdo",
      mission: "https://www.youtube-nocookie.com/embed/4P8fKd0IVOs"
    }
  },
  {
    id: "perseverance",
    name: "Perseverance Rover",
    agency: "NASA",
    launchDate: "July 30, 2020",
    thumbnail: perseveranceImage,
    description: "Mars rover designed to explore the Jezero Crater on Mars, searching for signs of past microbial life and collecting samples for future return to Earth.",
    briefExplanation: "Perseverance carries advanced scientific instruments, a helicopter drone (Ingenuity), and technology demonstrations to study Mars' geology, climate, and potential habitability.",
    detailedHistory: `Perseverance was launched aboard an Atlas V rocket and landed on Mars in February 2021 using a complex sky crane maneuver.

The rover is equipped with cameras, spectrometers, and environmental sensors to analyze rock and soil samples. It also carries the Ingenuity helicopter, which has performed multiple successful flights, demonstrating powered flight on another planet.

Perseverance's mission includes caching samples for a future Mars sample return mission, studying the planet's climate and geology, and preparing for human exploration.

Key achievements:
- Successful landing in Jezero Crater
- First powered flight on Mars by Ingenuity
- Collection of rock core samples for future return`,
    images: [perseveranceImage, perseveranceImage, perseveranceImage, perseveranceImage, perseveranceImage],
    modelType: "rover",
    components: [
      {
        name: "Mastcam-Z",
        description: "Zoomable stereo camera system for high-resolution imaging and 3D terrain mapping.",
        image: perseveranceImage,
        specifications: {
          dimensions: "28cm x 24cm x 34cm (each camera)",
          weight: "4.2 kg total",
          manufacturer: "Malin Space Science Systems",
          power: "13W during operation",
          operatingTemp: "-55°C to +20°C"
        },
        technicalDetails: "Dual camera system with 3:1 optical zoom capability. Captures 1600x1200 pixel color images with stereoscopic 3D capability. Field of view ranges from 25.6° to 6.2° with zoom."
      },
      {
        name: "SuperCam",
        description: "Multi-functional instrument using laser spectroscopy, cameras, and microphone to analyze Martian geology.",
        image: perseveranceImage,
        specifications: {
          dimensions: "Mast unit: 24cm diameter, Body unit: 22x19x14cm",
          weight: "10.6 kg",
          manufacturer: "LANL (US), IRAP (France)",
          power: "48W peak during laser firing",
          operatingTemp: "-130°C to +50°C"
        },
        technicalDetails: "Fires 1064nm laser pulses to vaporize rock targets up to 7 meters away. Analyzes plasma emission spectra to determine elemental composition. Includes Raman and infrared spectrometers plus the first microphone on Mars."
      },
      {
        name: "Sample Caching System",
        description: "Precision drilling and sample containment system for Mars sample return mission.",
        image: perseveranceImage,
        specifications: {
          dimensions: "Drill: 1m length, Tubes: 13mm diameter x 60mm",
          weight: "45 kg complete system",
          manufacturer: "Maxar Technologies, NASA JPL",
          material: "Titanium sample tubes with hermetic seals"
        },
        technicalDetails: "Can drill up to 60mm into Martian rock with 5mm diameter core samples. Each of 43 sample tubes is hermetically sealed to preserve sample integrity. Automated caching carousel stores tubes for future retrieval."
      },
      {
        name: "Ingenuity Helicopter",
        description: "First aircraft to achieve powered, controlled flight on another planet.",
        image: perseveranceImage,
        specifications: {
          dimensions: "1.2m rotor diameter, 49cm fuselage height",
          weight: "1.8 kg",
          manufacturer: "NASA JPL, AeroVironment",
          power: "350W peak, lithium-ion batteries charged by solar",
          operatingTemp: "-90°C to +30°C"
        },
        technicalDetails: "Coaxial counter-rotating rotors spin at ~2400 RPM to generate lift in Mars' 1% Earth atmosphere. Autonomous flight computer navigates using visual odometry. Solar panel charges six lithium-ion batteries during Martian day."
      }
    ],
    trajectory: {
      description: "Launched from Cape Canaveral, traveled through interplanetary space, and landed in Jezero Crater on Mars.",
      path: ["Launch from Cape Canaveral", "Cruise phase", "Mars atmospheric entry", "Parachute descent", "Sky crane landing", "Surface operations in Jezero Crater"],
      landingLocation: "Jezero Crater, Mars",
      coordinates: "18.4447°N, 77.4508°E",
      currentStatus: "Active - Surface operations ongoing"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/rzmd7RouGrM",
      landing: "https://www.youtube-nocookie.com/embed/4czjS9h4Fpg",
      mission: "https://www.youtube-nocookie.com/embed/tH2tKigOPBU"
    }
  },
  {
    id: "iss",
    name: "International Space Station",
    agency: "NASA / Roscosmos / ESA / JAXA / CSA",
    launchDate: "November 20, 1998",
    thumbnail: issImage,
    description: "A modular space station in low Earth orbit serving as a microgravity and space environment research laboratory.",
    briefExplanation: "The ISS is a multinational collaborative project that supports scientific research, technology development, and international cooperation in space.",
    detailedHistory: `The ISS was assembled in orbit over multiple missions starting in 1998. It consists of pressurized modules, solar arrays, and docking ports.

The station supports a rotating crew of astronauts conducting experiments in biology, physics, astronomy, and other fields. It also serves as a testbed for technologies needed for long-duration human spaceflight.

Key milestones:
- First module launched in 1998
- Continuous human presence since November 2000
- Over 240 spacewalks conducted
- Hosting international crews from multiple space agencies`,
    images: [issImage, issImage, issImage, issImage, issImage],
    modelType: "station",
    components: [
      {
        name: "Zarya Module",
        description: "First ISS module providing propulsion, power generation, and cargo storage.",
        image: issImage,
        specifications: {
          dimensions: "12.6m length x 4.1m diameter",
          weight: "19,323 kg",
          manufacturer: "Khrunichev State Research and Production Space Center (Russia)",
          power: "3 kW from two solar arrays",
          material: "Aluminum alloy pressure hull"
        },
        technicalDetails: "Features 16 external fuel tanks holding 6 tons of propellant. Two solar arrays generate power and charge six nickel-cadmium batteries. Contains 24 large and 12 small steering jets for attitude control."
      },
      {
        name: "Destiny Laboratory",
        description: "US laboratory module hosting science experiments in microgravity.",
        image: issImage,
        specifications: {
          dimensions: "8.5m length x 4.3m diameter",
          weight: "14,515 kg",
          manufacturer: "Boeing, NASA",
          material: "Aluminum with multi-layer insulation",
          power: "24 kW from station solar arrays"
        },
        technicalDetails: "Contains 24 International Standard Payload Racks for experiments. Features five nadir and two zenith optical quality windows. Life support includes air revitalization and temperature/humidity control systems."
      },
      {
        name: "Solar Array Wings",
        description: "Eight deployable solar array wings providing primary station power.",
        image: issImage,
        specifications: {
          dimensions: "73m wingspan, 34m length each wing",
          weight: "~1,090 kg per wing",
          manufacturer: "Lockheed Martin, Boeing Spectrolab",
          power: "120 kW total (240 kW peak)",
          material: "Silicon solar cells on flexible blankets"
        },
        technicalDetails: "Each wing has 32,800 solar cells. Arrays rotate to track the Sun via Sequential Shunt Unit and Beta Gimbal Assembly. Power stored in nickel-hydrogen batteries for eclipse periods (35 minutes per 92-minute orbit)."
      },
      {
        name: "Canadarm2",
        description: "17-meter robotic manipulator for assembly, maintenance, and berthing operations.",
        image: issImage,
        specifications: {
          dimensions: "17.6m length when fully extended",
          weight: "1,800 kg",
          manufacturer: "MacDonald Dettwiler (MDA), Canadian Space Agency",
          power: "2.5 kW average, 15 kW peak",
          material: "Titanium alloy and carbon fiber composite"
        },
        technicalDetails: "Seven motorized joints provide seven degrees of freedom. Can handle payloads up to 116,000 kg with precision positioning within 2cm. Both ends can attach to the station, allowing 'inchworm' movement between power data grapple fixtures."
      }
    ],
    trajectory: {
      description: "Orbiting Earth at approximately 408 km altitude with an orbital period of about 92 minutes.",
      path: ["Low Earth Orbit", "Inclination 51.6°", "Altitude ~408 km", "Orbit period ~92 minutes"],
      landingLocation: "N/A - Continuous orbit",
      coordinates: "Orbiting Earth",
      currentStatus: "Active - Continuous human presence",
      orbitalData: {
        altitude: 408,
        inclination: 51.6,
        period: 92,
        apogee: 416,
        perigee: 400,
        velocity: 7.66,
        lastUpdate: "2025-01-01T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/xow9qX0MLbs",
      orbit: "https://www.youtube-nocookie.com/embed/DDU-rZs-Ic4",
      mission: "https://www.youtube-nocookie.com/embed/NtrVwX1ncqk"
    }
  },
  {
    id: "chandrayaan-3",
    name: "Chandrayaan-3",
    agency: "ISRO",
    launchDate: "July 14, 2023",
    thumbnail: chandrayaan3Image,
    description: "India's third lunar exploration mission focused on demonstrating safe landing and rover operations on the Moon's surface.",
    briefExplanation: "Chandrayaan-3 consists of a lander and rover designed to explore the lunar south pole region, conduct scientific experiments, and demonstrate precision landing technology.",
    detailedHistory: `Following the partial success of Chandrayaan-2, Chandrayaan-3 was developed to achieve a successful soft landing on the Moon.

The mission includes a lander named Vikram and a rover named Pragyan. The rover carries instruments to analyze lunar soil and surface composition.

Key achievements:
- Successful soft landing near lunar south pole
- Deployment of rover for surface exploration
- Collection of scientific data on lunar geology and environment`,
    images: [chandrayaan3Image, chandrayaan3Image, chandrayaan3Image, chandrayaan3Image],
    modelType: "rover",
    components: [
      {
        name: "Vikram Lander",
        description: "Lander module equipped with landing legs, sensors, and communication systems for soft touchdown.",
        image: chandrayaan3Image
      },
      {
        name: "Pragyan Rover",
        description: "Six-wheeled rover carrying instruments for surface analysis and exploration.",
        image: chandrayaan3Image
      },
      {
        name: "Propulsion System",
        description: "Thrusters and engines for descent and landing maneuvers.",
        image: chandrayaan3Image
      }
    ],
    trajectory: {
      description: "Launched from Sriharikota, traveled to lunar orbit, and performed descent to lunar surface near south pole.",
      path: ["Launch from Sriharikota", "Trans-lunar injection", "Lunar orbit insertion", "Powered descent", "Soft landing near south pole"],
      landingLocation: "Lunar South Pole region",
      coordinates: "Approx. 69.37°S, 32.35°E",
      currentStatus: "Active - Surface operations ongoing"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/P-DfLGOCKe8",
      landing: "https://www.youtube-nocookie.com/embed/HL7_VEjB06g",
      mission: "https://www.youtube-nocookie.com/embed/mWT8M8BbdZk"
    }
  },
  {
    id: "rosetta",
    name: "Rosetta",
    agency: "ESA",
    launchDate: "March 2, 2004",
    thumbnail: rosettaImage,
    description: "ESA's comet orbiter mission to study comet 67P/Churyumov–Gerasimenko in unprecedented detail.",
    briefExplanation: "Rosetta was the first spacecraft to orbit a comet and deploy a lander (Philae) on its surface, providing valuable data on comet composition and behavior.",
    detailedHistory: `Rosetta's journey included multiple gravity assists and a long cruise phase before arriving at comet 67P in 2014.

The mission studied the comet's nucleus, coma, and tail, revealing insights into the early solar system and the role of comets in delivering water and organic molecules to Earth.

Philae lander performed the first-ever soft landing on a comet, though with limited success due to anchoring issues.

Key achievements:
- First comet orbiter
- First soft landing on a comet
- Detailed analysis of cometary composition and activity`,
    images: [rosettaImage, rosettaImage, rosettaImage, rosettaImage],
    modelType: "probe",
    components: [
      {
        name: "Orbiter",
        description: "Main spacecraft equipped with cameras, spectrometers, and instruments for comet study.",
        image: rosettaImage
      },
      {
        name: "Philae Lander",
        description: "Small lander designed to perform surface analysis and measurements on the comet.",
        image: rosettaImage
      },
      {
        name: "Solar Arrays",
        description: "Large solar panels providing power during the mission.",
        image: rosettaImage
      }
    ],
    trajectory: {
      description: "Complex trajectory with Earth and Mars gravity assists, rendezvous with comet 67P, and orbit insertion.",
      path: ["Launch from Kourou", "Earth gravity assists", "Mars gravity assist", "Comet rendezvous and orbit", "Philae landing"],
      landingLocation: "Comet 67P/Churyumov–Gerasimenko",
      coordinates: "Orbiting comet nucleus",
      currentStatus: "Mission ended - spacecraft deactivated"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/ETlXN13fTqY",
      landing: "https://www.youtube-nocookie.com/embed/gH6mN8tGu5A",
      mission: "https://www.youtube-nocookie.com/embed/32vlOgN_3QQ"
    }
  },
  {
    id: "tiangong",
    name: "Tiangong Space Station",
    agency: "CNSA",
    launchDate: "April 29, 2021",
    thumbnail: tiangongImage,
    description: "China's modular space station designed for long-term human habitation and scientific research in low Earth orbit.",
    briefExplanation: "Tiangong serves as a platform for experiments in microgravity, Earth observation, and technology demonstrations, supporting China's ambitions in human spaceflight.",
    detailedHistory: `The station's core module, Tianhe, was launched in 2021, followed by laboratory modules Wentian and Mengtian.

Tiangong supports crewed missions with astronauts conducting scientific experiments and station maintenance.

The station is expected to operate for at least 10 years, with international cooperation opportunities.

Key milestones:
- Launch of core module Tianhe
- Successful docking of multiple crewed missions
- Deployment of scientific payloads and experiments`,
    images: [tiangongImage, tiangongImage, tiangongImage, tiangongImage],
    modelType: "station",
    components: [
      {
        name: "Tianhe Core Module",
        description: "Provides life support, living quarters, and control systems for the station.",
        image: tiangongImage
      },
      {
        name: "Wentian Laboratory Module",
        description: "Supports scientific experiments and extravehicular activities.",
        image: tiangongImage
      },
      {
        name: "Mengtian Laboratory Module",
        description: "Additional laboratory space and cargo storage.",
        image: tiangongImage
      },
      {
        name: "Robotic Arm",
        description: "Used for assembly, maintenance, and payload handling.",
        image: tiangongImage
      }
    ],
    trajectory: {
      description: "Orbiting Earth in low Earth orbit with an inclination of 41.5 degrees.",
      path: ["Launch from Wenchang", "Orbit insertion", "Module docking and assembly", "Crewed missions and operations"],
      landingLocation: "N/A - Continuous orbit",
      coordinates: "Low Earth Orbit",
      currentStatus: "Active - Operational"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/2Y2oS-BeqFQ",
      orbit: "https://www.youtube-nocookie.com/embed/zz5xPiC_TAg",
      mission: "https://www.youtube-nocookie.com/embed/PyNd_0IxeJM"
    }
  },
  {
    id: "hayabusa2",
    name: "Hayabusa2",
    agency: "JAXA",
    launchDate: "December 3, 2014",
    thumbnail: hayabusa2Image,
    description: "Japanese asteroid sample-return mission targeting asteroid Ryugu to study its composition and origins.",
    briefExplanation: "Hayabusa2 collected surface and subsurface samples from Ryugu and returned them to Earth, providing insights into the early solar system and organic compounds.",
    detailedHistory: `Hayabusa2 arrived at asteroid Ryugu in 2018, conducted detailed mapping, and deployed small rovers and landers.

It performed two touchdown operations to collect samples, including a subsurface sample using an impactor.

The spacecraft returned samples to Earth in December 2020, marking a major milestone in asteroid exploration.

Key achievements:
- First sample return from a C-type asteroid
- Deployment of rovers and landers on asteroid surface
- Detailed analysis of asteroid composition`,
    images: [hayabusa2Image, hayabusa2Image, hayabusa2Image, hayabusa2Image],
    modelType: "probe",
    components: [
      {
        name: "Sample Collection Mechanism",
        description: "Device to collect surface and subsurface material from the asteroid.",
        image: hayabusa2Image
      },
      {
        name: "MINERVA-II Rovers",
        description: "Small rovers deployed to explore the asteroid surface.",
        image: hayabusa2Image
      },
      {
        name: "SCI Impactor",
        description: "Small explosive device to create a crater for subsurface sampling.",
        image: hayabusa2Image
      }
    ],
    trajectory: {
      description: "Launched from Tanegashima Space Center, traveled to asteroid Ryugu, orbited and sampled, then returned to Earth.",
      path: ["Launch from Tanegashima", "Cruise to Ryugu", "Asteroid orbit and operations", "Sample collection", "Return to Earth"],
      landingLocation: "Sample return capsule landed in Australia",
      coordinates: "Landing site: Woomera Prohibited Area, Australia",
      currentStatus: "Mission completed - samples delivered"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/Y94V0wkV6KU",
      landing: "https://www.youtube-nocookie.com/embed/YjOzV-PrQ8U",
      mission: "https://www.youtube-nocookie.com/embed/CUAUbDDJf8A"
    }
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope",
    agency: "NASA / ESA",
    launchDate: "April 24, 1990",
    thumbnail: hubbleImage,
    description: "A space-based observatory that has provided unprecedented views of the universe in visible, ultraviolet, and near-infrared light.",
    briefExplanation: "Hubble has revolutionized astronomy by capturing high-resolution images and spectra, enabling discoveries about galaxies, black holes, and the expansion of the universe.",
    detailedHistory: `Hubble was launched aboard the Space Shuttle Discovery and deployed into low Earth orbit.

Initial optical flaws were corrected by a servicing mission installing corrective optics.

Over its decades of operation, Hubble has been serviced multiple times by astronauts, extending its life and capabilities.

Key achievements:
- Determination of the Hubble constant
- Imaging of distant galaxies and nebulae
- Discovery of exoplanet atmospheres
- Observations of dark energy effects`,
    images: [hubbleImage, hubbleImage, hubbleImage, hubbleImage],
    modelType: "satellite",
    components: [
      {
        name: "Primary Mirror",
        description: "2.4-meter diameter mirror that collects light for imaging and spectroscopy.",
        image: hubbleImage,
        specifications: {
          dimensions: "2.4m diameter",
          weight: "828 kg",
          material: "Ultra-low expansion glass",
          manufacturer: "Perkin-Elmer",
          operatingTemp: "-100°C to +10°C"
        },
        technicalDetails: "The primary mirror is coated with a thin layer of aluminum and magnesium fluoride to enhance reflectivity across ultraviolet, visible, and near-infrared wavelengths."
      },
      {
        name: "Wide Field Camera 3",
        description: "Main imaging instrument covering ultraviolet to near-infrared wavelengths.",
        image: hubbleImage,
        specifications: {
          dimensions: "1.4m x 0.9m x 0.5m",
          weight: "364 kg",
          manufacturer: "Ball Aerospace",
          power: "187 W",
          operatingTemp: "-55°C to +5°C"
        },
        technicalDetails: "WFC3 has two channels: UVIS (200-1000nm) and IR (850-1700nm), enabling observations from ultraviolet through near-infrared wavelengths."
      },
      {
        name: "Cosmic Origins Spectrograph",
        description: "Instrument for ultraviolet spectroscopy to study the intergalactic medium.",
        image: hubbleImage,
        specifications: {
          weight: "378 kg",
          manufacturer: "Ball Aerospace",
          power: "162 W"
        }
      }
    ],
    trajectory: {
      description: "Orbiting Earth at approximately 547 km altitude with an orbital period of about 96 minutes.",
      path: ["Launch from Kennedy Space Center", "Deployment in low Earth orbit", "Servicing missions", "Continuous observations"],
      landingLocation: "N/A - Continuous orbit",
      coordinates: "Low Earth Orbit",
      currentStatus: "Active - Operational",
      orbitalData: {
        altitude: 547,
        inclination: 28.5,
        period: 96,
        apogee: 559,
        perigee: 535,
        velocity: 7.59,
        lastUpdate: new Date().toISOString()
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/avP5d16wEp0",
      orbit: "https://www.youtube-nocookie.com/embed/YX5kRU9QLPw",
      mission: "https://www.youtube-nocookie.com/embed/1FO78K7Nw_k"
    }
  },
  {
    id: "ariane-5",
    name: "Ariane 5",
    agency: "ESA / Arianespace",
    launchDate: "June 4, 1996",
    thumbnail: ariane5Image,
    description: "Heavy-lift launch vehicle designed to deliver payloads to geostationary transfer orbit and low Earth orbit.",
    briefExplanation: "Ariane 5 has been a reliable launcher for commercial satellites, scientific missions, and interplanetary probes, known for its high payload capacity and precision.",
    detailedHistory: `Ariane 5 was developed to replace Ariane 4, featuring a cryogenic main stage and solid rocket boosters.

It has launched numerous payloads including telecommunications satellites, the James Webb Space Telescope, and the Rosetta probe.

The vehicle has undergone several upgrades to increase payload capacity and reliability.

Key achievements:
- Launch of the James Webb Space Telescope
- Deployment of multiple commercial and scientific satellites
- High success rate with over 100 launches`,
    images: [ariane5Image, ariane5Image, ariane5Image, ariane5Image],
    modelType: "rocket",
    components: [
      {
        name: "Main Cryogenic Stage",
        description: "Powered by the Vulcain engine using liquid hydrogen and liquid oxygen.",
        image: ariane5Image
      },
      {
        name: "Solid Rocket Boosters",
        description: "Two large boosters providing additional thrust during liftoff.",
        image: ariane5Image
      },
      {
        name: "Upper Stage",
        description: "Cryogenic upper stage for payload insertion into target orbit.",
        image: ariane5Image
      }
    ],
    trajectory: {
      description: "Launches from Kourou, French Guiana, to deliver payloads to geostationary transfer orbit or low Earth orbit.",
      path: ["Launch from Kourou", "Booster separation", "Main stage burn", "Upper stage ignition", "Payload deployment"],
      landingLocation: "N/A - Upper stage disposal in orbit or controlled reentry",
      coordinates: "Launch site: 5.239°N, 52.768°W",
      currentStatus: "Active - Regular launches"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/CCKY3YZL5xo",
      mission: "https://www.youtube-nocookie.com/embed/7nT7JGZMbtM"
    }
  },
  {
    id: "soyuz",
    name: "Soyuz",
    agency: "Roscosmos",
    launchDate: "November 28, 1966",
    thumbnail: soyuzImage,
    description: "A family of Russian expendable launch vehicles used for crewed and uncrewed missions to low Earth orbit.",
    briefExplanation: "Soyuz rockets have been the backbone of Russian spaceflight for decades, launching astronauts to the ISS and deploying satellites.",
    detailedHistory: `The Soyuz launch vehicle evolved from the R-7 ICBM and has been in continuous use since the 1960s.

It has launched thousands of missions, including crewed flights, cargo resupply, and satellite deployments.

The Soyuz spacecraft launched atop the rocket is used for crew transport to the ISS.

Key achievements:
- Longest operational launch vehicle in history
- Reliable crewed transport to ISS
- Numerous satellite and interplanetary missions`,
    images: [soyuzImage, soyuzImage, soyuzImage, soyuzImage],
    modelType: "rocket",
    components: [
      {
        name: "Core Stage",
        description: "Central stage with RD-108A engine providing main thrust.",
        image: soyuzImage
      },
      {
        name: "Four Boosters",
        description: "Strap-on boosters with RD-107A engines providing additional thrust at liftoff.",
        image: soyuzImage
      },
      {
        name: "Upper Stage",
        description: "Fifth stage for orbital insertion and payload deployment.",
        image: soyuzImage
      }
    ],
    trajectory: {
      description: "Launches from Baikonur Cosmodrome to low Earth orbit, often to the ISS.",
      path: ["Launch from Baikonur", "Booster separation", "Core stage burn", "Upper stage ignition", "Payload deployment"],
      landingLocation: "N/A - Payload orbit insertion",
      coordinates: "Launch site: 45.6°N, 63.3°E",
      currentStatus: "Active - Regular launches"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/TMGJkC7loVY",
      mission: "https://www.youtube-nocookie.com/embed/I_Qr7_qOF8k"
    }
  },
  {
    id: "voyager",
    name: "Voyager 1",
    agency: "NASA",
    launchDate: "September 5, 1977",
    thumbnail: voyagerImage,
    description: "Interstellar probe launched to study the outer planets and now traveling beyond the solar system.",
    briefExplanation: "Voyager 1 provided detailed images and data of Jupiter and Saturn, and is the farthest human-made object from Earth, sending data from interstellar space.",
    detailedHistory: `Voyager 1 was launched as part of the Voyager program to take advantage of a rare planetary alignment.

It conducted flybys of Jupiter and Saturn, discovering new moons, rings, and atmospheric phenomena.

After completing its primary mission, Voyager 1 continued on a trajectory out of the solar system, crossing the heliopause in 2012.

Key achievements:
- First detailed images of outer planets
- Discovery of active volcanism on Io
- Crossing into interstellar space`,
    images: [voyagerImage, voyagerImage, voyagerImage, voyagerImage],
    modelType: "probe",
    components: [
      {
        name: "Imaging Science System",
        description: "Cameras for visible light imaging of planets and moons.",
        image: voyagerImage,
        specifications: {
          weight: "38 kg",
          manufacturer: "JPL",
          power: "8.5 W",
          operatingTemp: "-30°C to +30°C"
        }
      },
      {
        name: "Plasma Spectrometer",
        description: "Instrument to study solar wind and plasma environment.",
        image: voyagerImage,
        specifications: {
          weight: "9.9 kg",
          manufacturer: "MIT",
          power: "5.4 W"
        }
      },
      {
        name: "Radioisotope Thermoelectric Generator",
        description: "Power source using decay of plutonium-238 to generate electricity.",
        image: voyagerImage,
        specifications: {
          weight: "56 kg",
          manufacturer: "DOE/Teledyne",
          power: "470 W (at launch)",
          fuel: "Plutonium-238 oxide"
        },
        technicalDetails: "Three RTGs provide electrical power through thermoelectric conversion, currently producing about 249 watts after 45+ years of operation."
      }
    ],
    trajectory: {
      description: "Launched from Cape Canaveral, performed gravity assists at Jupiter and Saturn, now traveling through interstellar space.",
      path: ["Launch from Cape Canaveral", "Jupiter flyby", "Saturn flyby", "Heliopause crossing", "Interstellar trajectory"],
      landingLocation: "N/A - Deep space",
      coordinates: "Currently over 150 AU from Earth",
      currentStatus: "Active - Transmitting data"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/znRpipDNTtc",
      mission: "https://www.youtube-nocookie.com/embed/1FO78K7Nw_k"
    }
  },
  {
    id: "apollo-11",
    name: "Apollo 11",
    agency: "NASA",
    launchDate: "July 16, 1969",
    thumbnail: apollo11Image,
    description: "First crewed mission to land on the Moon, achieving a historic milestone in human space exploration.",
    briefExplanation: "Apollo 11 carried astronauts Neil Armstrong, Buzz Aldrin, and Michael Collins to lunar orbit, with Armstrong and Aldrin landing on the Moon's surface.",
    detailedHistory: `Apollo 11 launched atop the Saturn V rocket from Kennedy Space Center.

The Lunar Module Eagle separated from the Command Module Columbia and descended to the Moon's Sea of Tranquility.

Neil Armstrong became the first human to step onto the lunar surface, followed by Buzz Aldrin.

The mission returned safely to Earth, fulfilling President Kennedy's goal of landing a man on the Moon before the decade's end.

Key achievements:
- First human Moon landing
- Collection of lunar samples
- Deployment of scientific instruments on lunar surface`,
    images: [apollo11Image, apollo11Image, apollo11Image, apollo11Image],
    modelType: "rocket",
    components: [
      {
        name: "Saturn V Rocket",
        description: "Three-stage heavy-lift launch vehicle used to send Apollo spacecraft to the Moon.",
        image: apollo11Image
      },
      {
        name: "Command Module",
        description: "Crew cabin for three astronauts, reentry vehicle for Earth return.",
        image: apollo11Image
      },
      {
        name: "Lunar Module",
        description: "Two-stage vehicle for lunar descent and ascent.",
        image: apollo11Image
      }
    ],
    trajectory: {
      description: "Launch from Earth, translunar injection, lunar orbit insertion, lunar landing, ascent, and Earth return.",
      path: ["Launch from Kennedy Space Center", "Translunar injection", "Lunar orbit insertion", "Lunar descent and landing", "Lunar ascent", "Earth return trajectory", "Splashdown in Pacific Ocean"],
      landingLocation: "Pacific Ocean",
      coordinates: "0.6741°N, 23.4729°E (Sea of Tranquility landing site)",
      currentStatus: "Completed - Historic mission"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/cwZb2mqId0A",
      landing: "https://www.youtube-nocookie.com/embed/S9HdPi9Ikhk",
      mission: "https://www.youtube-nocookie.com/embed/VPMwq-YJlcU"
    }
  },
  {
    id: "mars-express",
    name: "Mars Express",
    agency: "ESA",
    launchDate: "June 2, 2003",
    thumbnail: marsExpressImage,
    description: "ESA's Mars orbiter mission to study the planet's atmosphere, surface, and subsurface.",
    briefExplanation: "Mars Express carries a suite of instruments including a high-resolution camera and radar to analyze Mars' geology and search for water ice.",
    detailedHistory: `Mars Express was launched on a Soyuz-FG rocket and entered Mars orbit in late 2003.

The mission has provided detailed maps of the Martian surface, detected subsurface ice, and studied atmospheric phenomena.

It also deployed the Beagle 2 lander, which unfortunately failed to fully deploy on the surface.

Key achievements:
- High-resolution imaging of Mars
- Detection of subsurface water ice
- Atmospheric studies`,
    images: [marsExpressImage, marsExpressImage, marsExpressImage, marsExpressImage],
    modelType: "satellite",
    components: [
      {
        name: "High Resolution Stereo Camera",
        description: "Captures detailed images of Mars' surface in stereo and color.",
        image: marsExpressImage
      },
      {
        name: "MARSIS Radar",
        description: "Penetrates surface to detect subsurface water and ice.",
        image: marsExpressImage
      },
      {
        name: "SPICAM Spectrometer",
        description: "Analyzes atmospheric composition and aerosols.",
        image: marsExpressImage
      }
    ],
    trajectory: {
      description: "Launched from Baikonur, entered Mars orbit for long-term scientific observations.",
      path: ["Launch from Baikonur", "Cruise to Mars", "Mars orbit insertion", "Orbital science operations"],
      landingLocation: "N/A - Orbital mission",
      coordinates: "Mars orbit",
      currentStatus: "Active - Operational"
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/uREthRUKTM0",
      orbit: "https://www.youtube-nocookie.com/embed/oFvGz_EZ3ZE",
      mission: "https://www.youtube-nocookie.com/embed/P0pAZqwNlAw"
    }
  },
  {
    id: "cassini",
    name: "Cassini-Huygens",
    agency: "NASA / ESA / ASI",
    launchDate: "October 15, 1997",
    thumbnail: cassiniImage,
    description: "A flagship mission to study Saturn, its rings, moons, and magnetosphere, including the Huygens probe landing on Titan.",
    briefExplanation: "Cassini orbited Saturn for 13 years, providing detailed data on the planet's system and deploying the Huygens probe to Titan's surface.",
    detailedHistory: `Cassini was launched on a Titan IVB/Centaur rocket and arrived at Saturn in 2004.

The mission revealed complex ring structures, active geysers on Enceladus, and detailed Titan surface features.

Huygens probe performed the first landing on Titan, sending back images and data.

Cassini ended its mission with a controlled plunge into Saturn's atmosphere in 2017.

Key achievements:
- Extensive study of Saturn system
- Discovery of water plumes on Enceladus
- Titan surface exploration by Huygens`,
    images: [cassiniImage, cassiniImage, cassiniImage, cassiniImage],
    modelType: "probe",
    components: [
      {
        name: "Orbiter Bus",
        description: "Main spacecraft structure housing propulsion, power, and communications systems.",
        image: cassiniImage,
        specifications: {
          dimensions: "6.8m x 4.0m body",
          weight: "2,523 kg dry mass",
          material: "Aluminum honeycomb structure",
          manufacturer: "NASA JPL / Lockheed Martin",
          power: "885W from 3 RTGs",
          operatingTemp: "-180°C to +50°C"
        },
        technicalDetails: "High-gain 4-meter antenna for Earth communication. Attitude control via reaction wheels and thrusters. Dual-mode propulsion system with 445N main engine."
      },
      {
        name: "Huygens Probe",
        description: "European-built atmospheric entry probe that landed on Titan's surface in 2005.",
        image: cassiniImage,
        specifications: {
          dimensions: "2.7m diameter",
          weight: "318 kg",
          material: "Composite aeroshell with ablative heat shield",
          manufacturer: "ESA / Thales Alenia Space",
          power: "5 lithium batteries (1,800 Wh total)",
          operatingTemp: "-180°C to +150°C during entry"
        },
        technicalDetails: "Three-stage parachute system. Six science instruments including cameras, spectrometers, and atmospheric sensors. Survived 2.5 hours on Titan's surface."
      },
      {
        name: "Imaging Science Subsystem (ISS)",
        description: "Dual camera system with narrow and wide-angle capabilities for detailed Saturn imaging.",
        image: cassiniImage,
        specifications: {
          dimensions: "Narrow: 50cm, Wide: 45cm length",
          weight: "57.8 kg total",
          manufacturer: "NASA JPL / CICLOPS",
          power: "51W combined",
          operatingTemp: "-50°C to +50°C"
        },
        technicalDetails: "Narrow-angle: 2048x2048 CCD, 6° FOV. Wide-angle: 1024x1024 CCD, 3.5° FOV. Spectral filters from UV to near-IR."
      },
      {
        name: "Radioisotope Thermoelectric Generators",
        description: "Three plutonium-238 RTGs providing continuous power throughout the 20-year mission.",
        image: cassiniImage,
        specifications: {
          dimensions: "1.14m length x 0.42m diameter each",
          weight: "57 kg each (171 kg total)",
          material: "Silicon-germanium thermocouples",
          manufacturer: "US Department of Energy",
          power: "885W at launch, 633W at end of mission",
          fuel: "32.7 kg plutonium-238 dioxide"
        },
        technicalDetails: "General Purpose Heat Source design. 18 modules per RTG. 7% conversion efficiency. Provided power beyond Saturn where solar panels are ineffective."
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, gravity assists at Venus, Earth, and Jupiter, orbit insertion at Saturn.",
      path: ["Launch from Cape Canaveral", "Venus flybys", "Earth flyby", "Jupiter flyby", "Saturn orbit insertion", "Orbital operations", "Grand Finale plunge"],
      landingLocation: "N/A - Controlled atmospheric entry into Saturn",
      coordinates: "Saturn orbit",
      currentStatus: "Completed - Mission ended 2017",
      orbitalData: {
        altitude: 1427000000,
        inclination: 0,
        period: 10560,
        apogee: 9000000,
        perigee: 200000,
        velocity: 9.6,
        lastUpdate: "2017-09-15T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/kLD-AJM-5cQ",
      mission: "https://www.youtube-nocookie.com/embed/xrGAQCq9BMU",
      orbit: "https://www.youtube-nocookie.com/embed/LXshrGDFJs4"
    }
  },
  {
    id: "new-horizons",
    name: "New Horizons",
    agency: "NASA",
    launchDate: "January 19, 2006",
    thumbnail: newHorizonsImage,
    description: "First mission to Pluto and the Kuiper Belt, providing close-up images and data of these distant objects.",
    briefExplanation: "New Horizons performed a historic flyby of Pluto in 2015, revealing a complex and geologically active world, and continues to explore Kuiper Belt objects.",
    detailedHistory: `New Horizons was launched on an Atlas V rocket and performed a gravity assist at Jupiter.

The spacecraft conducted a flyby of Pluto and its moons, sending back high-resolution images and scientific data.

It then continued into the Kuiper Belt, performing a flyby of Arrokoth in 2019.

The mission provides insights into the outer solar system's formation and evolution.

Key achievements:
- First close-up images of Pluto
- Discovery of diverse geology and atmosphere on Pluto
- Exploration of Kuiper Belt objects`,
    images: [newHorizonsImage, newHorizonsImage, newHorizonsImage, newHorizonsImage],
    modelType: "probe",
    components: [
      {
        name: "Ralph Instrument",
        description: "Visible and infrared imager/spectrometer for surface composition and temperature mapping.",
        image: newHorizonsImage,
        specifications: {
          dimensions: "40cm x 20cm x 15cm",
          weight: "10.5 kg",
          manufacturer: "NASA Goddard / Ball Aerospace",
          power: "7.1W",
          operatingTemp: "-130°C to +40°C"
        },
        technicalDetails: "MVIC visible camera: 5,024 x 32 pixel TDI CCD arrays. LEISA IR spectrometer: 256x256 HgCdTe array, 1.25-2.5μm spectral range. Pan resolution: 76m/pixel at Pluto."
      },
      {
        name: "Alice UV Spectrometer",
        description: "Ultraviolet imaging spectrometer analyzing atmospheric composition and structure.",
        image: newHorizonsImage,
        specifications: {
          dimensions: "45cm x 12cm x 15cm",
          weight: "4.5 kg",
          manufacturer: "Southwest Research Institute",
          power: "4.5W",
          operatingTemp: "-50°C to +50°C"
        },
        technicalDetails: "Wavelength range: 52-187 nm. Off-axis telescope with 4° x 0.1° FOV. Microchannel plate detector. Spectral resolution: 1.8-5.4 Å."
      },
      {
        name: "REX Radio Science Experiment",
        description: "Radio science instrument measuring atmospheric properties via radio occultation.",
        image: newHorizonsImage,
        specifications: {
          dimensions: "Integrated with communications system",
          weight: "Share of 12 kg telecom mass",
          manufacturer: "Johns Hopkins APL / Stanford",
          power: "4.5W during operations",
          operatingTemp: "-20°C to +50°C"
        },
        technicalDetails: "Uses 2.1m high-gain antenna. X-band uplink receiver. Measures atmospheric temperature, pressure profiles. Also serves as passive radiometer."
      },
      {
        name: "RTG Power System",
        description: "Single radioisotope thermoelectric generator providing 200+ watts for the mission.",
        image: newHorizonsImage,
        specifications: {
          dimensions: "1.14m length x 0.42m diameter",
          weight: "57 kg",
          material: "Silicon-germanium thermocouples",
          manufacturer: "US Department of Energy",
          power: "240W at launch, 200W at Pluto",
          fuel: "11 kg plutonium-238 dioxide"
        },
        technicalDetails: "GPHS-RTG design with 18 heat source modules. Essential for operation beyond Jupiter where solar power is insufficient. 6.3% conversion efficiency."
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, Jupiter gravity assist, flyby of Pluto and Kuiper Belt objects.",
      path: ["Launch from Cape Canaveral", "Jupiter flyby", "Pluto flyby", "Kuiper Belt exploration"],
      landingLocation: "N/A - Flyby mission",
      coordinates: "Currently in Kuiper Belt, ~50+ AU from Sun",
      currentStatus: "Active - Extended mission",
      orbitalData: {
        altitude: 7500000000000,
        inclination: 2.45,
        period: 0,
        velocity: 13.78,
        lastUpdate: "2025-01-01T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/aEuFhcUUUZo",
      mission: "https://www.youtube-nocookie.com/embed/P_YJEhLFKhg",
      orbit: "https://www.youtube-nocookie.com/embed/qYP7EYSjG_s"
    }
  },
  {
    id: "juno",
    name: "Juno",
    agency: "NASA",
    launchDate: "August 5, 2011",
    thumbnail: junoImage,
    description: "A mission to study Jupiter's composition, gravity field, magnetic field, and polar magnetosphere.",
    briefExplanation: "Juno orbits Jupiter in a highly elliptical orbit, providing data to understand the planet's formation and structure.",
    detailedHistory: `Juno was launched on an Atlas V rocket and arrived at Jupiter in 2016.

The spacecraft uses solar power, the farthest for any solar-powered mission.

It has provided detailed maps of Jupiter's magnetic and gravity fields, revealing insights into its core and atmospheric dynamics.

Key achievements:
- Mapping of Jupiter's magnetic field
- Discovery of complex polar cyclones
- Insights into Jupiter's internal structure`,
    images: [junoImage, junoImage, junoImage, junoImage],
    modelType: "probe",
    components: [
      {
        name: "JunoCam",
        description: "Visible-light color camera designed for public outreach, capturing stunning Jupiter imagery.",
        image: junoImage,
        specifications: {
          dimensions: "30cm x 30cm x 20cm",
          weight: "29 kg including electronics",
          manufacturer: "Malin Space Science Systems",
          power: "13W during imaging",
          operatingTemp: "-55°C to +10°C"
        },
        technicalDetails: "Four-color filter wheel (RGB + methane band). 1600x1200 pixel Kodak KAI-2020 interline CCD. 58° FOV. Push-frame imaging synchronized with spin."
      },
      {
        name: "MAG Magnetometer",
        description: "Dual fluxgate and scalar magnetometers mapping Jupiter's powerful magnetic field.",
        image: junoImage,
        specifications: {
          dimensions: "Two sensors on 3.5m and 12m booms",
          weight: "15 kg total",
          manufacturer: "NASA Goddard",
          power: "9W",
          operatingTemp: "-180°C to +60°C"
        },
        technicalDetails: "FGM: ±1600 Gauss range, 0.05 nT resolution. ASC: Absolute scalar accuracy. Mounted on booms to minimize spacecraft interference. Vector & magnitude measurements."
      },
      {
        name: "Gravity Science System",
        description: "Precision tracking system using X-band and Ka-band to measure Jupiter's gravity field.",
        image: junoImage,
        specifications: {
          dimensions: "Integrated with spacecraft telecom",
          weight: "Part of 55 kg telecom mass",
          manufacturer: "NASA JPL / Italian Space Agency",
          power: "50W transmission",
          operatingTemp: "-20°C to +50°C"
        },
        technicalDetails: "Doppler tracking accurate to 0.01 mm/s. Reveals internal mass distribution. Ka-band: 32 GHz downlink for higher precision. Maps gravitational harmonics."
      },
      {
        name: "Solar Array System",
        description: "Three massive solar panels providing 486 watts at Jupiter - farthest solar-powered mission.",
        image: junoImage,
        specifications: {
          dimensions: "Each wing: 8.9m x 2.7m (60 m² total)",
          weight: "340 kg total",
          material: "Triple-junction GaAs solar cells",
          manufacturer: "Spectrolab / Lockheed Martin",
          power: "486W at Jupiter, 12,900W at Earth",
          operatingTemp: "-180°C to +110°C"
        },
        technicalDetails: "11 solar panels with 18,698 individual solar cells. 50% power degradation from radiation. First outer solar system mission using solar power instead of RTGs."
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, Earth flyby gravity assist, Jupiter orbit insertion.",
      path: ["Launch from Cape Canaveral", "Earth flyby", "Jupiter orbit insertion", "Science orbits"],
      landingLocation: "N/A - Orbiting Jupiter",
      coordinates: "Jupiter polar orbit",
      currentStatus: "Active - Science operations ongoing",
      orbitalData: {
        altitude: 778000000,
        inclination: 90,
        period: 3180,
        apogee: 8100000,
        perigee: 4200,
        velocity: 48.4,
        lastUpdate: "2025-01-01T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/K-P_Y3LLL-E",
      mission: "https://www.youtube-nocookie.com/embed/sJqyod7rW-M",
      orbit: "https://www.youtube-nocookie.com/embed/uj3Lq7Gu94Y"
    }
  },
  {
    id: "curiosity",
    name: "Curiosity Rover",
    agency: "NASA",
    launchDate: "November 26, 2011",
    thumbnail: curiosityImage,
    description: "Mars rover designed to explore Gale Crater and assess Mars' habitability.",
    briefExplanation: "Curiosity carries a suite of scientific instruments to analyze rock, soil, and atmosphere, searching for signs of past life.",
    detailedHistory: `Curiosity was launched on an Atlas V rocket and landed on Mars in August 2012 using a sky crane.

The rover has traversed diverse terrain, analyzing samples and sending back high-resolution images.

It has discovered evidence of ancient lakes and organic molecules.

Key achievements:
- Successful landing and extended mission duration
- Detection of organic compounds
- Analysis of Martian climate and geology`,
    images: [curiosityImage, curiosityImage, curiosityImage, curiosityImage],
    modelType: "rover",
    components: [
      {
        name: "ChemCam (Chemistry and Camera)",
        description: "Laser-induced breakdown spectroscopy instrument for remote elemental analysis up to 7 meters away.",
        image: curiosityImage,
        specifications: {
          dimensions: "Mast unit: 38cm x 35cm, Body unit: 22cm x 19cm",
          weight: "10.0 kg",
          manufacturer: "Los Alamos National Lab / IRAP France",
          power: "39W during laser operation",
          operatingTemp: "-40°C to +40°C"
        },
        technicalDetails: "Infrared laser: 1067 nm, 14 mJ pulses. Vaporizes rock samples. Spectrometer: 240-850 nm, 6,144 channels. RMI telescope: 1024x1024 pixel resolution."
      },
      {
        name: "SAM (Sample Analysis at Mars)",
        description: "Sophisticated laboratory analyzing organic compounds, gases, and isotope ratios in samples.",
        image: curiosityImage,
        specifications: {
          dimensions: "55cm x 47cm x 37cm",
          weight: "40 kg - largest instrument on rover",
          manufacturer: "NASA Goddard",
          power: "84W average, 166W peak",
          operatingTemp: "Ovens heat to 1,000°C"
        },
        technicalDetails: "Gas chromatograph, mass spectrometer, tunable laser spectrometer. 74 sample cups. Detects organic molecules down to parts-per-billion. Isotope ratio measurements."
      },
      {
        name: "Mast Camera (Mastcam)",
        description: "Dual high-resolution color cameras with zoom capability for scientific imaging.",
        image: curiosityImage,
        specifications: {
          dimensions: "Each camera: 28cm x 24cm x 34cm",
          weight: "5.8 kg total",
          manufacturer: "Malin Space Science Systems",
          power: "13W during imaging",
          operatingTemp: "-55°C to +40°C"
        },
        technicalDetails: "Left: 34mm lens, 15° FOV. Right: 100mm lens, 5.1° FOV. 1600x1200 pixels. 8 filter positions. 720p HD video at 10fps. True color imaging."
      },
      {
        name: "MMRTG (Multi-Mission RTG)",
        description: "Plutonium-238 power source providing continuous 110 watts for extended Mars operations.",
        image: curiosityImage,
        specifications: {
          dimensions: "66cm diameter x 64cm height",
          weight: "45 kg",
          material: "PbTe thermocouples",
          manufacturer: "US Department of Energy / Teledyne",
          power: "110W electrical at start of mission",
          fuel: "4.8 kg plutonium-238 dioxide"
        },
        technicalDetails: "8 GPHS modules. Generates 2,000W thermal, converts to 110W electrical. 6.3% efficiency. Enables operation during Martian night and winter. 14-year design life."
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, cruise to Mars, atmospheric entry, and sky crane landing in Gale Crater.",
      path: ["Launch from Cape Canaveral", "Cruise phase", "Mars atmospheric entry", "Sky crane landing", "Surface operations"],
      landingLocation: "Gale Crater, Mars",
      coordinates: "4.5895°S, 137.4417°E",
      currentStatus: "Active - Surface operations ongoing",
      orbitalData: {
        altitude: 0,
        inclination: 0,
        period: 0,
        velocity: 0,
        lastUpdate: "2025-01-01T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/P4boyXQuUIw",
      landing: "https://www.youtube-nocookie.com/embed/P4boyXQuUIw",
      mission: "https://www.youtube-nocookie.com/embed/gZX5GRPnd4U"
    }
  },
  {
    id: "parker-solar-probe",
    name: "Parker Solar Probe",
    agency: "NASA",
    launchDate: "August 12, 2018",
    thumbnail: parkerSolarProbeImage,
    description: "A mission to study the outer corona of the Sun by flying closer than any previous spacecraft.",
    briefExplanation: "Parker Solar Probe collects data on solar wind, magnetic fields, and energetic particles to understand solar activity and space weather.",
    detailedHistory: `Parker Solar Probe was launched on a Delta IV Heavy rocket.

It uses Venus gravity assists to gradually decrease its perihelion, flying within 6 million km of the Sun's surface.

The spacecraft is protected by a heat shield to withstand extreme temperatures.

Key achievements:
- Closest approach to the Sun by any spacecraft
- New insights into solar wind acceleration
- Measurements of solar magnetic fields`,
    images: [parkerSolarProbeImage, parkerSolarProbeImage, parkerSolarProbeImage, parkerSolarProbeImage],
    modelType: "probe",
    components: [
      {
        name: "Thermal Protection System (TPS)",
        description: "Revolutionary 11.43 cm thick carbon-composite heat shield withstanding 1,377°C temperatures.",
        image: parkerSolarProbeImage,
        specifications: {
          dimensions: "2.3m diameter shield",
          weight: "73 kg",
          material: "Carbon-carbon composite with white ceramic coating",
          manufacturer: "Johns Hopkins APL / Carbon-Carbon Advanced Technologies",
          operatingTemp: "Front: 1,377°C, Back: 30°C",
          power: "Passive thermal protection"
        },
        technicalDetails: "Two carbon foam core layers sandwiched between carbon fiber face sheets. White alumina coating reflects heat. Creates 1,300°C temperature gradient. Protects spacecraft from 500,000 W/m² solar intensity."
      },
      {
        name: "FIELDS Electric and Magnetic Suite",
        description: "Five antennas measuring electric fields, magnetic fields, radio emissions, and shock waves.",
        image: parkerSolarProbeImage,
        specifications: {
          dimensions: "4 whip antennas: 2m each, 1 search coil on 1m boom",
          weight: "14 kg electronics + antennas",
          manufacturer: "UC Berkeley",
          power: "10W",
          operatingTemp: "Electronics: -10°C to +50°C, Antennas: up to 1,300°C"
        },
        technicalDetails: "Measures DC to 20 MHz electric fields. Fluxgate magnetometer: ±65,536 nT range. Search coil: 10 Hz to 50 kHz. Samples at 2 million samples/second during bursts."
      },
      {
        name: "WISPR (Wide-field Imager)",
        description: "Telescopic imaging system capturing visible-light images of solar corona, solar wind, and shocks.",
        image: parkerSolarProbeImage,
        specifications: {
          dimensions: "Two telescopes in 40cm x 25cm package",
          weight: "8.9 kg",
          manufacturer: "Naval Research Laboratory",
          power: "9W during imaging",
          operatingTemp: "-80°C to +50°C"
        },
        technicalDetails: "Inner telescope: 40° FOV. Outer telescope: 58° FOV. 2048x1920 pixel APS detectors. Radiation-hardened optics. Images coronal structures and CMEs."
      },
      {
        name: "Solar Array Cooling System",
        description: "Active water cooling system keeping solar arrays functional despite extreme solar proximity.",
        image: parkerSolarProbeImage,
        specifications: {
          dimensions: "Two arrays: 1.55m² total (retractable)",
          weight: "Solar arrays: 50 kg",
          material: "Silicon solar cells with sapphire glass",
          manufacturer: "Spectrolab",
          power: "384W generation at perihelion",
          operatingTemp: "Arrays maintained at 160°C max via cooling"
        },
        technicalDetails: "Circulating deionized water as coolant. Titanium-niobium tubing. Arrays retract as spacecraft nears Sun. Radiators dissipate excess heat. First spacecraft with active solar array cooling."
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, multiple Venus gravity assists to approach the Sun closely.",
      path: ["Launch from Cape Canaveral", "Venus gravity assists", "Perihelion passes near Sun", "Data collection orbits"],
      landingLocation: "N/A - Solar orbit",
      coordinates: "Solar orbit with perihelion ~6.2 million km",
      currentStatus: "Active - Science operations ongoing",
      orbitalData: {
        altitude: 6200000,
        inclination: 3.4,
        period: 5400,
        apogee: 108000000,
        perigee: 6200000,
        velocity: 176,
        lastUpdate: "2025-01-01T00:00:00Z"
      }
    },
    videos: {
      launch: "https://www.youtube-nocookie.com/embed/f79IXMTbkMQ",
      mission: "https://www.youtube-nocookie.com/embed/ykHNZKs0x-0",
      orbit: "https://www.youtube-nocookie.com/embed/NlJh4flAQKo"
    }
  },
  {
    id: "galileo",
    name: "Galileo",
    agency: "NASA",
    launchDate: "October 18, 1989",
    thumbnail: galileoImage,
    description: "Mission to study Jupiter and its moons, including atmospheric entry probe and orbital observations.",
    briefExplanation: "Galileo provided detailed data on Jupiter's atmosphere, magnetosphere, and moons, including evidence of subsurface oceans on Europa.",
    detailedHistory: `Galileo was launched on Space Shuttle Atlantis and deployed by an Inertial Upper Stage.

It arrived at Jupiter in 1995, releasing an atmospheric probe and entering orbit.

The mission lasted until 2003, ending with a controlled descent into Jupiter to avoid contaminating moons.

Key achievements:
- First atmospheric probe into Jupiter
- Discovery of Europa's subsurface ocean
- Extensive magnetosphere studies`,
    images: [galileoImage, galileoImage, galileoImage, galileoImage],
    modelType: "probe",
    components: [
      {
        name: "Orbiter",
        description: "Main spacecraft with instruments for imaging, magnetometry, and atmospheric studies.",
        image: galileoImage
      },
      {
        name: "Atmospheric Probe",
        description: "Entered Jupiter's atmosphere to measure composition and structure.",
        image: galileoImage
      },
      {
        name: "High-Gain Antenna",
        description: "Used for high-rate data transmission to Earth.",
        image: galileoImage
      }
    ],
    trajectory: {
      description: "Launch from Shuttle, deployment, cruise to Jupiter, orbit insertion, atmospheric probe release.",
      path: ["Launch from Shuttle Atlantis", "Inertial Upper Stage deployment", "Cruise to Jupiter", "Jupiter orbit insertion", "Atmospheric probe entry", "Orbital operations", "Controlled descent"],
      landingLocation: "Jupiter atmosphere",
      coordinates: "Jupiter orbit",
      currentStatus: "Completed - Mission ended 2003"
    }
  },
  {
    id: "dawn",
    name: "Dawn",
    agency: "NASA",
    launchDate: "September 27, 2007",
    thumbnail: dawnImage,
    description: "Mission to study two of the three known protoplanets in the asteroid belt: Vesta and Ceres.",
    briefExplanation: "Dawn orbited Vesta and Ceres, providing detailed images and data on their composition, geology, and history.",
    detailedHistory: `Dawn was launched on a Delta II rocket and used ion propulsion to travel between Vesta and Ceres.

It was the first spacecraft to orbit two extraterrestrial bodies.

The mission revealed Vesta's differentiated structure and Ceres' water-ice and cryovolcanic features.

Key achievements:
- First dual-orbit mission of two solar system bodies
- Discovery of water ice and organic materials on Ceres
- Detailed mapping of Vesta's surface`,
    images: [dawnImage, dawnImage, dawnImage, dawnImage],
    modelType: "probe",
    components: [
      {
        name: "Ion Propulsion System",
        description: "Efficient electric propulsion enabling extended mission and multiple orbits.",
        image: dawnImage
      },
      {
        name: "Framing Camera",
        description: "High-resolution imaging system for surface mapping.",
        image: dawnImage
      },
      {
        name: "Gamma Ray and Neutron Detector",
        description: "Measures elemental composition of surface materials.",
        image: dawnImage
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, cruise to Vesta, orbit, then cruise to Ceres and orbit.",
      path: ["Launch from Cape Canaveral", "Cruise to Vesta", "Vesta orbit", "Cruise to Ceres", "Ceres orbit"],
      landingLocation: "N/A - Orbital mission",
      coordinates: "Asteroid belt orbits",
      currentStatus: "Completed - Mission ended 2018"
    }
  },
  {
    id: "osiris-rex",
    name: "OSIRIS-REx",
    agency: "NASA",
    launchDate: "September 8, 2016",
    thumbnail: osirisRexImage,
    description: "Mission to study near-Earth asteroid Bennu and return samples to Earth.",
    briefExplanation: "OSIRIS-REx mapped Bennu's surface, collected samples, and returned them to Earth for analysis of organic materials and solar system history.",
    detailedHistory: `OSIRIS-REx was launched on an Atlas V rocket and arrived at Bennu in 2018.

The spacecraft performed detailed mapping and selected a sample site.

In 2020, it collected surface material using a touch-and-go maneuver.

The sample return capsule landed on Earth in 2023.

Key achievements:
- Detailed asteroid mapping
- Successful sample collection and return
- Insights into organic compounds and solar system formation`,
    images: [osirisRexImage, osirisRexImage, osirisRexImage, osirisRexImage],
    modelType: "probe",
    components: [
      {
        name: "TAGSAM",
        description: "Touch-and-Go Sample Acquisition Mechanism for collecting surface material.",
        image: osirisRexImage
      },
      {
        name: "OCAMS",
        description: "Camera suite for imaging and navigation.",
        image: osirisRexImage
      },
      {
        name: "OLA",
        description: "Laser altimeter for detailed surface mapping.",
        image: osirisRexImage
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, cruise to Bennu, orbit, sample collection, and Earth return.",
      path: ["Launch from Cape Canaveral", "Cruise to Bennu", "Bennu orbit", "Sample collection", "Earth return trajectory", "Sample capsule landing"],
      landingLocation: "Utah Test and Training Range, USA",
      coordinates: "37.1°N, 113.0°W",
      currentStatus: "Completed - Sample returned 2023"
    }
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    agency: "NASA",
    launchDate: "Planned 2024",
    thumbnail: europaClipperImage,
    description: "Upcoming mission to study Jupiter's moon Europa, focusing on its ice shell and subsurface ocean.",
    briefExplanation: "Europa Clipper will perform multiple flybys to analyze the moon's habitability and search for signs of life.",
    detailedHistory: `Europa Clipper is scheduled for launch in 2024.

The spacecraft will carry instruments to study ice thickness, ocean depth, surface composition, and geology.

It aims to understand the potential for life in Europa's ocean.

Key planned objectives:
- Map ice shell and subsurface ocean
- Analyze surface composition
- Study geology and potential plumes`,
    images: [europaClipperImage, europaClipperImage, europaClipperImage],
    modelType: "probe",
    components: [
      {
        name: "Ice Penetrating Radar",
        description: "Instrument to measure ice thickness and detect subsurface water.",
        image: europaClipperImage
      },
      {
        name: "Thermal Instrument",
        description: "Measures surface temperature variations.",
        image: europaClipperImage
      },
      {
        name: "Mass Spectrometer",
        description: "Analyzes composition of surface and exosphere.",
        image: europaClipperImage
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, cruise to Jupiter, multiple flybys of Europa.",
      path: ["Planned launch", "Cruise to Jupiter", "Jupiter orbit insertion", "Multiple Europa flybys"],
      landingLocation: "N/A - Orbital mission",
      coordinates: "Jupiter orbit",
      currentStatus: "Planned - Awaiting launch"
    }
  },
  {
    id: "artemis-1",
    name: "Artemis 1",
    agency: "NASA",
    launchDate: "November 16, 2022",
    thumbnail: artemis1Image,
    description: "Uncrewed test flight of NASA's Space Launch System (SLS) and Orion spacecraft around the Moon.",
    briefExplanation: "Artemis 1 tested the integrated systems for future crewed lunar missions, including deep space navigation and reentry.",
    detailedHistory: `Artemis 1 launched from Kennedy Space Center on the SLS rocket.

The Orion spacecraft performed a lunar flyby and returned to Earth after a 25.5-day mission.

The mission validated spacecraft systems and ground operations.

Key achievements:
- First flight of SLS rocket
- Successful lunar flyby and return
- Data collection for Artemis program`,
    images: [artemis1Image, artemis1Image, artemis1Image],
    modelType: "rocket",
    components: [
      {
        name: "Space Launch System (SLS)",
        description: "Heavy-lift rocket designed for deep space missions.",
        image: artemis1Image
      },
      {
        name: "Orion Spacecraft",
        description: "Crew capsule designed for lunar missions and beyond.",
        image: artemis1Image
      },
      {
        name: "Service Module",
        description: "Provides propulsion, power, and life support systems.",
        image: artemis1Image
      }
    ],
    trajectory: {
      description: "Launch from Kennedy Space Center, translunar injection, lunar flyby, and Earth return.",
      path: ["Launch from Kennedy Space Center", "Translunar injection", "Lunar flyby", "Earth return trajectory", "Splashdown"],
      landingLocation: "Pacific Ocean",
      coordinates: "Splashdown site approx. 15°N, 165°W",
      currentStatus: "Completed - Test flight successful"
    }
  },
  {
    id: "bepi-colombo",
    name: "BepiColombo",
    agency: "ESA / JAXA",
    launchDate: "October 20, 2018",
    thumbnail: bepiColomboImage,
    description: "Joint mission to Mercury to study its composition, geophysics, atmosphere, and magnetosphere.",
    briefExplanation: "BepiColombo consists of two orbiters studying Mercury's environment and surface in detail.",
    detailedHistory: `BepiColombo was launched on an Ariane 5 rocket.

It uses multiple gravity assists at Earth, Venus, and Mercury to reach orbit.

The mission aims to understand Mercury's formation and magnetic field.

Key objectives:
- Map Mercury's surface and composition
- Study magnetic field and exosphere
- Investigate internal structure`,
    images: [bepiColomboImage, bepiColomboImage, bepiColomboImage],
    modelType: "probe",
    components: [
      {
        name: "Mercury Planetary Orbiter",
        description: "ESA orbiter focusing on surface and exosphere studies.",
        image: bepiColomboImage
      },
      {
        name: "Mercury Magnetospheric Orbiter",
        description: "JAXA orbiter studying Mercury's magnetosphere.",
        image: bepiColomboImage
      },
      {
        name: "Solar Electric Propulsion",
        description: "Ion thrusters for trajectory corrections and orbit insertion.",
        image: bepiColomboImage
      }
    ],
    trajectory: {
      description: "Launch from Kourou, multiple gravity assists, orbit insertion at Mercury.",
      path: ["Launch from Kourou", "Earth gravity assist", "Venus gravity assists", "Mercury orbit insertion"],
      landingLocation: "N/A - Orbital mission",
      coordinates: "Mercury orbit",
      currentStatus: "Active - En route to Mercury orbit insertion"
    }
  },
  {
    id: "lucy",
    name: "Lucy",
    agency: "NASA",
    launchDate: "October 16, 2021",
    thumbnail: lucyImage,
    description: "Mission to study the Trojan asteroids orbiting near Jupiter, remnants of early solar system formation.",
    briefExplanation: "Lucy will perform flybys of multiple Trojan asteroids, providing insights into their composition and history.",
    detailedHistory: `Lucy was launched on an Atlas V rocket.

It will visit seven Trojan asteroids over 12 years.

The mission aims to understand the diversity and origins of these primitive bodies.

Key goals:
- Map surface geology and composition
- Study asteroid interiors and morphology
- Understand solar system formation processes`,
    images: [lucyImage, lucyImage, lucyImage],
    modelType: "probe",
    components: [
      {
        name: "L'LORRI Camera",
        description: "High-resolution visible imager for surface mapping.",
        image: lucyImage
      },
      {
        name: "L'TES Thermal Emission Spectrometer",
        description: "Measures surface temperature and composition.",
        image: lucyImage
      },
      {
        name: "Radio Science Experiment",
        description: "Uses spacecraft radio signals to study asteroid mass and gravity.",
        image: lucyImage
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, Earth gravity assists, multiple asteroid flybys.",
      path: ["Launch from Cape Canaveral", "Earth gravity assists", "Flybys of Trojan asteroids"],
      landingLocation: "N/A - Flyby mission",
      coordinates: "Solar orbit",
      currentStatus: "Active - En route to asteroid flybys"
    }
  },
  {
    id: "psyche",
    name: "Psyche",
    agency: "NASA",
    launchDate: "October 13, 2023",
    thumbnail: psycheImage,
    description: "Mission to explore the metallic asteroid 16 Psyche, believed to be the exposed core of a protoplanet.",
    briefExplanation: "Psyche will study the asteroid's composition, magnetic field, and geology to understand planetary core formation.",
    detailedHistory: `Psyche was launched on a Falcon Heavy rocket.

It will use solar electric propulsion and gravity assists to reach the asteroid.

The mission will provide first-ever close-up observations of a metallic asteroid.

Key objectives:
- Map surface composition and morphology
- Measure magnetic field and gravity
- Understand planetary differentiation processes`,
    images: [psycheImage, psycheImage, psycheImage],
    modelType: "probe",
    components: [
      {
        name: "Multispectral Imager",
        description: "Camera system for detailed surface imaging in multiple wavelengths.",
        image: psycheImage
      },
      {
        name: "Gamma Ray and Neutron Spectrometer",
        description: "Measures elemental composition of the asteroid's surface.",
        image: psycheImage
      },
      {
        name: "Magnetometer",
        description: "Detects magnetic field to infer core properties.",
        image: psycheImage
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, Earth gravity assist, cruise to asteroid 16 Psyche.",
      path: ["Launch from Cape Canaveral", "Earth gravity assist", "Cruise to Psyche", "Asteroid orbit insertion"],
      landingLocation: "N/A - Orbital mission",
      coordinates: "Asteroid 16 Psyche orbit",
      currentStatus: "Active - En route to asteroid"
    }
  },
  {
    id: "dragonfly",
    name: "Dragonfly",
    agency: "NASA",
    launchDate: "Planned 2027",
    thumbnail: dragonflyImage,
    description: "A rotorcraft lander mission to explore Titan's surface and atmosphere.",
    briefExplanation: "Dragonfly will fly to multiple locations on Titan, studying prebiotic chemistry and habitability.",
    detailedHistory: `Dragonfly is scheduled for launch in 2027.

It will use a multi-rotor drone design to fly across Titan's diverse environments.

The mission aims to understand organic chemistry and potential for life.

Key planned objectives:
- Study surface composition and atmospheric processes
- Search for chemical precursors to life
- Explore diverse geological settings`,
    images: [dragonflyImage, dragonflyImage, dragonflyImage],
    modelType: "rover",
    components: [
      {
        name: "Rotorcraft",
        description: "Eight-rotor drone capable of vertical takeoff and landing on Titan.",
        image: dragonflyImage
      },
      {
        name: "Mass Spectrometer",
        description: "Analyzes surface and atmospheric samples.",
        image: dragonflyImage
      },
      {
        name: "Meteorology Sensors",
        description: "Measures atmospheric conditions and weather patterns.",
        image: dragonflyImage
      }
    ],
    trajectory: {
      description: "Launch from Earth, cruise to Saturn, entry into Titan orbit, and surface operations.",
      path: ["Planned launch", "Cruise to Saturn", "Titan orbit insertion", "Surface deployment and flight operations"],
      landingLocation: "Titan surface",
      coordinates: "Titan equatorial region",
      currentStatus: "Planned - Awaiting launch"
    }
  },
  {
    id: "juice",
    name: "JUICE",
    agency: "ESA",
    launchDate: "April 14, 2023",
    thumbnail: juiceImage,
    description: "Jupiter Icy Moons Explorer mission to study Ganymede, Callisto, and Europa.",
    briefExplanation: "JUICE will investigate the moons' potential habitability and subsurface oceans.",
    detailedHistory: `JUICE was launched on an Ariane 5 rocket.

It will perform multiple flybys and orbit Ganymede.

The mission will study the moons' ice shells, oceans, and geology.

Key objectives:
- Characterize subsurface oceans
- Study surface and atmosphere interactions
- Understand magnetospheric environment`,
    images: [juiceImage, juiceImage, juiceImage],
    modelType: "probe",
    components: [
      {
        name: "Radar Sounder",
        description: "Penetrates ice to study subsurface ocean layers.",
        image: juiceImage
      },
      {
        name: "Spectrometers",
        description: "Analyze surface composition and atmosphere.",
        image: juiceImage
      },
      {
        name: "Magnetometer",
        description: "Measures magnetic fields around moons.",
        image: juiceImage
      }
    ],
    trajectory: {
      description: "Launch from Kourou, gravity assists, orbit insertion at Jupiter, and moon flybys.",
      path: ["Launch from Kourou", "Earth and Venus gravity assists", "Jupiter orbit insertion", "Moon flybys and Ganymede orbit"],
      landingLocation: "N/A - Orbital mission",
      coordinates: "Jupiter system",
      currentStatus: "Active - En route to Jupiter"
    }
  },
  {
    id: "change-5",
    name: "Chang'e 5",
    agency: "CNSA",
    launchDate: "November 23, 2020",
    thumbnail: change5Image,
    description: "Chinese lunar sample return mission to collect and return lunar soil and rock samples.",
    briefExplanation: "Chang'e 5 successfully landed on the Moon, collected samples, and returned them to Earth, marking China's first sample return mission.",
    detailedHistory: `Chang'e 5 launched on a Long March 5 rocket.

The mission included a lander, ascent vehicle, orbiter, and return capsule.

Samples were collected using a drill and scoop.

The return capsule landed safely in Inner Mongolia.

Key achievements:
- First lunar sample return since 1976
- Demonstrated complex sample collection and return technology
- Advanced China's lunar exploration capabilities`,
    images: [change5Image, change5Image, change5Image],
    modelType: "rover",
    components: [
      {
        name: "Lander",
        description: "Performed soft landing and sample collection on lunar surface.",
        image: change5Image
      },
      {
        name: "Ascent Vehicle",
        description: "Launched from lunar surface to rendezvous with orbiter.",
        image: change5Image
      },
      {
        name: "Return Capsule",
        description: "Returned samples safely to Earth.",
        image: change5Image
      }
    ],
    trajectory: {
      description: "Launch from Earth, lunar orbit insertion, landing, sample collection, ascent, rendezvous, and Earth return.",
      path: ["Launch from Earth", "Lunar orbit insertion", "Lunar landing", "Sample collection", "Ascent and rendezvous", "Earth return trajectory", "Landing in Inner Mongolia"],
      landingLocation: "Siziwang Banner, Inner Mongolia, China",
      coordinates: "40.9°N, 111.6°E",
      currentStatus: "Completed - Samples returned"
    }
  },
  {
    id: "insight",
    name: "InSight",
    agency: "NASA",
    launchDate: "May 5, 2018",
    thumbnail: insightImage,
    description: "Mars lander mission to study the planet's interior structure and seismic activity.",
    briefExplanation: "InSight uses seismometers and heat flow probes to understand Mars' geology and tectonic activity.",
    detailedHistory: `InSight was launched on an Atlas V rocket and landed on Mars in November 2018.

It deployed instruments to measure marsquakes and heat flow.

The mission has provided the first direct measurements of Mars' interior.

Key achievements:
- Detection of marsquakes
- Measurement of heat flow from interior
- Insights into planetary formation`,
    images: [insightImage, insightImage, insightImage],
    modelType: "rover",
    components: [
      {
        name: "SEIS Seismometer",
        description: "Detects seismic waves to study Mars' interior.",
        image: insightImage
      },
      {
        name: "HP3 Heat Flow Probe",
        description: "Measures heat escaping from Mars' interior.",
        image: insightImage
      },
      {
        name: "RWEB Wind and Thermal Shield",
        description: "Protects instruments from environmental noise.",
        image: insightImage
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, cruise to Mars, atmospheric entry, and landing in Elysium Planitia.",
      path: ["Launch from Cape Canaveral", "Cruise phase", "Mars atmospheric entry", "Landing", "Surface operations"],
      landingLocation: "Elysium Planitia, Mars",
      coordinates: "4.5°N, 135.9°E",
      currentStatus: "Active - Surface operations ongoing"
    }
  },
  {
    id: "kepler",
    name: "Kepler Space Telescope",
    agency: "NASA",
    launchDate: "March 7, 2009",
    thumbnail: keplerImage,
    description: "Space telescope designed to discover Earth-size planets orbiting other stars using the transit method.",
    briefExplanation: "Kepler monitored brightness of over 150,000 stars, identifying thousands of exoplanet candidates and revolutionizing exoplanet science.",
    detailedHistory: `Kepler was launched on a Delta II rocket.

It operated for over 9 years, with a primary mission and extended K2 mission.

Kepler's data led to the discovery of many Earth-like planets in habitable zones.

Key achievements:
- Discovery of over 2,600 confirmed exoplanets
- Statistical analysis of planetary populations
- Identification of multi-planet systems`,
    images: [keplerImage, keplerImage, keplerImage],
    modelType: "satellite",
    components: [
      {
        name: "Photometer",
        description: "Sensitive light detector to measure stellar brightness variations.",
        image: keplerImage
      },
      {
        name: "Reaction Wheels",
        description: "Used for precise pointing and stability.",
        image: keplerImage
      },
      {
        name: "Solar Arrays",
        description: "Provide power to the spacecraft.",
        image: keplerImage
      }
    ],
    trajectory: {
      description: "Launch from Cape Canaveral, Earth-trailing heliocentric orbit for continuous star monitoring.",
      path: ["Launch from Cape Canaveral", "Earth-trailing orbit", "Continuous photometric observations"],
      landingLocation: "N/A - Space telescope in heliocentric orbit",
      coordinates: "Earth-trailing heliocentric orbit",
      currentStatus: "Completed - Mission ended 2018"
    }
  }
];
