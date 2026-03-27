export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const MEMORIES: Memory[] = [
  {
    id: 1,
    date: "17 Giugno 2023",
    title: "Il nostro primo incontro",  
    description: "Quel gelato che ha cambiato tutto. Non avrei mai immaginato che saresti diventata il mio mondo.",
    image: `${import.meta.env.BASE_URL}images/primo-incontro.jpg`,
  },
  {
    id: 2,
    date: "24 Dicembre 2024",
    title: "Il nostro primo Natale insieme",
    description: "Tra luci, regali e il calore di casa. Il primo di una lunga serie.",
    image: `${import.meta.env.BASE_URL}images/primo-natale.jpg`,
  },
  {
    id: 3,
    date: "01 Aprile 2025",
    title: "Quella vacanza indimenticabile",
    description: "Una vacanza incredibile, tra magia ed emozioni.",
    image: `${import.meta.env.BASE_URL}images/londra.jpg`,
  },
  {
    id: 4,
    date: "28 Gennaio 2025",
    title: "L'inizio di una promessa...!",
    description: "Il giorno in cui mi hai detto il primo si, in attesa del secondo definitivo!",
    image: `${import.meta.env.BASE_URL}images/promessa.jpg`,
  },
  {
    id: 5,
    date: "Oggi",
    title: "I tuoi 30 anni!",
    description: "Un traguardo importante per una persona straordinaria. Ti amo infinitamente.",
    image: `${import.meta.env.BASE_URL}images/lei.jpg`,
  },
];

export const COUPONS: Coupon[] = [
  {
    id: "sushi",
    title: "Cena a base di Sushi",
    description: "Una serata all'insegna del tuo cibo preferito, offro io!",
    icon: "🍣",
  },
  {
    id: "movie",
    title: "Scegli tu il Film stasera",
    description: "Niente lamentele, stasera guardiamo quello che vuoi tu.",
    icon: "🎬",
  },
  {
    id: "trip",
    title: "Gita fuori porta",
    description: "Un weekend a sorpresa in una meta che adorerai.",
    icon: "🚗",
  },
  {
    id: "picnic",
    title: "Picnic al Tramonto",
    description: "Una coperta, del buon vino e il sole che cala. Solo noi due.",
    icon: "🧺",
  },
  {
    id: "breakfast",
    title: "Colazione a letto",
    description: "Domenica mattina con cornetto, caffè e tante coccole.",
    icon: "🥐",
  },
  {
    id: "shopping",
    title: "Pomeriggio di Shopping",
    description: "Scegli quello che vuoi, oggi il portafoglio lo apro io!",
    icon: "🛍️",
  },
  {
    id: "concert",
    title: "Biglietti per un Concerto",
    description: "Andiamo a vedere il tuo artista preferito dal vivo!",
    icon: "🎫",
  },
  {
    id: "grogu-force",
    title: "Lezione di Forza con Grogu",
    description: "Un'esperienza intergalattica che non dimenticherai mai!",
    icon: "✨",
  },
  {
    id: "harry-potter",
    title: "Lettera per Hogwarts",
    description: "La magia ti aspetta... sei pronta a scoprire il tuo vero potenziale?",
    icon: "🦉",
  },
];
