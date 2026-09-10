import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';

test('Supabase page reader selects existing slugs, shares concurrent reads and preserves JSON',async()=>{
 const server=await createServer({server:{middlewareMode:true},appType:'custom'});
 const previous=globalThis.fetch; const calls=[]; let fail=false;
 globalThis.fetch=async (input)=>{
  const url=new URL(String(input));calls.push(url);
  if(fail)return new Response(JSON.stringify({message:'Unavailable'}),{status:503,headers:{'Content-Type':'application/json'}});
  return new Response(JSON.stringify({content:{siteName:'Nombre guardado',hub:{title:'Mensaje guardado'},untouched:{enabled:false,amount:0}}}),{headers:{'Content-Type':'application/json'}});
 };
 try {
  const {loadPageContent}=await server.ssrLoadModule('/src/lib/pages.ts');
  const [a,b]=await Promise.all([loadPageContent('site_settings'),loadPageContent('site_settings')]);
  assert.equal(calls.length,1);assert.equal(calls[0].searchParams.get('slug'),'eq.site_settings');assert.equal(calls[0].searchParams.get('select'),'content');assert.deepEqual(a,b);assert.deepEqual(a.untouched,{enabled:false,amount:0});
  const home=await loadPageContent('home');assert.equal(calls[1].searchParams.get('slug'),'eq.home');assert.equal(home.hub.title,'Mensaje guardado');
  fail=true;await assert.rejects(loadPageContent('home'));fail=false;assert.ok(await loadPageContent('home'));
 } finally {globalThis.fetch=previous;await server.close();}
});
