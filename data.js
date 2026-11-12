/* =====================================================================
   DONNÉES DU PORTFOLIO — c'est ici que vous modifiez le contenu.
   Pour ajouter un certificat ou un projet, copiez un bloc existant.
   N'écrivez que des informations vérifiées.
   ===================================================================== */

/* ---------- Coordonnées (à vérifier avant publication) ---------- */
const CONTACT = {
  email: "VOTRE_EMAIL@example.com",          // ← remplacez par votre adresse
  linkedin: "https://www.linkedin.com/",      // ← remplacez par l'URL exacte de votre profil
  whatsapp: "https://wa.me/212629301624",     // WhatsApp : +212 629301624
  telephone: "0629301624",
  github: "https://github.com/elamraouihamza278-commits"
};

/* ---------- Statistiques de visite (optionnel) ----------
   Laissez vide tant que GoatCounter n'est pas configuré.
   Exemple : goatcounter: "hamza-portfolio"  →  https://hamza-portfolio.goatcounter.com  */
const STATS = { goatcounter: "" };

/* ---------- Projets Tinkercad (carrousel) ---------- */
const TINKERCAD = [
  {
    titre: "Powerful Stantia",
    sous: "Circuit Arduino Uno · moteurs, servomoteur et capteurs ultrasoniques",
    texte: "Circuit réalisé sur Tinkercad autour d’une carte Arduino Uno. Il comporte deux moteurs DC, un servomoteur, deux capteurs ultrasoniques HC-SR04, un circuit intégré de pilotage des moteurs, une alimentation par pile 9 V et une LED, avec un programme en C++. D’après les commentaires du code, le premier capteur est lié au servomoteur et le second est placé en bas du robot.",
    tags: ["Arduino Uno", "C / C++", "HC-SR04", "Servomoteur", "Moteurs DC"],
    image: "images/tinkercad-powerful-stantia.jpg",
    alt: "Capture du circuit Powerful Stantia et de son code sur Tinkercad",
    lien: "https://www.tinkercad.com/things/iycOlzD1g6S-powerful-stantia"
  },
  {
    titre: "Epic Kup",
    sous: "Circuit Arduino Uno · écran LCD I²C, clavier 4×4 et servomoteur",
    texte: "Circuit réalisé sur Tinkercad autour d’une carte Arduino Uno. Il associe un écran LCD 16×2 en I²C, un clavier matriciel 4×4, un servomoteur et une LED avec sa résistance. Le programme en C++ utilise les bibliothèques LiquidCrystal_I2C, Wire, Servo et Keypad.",
    tags: ["Arduino Uno", "C / C++", "LCD I²C", "Clavier 4×4", "Servomoteur"],
    image: "images/tinkercad-epic-kup.jpg",
    alt: "Capture du circuit Epic Kup et de son code sur Tinkercad",
    lien: "https://www.tinkercad.com/things/ajVa392noFY-epic-kup"
  }
];

/* ---------- Projets : du plus récent au plus ancien ----------
   Ordre d'affichage sur la page : Missions freelance (carrousel), puis cette liste,
   puis le carrousel Tinkercad en dernier (voir index.html).
   Champs : id, date, type, titre, resume, tags, image, [fit], [galerie], [paragraphes],
            [listes], [video], [liens], [credit], [apercu]                     */
