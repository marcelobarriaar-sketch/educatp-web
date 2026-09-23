import { randomBytes, timingSafeEqual } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('X-Content-Type-Options','nosniff');
  const fail = (status:number, message:string) => {res.statusCode=status;res.setHeader('Content-Type','text/plain; charset=utf-8');res.end(message);};
  if(req.method !== 'GET') return fail(405,'Método no permitido.');
  const {CMS_GITHUB_CLIENT_ID:client,CMS_GITHUB_CLIENT_SECRET:secret,CMS_ORIGIN:origin}=process.env;
  if(!client || !secret || !origin || !/^https:\/\/[a-z0-9.-]+$/.test(origin)) return fail(503,'Falta configurar el acceso a GitHub.');
  const query = new URL(req.url || '/',origin).searchParams;
  const cookies = Object.fromEntries((req.headers.cookie || '').split(';').map(c=>c.trim().split('=')));
  const state=query.get('state') || '', expected=cookies.cms_state || '';
  res.setHeader('Set-Cookie',['cms_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/cms; Max-Age=0','cms_verifier=; HttpOnly; Secure; SameSite=Lax; Path=/api/cms; Max-Age=0']);
  if(!/^[a-f0-9]{64}$/.test(state) || !/^[a-f0-9]{64}$/.test(expected) || state.length!==expected.length || !timingSafeEqual(Buffer.from(state),Buffer.from(expected)) || !cookies.cms_verifier || !query.get('code')) return fail(400,'La autorización caducó o no es válida. Cierra esta ventana y vuelve a iniciar sesión.');
  try {
    const response=await fetch('https://github.com/login/oauth/access_token',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:client,client_secret:secret,code:query.get('code'),code_verifier:cookies.cms_verifier,redirect_uri:`${origin}/api/cms/callback`}),signal:AbortSignal.timeout(10000)});
    const data=await response.json();
    if(!response.ok || !data.access_token) {
      const reasons: Record<string,string> = {
        incorrect_client_credentials: 'GitHub rechazó las credenciales del editor. Revisa CMS_GITHUB_CLIENT_ID y CMS_GITHUB_CLIENT_SECRET en Vercel para la rama de prueba.',
        redirect_uri_mismatch: 'La dirección de retorno del editor no coincide con la registrada en GitHub. Revisa CMS_ORIGIN y la URL de callback.',
        bad_verification_code: 'El código de autorización venció o fue rechazado. Cierra esta ventana y vuelve a iniciar sesión desde el editor.',
        unverified_user_email: 'Primero verifica tu correo principal en GitHub y luego vuelve a iniciar sesión.',
      };
      // Never log the response body, tokens, codes, cookies, or credentials.
      const reason=typeof data.error==='string' && Object.prototype.hasOwnProperty.call(reasons,data.error) ? data.error : 'unknown_token_error';
      console.error('[cms/oauth] token_exchange_failed', {reason, status:response.status});
      return fail(401,`${reasons[reason] || 'GitHub rechazó la autorización. El administrador puede revisar el registro del editor.'} (${reason})`);
    }
    // Verify repository write access before passing the user token to Decap.
    const repo=await fetch('https://api.github.com/repos/marcelobarriaar-sketch/educatp-web',{headers:{Authorization:`Bearer ${data.access_token}`,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});
    const permissions=await repo.json();
    if(!repo.ok || !permissions.permissions?.push) return fail(403,'Tu cuenta no tiene permiso de edición en EducaTP.');
    const message=JSON.stringify(`authorization:github:success:${JSON.stringify({token:data.access_token,provider:'github'})}`).replace(/</g,'\\u003c');
    const nonce=randomBytes(24).toString('base64');
    res.setHeader('Content-Security-Policy',`default-src 'none'; script-src 'nonce-${nonce}'; frame-ancestors 'none'`);
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(`<!doctype html><html lang="es"><meta charset="utf-8"><title>Acceso a EducaTP</title><p>Conectando con el editor…</p><script nonce="${nonce}">const origin=${JSON.stringify(origin)};if(window.opener){const receive=(event)=>{if(event.origin!==origin||event.source!==window.opener)return;window.removeEventListener('message',receive);window.opener.postMessage(${message},origin);window.close();};window.addEventListener('message',receive);window.opener.postMessage('authorizing:github',origin);}else{document.querySelector('p').textContent='Vuelve al editor e inicia sesión desde allí.';}</script></html>`);
  } catch {return fail(502,'No se pudo conectar con GitHub. Cierra esta ventana e inténtalo nuevamente.');}
}
