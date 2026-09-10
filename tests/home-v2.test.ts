import assert from 'node:assert/strict';
import { test } from 'node:test';
import { defaultNavItems, normalizeNavigation, canonicalSpecialtyLink } from '../src/lib/navigation';
import { fallbackContent, mergeHomeContent } from '../src/data/home';
import { games } from '../src/data/games';
import { PLAYGROUND_GAMES, INTERNSHIP_OFFERS } from '../src/data/content';
import { isOfferOpen } from '../src/lib/internships';
test('navigation migrates legacy names and preserves customized labels and hidden items', () => {
 const input = [{ id:'learn',path:'/recursos',name:'Recursos',visible:true }, {id:'news',path:'/blog',name:'Nuestra voz',visible:false},{id:'games',path:'/juegos',label:'Patio de Juegos',visible:true}];
 const original = JSON.stringify(input); const result = normalizeNavigation(input);
 assert.equal(result.find(x=>x.path==='/recursos')?.name,'Aprende');
 assert.equal(result.find(x=>x.path==='/blog')?.name,'Nuestra voz');
 assert.equal(result.find(x=>x.path==='/blog')?.visible,false);
 assert.equal(result.find(x=>x.path==='/playground')?.name,'Juega');
 assert.equal(result.filter(x=>x.path==='/mi-futuro').length,1);
 assert.equal(JSON.stringify(input),original);
 assert.equal(normalizeNavigation(result).filter(x=>x.path==='/mi-futuro').length,1);
 assert.deepEqual(normalizeNavigation().map(x=>x.path),defaultNavItems.map(x=>x.path));
});
test('new hub defaults coexist with all existing saved home fields', () => {
 const stored = {heroTitleLine1:'Mi portada',heroImageUrl:'/images/custom.jpg',specialties:[{title:'Personalizada',description:'Texto propio',icon:'Users',link:'/especialidades/administracion'}],hub:{title:'Mi nuevo mensaje'}, extraAdminField: {keep:true}};
 const before=JSON.stringify(stored); const merged=mergeHomeContent(stored);
 assert.equal(merged.heroTitleLine1,'Mi portada');assert.equal(merged.hub?.title,'Mi nuevo mensaje');assert.equal(merged.hub?.secondaryLink,'/playground');assert.deepEqual(merged.specialties,stored.specialties);
 assert.deepEqual((merged as typeof merged & {extraAdminField: unknown}).extraAdminField, {keep:true});assert.equal(JSON.stringify(stored),before);
 assert.equal(mergeHomeContent(null).hub?.title,'Tu futuro se aprende haciendo.');assert.deepEqual(mergeHomeContent({specialties:[]}).specialties,fallbackContent.specialties);
});
test('existing specialty aliases point to canonical working detail routes',()=>{
 assert.equal(canonicalSpecialtyLink('/especialidades/agropecuaria'),'/especialidades/agricola');
 assert.equal(canonicalSpecialtyLink('/especialidades/atencion-de-parvulos?x=1'),'/especialidades/parvularia?x=1');
});
test('Home and Playground use the same catalog, preserving unavailability',()=>{
 assert.equal(PLAYGROUND_GAMES,games);assert.equal(games.length,6);assert.equal(games.filter(x=>x.featured).length,3);
 assert.ok(games.every(x=>x.specialtyId && x.levelId && x.subject && x.type && x.estimatedTime && x.difficulty));
 assert.equal(games.filter(x=>x.available).length,0);
});
test('expired practice offers are not presented as available',()=>{
 const today=new Date('2026-09-10T16:00:00Z');assert.ok(INTERNSHIP_OFFERS.every(x=>!isOfferOpen(x,today)));
 assert.equal(isOfferOpen({...INTERNSHIP_OFFERS[0],deadline:'10 de Septiembre, 2026'},today),true);
 assert.equal(isOfferOpen({...INTERNSHIP_OFFERS[0],deadline:'31 de Febrero, 2026'},today),false);
});
