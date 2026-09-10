import { repairText } from "./text";
export type MenuItem = {
  id?: string;
  name?: string;
  label?: string;
  path: string;
  visible?: boolean;
};
export const defaultNavItems: MenuItem[] = [
  { id: "inicio", name: "Inicio", path: "/" },
  { id: "especialidades", name: "Especialidades", path: "/especialidades" },
  { id: "recursos", name: "Aprende", path: "/recursos" },
  { id: "patio", name: "Juega", path: "/playground" },
  { id: "practicas", name: "Mundo Laboral", path: "/practicas" },
  { id: "blog", name: "Actualidad TP", path: "/blog" },
  { id: "futuro", name: "Mi Futuro", path: "/mi-futuro" },
].map((item) => ({ ...item, visible: true }));
const oldLabels: Record<string, string[]> = {
  "/recursos": ["Recursos"],
  "/playground": ["Patio de Juegos", "Juegos", "Patio TP"],
  "/practicas": ["Prácticas", "Prácticas Profesionales"],
  "/blog": ["Blog TP", "Blog"],
};
export function normalizeNavigation(
  items?: MenuItem[],
  legacy?: MenuItem[],
): MenuItem[] {
  const source = items?.length
    ? items
    : legacy?.length
      ? legacy
      : defaultNavItems;
  const normalized = source.map((item, index) => {
    const path = item.path === "/juegos" ? "/playground" : item.path || "/";
    const current = repairText(item.name || item.label || "");
    const standard = defaultNavItems.find((item) => item.path === path);
    const name =
      !current ||
      oldLabels[path]?.some(
        (old) => old.toLowerCase() === current.toLowerCase(),
      )
        ? standard?.name || current
        : current;
    return {
      ...item,
      id: item.id || `menu-${index}`,
      path,
      name,
      visible: item.visible !== false,
    };
  });
  if (!normalized.some((item) => item.path === "/mi-futuro"))
    normalized.push({
      ...defaultNavItems[6],
      id: "futuro",
      name: "Mi Futuro",
      visible: true,
    });
  const rank = (path: string) => {
    const index = defaultNavItems.findIndex((item) => item.path === path);
    return index < 0 ? 99 : index;
  };
  return normalized.sort((a, b) => rank(a.path) - rank(b.path));
}
export function canonicalSpecialtyId(id: string) {
  return (
    (
      {
        agropecuaria: "agricola",
        "atencion-de-parvulos": "parvularia",
        parvulos: "parvularia",
      } as Record<string, string>
    )[id] || id
  );
}
export function canonicalSpecialtyLink(link: string) {
  return link.replace(
    /^(\/(?:especialidades|recursos)\/)([^/#?]+)/,
    (_, prefix, id) => prefix + canonicalSpecialtyId(id),
  );
}
