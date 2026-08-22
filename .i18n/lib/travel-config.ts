import type { Locale } from "@/lib/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type TravelAddOn = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  purchasePriceEur: number | null;
  rentalDailyPriceEur: number | null;
};

export const buildBase = {
  id: "aluminium-hard-shell",
  name: {
    en: "Pop-Up Aluminium Rooftop Tent",
    es: "Tienda de techo de aluminio pop-up",
  } satisfies LocalizedText,
  priceEur: 1200,
  imageUrl:
    "https://static.wixstatic.com/media/97a3ea_ac32f25699c748ebb997c067f1dd5f99~mv2.jpg/v1/fit/w_984,h_816,q_90/file.jpg",
};

export const rentalTents = [
  { id: "solar-pop-up", name: { en: "Solar-Powered Pop-Up Rooftop Tent", es: "Tienda de techo pop-up con energía solar" } satisfies LocalizedText },
  { id: "aluminium-pop-up", name: { en: "Pop-Up Aluminium Rooftop Tent", es: "Tienda de techo de aluminio pop-up" } satisfies LocalizedText },
  { id: "large-soft-shell", name: { en: "Large Soft-Shell Rooftop Tent", es: "Tienda de techo soft-shell grande" } satisfies LocalizedText },
  { id: "four-season", name: { en: "Four-Season Rooftop Tent", es: "Tienda de techo para cuatro estaciones" } satisfies LocalizedText },
] as const;

export const travelAddOns: TravelAddOn[] = [
  {
    id: "roof-rack",
    name: { en: "Vehicle roof rack", es: "Baca / portaequipajes" },
    description: {
      en: "A compatible rack or cross-bar setup matched to the vehicle and tent requirements.",
      es: "Una baca o barras compatibles, adaptadas a los requisitos del vehículo y de la tienda.",
    },
    purchasePriceEur: null,
    rentalDailyPriceEur: null,
  },
  {
    id: "solar-panels",
    name: { en: "Solar panels", es: "Paneles solares" },
    description: {
      en: "Add off-grid charging capability to the aluminium base setup.",
      es: "Añade capacidad de carga fuera de la red a la configuración base de aluminio.",
    },
    purchasePriceEur: null,
    rentalDailyPriceEur: null,
  },
  {
    id: "starlink",
    name: { en: "Starlink", es: "Starlink" },
    description: {
      en: "Add satellite connectivity for remote-working and longer trips where service is supported.",
      es: "Añade conectividad por satélite para trabajo remoto y viajes largos donde exista cobertura.",
    },
    purchasePriceEur: null,
    rentalDailyPriceEur: null,
  },
  {
    id: "shower",
    name: { en: "Travel shower", es: "Ducha de viaje" },
    description: {
      en: "A compact outdoor shower option for a more self-contained road-trip setup.",
      es: "Una opción de ducha exterior compacta para viajar de forma más autónoma.",
    },
    purchasePriceEur: null,
    rentalDailyPriceEur: null,
  },
  {
    id: "table-chairs",
    name: { en: "Table & chairs", es: "Mesa y sillas" },
    description: {
      en: "Compact camping furniture for eating, working and relaxing at camp.",
      es: "Mobiliario de camping compacto para comer, trabajar y relajarse en el campamento.",
    },
    purchasePriceEur: null,
    rentalDailyPriceEur: null,
  },
];
