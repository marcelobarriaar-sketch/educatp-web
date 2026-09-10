import assert from 'node:assert/strict';
import { test } from 'node:test';
import { repairText } from '../src/lib/text.ts';

test('restores the administrator labels shown in production', () => {
  assert.equal(repairText('P√°ginas y subp√°ginas'), 'Páginas y subpáginas');
  assert.equal(repairText('Desde aqu√≠: men√∫, Administraci√≥n, P√°rvulos'), 'Desde aquí: menú, Administración, Párvulos');
});
test('repairs legacy and double-encoded saved content in one pass', () => {
  assert.equal(repairText('‚àö¬∞ ‚àö¬© ‚àö‚â† ‚àö‚â• ‚àö‚à´ ‚àö¬±'), 'á é í ó ú ñ');
  assert.equal(repairText('Ã¡ Ã© Ã­ Ã³ Ãº Ã±'), 'á é í ó ú ñ');
  assert.equal(repairText('√Å √â √ç √ì √ö √ë ¬∞ ¬ø ¬°'), 'Á É Í Ó Ú Ñ ° ¿ ¡');
});
test('preserves valid text, URLs, markup and mathematical symbols', () => {
  const valid = 'Educación, pingüino, ÁÉÍÓÚÑÜ ¿Sí? ¡Sí! 360° √2 ≥ 3 <p>“Hola”</p> https://educatp.cl/a?x=1&y=2';
  assert.equal(repairText(valid), valid);
});
test('can be run repeatedly when loading and saving', () => {
  const first = repairText('P√°ginas y Administraci√≥n');
  assert.equal(repairText(first), first);
});
