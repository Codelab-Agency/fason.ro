import type { ServicePrice } from "./pricing";

// Contactele rămân necompletate până la confirmare. Tarifele și cele două
// profiluri marcate ca demonstrative sunt exemple cerute pentru design.
export const salon: {
  name: string;
  phone: string | null;
  whatsappNumber: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  hours: string | null;
  instagramUrl: string | null;
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
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Salon%20Fason%2C%20Strada%20Baia%20de%20Fier%2010%2C%20Bucure%C8%99ti&query_place_id=ChIJo6_d1z3_sUARgZc0ujvEup4",
};

export const navigation = [
  { label: "Servicii", href: "#servicii" },
  { label: "Portofoliu", href: "#portofoliu" },
  { label: "Echipa", href: "#echipa" },
  { label: "Despre", href: "#despre" },
  { label: "Locație", href: "#locatie" },
  { label: "Contact", href: "#contact" },
];

export type SalonService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  summary: string;
  tags: string[];
  price: ServicePrice | null;
};

export const pricesAreDemonstrative = true;

export const services: SalonService[] = [
  {
    id: "tunsoare",
    title: "Cut & shape",
    subtitle: "Tuns & formă",
    summary: "Linii, proporții și o formă care îți vine bine.",
    price: { amount: 180, kind: "from" },
    description:
      "Lungime, proporții și textură, alese în funcție de părul tău. Stabilim forma și felul în care o poți întreține acasă.",
    tags: ["Consultație", "Tuns personalizat", "Styling"],
  },
  {
    id: "culoare",
    title: "Color stories",
    subtitle: "Culoare & balayage",
    summary: "Balayage, colorare și nuanțe alese împreună.",
    price: { amount: 450, kind: "from" },
    description:
      "Balayage, colorare sau tonalizare. Pornim de la nuanța actuală și rezultatul dorit, apoi alegem tehnica potrivită.",
    tags: ["Balayage", "Colorare", "Tonalizare"],
  },
  {
    id: "styling",
    title: "Style & finish",
    subtitle: "Coafat & styling",
    summary: "Blow-dry, bucle, textură și finisaj.",
    price: { amount: 100, kind: "from" },
    description:
      "Blow-dry, bucle sau textură. Alegem finisajul după lungimea părului și ocazia pentru care te pregătești.",
    tags: ["Blow-dry", "Waves", "Textură"],
  },
  {
    id: "tratament",
    title: "Hair rituals",
    subtitle: "Îngrijire & tratamente",
    summary: "Hidratare și îngrijire pentru nevoile părului.",
    price: { amount: 120, kind: "from" },
    description:
      "Îngrijire pentru hidratare și nevoile specifice ale firului. Stabilim tratamentul în salon, după evaluarea părului.",
    tags: ["Hidratare", "Îngrijire", "Ritual personalizat"],
  },
  {
    id: "eveniment",
    title: "Special moments",
    subtitle: "Coafuri de eveniment",
    summary: "O coafură gândită pentru ziua ta specială.",
    price: { amount: 250, kind: "from" },
    description:
      "Coafuri pentru evenimente și mirese. Discutăm despre ținută, lungime și rezultatul dorit înainte să alegem forma.",
    tags: ["Bridal", "Evenimente", "Coafuri creative"],
  },
  {
    id: "consultatie",
    title: "Let’s talk hair",
    subtitle: "Consultație de imagine",
    summary: "Timp să discutăm despre următoarea schimbare.",
    price: { amount: 75, kind: "fixed" },
    description:
      "O discuție despre tunsoare, culoare și rutina de acasă, înainte de o schimbare.",
    tags: ["Formă", "Culoare", "Rutina de acasă"],
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  image: string | null;
  imagePosition?: string;
  demonstrative?: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    id: "cristina",
    name: "Cristina Grama",
    role: "Hairstylist · Direcția creativă",
    focus: "Formă, culoare și expresie personală.",
    image: "/images/cristina.jpg",
    imagePosition: "50% 15%",
  },
  {
    id: "mara-demo",
    name: "Mara Ionescu",
    role: "Coloristă",
    focus: "Balayage, blonduri și nuanțe naturale.",
    image: "/images/team-mara-demo.webp",
    imagePosition: "50% 32%",
    demonstrative: true,
  },
  {
    id: "andrei-demo",
    name: "Andrei Matei",
    role: "Hairstylist",
    focus: "Tunsori, textură și styling.",
    image: "/images/team-andrei-demo.webp",
    imagePosition: "50% 32%",
    demonstrative: true,
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
