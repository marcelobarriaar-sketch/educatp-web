(async function () {
  const status = document.getElementById('setup-status');
  try {
    if (!window.CMS) throw new Error('No se pudo descargar el editor. Revisa tu conexión y recarga.');
    const response = await fetch('/editor/config.json');
    if (!response.ok) throw new Error('No se pudo cargar la configuración del editor.');
    const config = await response.json();
    config.load_config_file = false;
    config.backend.base_url = window.location.origin;
    config.site_url = window.location.origin;
    config.display_url = window.location.origin;
    // The local proxy is never enabled on a remote deployment.
    if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      config.local_backend = {url:'http://localhost:8081/api/v1'};
      config.publish_mode = 'simple';
    }
    window.CMS.init({config});
    status.remove();
  } catch (error) {status.textContent = error.message;}
})();