const PROJETS = [
  {
    id: "uart-verilog",
    date: "2026",
    type: "CONCEPTION NUMÉRIQUE · VERILOG",
    titre: "Contrôleur UART avec FIFO en Verilog",
    resume: "Contrôleur UART (émetteur, récepteur, FIFO, génération du débit) décrit en Verilog et validé par testbench en simulation.",
    paragraphes: [
      "Contrôleur UART décrit en Verilog HDL et validé par simulation avec un testbench.",
      "Le test « UART Buffered Loopback » envoie trois octets (A5, 3C, 72), les retrouve en réception et se termine par « TEST PASSED »."
    ],
    listes: [
      { titre: "Blocs du design", items: ["Générateur de tick de débit (baud)", "Émetteur (TX) et récepteur (RX)", "FIFO tampon", "Machine à états de contrôle", "Drapeaux d’erreur (framing, overrun)"] }
    ],
    tags: ["Verilog HDL", "UART", "FIFO", "Testbench", "Simulation"],
    image: "images/uart-simulation.jpg",
    alt: "Formes d’onde de simulation du contrôleur UART",
    galerie: [
      { src: "images/uart-simulation.jpg", legende: "Formes d’onde de la simulation (testbench uart_top_tb)" },
      { src: "images/uart-rtl.jpg", legende: "Hiérarchie du design : baud, TX, RX, FIFO et contrôle" },
      { src: "images/uart-formes-onde.jpg", legende: "Signaux UART, FIFO et émetteur" },
      { src: "images/uart-console.jpg", legende: "Console de simulation : « TEST PASSED: UART Buffered Loopback »" }
    ]
  },
  {
    id: "esp32x5",
    date: "2026",
    type: "CONCEPTION PCB · ESP32",
    titre: "Carte PCB basée sur 5 ESP32",
    resume: "Carte à cinq modules ESP32 : architecture proposée par moi, travail réalisé jusqu’à la conception finale du PCB.",
    paragraphes: [
      "J’ai proposé l’architecture de cette carte et réalisé le travail jusqu’à la conception finale du PCB.",
      "La carte réunit cinq modules ESP32, chacun avec son connecteur USB-C, une alimentation par bornier à vis avec régulateur et condensateurs de filtrage, et des zones d’exclusion (keep-out) à l’emplacement des antennes."
    ],
    tags: ["ESP32", "KiCad", "PCB", "Architecture", "Zones keep-out"],
    image: "images/esp32x5-3d-dessus.jpg",
    alt: "Vue 3D de la carte à cinq modules ESP32",
    galerie: [
      { src: "images/esp32x5-3d-dessus.jpg", legende: "Vue 3D de dessus : cinq modules ESP32 et zones keep-out" },
      { src: "images/esp32x5-3d.jpg", legende: "Vue 3D en perspective" },
      { src: "images/esp32x5-pcb.jpg", legende: "Conception du PCB avec les zones d’exclusion d’antenne" }
    ]
  },
  {
    id: "xmos",
    date: "2026",
    type: "TRAVAIL COLLABORATIF · PCB 6 COUCHES",
    titre: "Carte électronique 6 couches — XMOS XU316",
    resume: "Carte 6 couches conçue en équipe autour du XMOS XU316 : caméra MIPI, codec audio, Wi-Fi, mémoire LPDDR et connecteurs d’extension.",
    paragraphes: [
      "Projet pédagogique mené dans un cadre collaboratif (et non individuellement), avec une part d’étude, d’analyse et de simulation. Il porte sur une carte 6 couches basée sur le XMOS XU316, conçue sous KiCad.",
      "Le XU316 est un composant existant : le travail porte sur la carte qui l’entoure, sans prétendre à la conception du composant lui-même."
    ],
    listes: [
      { titre: "Contenu de la carte (d’après le schéma)", items: [
        "Processeur XMOS XU316 (deux références : FBGA265 et QFN60)",
        "Caméra : connecteur à 15 broches en liaison MIPI, avec une note sur le capteur Sony IMX219 (adresse I²C 0x10)",
        "Audio : codec TLV320AIC3254, entrée ligne et sortie ligne/casque sur deux jacks 3,5 mm",
        "Mémoire : LPDDR (W94AD6KBHX5I) et deux mémoires flash",
        "Radio : module Wi-Fi WFM200S avec connecteur d’antenne coaxial",
        "Deux connecteurs micro-USB",
        "Alimentation multi-tensions (5 V, 3,3 V, 1,8 V, 0,9 V) et plusieurs connecteurs d’extension à broches"
      ] }
    ],
    tags: ["XMOS XU316", "PCB 6 couches", "KiCad", "MIPI", "Audio", "LPDDR", "Travail collaboratif"],
    image: "images/xmos-3d.jpg",
    alt: "Vue 3D de la carte 6 couches basée sur le XMOS XU316",
    galerie: [
      { src: "images/xmos-3d.jpg", legende: "Vue 3D de la carte (KiCad)" },
      { src: "images/xmos-3d-dessus.jpg", legende: "Vue 3D de dessus : jacks audio, micro-USB, connecteurs et connecteur caméra" },
      { src: "images/xmos-3d-incline.jpg", legende: "Vue 3D inclinée" },
      { src: "images/xmos-pcb-couches.jpg", legende: "Vue du PCB par couches" },
      { src: "images/xmos-routage-detail.jpg", legende: "Routage autour du XU316" },
      { src: "images/xmos-routage.jpg", legende: "Routage d’ensemble et connecteurs d’extension" },
      { src: "images/xmos-schema-vue-ensemble.jpg", legende: "Vue d’ensemble du schéma KiCad (feuille unique)" }
    ]
  },
  {
    id: "stm32",
    date: "05/2026",
    type: "CONCEPTION PCB · STM32",
    titre: "Carte à microcontrôleur STM32 — conception PCB",
    resume: "Carte autour d’un STM32 basée sur une architecture existante, réalisée pour progresser en placement, routage et gestion des alimentations.",
    paragraphes: [
      "Projet de conception PCB autour d’un microcontrôleur STM32, basé sur une architecture existante. Il m’a permis de mieux comprendre les bonnes pratiques de routage, de placement des composants et de gestion des alimentations.",
      "La carte comporte un connecteur USB-C, un connecteur coaxial miniature, un connecteur à 4 broches, un bouton, un quartz et de nombreux condensateurs de découplage."
    ],
    tags: ["STM32", "PCB", "Placement", "Routage", "Alimentations"],
    image: "images/stm32-pcb-3d.jpg",
    alt: "Vue 3D de la carte STM32",
    galerie: [
      { src: "images/stm32-pcb-3d.jpg", legende: "Vue 3D de la carte" },
      { src: "images/stm32-pcb-routage.jpg", legende: "Placement et routage autour du microcontrôleur" }
    ]
  },
  {
    id: "piezo",
    date: "03/2026",
    type: "PROJET D’APPRENTISSAGE · ANALOGIQUE",
    titre: "Acquisition d’un signal piézoélectrique",
    resume: "Chaîne d’acquisition et de conditionnement d’un signal piézoélectrique : simulation LTspice, schéma et PCB KiCad, visualisation MATLAB.",
    paragraphes: [
      "Un de mes premiers projets d’apprentissage, sur l’acquisition et le conditionnement d’un signal piézoélectrique : étage d’entrée à amplificateurs, filtre passe-bas, décalage de tension et adaptation de niveau protégée par diodes avant l’entrée ADC d’un ESP32.",
      "Le circuit est simulé sous LTspice avec un signal d’entrée importé depuis un fichier. Schéma et PCB sont réalisés sous KiCad, et une interface MATLAB compare le signal reçu et le signal filtré."
    ],
    tags: ["Capteur piézoélectrique", "LTspice", "KiCad", "MATLAB", "ESP32"],
    image: "images/piezo-schematic.jpg",
    alt: "Schéma KiCad de la chaîne d’acquisition piézoélectrique",
    galerie: [
      { src: "images/piezo-schematic.jpg", legende: "Schéma KiCad de la chaîne d’acquisition" },
      { src: "images/piezo-ltspice-schema.jpg", legende: "Schéma de simulation sous LTspice" },
      { src: "images/piezo-ltspice-resultat.jpg", legende: "Résultat LTspice : tension à l’entrée ADC de l’ESP32" },
      { src: "images/piezo-pcb-routage.jpg", legende: "PCB sous KiCad : routage" },
      { src: "images/piezo-pcb-3d.jpg", legende: "PCB sous KiCad : vue 3D" },
      { src: "images/piezo-matlab-interface.jpg", legende: "Interface MATLAB : signal reçu de LTspice et signal filtré" }
    ]
  },
  {
    id: "kicad-iot",
    date: "2026",
    type: "CONCEPTION PCB · IoT HAUTE TENSION",
    titre: "Carte IoT haute tension",
    resume: "Carte à ESP32 avec relais, USB-C et zone secteur, conçue sous KiCad 9 en suivant un tutoriel d’Ampnics.",
    paragraphes: [
      "Carte IoT haute tension réalisée sous KiCad 9 en suivant le tutoriel d’Ampnics. Elle réunit un module ESP32, un relais, un connecteur USB-C, des boutons et une zone secteur signalée « Danger Haute tension ». Il s’agit d’un travail d’apprentissage guidé, pas d’une conception originale.",
      "Il m’a permis de pratiquer la gestion des bibliothèques (symboles et empreintes), le routage avec prise en compte de la haute tension, les protocoles SPI / I²C et la génération des fichiers Gerber."
    ],
    credit: { texte: "Remerciements à Ampnics pour ses tutoriels de conception de cartes PCB IoT haute tension.", lien: "https://www.linkedin.com/company/ampnics/", libelle: "Ampnics sur LinkedIn" },
    tags: ["KiCad 9", "ESP32", "PCB", "Haute tension", "SPI / I²C", "Gerber"],
    image: "images/kicad-iot-3d.jpg",
    alt: "Vue 3D de la carte IoT haute tension sous KiCad",
    galerie: [
      { src: "images/kicad-iot-3d.jpg", legende: "Vue 3D de la carte sous KiCad" },
      { src: "images/kicad-iot-3d-detail.jpg", legende: "Vue 3D : module ESP32, relais et boutons" },
      { src: "images/kicad-iot-pcb.jpg", legende: "Routage : zone basse tension et zone haute tension" },
      { src: "images/kicad-iot-pcb-haute-tension.jpg", legende: "Détail du routage de la partie haute tension" }
    ]
  },
  {
    id: "robot-iot",
    date: "2025",
    type: "PFE · SYSTÈME EMBARQUÉ · IoT",
    titre: "Robot mobile intelligent — ESP32 et IoT",
    resume: "Robot mobile à ESP32 piloté depuis une application MIT App Inventor, avec Firebase, capteurs et commande des moteurs.",
    paragraphes: [
      "Robot mobile intelligent basé sur ESP32, avec des fonctionnalités IoT. Il est piloté à distance depuis une application mobile développée avec MIT App Inventor ; la communication avec Firebase permet l’échange de données entre l’application et le système embarqué.",
      "Le prototype intègre plusieurs capteurs pour la détection de l’environnement et un système de commande des moteurs. Projet réalisé dans le cadre de ma formation en électronique et systèmes embarqués."
    ],
    listes: [
      { titre: "Composants et technologies", items: ["ESP32", "Firebase", "MIT App Inventor", "Driver moteur L298N", "Capteurs ultrasoniques HC-SR04", "Capteur DHT11", "Capteur de gaz MQ-5"] },
      { titre: "Objectifs", items: ["Commande à distance via une application mobile", "Communication IoT avec Firebase", "Intégration de plusieurs capteurs", "Commande des déplacements du robot"] }
    ],
    tags: ["ESP32", "Firebase", "MIT App Inventor", "L298N", "HC-SR04", "DHT11", "MQ-5"],
    video: "QQuICNbAxjk",
    image: "https://img.youtube.com/vi/QQuICNbAxjk/hqdefault.jpg",
    alt: "Vignette de la vidéo de démonstration du robot mobile ESP32",
    fit: "cover",
    badge: "▶ Vidéo de démonstration",
    liens: [{ label: "Voir la vidéo sur YouTube", url: "https://youtu.be/QQuICNbAxjk" }]
  },
  {
    id: "pll",
    date: "2025",
    type: "ÉTUDE PÉDAGOGIQUE · SÉMINAIRE",
    titre: "Boucle à verrouillage de phase (PLL)",
    resume: "Travail pédagogique sur la PLL : présentation de 15 diapositives et simulation MATLAB des signaux de la boucle.",
    paragraphes: [
      "Travail à vocation pédagogique sur le principe de la boucle à verrouillage de phase (PLL), appuyé par une présentation de 15 diapositives (introduction, structure générale, détecteur de phase, filtre passe-bas…).",
      "La simulation sous MATLAB affiche le signal de référence, la sortie du détecteur de phase (multiplieur), la sortie du filtre passe-bas et le signal du VCO."
    ],
    tags: ["PLL", "MATLAB", "Simulation", "Étude pédagogique"],
    image: "images/pll-simulation-matlab.jpg",
    alt: "Simulation MATLAB d’une PLL : référence, détecteur de phase, filtre passe-bas et VCO",
    galerie: [
      { src: "images/pll-simulation-matlab.jpg", legende: "Simulation MATLAB : référence, détecteur de phase, filtre passe-bas et VCO" },
      { src: "images/pll-presentation.jpg", legende: "Présentation « Boucle à verrouillage de phase (PLL) » — 15 diapositives" }
    ]
  }
];

