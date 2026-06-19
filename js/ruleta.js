const premios = [
  { label: '10% OFF',     color: '#2D4A35', text: '#F18F01', desc: '10% de descuento en cualquier café',       codigo: 'CAFE10'   },
  { label: '15% OFF',     color: '#1E2D24', text: '#F5F0EB', desc: '15% de descuento en tu pedido',            codigo: 'CAFE15'   },
  { label: 'Café gratis', color: '#F18F01', text: '#1E2D24', desc: 'Un café espresso sin cargo',               codigo: 'FREECAFE' },
  { label: '20% OFF',     color: '#334139', text: '#F18F01', desc: '20% en cualquier bebida',                  codigo: 'CAFE20'   },
  { label: '5% OFF',      color: '#3D5A45', text: '#F5F0EB', desc: '5% de descuento en tu café',               codigo: 'CAFE5'    },
  { label: 'Medialunas',  color: '#1E2D24', text: '#F18F01', desc: '2 medialunas gratis con tu café',          codigo: 'MEDIA2'   },
  { label: '25% OFF',     color: '#F18F01', text: '#1E2D24', desc: '25% de descuento, hoy es tu día',          codigo: 'CAFE25'   },
  { label: 'Sin suerte',  color: '#253830', text: '#A8B5A0', desc: 'Mejor suerte la próxima vez',              codigo: null       },
];

const canvas = document.getElementById('ruletaCanvas');
const ctx = canvas.getContext('2d');
const total = premios.length;
const arco = (2 * Math.PI) / total;
let anguloActual = 0;
let girando = false;
let yaGiro = false;

function dibujarRuleta(angulo) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 10;

  for (let i = 0; i < total; i++) {
    const inicio = angulo + i * arco;
    const fin = inicio + arco;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, inicio, fin);
    ctx.closePath();
    ctx.fillStyle = premios[i].color;
    ctx.fill();
    ctx.strokeStyle = '#F18F01';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(inicio + arco / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = premios[i].text;
    ctx.font = '500 14px Inter, sans-serif';
    ctx.fillText(premios[i].label, r - 12, 5);
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
  ctx.fillStyle = '#F18F01';
  ctx.fill();
  ctx.strokeStyle = '#1E2D24';
  ctx.lineWidth = 2;
  ctx.stroke();
}

dibujarRuleta(0);

function girarRuleta() {
  if (girando || yaGiro) return;
  girando = true;
  yaGiro = true;
  document.getElementById('girarBtn').disabled = true;
  document.getElementById('resultado').innerHTML = '';

  const vueltasExtra = (Math.floor(Math.random() * 5) + 5) * 2 * Math.PI;
  const anguloFinal = Math.random() * 2 * Math.PI;
  const totalGiro = vueltasExtra + anguloFinal;
  const duracion = 4000;
  const inicio = performance.now();
  const anguloInicio = anguloActual;

  function animar(ahora) {
    const t = Math.min((ahora - inicio) / duracion, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    anguloActual = anguloInicio + totalGiro * ease;
    dibujarRuleta(anguloActual);
    if (t < 1) {
      requestAnimationFrame(animar);
    } else {
      girando = false;
      mostrarResultado(anguloActual);
    }
  }
  requestAnimationFrame(animar);
}

function mostrarResultado(angulo) {
  const puntero = -Math.PI / 2;
  const normalizado = ((puntero - angulo) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  const idx = Math.floor(normalizado / arco) % total;
  const premio = premios[idx];
  const div = document.getElementById('resultado');

  if (!premio.codigo) {
    div.innerHTML = `<div class="result-card"><p class="result-premio sinsuerte">Sin suerte esta vez</p><p class="result-desc">Volvé a intentarlo en tu próxima visita</p></div>`;
    document.getElementById('girarBtn').disabled = false;
    yaGiro = false;
    return;
  }

  div.innerHTML = `
    <div class="result-card">
      <p class="result-premio">${premio.label}</p>
      <p class="result-desc">${premio.desc}</p>
      <span class="result-codigo">${premio.codigo}</span>
    </div>`;
}