const fonts: Record<string, string> = {
  jakarta: '"Plus Jakarta Sans", system-ui, sans-serif',
  system: 'system-ui, sans-serif',
  arial: 'Arial, sans-serif',
  georgia: 'Georgia, serif',
};
export function homeAppearance(value: {bodyFont: string; headingFont: string; primaryColor: string; secondaryColor: string; accentColor: string}) {
  return {
    '--home-font': fonts[value.bodyFont] || fonts.jakarta,
    '--home-heading-font': fonts[value.headingFont] || fonts.jakarta,
    '--color-brand-green': value.primaryColor,
    '--color-brand-yellow': value.secondaryColor,
    '--color-brand-red': value.accentColor,
  };
}