/* ---------- Projets freelance (carrousel, affiché en premier) — période 07/2026 – 10/2026 ---------- */
const FREELANCE = [
  {
    id: "fl-encodeur-ble",
    date: "07/2026 – 10/2026",
    type: "ALTIUM DESIGNER · PCB 4 COUCHES",
    titre: "PCB 4 couches — module encodeur de précision et Bluetooth BLE",
    resume: "PCB 4 couches sous Altium Designer avec un STM32, deux interfaces d’encodeurs différentiels et un module Bluetooth BLE.",
    paragraphes: [
      "Conception d’un PCB 4 couches sous Altium Designer, intégrant un STM32, deux interfaces d’encodeurs différentiels et un module Bluetooth BLE. Révision du schéma, placement, routage, contrôle d’impédance USB, DRC et préparation des fichiers de fabrication.",
      "Projet freelance réalisé pour un client international."
    ],
    tags: ["Altium Designer", "STM32", "PCB 4 couches", "Encodeurs différentiels", "BLE", "USB", "DRC"],
    image: "images/freelance-encodeur-ble-3d.jpg",
    alt: "Vue 3D du PCB 4 couches du module encodeur et Bluetooth BLE"
  },
  {
    id: "fl-flyback",
    date: "07/2026 – 10/2026",
    type: "SIMULATION · LTSPICE",
    titre: "Convertisseur flyback haute tension — simulation LTspice",
    resume: "Simulation d’un convertisseur flyback pour la charge d’un condensateur haute tension, avec une sortie d’environ 1,4 kV en simulation.",
    paragraphes: [
      "Modélisation et simulation d’un convertisseur flyback pour la charge d’un condensateur haute tension.",
      "Analyse du comportement du transformateur, du courant primaire et des transitoires de commutation. Évaluation de la réponse de la tension de sortie, qui atteint environ 1,4 kV en simulation."
    ],
    tags: ["LTspice", "Convertisseur flyback", "Haute tension", "Simulation"],
    image: "images/freelance-flyback-ltspice.jpg",
    alt: "Simulation LTspice du convertisseur flyback : tension de sortie"
  },
  {
    id: "fl-esp32-poe",
    date: "07/2026 – 10/2026",
    type: "CONCEPTION PCB · KICAD",
    titre: "Haut-parleur audio réseau ESP32-PoE — conception PCB",
    resume: "Revue du schéma et conception du PCB sous KiCad : Ethernet, alimentation 24 V, audio et interfaces ESP32.",
    paragraphes: [
      "Revue du schéma et conception du PCB sous KiCad. Intégration et routage d’Ethernet, de l’alimentation 24 V, du circuit audio et des interfaces ESP32.",
      "Placement des composants, optimisation du routage et vérification ERC/DRC. Préparation des livrables de fabrication : fichiers Gerber, BOM et modèle 3D STEP."
    ],
    tags: ["KiCad", "ESP32", "Ethernet", "Alimentation 24 V", "Audio", "ERC / DRC", "Gerber"],
    image: "images/freelance-esp32-poe-pcb.jpg",
    alt: "PCB KiCad du haut-parleur réseau ESP32-PoE"
  },
  {
    id: "fl-altium-layout",
    date: "07/2026 – 10/2026",
    type: "CONCEPTION PCB · ALTIUM DESIGNER",
    titre: "Conception et layout PCB — Altium Designer",
    resume: "Intégration du schéma, placement et routage sous Altium Designer, avec distribution d’alimentation et plans de cuivre.",
    paragraphes: [
      "Intégration du schéma, placement des composants et routage du PCB sous Altium Designer.",
      "Routage de la distribution d’alimentation, plans de cuivre et prise en compte des distances d’isolement électrique. Revue du layout et vérification des règles de conception (DRC)."
    ],
    tags: ["Altium Designer", "Placement", "Routage", "Plans de cuivre", "DRC"],
    image: "images/freelance-altium-layout.jpg",
    alt: "Layout PCB sous Altium Designer avec plans de cuivre"
  },
  {
    id: "fl-micro-rgb",
    date: "07/2026 – 10/2026",
    type: "CONCEPTION PCB · AUDIO NUMÉRIQUE",
    titre: "Carte à 6 microphones numériques et LED RGB",
    resume: "Schéma intégrant 6 microphones MEMS numériques et un driver de LED RGB, relié à la carte contrôleur principale.",
    paragraphes: [
      "Conception du schéma intégrant 6 microphones MEMS numériques et un driver de LED RGB.",
      "Distribution d’alimentation, interfaces de signaux numériques et connexions vers la carte contrôleur principale. Prise en compte des contraintes PCB pour les signaux audio numériques et l’intégration des composants."
    ],
    tags: ["Microphones MEMS", "LED RGB", "Audio numérique", "Schéma", "PCB"],
    image: "images/freelance-micro-rgb-schema.jpg",
    alt: "Schéma de la carte à 6 microphones numériques et LED RGB"
  }
];

