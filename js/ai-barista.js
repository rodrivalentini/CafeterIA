/**
 * CafeterIA — Barista Virtual (IA)
 * Recomendación de café basada en palabras clave
 */

const COFFEE_MENU = [
  {
    name: 'El GPT Espresso',
    desc: 'Espresso doble concentrado, tan directo como una respuesta de IA.',
    price: '$2.500',
    keywords: ['cansado', 'energía', 'energia', 'fuerte', 'intenso', 'despierto', 'productivo', 'trabajar', 'concentrar', 'espresso', 'potente', 'rápido', 'rapido', 'directo']
  },
  {
    name: 'Latte Gemini',
    desc: 'Latte cremoso con dos capas de sabor en perfecta armonía.',
    price: '$3.200',
    keywords: ['equilibrado', 'balance', 'suave', 'cremoso', 'armonía', 'armonia', 'clásico', 'clasico', 'tradicional', 'latte', 'leche', 'doble']
  },
  {
    name: 'Cortado Llama',
    desc: 'Pequeño, potente y de código abierto.',
    price: '$2.800',
    keywords: ['corto', 'pequeño', 'pequeno', 'rápido', 'rapido', 'eficiente', 'código', 'codigo', 'tech', 'programador', 'developer', 'cortado']
  },
  {
    name: 'Flat White Claude',
    desc: 'Suave, equilibrado y con buena conversación garantizada.',
    price: '$3.000',
    keywords: ['relajado', 'tranquilo', 'calma', 'conversar', 'charlar', 'suave', 'equilibrado', 'flat white', 'placentero', 'acompañar', 'acompanar', 'leer', 'estudiar']
  },
  {
    name: 'Cold Brew Copilot',
    desc: 'Te acompaña toda la jornada, frío y sin interrupciones.',
    price: '$3.500',
    keywords: ['frío', 'frio', 'calor', 'verano', 'refrescante', 'cold brew', 'largo', 'jornada', 'día', 'dia', 'acompañar', 'acompanar', 'suave']
  },
  {
    name: 'Frappé Midjourney',
    desc: 'Una experiencia visual y de sabor que no olvidarás.',
    price: '$4.000',
    keywords: ['dulce', 'postre', 'especial', 'visual', 'creativo', 'frappé', 'frappe', 'helado', 'celebrar', 'festivo', 'único', 'unico', 'experiencia']
  },
  {
    name: 'Nitro Sora',
    desc: 'Efervescente, creativo, con una textura que parece generada.',
    price: '$4.200',
    keywords: ['nitro', 'efervescente', 'burbujas', 'textura', 'innovador', 'diferente', 'experimental', 'creativo', 'generado', 'único', 'unico', 'sorprendente']
  },
  {
    name: 'Tostado Neural',
    desc: 'Pan de masa madre con ingredientes que se complementan perfectamente.',
    price: '$2.200',
    keywords: ['hambre', 'comer', 'tostado', 'pan', 'desayuno', 'almuerzo', 'comida', 'neural', 'salado', 'sandwich']
  },
  {
    name: 'Medialunas Transformer',
    desc: 'Clásicas pero con un toque que las transforma.',
    price: '$1.800',
    keywords: ['medialuna', 'dulce', 'desayuno', 'clásico', 'clasico', 'argentino', 'croissant', 'transformer', 'merienda']
  },
  {
    name: 'Muffin Diffusion',
    desc: 'Denso por fuera, esponjoso por dentro.',
    price: '$2.500',
    keywords: ['muffin', 'postre', 'dulce', 'esponjoso', 'denso', 'chocolate', 'merienda', 'diffusion', 'antojo']
  }
];

const DEFAULT_MESSAGES = [
  'Basándome en tu descripción, creo que este es el match perfecto para vos.',
  'Mi algoritmo de sabor detectó que esto es justo lo que necesitás.',
  'Después de procesar tus preferencias, esta es mi recomendación top.',
  'Analicé tu estado y este café tiene el 99.7% de compatibilidad contigo.'
];

document.addEventListener('DOMContentLoaded', () => {
  const widget = document.querySelector('.ai-widget');
  if (!widget) return;

  const input = widget.querySelector('.ai-widget__input');
  const btn = widget.querySelector('.ai-widget__btn');
  const result = widget.querySelector('.ai-widget__result');

  btn.addEventListener('click', () => recommendCoffee(input, result));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') recommendCoffee(input, result);
  });
});

function recommendCoffee(input, resultEl) {
  const text = input.value.trim().toLowerCase();
  if (!text) {
    input.focus();
    return;
  }

  resultEl.className = 'ai-widget__result processing';
  resultEl.innerHTML = `
    <div class="ai-widget__processing">
      <div class="spinner"></div>
      <span>Analizando preferencias...</span>
    </div>
  `;

  setTimeout(() => {
    const recommendation = findBestMatch(text);
    const message = DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)];

    resultEl.className = 'ai-widget__result show';
    resultEl.innerHTML = `
      <div class="ai-widget__recommendation">
        <div class="ai-widget__recommendation-name">${recommendation.name}</div>
        <div class="ai-widget__recommendation-desc">${recommendation.desc} — <strong>${recommendation.price}</strong></div>
        <div class="ai-widget__recommendation-message">🤖 ${message}</div>
      </div>
    `;
  }, 1500);
}

function findBestMatch(text) {
  let bestMatch = COFFEE_MENU[0];
  let bestScore = 0;

  COFFEE_MENU.forEach(coffee => {
    let score = 0;
    coffee.keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += keyword.length;
      }
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = coffee;
    }
  });

  if (bestScore === 0) {
    const randomIndex = Math.floor(Math.random() * COFFEE_MENU.length);
    bestMatch = COFFEE_MENU[randomIndex];
  }

  return bestMatch;
}
