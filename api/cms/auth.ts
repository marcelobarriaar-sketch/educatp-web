import { randomBytes, createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
export default function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') { res.statusCode = 405; res.end(); return; }
  const { CMS_GITHUB_CLIENT_ID: client, CMS_GITHUB_CLIENT_SECRET: secret, CMS_ORIGIN: origin } = process.env;
  if (!client || !secret || !origin || !/^https:\/\/[a-z0-9.-]+$/.test(origin)) {
    res.statusCode = 503; res.setHeader('Content-Type','text/plain; charset=utf-8');
    res.end('El editor está preparado, pero falta conectar GitHub. Configura CMS_GITHUB_CLIENT_ID, CMS_GITHUB_CLIENT_SECRET y CMS_ORIGIN en Vercel.'); return;
  }
  const state = randomBytes(32).toString('hex');
  const verifier = randomBytes(32).toString('base64url');
  res.setHeader('Set-Cookie', [
    `cms_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/cms; Max-Age=600`,
    `cms_verifier=${verifier}; HttpOnly; Secure; SameSite=Lax; Path=/api/cms; Max-Age=600`,
  ]);
  const url = new URL('https://github.com/login/oauth/authorize');
  url.search = new URLSearchParams({client_id:client,redirect_uri:`${origin}/api/cms/callback`,scope:'public_repo',state,code_challenge:createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'S256'}).toString();
  res.statusCode = 302; res.setHeader('Location',url.toString()); res.end();
}
