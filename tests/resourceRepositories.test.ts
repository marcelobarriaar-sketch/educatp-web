import assert from 'node:assert/strict';
import { test } from 'node:test';
import { groupAdministrationResources } from '../src/lib/resourceRepositories.ts';

test('creates empty repositories for each level in the requested order', () => {
  const third = groupAdministrationResources('3', [], () => '');
  assert.deepEqual(third.map(group => group.name), [
    'Aplicaciones Informáticas para la Gestión Administrativa',
    'Gestión Comercial y Tributaria', 'Organización de Oficinas',
    'Utilización de la Información Contable', 'Procesos Administrativos',
    'Servicio de Atención de Clientes',
  ]);
  assert.equal(groupAdministrationResources('4', [], () => '').length, 5);
  assert.ok(third.every(group => group.resources.length === 0));
});

test('keeps saved resources in the correct repository without duplicates or loss', () => {
  const resources = [
    { subjectId: 'atencion-cliente', url: 'https://example.com/one' },
    { subjectName: 'Atención al cliente', url: 'https://example.com/two' },
    { subjectName: 'Servicio de Atención de Clientes', url: 'https://example.com/three' },
    { subjectName: 'Asignatura adicional', url: 'https://example.com/extra' },
  ];
  const groups = groupAdministrationResources('3', resources, resource => resource.subjectName || 'General');
  assert.equal(groups.find(group => group.id === 'atencion-cliente')?.resources.length, 3);
  assert.deepEqual(groups.flatMap(group => group.resources), resources);
  assert.equal(groups.length, 7);
  const legacy = { subjectName: 'Desarrollo y bienestar organizacional' };
  assert.equal(groupAdministrationResources('4', [legacy], () => '')
    .find(group => group.name === 'Desarrollo y Bienestar del Personal')?.resources[0], legacy);
});
