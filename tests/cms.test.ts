import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import auth from '../api/cms/auth';
import callback from '../api/cms/callback';
test('OAuth reports safe token errors without exposing response secrets or exchanging again',async()=>{
 const previous={...process.env};const original=globalThis.fetch;const originalError=console.error;
 const logs:unknown[][]=[]; console.error=(...args)=>{logs.push(args);};
 try{
  Object.assign(process.env,{CMS_GITHUB_CLIENT_ID:'test-client',CMS_GITHUB_CLIENT_SECRET:'test-secret',CMS_ORIGIN:'https://preview.example.com'});
  for(const reason of ['incorrect_client_credentials','redirect_uri_mismatch','bad_verification_code','unverified_user_email','sensitive-unknown-error','toString']){
   let calls=0;
   globalThis.fetch=async()=>{calls++;return new Response(JSON.stringify({error:reason,error_description:'sensitive-response-body',refresh_token:'sensitive-refresh-token'}),{status:200});};
   const state='a'.repeat(64);const res=response();
   await callback({method:'GET',url:'/api/cms/callback?code=sensitive-code&state='+state,headers:{cookie:`cms_state=${state}; cms_verifier=sensitive-verifier`}} as any,res as any);
   assert.equal(res.statusCode,401);assert.equal(calls,1);
   assert.match(res.body,new RegExp(reason==='sensitive-unknown-error'||reason==='toString'?'unknown_token_error':reason));
   assert.doesNotMatch(res.body+JSON.stringify(logs),/sensitive-|test-secret/);
  }
 }finally{globalThis.fetch=original;console.error=originalError;for(const key of ['CMS_GITHUB_CLIENT_ID','CMS_GITHUB_CLIENT_SECRET','CMS_ORIGIN']){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
});
const config=JSON.parse(readFileSync('public/editor/config.json','utf8'));
const content=JSON.parse(readFileSync('content/home.json','utf8'));
function response() {return {statusCode:200,headers:{} as Record<string,unknown>,body:'',setHeader(k:string,v:unknown){this.headers[k]=v;},end(v=''){this.body=v;}};}
test('pilot edits an isolated branch and fields have existing content',()=>{
 assert.equal(config.backend.branch,'codex/decap-home-pilot');
 assert.equal(config.publish_mode,'editorial_workflow');
 const file=config.collections[0].files[0]; assert.equal(file.file,'content/home.json');
 for(const field of file.fields) assert.ok(field.name in content,field.name);
 assert.equal(content.hub.title,'Tu futuro se aprende haciendo.');
 assert.equal(content.heroImageUrl,'/images/home/administracion.JPG');
});
test('OAuth refuses missing configuration; creates secure state and PKCE when configured',()=>{
 const previous={...process.env};
 try {
  delete process.env.CMS_GITHUB_CLIENT_ID;const no=response();auth({method:'GET'} as any,no as any);assert.equal(no.statusCode,503);
  Object.assign(process.env,{CMS_GITHUB_CLIENT_ID:'test-client',CMS_GITHUB_CLIENT_SECRET:'test-secret',CMS_ORIGIN:'https://preview.example.com'});
  const res=response();auth({method:'GET'} as any,res as any);assert.equal(res.statusCode,302);
  const url=new URL(res.headers.Location as string);assert.equal(url.origin,'https://github.com');assert.equal(url.searchParams.get('scope'),'public_repo');assert.equal(url.searchParams.get('code_challenge_method'),'S256');assert.equal(url.searchParams.get('state')?.length,64);
  assert.match(String(res.headers['Set-Cookie']),/HttpOnly; Secure; SameSite=Lax/);
  assert.ok(!res.body.includes('test-secret'));
 }finally{for(const key of ['CMS_GITHUB_CLIENT_ID','CMS_GITHUB_CLIENT_SECRET','CMS_ORIGIN']){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
});
test('OAuth rejects forged state before any token exchange',async()=>{
 const previous={...process.env};const original=globalThis.fetch;let called=false;
 try{
  Object.assign(process.env,{CMS_GITHUB_CLIENT_ID:'test-client',CMS_GITHUB_CLIENT_SECRET:'test-secret',CMS_ORIGIN:'https://preview.example.com'});
  globalThis.fetch=async()=>{called=true;throw Error('must not call');};
  for(const state of ['bad','é'.repeat(64)]){const res=response();await callback({method:'GET',url:'/api/cms/callback?code=x&state='+state,headers:{cookie:'cms_state='+ 'a'.repeat(64)+'; cms_verifier=test'}} as any,res as any);assert.equal(res.statusCode,400);}
  assert.equal(called,false);
 }finally{globalThis.fetch=original;for(const key of ['CMS_GITHUB_CLIENT_ID','CMS_GITHUB_CLIENT_SECRET','CMS_ORIGIN']){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
});
