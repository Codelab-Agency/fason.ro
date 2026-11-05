import type { ServicePrice } from "./pricing";

// Datele lipsă din brief rămân null. Publicăm numai persoane confirmate.
export const salon: {
  name: string;
  phone: string | null;
  whatsappNumber: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  hours: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  tiktokUrl: string | null;
  mapUrl: string | null;
} = {
  name: "FASON",
  phone: null,
  whatsappNumber: null,
  email: null,
  address: "Strada Baia de Fier 10",
  city: "București · Sector 3",
  hours: null,
  instagramUrl: null,
  facebookUrl: null,
  tiktokUrl: null,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Salon%20Fason%2C%20Strada%20Baia%20de%20Fier%2010%2C%20Bucure%C8%99ti&query_place_id=ChIJo6_d1z3_sUARgZc0ujvEup4",
};

export const navigation = [
  { label: "Despre", href: "#despre" },
  { label: "Cristina Gramma", href: "#cristina" },
  { label: "Servicii", href: "#servicii" },
  { label: "Echipa", href: "#echipa" },
  { label: "Contact", href: "#contact" },
  { label: "Locație", href: "#locatie" },
];

export const socialLinks = [
  { label: "Instagram", href: salon.instagramUrl },
  { label: "Facebook", href: salon.facebookUrl },
  { label: "TikTok", href: salon.tiktokUrl },
].filter((link): link is { label: string; href: string } => Boolean(link.href));

export type SalonService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  summary: string;
  tags: string[];
  price: ServicePrice | null;
};

export const pricesAreDemonstrative = false;

export const services: SalonService[] = [
  {
    id: "tuns-barber",
    title: "Hair",
    subtitle: "Tuns damă & barber",
    summary: "",
    price: null,
    description: "",
    tags: [],
  },
  {
    id: "culoare-styling",
    title: "Hair",
    subtitle: "Culoare & styling",
    summary: "",
    price: null,
    description: "",
    tags: [],
  },
  {
    id: "cosmetica",
    title: "Beauty",
    subtitle: "Cosmetică",
    summary: "",
    price: null,
    description: "",
    tags: [],
  },
  {
    id: "tratamente-faciale",
    title: "Beauty",
    subtitle: "Tratamente faciale",
    summary: "",
    price: null,
    description: "",
    tags: [],
  },
  {
    id: "tratamente-corporale",
    title: "Beauty",
    subtitle: "Tratamente corporale",
    summary: "",
    price: null,
    description: "",
    tags: [],
  },
  {
    id: "manichiura-pedichiura",
    title: "Beauty",
    subtitle: "Manichiură–pedichiură",
    summary: "",
    price: null,
    description: "",
    tags: [],
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  specialization?: string;
  technique?: string;
  image: string | null;
  imagePosition?: string;
  demonstrative?: boolean;
  departmentId: "coafor-barber" | "beauty";
};

export const founder = {
  name: "Cristina Gramma",
  role: "Fondatoare & Creative Director",
  image: "/images/cristina.jpg",
  imagePosition: "50% 15%",
  introduction:
    "Frumusețea înseamnă mai mult decât o coafură. Este o formă de exprimare a personalității.",
  biography: [
    "Cristina Gramma este sufletul și viziunea din spatele Salonului FASON, un hairstylist pasionat.",
    "Cu o abordare ce îmbină tehnica, experiența și creativitatea, Cristina transformă fiecare idee într-un stil autentic, de la look-uri naturale și elegante până la creații artistice spectaculoase.",
    "Prin Salon FASON, a creat un loc în care profesionalismul, pasiunea pentru frumos și grija față de oameni se întâlnesc zi de zi.",
  ],
};

export const teamDepartments = [
  {
    id: "coafor-barber",
    title: "Coafor & Barber",
    description:
      "Hairstyliști și specialiști în îngrijirea părului. Tehnică, creativitate și atenție la fiecare detaliu.",
    serviceIds: ["tuns-barber", "culoare-styling"],
    // Brief: trei hairstyliști și două persoane dedicate spălării/îngrijirii.
    plannedRoles: [
      "Hairstylist",
      "Hairstylist",
      "Hairstylist",
      "Îngrijirea părului",
      "Îngrijirea părului",
    ],
  },
  {
    id: "beauty",
    title: "Beauty",
    description:
      "Specialiști în cosmetică și manichiură–pedichiură. Îngrijire facială și corporală, într-o abordare personalizată.",
    serviceIds: [
      "cosmetica",
      "tratamente-faciale",
      "tratamente-corporale",
      "manichiura-pedichiura",
    ],
    plannedRoles: ["Cosmetică", "Manichiură–pedichiură"],
  },
] as const;

export const teamMembers: TeamMember[] = [
  {
    id: "cristina",
    name: founder.name,
    role: founder.role,
    specialization: "Hairstyling",
    focus: "Formă, culoare și expresie personală.",
    image: "/images/cristina.jpg",
    imagePosition: "50% 15%",
    departmentId: "coafor-barber",
  },
];

export const portfolio = [
  {
    id: "golden",
    title: "Golden geometry",
    category: "Cut & color",
    image: "/images/hero-portrait.jpg",
    alt: "Bob blond geometric cu breton și accente galbene, colecție FASON",
    position: "50% 53%",
  },
  {
    id: "prism",
    title: "Beyond the ordinary",
    category: "Creative color",
    image: "/images/collection-prism.jpg",
    alt: "Coafură sculpturală cu păr lung în nuanțe vibrante de roșu, mov și albastru",
    position: "50% 38%",
  },
  {
    id: "silver",
    title: "Soft architecture",
    category: "Cut & shape",
    image: "/images/collection-silver.jpg",
    alt: "Tunsoare bob argintiu cu linii precise și textură netedă",
    position: "50% 35%",
  },
  {
    id: "rose",
    title: "A little rebellion",
    category: "Editorial styling",
    image: "/images/collection-rose.jpg",
    alt: "Coafură editorială cu volum și accente roz pe păr blond",
    position: "50% 38%",
  },
];

export const location = {
  image: "/images/fason-exterior.jpg",
  imageAlt: "Fațada salonului FASON de pe Strada Baia de Fier 10, București",
  imageSourceUrl: "https://www.bucuresteni.ro/despre/salon-fason/",
  imageSourceLabel: "Fotografie de arhivă · Bucuresteni.ro",
  placeId: "ChIJo6_d1z3_sUARgZc0ujvEup4",
  reviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJo6_d1z3_sUARgZc0ujvEup4",
  writeReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJo6_d1z3_sUARgZc0ujvEup4",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Strada%20Baia%20de%20Fier%2010%2C%20Bucure%C8%99ti&destination_place_id=ChIJo6_d1z3_sUARgZc0ujvEup4",
  mapEmbedUrl:
    "https://www.google.com/maps?q=44.4303964%2C26.1062378&z=17&output=embed",
};
