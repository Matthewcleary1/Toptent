import type { Locale } from "./config";

const exact: Record<string, string> = {
  "Request received.": "Solicitud recibida.",
  "We couldn't send that right now.": "No hemos podido enviarlo ahora mismo.",
  "Please check the submitted information.": "Revisa la información enviada.",
  "Too many requests. Please try again later.": "Demasiadas solicitudes. Inténtalo de nuevo más tarde.",
  "Thanks — your request has been received.": "Gracias — hemos recibido tu solicitud.",
  "Thanks — your enquiry has been sent to Tenttop.": "Gracias — tu consulta se ha enviado a Tenttop.",
  "We’ll check it for you and get back to you with compatibility guidance.": "Lo revisaremos y te responderemos con orientación sobre compatibilidad.",
  "Installation request received — we’ll confirm the vehicle setup and date with you.": "Solicitud de instalación recibida — confirmaremos contigo la configuración del vehículo y la fecha.",
  "Reservation received. We’ll contact you to confirm compatibility, collection/installation and any deposit.": "Reserva recibida. Te contactaremos para confirmar compatibilidad, recogida/instalación y cualquier depósito aplicable.",
  "We couldn't create the reservation.": "No hemos podido crear la reserva.",
  "We couldn't complete that request right now. Please try again.": "No hemos podido completar la solicitud ahora mismo. Inténtalo de nuevo.",
  "We couldn't send that right now. Please try again.": "No hemos podido enviarlo ahora mismo. Inténtalo de nuevo.",
};

export function localizeServerMessage(message: string, locale: Locale): string {
  return locale === "es" ? exact[message] ?? message : message;
}
