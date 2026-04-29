/**
 * ⭐ SITE CONFIGURATION — prix-terrasse-devis.fr
 * Terrasse — Guide, Prix & Devis Locaux 2026
 */
export const siteConfig = {
  // === IDENTITÉ ===
  domain: "prix-terrasse-devis.fr",
  name: "Prix Terrasse Devis",
  tagline: "Terrasse — Guide, Prix & Devis Locaux 2026",
  description: "Obtenez jusqu'à 3 devis gratuits pour la construction ou rénovation de votre terrasse. Comparez les prix de terrassiers qualifiés près de chez vous. Service 100% gratuit et sans engagement.",

  // === NICHE ===
  niche: {
    slug: "terrasse",
    name: "Terrasse",
    nameShort: "Terrasse",
    emoji: "🌿",
    icon: "leaf",
    seoTitleTemplate: "Terrasse à {city} ({zip}) — Prix & Devis Gratuit 2026",
    metaDescTemplate: "Comparez les prix de construction de terrasse à {city} ({zip}). Jusqu'à 3 devis gratuits de terrassiers qualifiés. Réponse sous 48h.",
    heroTitle: "Terrasse : Prix, Guide & Devis Gratuit 2026",
    heroSubtitle: "Comparez jusqu'à 3 devis de terrassiers qualifiés près de chez vous. Service 100% gratuit et sans engagement.",
  },

  // === PRIX ===
  pricing: [
    { service: "Terrasse en bois (pin traité)", price: "40 – 80 €/m² posé", details: "Pin classe 4, lambourdes et visserie inox, durée de vie 15-20 ans" },
    { service: "Terrasse en bois exotique (ipé, cumaru)", price: "80 – 150 €/m² posé", details: "Bois imputrescible, très résistant, esthétique haut de gamme" },
    { service: "Terrasse en composite", price: "60 – 120 €/m² posé", details: "Lames composite WPC, sans entretien, large choix de coloris" },
    { service: "Terrasse en dalle béton/pierre", price: "50 – 130 €/m² posé", details: "Dalles gravillonnées, pierre naturelle ou reconstituée, très durable" },
    { service: "Terrasse carrelée (grès cérame)", price: "60 – 140 €/m² posé", details: "Carrelage extérieur antidérapant R11, finition moderne ou imitation bois" },
    { service: "Terrasse sur plots", price: "50 – 100 €/m² posé", details: "Pose surélevée, drainage naturel, idéal toiture-terrasse ou terrain en pente" },
  ],
  pricingNote: "Prix TTC moyens constatés en 2026, pose comprise. Hors terrassement lourd (déblai, évacuation terre), création de dalle béton support et éclairage extérieur.",

  // === AIDES ===
  aids: [
    { name: "TVA réduite 10%", amount: "~10% d'économie", condition: "Logement > 2 ans, travaux de rénovation par un professionnel" },
    { name: "Éco-PTZ", amount: "Jusqu'à 50 000€ à taux 0%", condition: "Si terrasse associée à des travaux d'isolation (ITE)" },
    { name: "Aides locales", amount: "Variable selon commune", condition: "Certaines collectivités subventionnent l'aménagement extérieur durable" },
    { name: "Crédit d'impôt (accessibilité)", amount: "Jusqu'à 25% du montant", condition: "Aménagement PMR : rampe d'accès, terrasse de plain-pied" },
  ],

  // === MONÉTISATION ===
  viteundevis: {
    partnerId: "2353",
    boxId: "822b6a43e4",
    categoryId: "49",
  },

  // === COULEURS — Vert naturel / Orange CTA ===
  colors: {
    primary: "65A30D",     // lime-600
    primaryDark: "4D7C0F",  // lime-700
    accent: "EA580C",      // orange-600
    dark: "365314",        // lime-900
  },

  // === PROCESSUS ===
  process: [
    { title: "Décrivez votre projet", desc: "Type de terrasse (bois, composite, pierre), surface souhaitée, état du terrain et contraintes d'accès.", icon: "📋", duration: "2 min" },
    { title: "Recevez 3 devis", desc: "Des terrassiers qualifiés de votre département vous contactent sous 48h avec des devis détaillés et chiffrés.", icon: "📨", duration: "24-48h" },
    { title: "Comparez & choisissez", desc: "Comparez prix, matériaux (bois, composite, pierre), techniques de pose et garanties décennales.", icon: "⚖️" },
    { title: "Profitez de votre terrasse", desc: "Votre artisan réalise les travaux avec soin pour un espace extérieur durable et esthétique.", icon: "🌿", duration: "1-3 semaines" },
  ],

  // === FAQ ===
  faq: [
    {
      q: "Quel est le prix moyen d'une terrasse en 2026 ?",
      a: "Le prix d'une terrasse varie entre 40 €/m² (pin traité autoclave) et 200 €/m² (bois exotique ipé ou pierre naturelle haut de gamme). Le composite, choix le plus populaire, coûte en moyenne 60 à 120 €/m² pose comprise. Pour une terrasse de 20 m², comptez un budget de 1 200 à 2 800 € TTC."
    },
    {
      q: "Quel matériau choisir pour sa terrasse ?",
      a: "Le choix dépend de votre budget, de l'entretien souhaité et de l'esthétique : le bois naturel (pin, mélèze, exotique) offre un charme authentique mais demande un entretien annuel (saturateur, dégriseur). Le composite est sans entretien et imite le bois. La pierre naturelle (travertin, granit) est ultra-durable (30+ ans). Le carrelage grès cérame offre un design moderne et une grande résistance."
    },
    {
      q: "Faut-il un permis de construire pour une terrasse ?",
      a: "Pour une terrasse de plain-pied (moins de 60 cm de hauteur), aucune formalité n'est requise si la surface est inférieure à 20 m². Au-delà de 20 m², une déclaration préalable de travaux est nécessaire. Les terrasses surélevées (plus de 60 cm) nécessitent systématiquement une déclaration préalable, et un permis de construire au-delà de 20 m²."
    },
    {
      q: "Combien de temps dure la construction d'une terrasse ?",
      a: "La durée dépend de la surface et du type : une terrasse bois ou composite de 20 m² se réalise en 3 à 5 jours (hors préparation du sol). Une terrasse en dalle béton + carrelage nécessite 7 à 10 jours (coulage, séchage, pose). Les terrasses sur plots sont les plus rapides : 2 à 4 jours pour 20 m². Prévoyez 1 à 3 jours supplémentaires si un terrassement est nécessaire."
    },
    {
      q: "Quelle est la durée de vie d'une terrasse ?",
      a: "La durée de vie varie selon le matériau : pin traité autoclave (15-20 ans avec entretien), bois exotique ipé ou cumaru (25-40 ans), composite nouvelle génération (25-30 ans sans entretien), pierre naturelle et carrelage (30-50 ans). L'entretien régulier (nettoyage, traitement) peut doubler la durée de vie du bois."
    },
    {
      q: "Terrasse sur plots ou terrasse maçonnée : laquelle choisir ?",
      a: "La terrasse sur plots est idéale pour les toitures-terrasses, les terrains en pente et les rénovations rapides : pas de béton, drainage naturel, pose réversible. La terrasse maçonnée (dalle béton + revêtement) est plus stable, supporte des charges lourdes (spa, barbecue fixe) et convient aux constructions neuves. Budget : plots 50-100 €/m² vs maçonnée 80-200 €/m²."
    },
  ],

  // === TRUST ===
  trustBadges: ["Terrassiers qualifiés", "Devis 100% gratuit", "Sans engagement", "Garantie décennale"],

  // === CONTENT BLOCKS ===
  introText: `La terrasse est devenue l'extension naturelle de la maison française. Espace de vie à part entière, elle permet de profiter des beaux jours, de recevoir en plein air et de valoriser significativement votre bien immobilier (+5 à 15% de valeur selon les études). Bois, composite, pierre naturelle ou carrelage : les options sont multiples pour créer un espace extérieur unique.

Avec un prix moyen de 40 à 200 €/m² posé selon le matériau choisi, la terrasse offre un excellent retour sur investissement. Sa construction rapide (1 à 3 semaines pour un projet standard), la diversité des matériaux disponibles et les techniques modernes (pose sur plots, lambourdes aluminium) permettent de s'adapter à tous les terrains et tous les budgets.`,

  whyChooseUs: [
    "Jusqu'à 3 devis de terrassiers qualifiés de votre département",
    "Service 100% gratuit et sans aucun engagement",
    "Artisans vérifiés avec garantie décennale obligatoire",
    "Réponse sous 24h à 48h maximum",
    "Conseil sur le choix du matériau adapté à votre terrain et climat",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
