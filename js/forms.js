/**
 * CafeterIA — Validación de formularios (reservas y contacto)
 */

document.addEventListener('DOMContentLoaded', () => {
  initReservationForm();
  initContactForm();
});

function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateReservationForm(form)) return;

    const confirmation = document.getElementById('reservation-confirmation');
    if (confirmation) {
      form.style.display = 'none';
      confirmation.classList.add('show');
    }
  });

  const dateInput = form.querySelector('#fecha');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateContactForm(form)) return;

    const confirmation = document.getElementById('contact-confirmation');
    if (confirmation) {
      form.style.display = 'none';
      confirmation.classList.add('show');
    }
  });
}

function validateReservationForm(form) {
  let isValid = true;
  const fields = [
    { id: 'nombre', message: 'Ingresá tu nombre' },
    { id: 'email', message: 'Ingresá un email válido', type: 'email' },
    { id: 'telefono', message: 'Ingresá tu teléfono' },
    { id: 'fecha', message: 'Seleccioná una fecha' },
    { id: 'hora', message: 'Seleccioná un horario' },
    { id: 'personas', message: 'Indicá la cantidad de personas' }
  ];

  fields.forEach(field => {
    const input = form.querySelector(`#${field.id}`);
    const error = form.querySelector(`#${field.id}-error`);
    if (!input) return;

    let fieldValid = input.value.trim() !== '';

    if (field.type === 'email' && fieldValid) {
      fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }

    if (field.id === 'personas' && fieldValid) {
      fieldValid = parseInt(input.value) >= 1 && parseInt(input.value) <= 20;
      if (!fieldValid) {
        error.textContent = 'La cantidad debe ser entre 1 y 20';
      }
    }

    input.classList.toggle('error', !fieldValid);
    if (error) {
      error.classList.toggle('show', !fieldValid);
      if (!fieldValid && field.id !== 'personas') {
        error.textContent = field.message;
      }
    }

    if (!fieldValid) isValid = false;
  });

  return isValid;
}

function validateContactForm(form) {
  let isValid = true;
  const fields = [
    { id: 'contact-nombre', message: 'Ingresá tu nombre' },
    { id: 'contact-email', message: 'Ingresá un email válido', type: 'email' },
    { id: 'contact-mensaje', message: 'Escribí tu mensaje' }
  ];

  fields.forEach(field => {
    const input = form.querySelector(`#${field.id}`);
    const error = form.querySelector(`#${field.id}-error`);
    if (!input) return;

    let fieldValid = input.value.trim() !== '';

    if (field.type === 'email' && fieldValid) {
      fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }

    if (field.id === 'contact-mensaje' && fieldValid) {
      fieldValid = input.value.trim().length >= 10;
      if (!fieldValid) {
        error.textContent = 'El mensaje debe tener al menos 10 caracteres';
      }
    }

    input.classList.toggle('error', !fieldValid);
    if (error) {
      error.classList.toggle('show', !fieldValid);
      if (!fieldValid && field.id !== 'contact-mensaje') {
        error.textContent = field.message;
      }
    }

    if (!fieldValid) isValid = false;
  });

  return isValid;
}
