import type { Faq } from "@/lib/data";
import type { Locale } from "./config";

const translations: Array<{ match: RegExp; question: string; answer: string }> = [
  { match: /fit my car|fit my vehicle|will it fit/i, question: "¿Una tienda de techo Tenttop es compatible con mi coche?", answer: "Depende del techo del vehículo, de las barras o la baca, de sus límites de carga y separación, y de la tienda elegida. Envíanos marca, modelo, año y la configuración actual del techo y lo revisaremos contigo." },
  { match: /need roof bars|roof bars or a roof rack/i, question: "¿Necesito barras de techo o una baca?", answer: "Sí. Los herrajes de montaje de la tienda no sustituyen el sistema de soporte fijado al vehículo. Necesitas barras transversales adecuadas o una plataforma/baca compatible y con la capacidad de carga correcta." },
  { match: /how much weight can my roof/i, question: "¿Cuánto peso puede soportar el techo de mi coche?", answer: "Hay que seguir las indicaciones de carga del fabricante del vehículo y la capacidad real de las barras o la baca. La carga dinámica durante la conducción y la carga estática con el vehículo parado son consideraciones distintas." },
  { match: /can you install/i, question: "¿Podéis instalarla?", answer: "Puedes solicitar instalación con Tenttop. Primero revisamos el vehículo, la configuración del techo y la tienda; después confirmamos el montaje, la fecha y cualquier coste aplicable." },
  { match: /collect it or have it delivered|can i collect/i, question: "¿Puedo recogerla o recibirla a domicilio?", answer: "La entrega depende de tu ubicación, de la tienda y de si la instalación forma parte del servicio. Dinos dónde estás y confirmaremos la opción de recogida o entrega disponible antes de que te comprometas." },
  { match: /can you deliver/i, question: "¿Hacéis entregas?", answer: "Podemos confirmar opciones de entrega según el destino y la tienda. Envíanos la ubicación y te indicaremos disponibilidad y, si corresponde, el precio antes de la compra." },
  { match: /what comes with|included/i, question: "¿Qué incluye la tienda?", answer: "Cada ficha de producto muestra únicamente el equipamiento verificado para ese modelo. Los elementos incluidos varían entre las distintas tiendas Tenttop." },
  { match: /mattress/i, question: "¿Incluye colchón?", answer: "Sí. Todos los modelos actuales de Tenttop incluyen colchón. La Large Soft Shell especifica 5 cm y la Four-Season 4 cm; los dos modelos pop-up de aluminio incluyen colchón de espuma sin un grosor publicado." },
  { match: /solar equipment|solar model/i, question: "¿Qué incluye el modelo solar?", answer: "El modelo Solar-Powered Pop-Up incluye paneles solares integrados, power box y conexiones USB/USB-C. No publicamos la potencia de los paneles hasta que esa especificación esté confirmada." },
  { match: /waterproof/i, question: "¿Es impermeable?", answer: "Las fichas actuales publican las clasificaciones de impermeabilidad de los tejidos para cada modelo. Consulta la página del producto concreto para ver los materiales y valores verificados." },
  { match: /warranty/i, question: "¿Qué garantía incluye?", answer: "Actualmente no se publica un periodo de garantía en la web. Pídenos las condiciones vigentes antes de comprar y confirmaremos lo que corresponde al modelo que estés valorando." },
  { match: /how long does installation/i, question: "¿Cuánto tarda la instalación?", answer: "No publicamos una duración fija porque depende del vehículo, las barras o la baca y los requisitos de montaje. Confirmamos el tiempo cuando conocemos la configuración concreta." },
];

export function localizeFaqs(faqs: Faq[], locale: Locale): Faq[] {
  if (locale !== "es") return faqs;
  return faqs.map((faq) => {
    const tr = translations.find((item) => item.match.test(faq.question));
    return tr ? { ...faq, question: tr.question, answer: tr.answer } : faq;
  });
}