/* ---------- Certifications (ordre chronologique) ---------- */
const CERTIFICATS = [
  {
    nom: "PCB Basic Design Course",
    organisme: "Altium Education",
    date: "Juin 2026",
    image: "certificats/altium-pcb-basic-design.jpg",
    fichier: "certificats/altium-pcb-basic-design.jpg",
    competences: ["Conception PCB (bases)", "Altium"]
  },
  {
    nom: "PCB Design Course",
    organisme: "Simplilearn SkillUp",
    date: "20 août 2026",
    image: "certificats/simplilearn-pcb-design.jpg",
    fichier: "certificats/simplilearn-pcb-design.pdf",
    competences: ["Conception PCB"]
  },
  {
    nom: "Computer Hardware and Architecture Basics",
    organisme: "Mind Luster",
    date: "28 août 2026",
    image: "certificats/mindluster-hardware-architecture.jpg",
    fichier: "certificats/mindluster-hardware-architecture.jpg",
    competences: ["Matériel et architecture informatique (bases)"]
  },
  {
    nom: "Digital System Design using Verilog HDL",
    organisme: "Mahara-Tech (ITI)",
    date: "19 octobre 2026",
    image: "certificats/mahara-tech-verilog-hdl.jpg",
    fichier: "certificats/mahara-tech-verilog-hdl.jpg",
    competences: ["Conception de systèmes numériques", "Verilog HDL"]
  }
];
