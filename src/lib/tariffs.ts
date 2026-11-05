export type TariffItem = {
  name: string;
  price: string;
  duration?: string;
  detail?: string;
};

export type TariffGroup = {
  title: string;
  note?: string;
  items: TariffItem[];
};

export type TariffCategory = {
  id: string;
  title: string;
  family: "Hair" | "Beauty";
  groups: TariffGroup[];
};

// Sursa: „LISTA PRETURI finala preturi 2027.docx”, furnizat de client.
// Variantele cu slash sunt păstrate; nu le transformăm în intervale sau prețuri de pornire.
export const tariffYear = 2027;
export const tariffCategories: TariffCategory[] = [
  {
    id: "tuns-barber",
    title: "Tuns damă & barber",
    family: "Hair",
    groups: [
      {
        title: "Tuns damă",
        note: "Tarife de manoperă. Spălatul și celelalte servicii se regăsesc separat în listă.",
        items: [
          { name: "Tuns damă", price: "85 lei" },
          { name: "Tuns Cristina", price: "150 lei" },
          { name: "Tuns copil", price: "50 lei" },
          { name: "Tuns breton", price: "35 lei" },
        ],
      },
      {
        title: "Barber",
        note: "Tunsul este tarifat ca manoperă. Spălatul și stylingul sunt separate.",
        items: [
          { name: "Tuns bărbați", price: "75 lei" },
          { name: "Tuns barbă", price: "35 lei" },
          { name: "Spălat bărbați", price: "30 lei" },
          { name: "Styling bărbați", price: "5 lei" },
        ],
      },
    ],
  },
  {
    id: "culoare-styling",
    title: "Culoare & styling",
    family: "Hair",
    groups: [
      {
        title: "Coafat",
        note: "Tarife de manoperă.",
        items: [
          { name: "Coafat scurt", price: "55 lei" },
          { name: "Coafat mediu", price: "65 lei" },
          { name: "Coafat lung", price: "70 lei" },
          { name: "Coafat extra lung", price: "75 lei" },
          { name: "Coafat liber", price: "30 lei" },
          { name: "Coafat special simplu", price: "100 lei" },
          { name: "Coafat special extra", price: "120 / 150 lei" },
          { name: "Coafat mireasă", price: "400 lei" },
        ],
      },
      {
        title: "Vopsit",
        note: "Tarife de manoperă. Materialul se calculează separat: pudră / vopsea, 15 lei pentru 10 g.",
        items: [
          { name: "Vopsit rădăcină", price: "60 lei" },
          { name: "Vopsit total", price: "80 lei" },
          { name: "Schimbare culoare", price: "150–250 lei" },
          { name: "Șuvițe mărimea S", price: "100 lei" },
          { name: "Șuvițe mărimea M", price: "200 lei" },
          { name: "Șuvițe mărimea L", price: "300 lei" },
          { name: "Șuvițe mărimea XL", price: "400 lei" },
          { name: "Accente", price: "50 lei" },
          { name: "Pudră / vopsea", price: "15 lei / 10 g" },
        ],
      },
      {
        title: "Spălat simplu",
        items: [
          { name: "Spălat scurt", price: "40 lei" },
          { name: "Spălat mediu", price: "50 lei" },
          { name: "Spălat lung", price: "60 lei" },
          { name: "Spălat extra lung", price: "70 lei" },
          { name: "Spălat scurt vopsit", price: "60 lei" },
          { name: "Spălat mediu vopsit", price: "70 lei" },
          { name: "Spălat lung vopsit", price: "80 lei" },
          { name: "Spălat extra lung vopsit", price: "90 lei" },
          { name: "Spălat șuvițe / schimbare culoare", price: "100–150 lei" },
        ],
      },
      {
        title: "Spălat Davines",
        items: [
          { name: "Spălat scurt", price: "55 lei" },
          { name: "Spălat mediu", price: "70 lei" },
          { name: "Spălat lung", price: "90 lei" },
          { name: "Spălat extra lung", price: "100 lei" },
          { name: "Spălat scurt vopsit", price: "65 lei" },
          { name: "Spălat mediu vopsit", price: "85 lei" },
          { name: "Spălat lung vopsit", price: "100 lei" },
          { name: "Spălat extra lung vopsit", price: "115 lei" },
          { name: "Tratament Nourishing", price: "100–120 lei" },
        ],
      },
      {
        title: "Suplimente",
        items: [
          { name: "Styling — bucle, placă etc.", price: "20–50 lei" },
          { name: "Semi-prins", price: "50 lei" },
          { name: "Împletit", price: "60–120 lei" },
          { name: "Produs de styling", price: "5 lei / produs" },
        ],
      },
    ],
  },
  {
    id: "cosmetica",
    title: "Cosmetică",
    family: "Beauty",
    groups: [
      {
        title: "Epilat cu ceară",
        items: [
          { name: "Epilat lung", price: "75 lei" },
          { name: "Epilat scurt — inferior / superior", price: "40 / 50 lei" },
          { name: "Epilat brațe — inferior / superior", price: "35 / 40 lei" },
          { name: "Epilat axilă", price: "30 lei" },
          { name: "Epilat lombar", price: "35 lei" },
          { name: "Epilat fese", price: "40 lei" },
          { name: "Epilat genian", price: "80 lei" },
          { name: "Epilat abdomen — parțial / total", price: "25 / 35 lei" },
          { name: "Epilat bikini", price: "45 lei" },
          { name: "Epilat interfesier", price: "25 lei" },
          { name: "Epilat inghinal total", price: "60 lei" },
          { name: "Epilat cervicală", price: "30 lei" },
          { name: "Epilat mustață, bărbie, perciuni", price: "20 lei" },
          {
            name: "Epilat full body + un segment",
            price: "210 lei",
            detail: "Un segment suplimentar: abdomen, lombar etc.",
          },
        ],
      },
      {
        title: "Epilat cu zahăr",
        items: [
          { name: "Epilat lung", price: "110 lei" },
          { name: "Epilat scurt", price: "70 lei" },
          { name: "Epilat brațe", price: "60 lei" },
          { name: "Epilat axilă", price: "40 lei" },
          { name: "Epilat lombar", price: "45 lei" },
          { name: "Epilat fese", price: "50 lei" },
          { name: "Epilat genian", price: "90 lei" },
          { name: "Epilat abdomen", price: "50 lei" },
          { name: "Epilat bikini", price: "50 lei" },
          { name: "Epilat interfesier", price: "45 lei" },
          { name: "Epilat inghinal total", price: "70 lei" },
          { name: "Epilat mustață, bărbie, perciuni", price: "30 lei" },
          {
            name: "Epilat full body + un segment",
            price: "310 lei",
            detail: "Un segment suplimentar: abdomen, lombar etc.",
          },
        ],
      },
      {
        title: "Sprâncene & gene",
        items: [
          { name: "Pensat curățare", price: "45 lei", duration: "20 min" },
          { name: "Pensat formă", price: "60 lei", duration: "30 min" },
          { name: "Pensat bărbați", price: "60 lei", duration: "30 min" },
          { name: "Vopsit sprâncene", price: "35 lei", duration: "15 min" },
          { name: "Vopsit gene", price: "35 lei", duration: "15 min" },
        ],
      },
    ],
  },
  {
    id: "tratamente-faciale",
    title: "Tratamente faciale",
    family: "Beauty",
    groups: [
      {
        title: "Îngrijire facială",
        items: [
          {
            name: "Hidratare — Ceramide Apis / Oxigen Activ Apis",
            price: "240 lei",
            duration: "1 h 30 min",
          },
          {
            name: "Fermitate Apis / Coffee Shot Apis",
            price: "265 lei",
            duration: "2 h",
          },
          {
            name: "Curățare facială",
            price: "200 lei",
            duration: "1 h – 1 h 30 min",
          },
          {
            name: "Purifiere / Stop Cuperoză Apis",
            price: "265 lei",
            duration: "2 h",
          },
          {
            name: "Tratament anti-pete Apis",
            price: "265 lei",
            duration: "1 h",
          },
          { name: "Tratament cavitațional", price: "210 lei", duration: "1 h" },
          { name: "Tratament personalizat", price: "450 lei", duration: "2 h" },
          {
            name: "Oxigen hiperbaric — complex",
            price: "280 lei",
            duration: "1 h 30 min",
          },
          {
            name: "Oxigen hiperbaric — simplu",
            price: "210 lei",
            duration: "1 h",
          },
          { name: "Deep Lift", price: "175 lei", duration: "30 min" },
          { name: "Radiofrecvență", price: "290 lei", duration: "60 min" },
        ],
      },
      {
        title: "Microneedling",
        items: [
          { name: "Dermapen facial", price: "650 lei", duration: "1 h 30 min" },
          {
            name: "Dermapen facial + gât",
            price: "750 lei",
            duration: "1 h 30 min",
          },
          {
            name: "Dermapen facial + gât + decolteu",
            price: "900 lei",
            duration: "2 h",
          },
        ],
      },
      {
        title: "Tratamente compuse & masaj",
        items: [
          {
            name: "Microdermabraziune + masaj facial",
            price: "185 lei",
            duration: "1 h",
          },
          {
            name: "Vacuum facial + masaj facial",
            price: "185 lei",
            duration: "1 h",
          },
          {
            name: "Vacuum facial simplu",
            price: "110 lei",
            duration: "30 min",
          },
          {
            name: "Masaj facial — 30 min",
            price: "100 lei",
            duration: "30 min",
          },
          {
            name: "Masaj facial — 50 min",
            price: "130 lei",
            duration: "50 min",
          },
        ],
      },
      {
        title: "Abonament radiofrecvență",
        items: [
          {
            name: "6 ședințe de radiofrecvență",
            price: "1.450 lei",
            duration: "60 min / ședință",
            detail:
              "O ședință pe săptămână. Valabilitate: 6 săptămâni. La depășirea termenului se plătește diferența per ședință.",
          },
        ],
      },
    ],
  },
  {
    id: "tratamente-corporale",
    title: "Tratamente corporale",
    family: "Beauty",
    groups: [
      {
        title: "Ședințe individuale",
        items: [
          { name: "Electrostimulare", price: "100 lei", duration: "30 min" },
          { name: "Vacuum — abdomen", price: "100 lei", duration: "30 min" },
          {
            name: "Vacuum — picioare + fese",
            price: "110 lei",
            duration: "30 min",
          },
          {
            name: "Vacuum — regiunea geniană (ten + gât)",
            price: "100 lei",
            duration: "30 min",
          },
          { name: "Intensiv fese", price: "150 lei", duration: "40 min" },
          { name: "Vacuum dublu", price: "130 lei", duration: "30 min" },
          {
            name: "Reflexoterapie — 30 min",
            price: "100 lei",
            duration: "30 min",
          },
          {
            name: "Reflexoterapie — 50 min",
            price: "130 lei",
            duration: "50 min",
          },
        ],
      },
      {
        title: "Abonamente corporale",
        note: "Două ședințe pe săptămână. Valabilitate: 5 săptămâni. La depășirea termenului se plătește diferența per ședință.",
        items: [
          {
            name: "Electrostimulare — 8 ședințe",
            price: "680 lei",
            duration: "30 min / ședință",
            detail: "85 lei / ședință. Preț întreg: 800 lei.",
          },
          {
            name: "Vacuum — 8 ședințe",
            price: "680 lei",
            duration: "30 min / ședință",
            detail: "85 lei / ședință. Preț întreg: 800 lei.",
          },
          {
            name: "Vacuum dublu — 8 ședințe",
            price: "880 lei",
            duration: "30 min / ședință",
            detail:
              "110 lei / ședință. Preț întreg al abonamentului în listă: 960 lei.",
          },
        ],
      },
      {
        title: "Abonamente masaj facial & reflexoterapie",
        note: "La depășirea valabilității se plătește diferența per ședință.",
        items: [
          {
            name: "4 masaje faciale + 4 ședințe de reflexoterapie",
            price: "700 lei",
            duration: "4 sesiuni × 1 h",
            detail:
              "Fiecare sesiune include 30 min masaj facial și 30 min reflexoterapie. Valabilitate: 5 săptămâni. Preț întreg: 800 lei.",
          },
          {
            name: "4 ședințe — 30 min",
            price: "350 lei",
            duration: "30 min / ședință",
            detail:
              "Reflexoterapie sau masaj facial. Valabilitate: 4 săptămâni. Preț întreg: 400 lei.",
          },
          {
            name: "4 ședințe — 50 min",
            price: "470 lei",
            duration: "50 min / ședință",
            detail:
              "Reflexoterapie sau masaj facial. Valabilitate: 4 săptămâni. Preț întreg: 520 lei.",
          },
          {
            name: "8 ședințe — 30 min",
            price: "700 lei",
            duration: "30 min / ședință",
            detail:
              "Reflexoterapie sau masaj facial. Valabilitate: 5 săptămâni. Preț întreg: 800 lei.",
          },
          {
            name: "8 ședințe — 50 min",
            price: "940 lei",
            duration: "50 min / ședință",
            detail:
              "Reflexoterapie sau masaj facial. Valabilitate: 5 săptămâni. Preț întreg: 1.040 lei.",
          },
          {
            name: "12 ședințe — 30 min",
            price: "950 lei",
            duration: "30 min / ședință",
            detail:
              "Reflexoterapie sau masaj facial. Valabilitate: 7 săptămâni. Preț întreg: 1.200 lei.",
          },
          {
            name: "12 ședințe — 50 min",
            price: "1.200 lei",
            duration: "50 min / ședință",
            detail:
              "Reflexoterapie sau masaj facial. Valabilitate: 7 săptămâni. Preț întreg: 1.560 lei.",
          },
        ],
      },
      {
        title: "Suplimente pentru tratamente",
        note: "Aparate și materiale adăugate în cadrul unui tratament.",
        items: [
          { name: "Ultrasunet", price: "75 lei" },
          { name: "Fototerapie", price: "75 lei" },
          { name: "Vacuum", price: "75 lei" },
          { name: "Oxigen hiperbaric", price: "75 lei" },
          { name: "Ser", price: "25 lei" },
        ],
      },
    ],
  },
  {
    id: "manichiura-pedichiura",
    title: "Manichiură–pedichiură",
    family: "Beauty",
    groups: [
      {
        title: "Manichiură & pedichiură",
        items: [
          {
            name: "Manichiură semipermanentă",
            price: "175 lei",
            duration: "1 h 30 min",
          },
          {
            name: "Construcție mărimea 1–3",
            price: "250 lei",
            duration: "2 h",
          },
          {
            name: "Arhitectură Slim mărimea 1–3",
            price: "300 lei",
            duration: "3 h",
          },
          {
            name: "Întreținere mărimea 1–3",
            price: "210 lei",
            duration: "1 h 30 min",
          },
          { name: "Manichiură japoneză", price: "140 lei", duration: "1 h" },
          { name: "Manichiură clasică", price: "90 lei", duration: "1 h" },
          {
            name: "Manichiură express — curățare",
            price: "80 lei",
            duration: "50 min",
          },
          {
            name: "Pedichiură clasică",
            price: "130 lei",
            duration: "1 h 15 min",
          },
          {
            name: "Pedichiură express — curățare",
            price: "115 lei",
            duration: "1 h",
          },
          {
            name: "Pedichiură semipermanentă",
            price: "165 lei",
            duration: "1 h 30 min",
          },
          {
            name: "Demontare material + curățare",
            price: "90 lei",
            duration: "1 h",
          },
        ],
      },
      {
        title: "Nail art",
        note: "Se adaugă la prețul serviciului. Durată suplimentară: 10–15 min.",
        items: [
          { name: "Model minimalist — 1–2 unghii", price: "+ 15 lei" },
          { name: "Model minimalist complet", price: "+ 30 lei" },
          { name: "French / Babyboomer", price: "+ 30 lei" },
          { name: "Pietre / strasuri — până la 10 bucăți", price: "+ 15 lei" },
          { name: "Chrome / pigment", price: "+ 25 lei" },
          { name: "Nail art complex", price: "de la 50 lei" },
        ],
      },
      {
        title: "Servicii suplimentare",
        note: "Durată suplimentară: 10–15 min.",
        items: [
          { name: "Reparație unghie", price: "20 lei / unghie" },
          {
            name: "Schimbare arhitectură / corecție pat unghial",
            price: "20 lei",
          },
        ],
      },
    ],
  },
];
