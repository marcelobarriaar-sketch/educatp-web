import { INTERNSHIP_OFFERS } from "../data/content";
export function isOfferOpen(
  offer: (typeof INTERNSHIP_OFFERS)[number],
  today = new Date(),
) {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const match = offer.deadline.toLowerCase().match(/(\d+) de ([a-z]+),? (\d{4})/);
  if (!match || !months.includes(match[2])) return false;
  const end = new Date(Number(match[3]), months.indexOf(match[2]) + 1, 0);
  if (+match[1] < 1 || +match[1] > end.getDate()) return false;
  const deadline = `${match[3]}-${String(months.indexOf(match[2]) + 1).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  const current = today.toLocaleDateString("en-CA", {
    timeZone: "America/Santiago",
  });
  return deadline >= current;
}
export const practiceTools = [
  "Preparar mi CV",
  "Consejos para mi primer día",
  "Derechos y deberes",
  "Documentos de práctica",
];
