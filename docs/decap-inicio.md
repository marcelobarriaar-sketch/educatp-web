# Prueba de Inicio con Decap

Esta etapa migra la portada a `content/home.json`. La web no necesita Supabase para abrir Inicio. El editor vive en `/editor/` y usa GitHub, con una rama de prueba fija: `codex/decap-home-pilot`. Publicar en Decap actualiza esa rama, no `main`.

## Alcance

Editables: textos y botones de portada, fotografía principal, frases sobre y debajo de la foto, accesos rápidos, tarjetas de especialidades, textos de presentación de las secciones, cifras, historias provisionales, fuentes, colores y tamaño del título.
Los catálogos de juegos, noticias y ofertas conservan su fuente actual; se migrarán con sus páginas. Cabecera y pie de Inicio conservan los valores de respaldo que muestra actualmente producción, porque la configuración remota no pudo recuperarse. No se han borrado datos ni tablas de Supabase.

## Prueba local

1. `npm ci`
2. `npm run dev`
3. En otra terminal, `BIND_HOST=127.0.0.1 npm run cms:local`.
4. Abrir `/editor/` en la dirección local de Vite. El proxy solo se activa para localhost/127.0.0.1 y guarda archivos locales; no publica en GitHub.

## Conectar GitHub en Vercel

Registrar una OAuth App en la cuenta propietaria, con la URL estable del despliegue de prueba como Homepage URL y `<CMS_ORIGIN>/api/cms/callback` como Authorization callback URL. Guardar exclusivamente en variables de servidor de Vercel, entorno Preview:

- `CMS_GITHUB_CLIENT_ID`
- `CMS_GITHUB_CLIENT_SECRET`
- `CMS_ORIGIN`: origen HTTPS exacto del despliegue de prueba, sin barra final.

No utilizar el prefijo `VITE_` para secretos. No copiar secretos al repositorio ni al chat. Redesplegar la rama tras configurar las variables. Entrar en `/editor/` desde el origen exacto configurado. La autorización solicita `public_repo`, el permiso estándar de OAuth para repositorios públicos; este alcance de GitHub no se limita únicamente a EducaTP. La pantalla de consentimiento debe ser revisada por el propietario.

La autorización comprueba state, usa PKCE y cookies HttpOnly, limita el postMessage al origen configurado y comprueba permiso de escritura sobre el repositorio. Hasta completar este registro, el editor remoto muestra el acceso, pero no puede guardar en GitHub.

## Validación antes de producción

- Iniciar sesión, editar, guardar borrador, revisar y publicar en la rama de prueba.
- Confirmar que GitHub guarda el contenido y que Vercel genera la vista previa.
- Verificar la web en escritorio y móvil.
- Revisar si existen contenidos remotos que deban recuperarse antes de eliminar Supabase.
- Solo después de revisar el piloto, decidir el paso a producción y actualizar deliberadamente la rama del CMS y su origen de autorización. No fusionar este piloto a ciegas.
