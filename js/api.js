// TU endpoint real de API Gateway.
const API_URL = 'https://flt9aaekyb.execute-api.us-east-1.amazonaws.com/dev/contact/id';
 
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.ebook-download-form');
  if (!form) return;
 
  form.addEventListener('submit', async (event) => {
    // Evitamos la recarga normal del formulario.
    event.preventDefault();
 
    // Leemos los valores del DOM.
    const name = document.getElementById('ebook-form-name').value.trim();
    const email = document.getElementById('ebook-email').value.trim();
    const payload = { name, email };
    console.log('Payload:', payload);
 
    try {
      // Enviamos JSON mediante POST.
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
 
      const result = await response.json();
      // API Gateway puede envolver la respuesta Lambda en { statusCode, body }.
      const data = typeof result.body === 'string'
        ? JSON.parse(result.body)
        : (result.body ?? result);

      if (!response.ok || (result.statusCode && result.statusCode >= 400)) {
        throw new Error(data.error ?? 'Error al enviar');
      }

      alert(data.message ?? 'Solicitud recibida correctamente');
      form.reset();
    } catch (error) {
      console.error('Error API:', error);
      alert(error.message);
    }
  });
});
