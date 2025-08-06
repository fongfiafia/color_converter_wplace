/*
  [0,0,0],[60,60,60],[120,120,120],[170,170,170],[210,210,210],[255,255,255],
  [96,0,24],[165, 14, 30],[237,28,36],[250,128,114],[228,92,26],[255,127,39],[246,170,9],
  [249,221,59],[255,250,188],[156,132,49],[197,173,49],[232,212,95],[74,107,58],[90,148,74],[132,197,115],
  [14,185,104],[19,230,123],[135,255,94],[12,129,110][16,174,166],[19,225,190],[15,121,159],[96,247,242],
  [187,250,242],[40,80,158],[64,147,228],[125,199,255],[77,49,184],[107,80,246],[153,177,251],
  [74,66,132],[122,113,196],[181,174,241],[181, 174, 241],[170,56,185],[224,159,249],
  [203,0,122],[236,31,128],[243,141,169],[155,82,73],[209,128,120],[250,182,164],
  [104,70,52],[149,104,42],[219,164,99],[123,99,82],[156,132,107],[214,181,148],
  [209,128,81],[248,178,119],[255,197,165],[109,100,63],[148,140,107],[205,197,158],
  [51,57,65],[109,117,141],[179,185,209]
*/

// --- Color name mapping ---
const colorNames = {
  "0,0,0": "Black",
  "60,60,60": "Dark Gray",
  "120,120,120": "Gray",
  "210,210,210": "Light Gray",
  "255,255,255": "White",
  "96,0,24": "Deep Red",
  "237,28,36": "Red",
  "255,127,39": "Orange",
  "246,170,9": "Gold",
  "249,221,59": "Yellow",
  "255,250,188": "Light Yellow",
  "14,185,104": "Dark Green",
  "19,230,123": "Green",
  "135,255,94": "Light Green",
  "12,129,110": "Dark Teal",
  "16,174,166": "Teal",
  "19,225,190": "Light Teal",
  "96,247,242": "Cyan",
  "40,80,158": "Dark Blue",
  "64,147,228": "Blue",
  "107,80,246": "Indigo",
  "153,177,251": "Light Indigo",
  "120,12,153": "Dark Purple",
  "170,56,185": "Purple",
  "224,159,249": "Light Purple",
  "203,0,122": "Dark Pink",
  "236,31,128": "Pink",
  "243,141,169": "Light Pink",
  "104,70,52": "Dark Brown",
  "149,104,42": "Brown",
  "248,178,119": "Beige",
  "170,170,170": "Medium Gray",
  "165,14,30": "Dark Red",
  "250,128,114": "Light Red",
  "228,92,26": "Dark Orange",
  "156,132,49": "Dark Goldenrod",
  "197,173,49": "Goldenrod",
  "232,212,95": "Light Goldenrod",
  "74,107,58": "Dark Olive",
  "90,148,74": "Olive",
  "132,197,115": "Light Olive",
  "15,121,159": "Dark Cyan",
  "187,250,242": "Light Cyan",
  "125,199,255": "Light Blue",
  "77,49,184": "Dark Indigo",
  "74,66,132": "Dark Slate Blue",
  "122,113,196": "Slate Blue",
  "181,174,241": "Light Slate Blue",
  "155,82,73": "Dark Peach",
  "209,128,120": "Peach",
  "250,182,164": "Light Peach",
  "219,164,99": "Light Brown",
  "123,99,82": "Dark Tan",
  "156,132,107": "Tan",
  "214,181,148": "Light Tan",
  "209,128,81": "Dark Beige",
  "255,197,165": "Light Beige",
  "109,100,63": "Dark Stone",
  "148,140,107": "Stone",
  "205,197,158": "Light Stone",
  "51,57,65": "Dark Slate",
  "109,117,141": "Slate",
  "179,185,209": "Light Slate",
};

// Used for displaying different colors in color list
const paidColors = new Set([
  "170,170,170",    // Medium Gray
  "165,14,30",      // Dark Red
  "250,128,114",    // Light Red
  "228,92,26",      // Dark Orange
  "156,132,49",     // Dark Goldenrod
  "197,173,49",     // Goldenrod
  "232,212,95",     // Light Goldenrod
  "74,107,58",      // Dark Olive
  "90,148,74",      // Olive
  "132,197,115",    // Light Olive
  "15,121,159",     // Dark Cyan
  "187,250,242",    // Light Cyan
  "125,199,255",    // Light Blue
  "77,49,184",      // Dark Indigo
  "74,66,132",      // Dark Slate Blue
  "122,113,196",    // Slate Blue
  "181,174,241",    // Light Slate Blue
  "155,82,73",      // Dark Peach
  "209,128,120",    // Peach
  "250,182,164",    // Light Peach
  "219,164,99",     // Light Brown
  "123,99,82",      // Dark Tan
  "156,132,107",    // Tan
  "214,181,148",    // Light Tan
  "209,128,81",     // Dark Beige
  "255,197,165",    // Light Beige
  "109,100,63",     // Dark Stone
  "148,140,107",    // Stone
  "205,197,158",    // Light Stone
  "51,57,65",       // Dark Slate
  "109,117,141",    // Slate
  "179,185,209",    // Light Slate
]);


let padrao = [];

function updatePadraoFromActiveButtons() {
  padrao = [];
  let colorActiveSave = [];
  const activeButtons = document.querySelectorAll('#colors .toggle-color.active');
  activeButtons.forEach(btn => {
    const bg = window.getComputedStyle(btn).backgroundColor;
    const rgbMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      padrao.push([r, g, b]);
    }
    colorActiveSave.push(btn.id);
  });
  localStorage.setItem('activeColors', JSON.stringify(colorActiveSave));
}

const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadLink = document.getElementById('download');

// Clipboard
function showCustomToast(message) {
  const toastBtn = document.getElementById('clipboard');
  if (!toastBtn) return;
  const originalText = toastBtn.textContent;
  toastBtn.textContent = message;
  toastBtn.style.background = '#D60270';
  toastBtn.style.color = '#fff';
  setTimeout(() => {
    toastBtn.textContent = originalText;
    toastBtn.style.background = '';
    toastBtn.style.color = '';
  }, 1800);
}

document.getElementById('clipboard').addEventListener('click', async function () {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  let allTransparent = true;
  for (let i = 3; i < imageData.length; i += 4) {
    if (imageData[i] !== 0) {
      allTransparent = false;
      break;
    }
  }

  const lang = getCurrentLang();
  const t = translations[lang] || translations['en'];

  if (allTransparent) {
    showCustomToast(t.imageNotFound);
    return;
  }

  canvas.toBlob(async (blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      showCustomToast(t.imageCopied);
    } catch (err) {
      showCustomToast(t.copyFailed);
    }
  }, 'image/png');
});

// Handle paste events to allow image pasting
document.addEventListener('paste', function (event) {
  if (!event.clipboardData) return;
  const items = event.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      const file = items[i].getAsFile();
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          const img = new Image();
          img.onload = function () {
            originalImage = img;
            currentImageWidth = img.width;
            currentImageHeight = img.height;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            processarImagem();
            showImageInfo(currentImageWidth, currentImageHeight);
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
      event.preventDefault();
      break;
    }
  }
});

// Function to find the closest color in the pattern
function corMaisProxima(r, g, b) {
  let menorDist = Infinity;
  let cor = [0, 0, 0];
  for (let i = 0; i < padrao.length; i++) {
    const [pr, pg, pb] = padrao[i];
    //const dist = Math.sqrt((pr - r) ** 2 + (pg - g) ** 2 + (pb - b) ** 2);
    //https://www.compuphase.com/cmetric.htm#:~:text=A%20low%2Dcost%20approximation
    const rmean = (pr + r) / 2;
    const rdiff = pr - r;
    const gdiff = pg - g;
    const bdiff = pb - b;
    const x = (512 + rmean) * rdiff * rdiff >> 8;
    const y = 4 * gdiff * gdiff;
    const z = (767 - rmean) * bdiff * bdiff >> 8;
    const dist = Math.sqrt(x + y + z);
    if (dist < menorDist) {
      menorDist = dist;
      cor = [pr, pg, pb];
    }
  }
  return cor;
}

// Image processing
function processarImagem() {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const colorCounts = {};
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const [nr, ng, nb] = corMaisProxima(r, g, b);
    data[i] = nr;
    data[i + 1] = ng;
    data[i + 2] = nb;
    if (a < 255 && a > 0) {
      if (document.getElementById('transparentButton').classList.contains('active')) {
        data[i + 3] = 0; // Make transparent if alpha is not fully opaque
      }
      else {
        data[i + 3] = 255; // Keep fully opaque if button is not active
      }
    }
    if (a !== 0) {
      const key = `${nr},${ng},${nb}`;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = `converted_${fileName}`;
  showImageInfo(canvas.width, canvas.height);
  showColorUsage(colorCounts);

  if (!processedCanvas) {
    processedCanvas = document.createElement('canvas');
    processedCtx = processedCanvas.getContext('2d');
  }
  processedCanvas.width = canvas.width;
  processedCanvas.height = canvas.height;
  processedCtx.putImageData(imgData, 0, 0);
}

// Image info display
function showImageInfo(width, height) {
  const langSelect = document.getElementById('lang-select');
  const lang = (langSelect && langSelect.value) || 'en';
  const t = translations[lang];

  const widthP = document.getElementById('width');
  const heightP = document.getElementById('height');
  const areaP = document.getElementById('area');

  if (widthP) widthP.textContent = `${t.width} ${width} px`;
  if (heightP) heightP.textContent = `${t.height} ${height} px`;
  if (areaP) areaP.textContent = `${t.area} ${width * height} px`;
}

// Color usage display
function showColorUsage(colorCounts) {
  let colorList = [];
  padrao.forEach(([r, g, b]) => {
    const key = `${r},${g},${b}`;
    const count = colorCounts[key];
    if (count === undefined) return;
    colorList.push({ r, g, b, count, name: colorNames[key] });
  });
  colorList.sort((a, b) => b.count - a.count);

  const colorListDiv = document.getElementById('color-list');
  if (!colorListDiv) return;
  colorListDiv.innerHTML = '';
  colorList.forEach(({ r, g, b, count, name }) => {
    const key = `${r},${g},${b}`;
    const isPaid = paidColors.has(key);

    const colorItem = document.createElement('div');
    colorItem.style.display = 'flex';
    colorItem.style.alignItems = 'center';
    colorItem.style.marginBottom = '4px';

    const swatch = document.createElement('span');
    swatch.style.display = 'inline-block';
    swatch.style.width = '24px';
    swatch.style.height = '24px';
    swatch.style.background = `rgb(${r},${g},${b})`;
    swatch.style.border = '1px solid #ccc';
    swatch.style.marginRight = '8px';

    const label = document.createElement('span');
    const colorName = name || `rgb(${r}, ${g}, ${b})`;
    label.textContent = `${colorName}: ${count} px`;
    if (isPaid) label.style.color = 'gold';

    colorItem.appendChild(swatch);
    colorItem.appendChild(label);
    colorListDiv.appendChild(colorItem);
  });
}

// --- Script for select All buttons ---

document.addEventListener('DOMContentLoaded', () => {
  const selectAllFreeBtn = document.getElementById('unselect-all-free');
  if (!selectAllFreeBtn) {
    console.error('select-all-free button not found');
    return;
  }

  const lang = getCurrentLang();
  const t = translations[lang] || translations['en'];

  // Start with all free buttons selected
  const freeButtons = document.querySelectorAll('#colors .toggle-color[data-type="free"]');
  freeButtons.forEach(btn => btn.classList.add('active'));
  selectAllFreeBtn.textContent = t.allButtonfreeUnselect;

  selectAllFreeBtn.addEventListener('click', () => {
    const lang = getCurrentLang();
    const t = translations[lang] || translations['en'];

    const isCurrentlySelected = selectAllFreeBtn.textContent === t.allButtonfreeUnselect;

    if (isCurrentlySelected) {
      freeButtons.forEach(btn => btn.classList.remove('active'));
      selectAllFreeBtn.textContent = t.allButtonfreeSelect;
    } else {
      freeButtons.forEach(btn => btn.classList.add('active'));
      selectAllFreeBtn.textContent = t.allButtonfreeUnselect;
    }

    if (typeof updatePadraoFromActiveButtons === 'function') {
      updatePadraoFromActiveButtons();
    }

    if (typeof originalImage !== 'undefined' && originalImage) {
      if (typeof applyScale === 'function') applyScale();
      if (typeof applyPreview === 'function') applyPreview();
    }
  });
});


// Paid Colors

document.addEventListener('DOMContentLoaded', () => {
  const selectAllPaidBtn = document.getElementById('select-all-paid');
  if (!selectAllPaidBtn) {
    console.error('select-all-paid button not found');
    return;
  }

  let isAllPaidSelected = false;

  const lang = getCurrentLang();
  const t = translations[lang] || translations['en'];

  selectAllPaidBtn.textContent = t.allButtonpaidSelect;

  selectAllPaidBtn.addEventListener('click', () => {
    const paidButtons = document.querySelectorAll('#colors .toggle-color[data-type="paid"]');
    isAllPaidSelected = !isAllPaidSelected;

    paidButtons.forEach(btn => {
      btn.classList.toggle('active', isAllPaidSelected);
    });

    const currentLang = getCurrentLang();
    const tt = translations[currentLang] || translations['en'];

    selectAllPaidBtn.textContent = isAllPaidSelected
      ? tt.allButtonpaidUnselect
      : tt.allButtonpaidSelect;

    if (typeof updatePadraoFromActiveButtons === 'function') {
      updatePadraoFromActiveButtons();
    }

    if (typeof originalImage !== 'undefined' && originalImage) {
      if (typeof applyScale === 'function') applyScale();
      if (typeof applyPreview === 'function') applyPreview();
    }
  });
});
// --End of Script for buttons--

// Scale and Zoom functionality
const scaleRange = document.getElementById('scaleRange');
const scaleValue = document.getElementById('scaleValue');
const zoomRange = document.getElementById('zoomRange');
const zoomValue = document.getElementById('zoomValue');

scaleRange.addEventListener('input', function () {
  scaleValue.textContent = parseFloat(scaleRange.value).toFixed(2) + 'x';
});

zoomRange.addEventListener('input', function () {
  zoomValue.textContent = parseFloat(zoomRange.value).toFixed(2) + 'x';
  applyPreview();
});

let originalImage = null;
let scaledCanvas = null;
let scaledCtx = null;
let processedCanvas = null;
let processedCtx = null;

function applyScale() {
  const scale = parseFloat(scaleRange.value);
  if (!originalImage) return;

  const newWidth = Math.round(originalImage.width * scale);
  const newHeight = Math.round(originalImage.height * scale);

  if (!scaledCanvas) {
    scaledCanvas = document.createElement('canvas');
    scaledCtx = scaledCanvas.getContext('2d');
  }
  scaledCanvas.width = newWidth;
  scaledCanvas.height = newHeight;

  scaledCtx.clearRect(0, 0, newWidth, newHeight);
  scaledCtx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height, 0, 0, newWidth, newHeight);

  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.clearRect(0, 0, newWidth, newHeight);
  ctx.drawImage(scaledCanvas, 0, 0);

  processarImagem();
}

function applyPreview() {
  const zoom = parseFloat(zoomRange.value);
  if (!processedCanvas) return;

  const previewWidth = Math.round(processedCanvas.width * zoom);
  const previewHeight = Math.round(processedCanvas.height * zoom);

  canvas.width = previewWidth;
  canvas.height = previewHeight;
  ctx.clearRect(0, 0, previewWidth, previewHeight);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(processedCanvas, 0, 0, processedCanvas.width, processedCanvas.height, 0, 0, previewWidth, previewHeight);
  ctx.imageSmoothingEnabled = true;
}

scaleRange.addEventListener('change', function () {
  applyScale();
  applyPreview();
});

upload.addEventListener('change', () => {
  scaleRange.value = 1.0;
  scaleValue.textContent = '1.00x';
  zoomRange.value = 1.0;
  zoomValue.textContent = '1.00x';
});

window.addEventListener('beforeunload', () => {
  scaleRange.value = 1.0;
  scaleValue.textContent = '1.00x';
  zoomRange.value = 1.0;
  zoomValue.textContent = '1.00x';
});

upload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      processarImagem();
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

scaleRange.addEventListener('change', applyScale);

upload.addEventListener('change', () => {
  scaleRange.value = 1.0;
  scaleValue.textContent = '1.00x';
});

window.addEventListener('beforeunload', () => {
  scaleRange.value = 1.0;
  scaleValue.textContent = '1.00x';
});

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('#colors .toggle-color');
  const colorActiveSave = JSON.parse(localStorage.getItem('activeColors')) || [];
  colorActiveSave.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.classList.add('active');
    }
  });

  const transparentButton = document.getElementById('transparentButton');
  if (localStorage.getItem('transparentHide') === 'true') {
    transparentButton.classList.add('active');
  }

  updatePadraoFromActiveButtons();

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      btn.classList.toggle('active');
      updatePadraoFromActiveButtons();
      if (originalImage) {
        applyScale();
        applyPreview();
      }
    });
  });
});

const translations = {
  en: {
    navPixelConvert: "Pixel Convert",
    navPlugins: "Plugins",
    navBlogs: "Blogs",
    pluginsTitle: "Wplace Plugins",
    pluginsSubtitle: "Official Extensions and Tools",
    pluginsDescription: "Discover powerful plugins and extensions to enhance your Wplace pixel art creation experience.",
    blueMarbleTitle: "Blue Marble",
    blueMarbleDescription: "Advanced pixel art conversion tool with enhanced color palette and precision tools for Wplace platform.",
    featureColorPalette: "Color Palette",
    featurePixelPerfect: "Pixel Perfect",
    featureAdvancedTools: "Advanced Tools",
    viewDetails: "View Details",
    viewSource: "View Source",
    comingSoonTitle: "More Plugins",
    comingSoonDescription: "We're working on more amazing plugins to enhance your Wplace experience. Stay tuned!",
    featureInDevelopment: "In Development",
    comingSoon: "Coming Soon",
    title: "Wplace Tool",
    subtitle: "Create Perfect Pixel Art for Wplace",
    description: "Transform your images into pixel-perfect art with Wplace's professional pixel art converter. Precise color adjustments and powerful pixel tools.",
    freeColors: "Free Colors:",
    paidColors: "Paid Colors (2000💧each):",
    download: "Download Image",
    clipboard: "Copy to Clipboard",
    goto: "Go to Wplace",
    pixelsAmount: "Pixels Amount:",
    width: "Width:",
    height: "Height:",
    area: "Area:",
    imageCopied: "Image copied to clipboard!",
    copyFailed: "Failed to copy image.",
    imageNotFound: "Image not found",
    allButtonfreeSelect: "Select All Free Colors",
    allButtonfreeUnselect: "Unselect All Free Colors",
    allButtonpaidSelect: "Select All 💧Paid Colors",
    allButtonpaidUnselect: "Unselect All 💧Paid Colors",
    zoom: "Zoom",
    scale: "Scale",
    transparentButton: "Hide Semi-Transparent Pixels",
    transparentButtonTitle: "When active, semi-transparent pixels will be made fully transparent, otherwise they will be fully opaque.",
    footerTitle: "Wplace Pixel Tool",
    footerDescription: "The ultimate pixel art converter for Wplace platform",
    linksTitle: "Links",
    legalTitle: "Legal",
    copyright: "© 2024 Wplace Pixel Tool. All rights reserved.",
    introTitle: "Professional Pixel Art Creation for Wplace",
    introDescription: "Wplace Pixel Art Tool is your ultimate solution for creating pixel-perfect artwork. Our advanced pixel art converter ensures your images are perfectly optimized for the Wplace platform.",
    featureTitle1: "Advanced Pixel Art Conversion",
    featureDesc1: "Transform any image into precise pixel art with our professional conversion engine. Perfect pixel alignment and customizable resolution for Wplace.",
    featureTitle2: "Wplace Color System",
    featureDesc2: "Access Wplace's complete color palette system. Create pixel masterpieces with both free and premium colors, ensuring perfect compatibility with Wplace.",
    featureTitle3: "Pixel-Perfect Tools",
    featureDesc3: "Utilize professional pixel art tools including precise scaling, pixel-perfect adjustments, and seamless Wplace integration for optimal results."
  },
  pt: {
    navPixelConvert: "Conversor de Pixel",
    navPlugins: "Plugins",
    navBlogs: "Blogs",
    title: "Ferramenta Wplace",
    subtitle: "Crie Pixel Art Perfeita para Wplace",
    description: "Transforme suas imagens em pixel art perfeita com o conversor profissional do Wplace. Ajustes precisos de cores e ferramentas poderosas de pixel.",
    freeColors: "Cores Gratuitas:",
    paidColors: "Cores Pagas (2000💧cada):",
    download: "Baixar Imagem",
    clipboard: "Copiar para Área de Transferência",
    goto: "Ir para Wplace",
    pixelsAmount: "Quantidade de Pixels:",
    width: "Largura:",
    height: "Altura:",
    area: "Área:",
    imageCopied: "Imagem copiada para a área de transferência!",
    copyFailed: "Falha ao copiar imagem.",
    imageNotFound: "Imagem não encontrada",
    allButtonfreeSelect: "Selecionar Todas as Cores Gratuitas",
    allButtonfreeUnselect: "Desmarcar Todas as Cores Gratuitas",
    allButtonpaidSelect: "Selecionar Todas as Cores 💧Pagas",
    allButtonpaidUnselect: "Desmarcar Todas as Cores 💧Pagas",
    zoom: "Zoom",
    scale: "Escala",
    transparentButton: "Ocultar Pixels Semi-Transparentes",
    transparentButtonTitle: "Quando ativo, pixels semi-transparentes serão totalmente transparentes, caso contrário serão totalmente opacos.",
    footerTitle: "Ferramenta Wplace Pixel",
    footerDescription: "O melhor conversor de pixel art para a plataforma Wplace",
    linksTitle: "Links",
    legalTitle: "Legal",
    copyright: "© 2024 Wplace Pixel Tool. Todos os direitos reservados.",
    introTitle: "Criação Profissional de Pixel Art para Wplace",
    introDescription: "A Ferramenta Wplace Pixel é sua solução definitiva para criar artwork em pixel art. Nosso avançado conversor garante que suas imagens sejam perfeitamente otimizadas para a plataforma Wplace.",
    featureTitle1: "Conversão Avançada de Pixel Art",
    featureDesc1: "Transforme qualquer imagem em pixel art precisa com nosso mecanismo de conversão profissional. Alinhamento perfeito de pixels e resolução personalizável para Wplace.",
    featureTitle2: "Sistema de Cores Wplace",
    featureDesc2: "Acesse o sistema completo de paleta de cores do Wplace. Crie obras-primas em pixel art com cores gratuitas e premium, garantindo compatibilidade perfeita com Wplace.",
    featureTitle3: "Ferramentas Pixel-Perfect",
    featureDesc3: "Utilize ferramentas profissionais de pixel art, incluindo escala precisa, ajustes pixel-perfect e integração perfeita com Wplace."
  },
  es: {
    navPixelConvert: "Conversor de Pixel",
    navPlugins: "Plugins",
    navBlogs: "Blogs",
    title: "Herramienta Wplace",
    subtitle: "Crea Pixel Art Perfecto para Wplace",
    description: "Transforma tus imágenes en pixel art perfecto con el conversor profesional de Wplace. Ajustes precisos de color y herramientas potentes de píxeles.",
    freeColors: "Colores Gratuitos:",
    paidColors: "Colores de Pago (2000💧cada uno):",
    download: "Descargar Imagen",
    clipboard: "Copiar al Portapapeles",
    goto: "Ir a Wplace",
    pixelsAmount: "Cantidad de Píxeles:",
    width: "Ancho:",
    height: "Alto:",
    area: "Área:",
    imageCopied: "¡Imagen copiada al portapapeles!",
    copyFailed: "Error al copiar la imagen.",
    imageNotFound: "Imagen no encontrada",
    allButtonfreeSelect: "Seleccionar Todos los Colores Gratuitos",
    allButtonfreeUnselect: "Deseleccionar Todos los Colores Gratuitos",
    allButtonpaidSelect: "Seleccionar Todos los Colores 💧de Pago",
    allButtonpaidUnselect: "Deseleccionar Todos los Colores 💧de Pago",
    zoom: "Zoom",
    scale: "Escala",
    transparentButton: "Ocultar Píxeles Semi-Transparentes",
    transparentButtonTitle: "Cuando está activo, los píxeles semi-transparentes se volverán completamente transparentes, de lo contrario serán completamente opacos.",
    footerTitle: "Herramienta Wplace Pixel",
    footerDescription: "El mejor conversor de pixel art para la plataforma Wplace",
    linksTitle: "Enlaces",
    legalTitle: "Legal",
    copyright: "© 2024 Wplace Pixel Tool. Todos los derechos reservados.",
    introTitle: "Creación Profesional de Pixel Art para Wplace",
    introDescription: "La Herramienta Wplace Pixel es tu solución definitiva para crear pixel art. Nuestro avanzado conversor asegura que tus imágenes estén perfectamente optimizadas para la plataforma Wplace.",
    featureTitle1: "Conversión Avanzada de Pixel Art",
    featureDesc1: "Transforma cualquier imagen en pixel art preciso con nuestro motor de conversión profesional. Alineación perfecta de píxeles y resolución personalizable para Wplace.",
    featureTitle2: "Sistema de Colores Wplace",
    featureDesc2: "Accede al sistema completo de paleta de colores de Wplace. Crea obras maestras en pixel art con colores gratuitos y premium, garantizando una compatibilidad perfecta con Wplace.",
    featureTitle3: "Herramientas Pixel-Perfect",
    featureDesc3: "Utiliza herramientas profesionales de pixel art, incluyendo escala precisa, ajustes pixel-perfect e integración perfecta con Wplace."
  },
  fr: {
    title: "Outil Wplace",
    subtitle: "Créez du Pixel Art Parfait pour Wplace",
    description: "Transformez vos images en pixel art parfait avec le convertisseur professionnel de Wplace. Ajustements précis des couleurs et outils pixels puissants.",
    freeColors: "Couleurs Gratuites :",
    paidColors: "Couleurs Payantes (2000💧chacune) :",
    download: "Télécharger l'Image",
    clipboard: "Copier dans le Presse-papiers",
    goto: "Aller sur Wplace",
    pixelsAmount: "Nombre de Pixels :",
    width: "Largeur :",
    height: "Hauteur :",
    area: "Surface :",
    imageCopied: "Image copiée dans le presse-papiers !",
    copyFailed: "Échec de la copie de l'image.",
    imageNotFound: "Image non trouvée",
    allButtonfreeSelect: "Sélectionner Toutes les Couleurs Gratuites",
    allButtonfreeUnselect: "Désélectionner Toutes les Couleurs Gratuites",
    allButtonpaidSelect: "Sélectionner Toutes les Couleurs 💧Payantes",
    allButtonpaidUnselect: "Désélectionner Toutes les Couleurs 💧Payantes",
    zoom: "Zoom",
    scale: "Échelle",
    transparentButton: "Masquer les Pixels Semi-Transparents",
    transparentButtonTitle: "Lorsqu'il est actif, les pixels semi-transparents deviendront complètement transparents, sinon ils seront complètement opaques.",
    footerTitle: "Outil Wplace Pixel",
    footerDescription: "Le meilleur convertisseur de pixel art pour la plateforme Wplace",
    linksTitle: "Liens",
    legalTitle: "Mentions Légales",
    copyright: "© 2024 Wplace Pixel Tool. Tous droits réservés.",
    introTitle: "Création Professionnelle de Pixel Art pour Wplace",
    introDescription: "L'Outil Wplace Pixel est votre solution ultime pour créer du pixel art. Notre convertisseur avancé garantit que vos images sont parfaitement optimisées pour la plateforme Wplace.",
    featureTitle1: "Conversion Avancée de Pixel Art",
    featureDesc1: "Transformez n'importe quelle image en pixel art précis avec notre moteur de conversion professionnel. Alignement parfait des pixels et résolution personnalisable pour Wplace.",
    featureTitle2: "Système de Couleurs Wplace",
    featureDesc2: "Accédez au système complet de palette de couleurs de Wplace. Créez des chefs-d'œuvre en pixel art avec des couleurs gratuites et premium, garantissant une compatibilité parfaite avec Wplace.",
    featureTitle3: "Outils Pixel-Perfect",
    featureDesc3: "Utilisez des outils professionnels de pixel art, incluant une mise à l'échelle précise, des ajustements pixel-perfect et une intégration parfaite avec Wplace."
  },
  de: {
    title: "Wplace Werkzeug",
    subtitle: "Erstelle Perfekte Pixel Art für Wplace",
    description: "Verwandle deine Bilder in perfekte Pixel Art mit dem professionellen Wplace-Konverter. Präzise Farbanpassungen und leistungsstarke Pixel-Werkzeuge.",
    freeColors: "Kostenlose Farben:",
    paidColors: "Bezahlte Farben (2000💧je):",
    download: "Bild Herunterladen",
    clipboard: "In Zwischenablage Kopieren",
    goto: "Zu Wplace Gehen",
    pixelsAmount: "Pixelanzahl:",
    width: "Breite:",
    height: "Höhe:",
    area: "Fläche:",
    imageCopied: "Bild in die Zwischenablage kopiert!",
    copyFailed: "Kopieren des Bildes fehlgeschlagen.",
    imageNotFound: "Bild nicht gefunden",
    allButtonfreeSelect: "Alle Kostenlosen Farben Auswählen",
    allButtonfreeUnselect: "Alle Kostenlosen Farben Abwählen",
    allButtonpaidSelect: "Alle 💧Bezahlten Farben Auswählen",
    allButtonpaidUnselect: "Alle 💧Bezahlten Farben Abwählen",
    zoom: "Zoom",
    scale: "Skalierung",
    transparentButton: "Halbtransparente Pixel Ausblenden",
    transparentButtonTitle: "Wenn aktiv, werden halbtransparente Pixel vollständig transparent, andernfalls vollständig undurchsichtig.",
    footerTitle: "Wplace Pixel Werkzeug",
    footerDescription: "Der beste Pixel Art Konverter für die Wplace Plattform",
    linksTitle: "Links",
    legalTitle: "Rechtliches",
    copyright: "© 2024 Wplace Pixel Tool. Alle Rechte vorbehalten.",
    introTitle: "Professionelle Pixel Art Erstellung für Wplace",
    introDescription: "Das Wplace Pixel Tool ist deine ultimative Lösung für die Erstellung von Pixel Art. Unser fortschrittlicher Konverter stellt sicher, dass deine Bilder perfekt für die Wplace-Plattform optimiert sind.",
    featureTitle1: "Fortgeschrittene Pixel Art Konvertierung",
    featureDesc1: "Verwandle jedes Bild in präzise Pixel Art mit unserem professionellen Konvertierungsmotor. Perfekte Pixel-Ausrichtung und anpassbare Auflösung für Wplace.",
    featureTitle2: "Wplace Farbsystem",
    featureDesc2: "Greife auf das komplette Farbpalettensystem von Wplace zu. Erstelle Pixel Art Meisterwerke mit kostenlosen und Premium-Farben, die perfekte Kompatibilität mit Wplace garantieren.",
    featureTitle3: "Pixel-Perfect Werkzeuge",
    featureDesc3: "Nutze professionelle Pixel Art Werkzeuge, einschließlich präziser Skalierung, pixel-perfekter Anpassungen und nahtloser Wplace-Integration."
  },
  uk: {
    title: "Інструмент Wplace",
    subtitle: "Створюйте Ідеальний Піксель-арт для Wplace",
    description: "Перетворюйте ваші зображення в ідеальний піксель-арт за допомогою професійного конвертера Wplace. Точне налаштування кольорів та потужні інструменти для роботи з пікселями.",
    freeColors: "Безкоштовні Кольори:",
    paidColors: "Платні Кольори (2000💧кожен):",
    download: "Завантажити Зображення",
    clipboard: "Копіювати в Буфер Обміну",
    goto: "Перейти до Wplace",
    pixelsAmount: "Кількість Пікселів:",
    width: "Ширина:",
    height: "Висота:",
    area: "Площа:",
    imageCopied: "Зображення скопійовано в буфер обміну!",
    copyFailed: "Не вдалося скопіювати зображення.",
    imageNotFound: "Зображення не знайдено",
    allButtonfreeSelect: "Вибрати Всі Безкоштовні Кольори",
    allButtonfreeUnselect: "Зняти Вибір з Усіх Безкоштовних Кольорів",
    allButtonpaidSelect: "Вибрати Всі 💧Платні Кольори",
    allButtonpaidUnselect: "Зняти Вибір з Усіх 💧Платних Кольорів",
    zoom: "Масштаб",
    scale: "Розмір",
    transparentButton: "Приховати Напівпрозорі Пікселі",
    transparentButtonTitle: "Коли активно, напівпрозорі пікселі стануть повністю прозорими, інакше будуть повністю непрозорими.",
    footerTitle: "Інструмент Wplace Pixel",
    footerDescription: "Найкращий конвертер піксель-арту для платформи Wplace",
    linksTitle: "Посилання",
    legalTitle: "Правова інформація",
    copyright: "© 2024 Wplace Pixel Tool. Усі права захищено.",
    introTitle: "Професійне Створення Піксель-арту для Wplace",
    introDescription: "Інструмент Wplace Pixel - це ваше ідеальне рішення для створення піксель-арту. Наш передовий конвертер забезпечує оптимальну підготовку ваших зображень для платформи Wplace.",
    featureTitle1: "Розширене Перетворення Піксель-арту",
    featureDesc1: "Перетворюйте будь-яке зображення в точний піксель-арт за допомогою нашого професійного конвертера. Ідеальне вирівнювання пікселів та налаштування роздільної здатності для Wplace.",
    featureTitle2: "Система Кольорів Wplace",
    featureDesc2: "Отримайте доступ до повної системи палітри кольорів Wplace. Створюйте шедеври піксель-арту з безкоштовними та преміум кольорами, забезпечуючи ідеальну сумісність з Wplace.",
    featureTitle3: "Інструменти Pixel-Perfect",
    featureDesc3: "Використовуйте професійні інструменти піксель-арту, включаючи точне масштабування, піксельно-точні налаштування та бездоганну інтеграцію з Wplace."
  },
  vi: {
    title: "Công cụ Wplace",
    subtitle: "Tạo Pixel Art Hoàn Hảo cho Wplace",
    description: "Chuyển đổi hình ảnh của bạn thành pixel art hoàn hảo với bộ chuyển đổi chuyên nghiệp của Wplace. Điều chỉnh màu sắc chính xác và công cụ pixel mạnh mẽ.",
    freeColors: "Màu Miễn phí:",
    paidColors: "Màu Trả phí (2000💧mỗi màu):",
    download: "Tải Hình ảnh",
    clipboard: "Sao chép vào Clipboard",
    goto: "Đi đến Wplace",
    pixelsAmount: "Số lượng Pixel:",
    width: "Chiều rộng:",
    height: "Chiều cao:",
    area: "Diện tích:",
    imageCopied: "Đã sao chép hình ảnh vào clipboard!",
    copyFailed: "Không thể sao chép hình ảnh.",
    imageNotFound: "Không tìm thấy hình ảnh",
    allButtonfreeSelect: "Chọn Tất cả Màu Miễn phí",
    allButtonfreeUnselect: "Bỏ chọn Tất cả Màu Miễn phí",
    allButtonpaidSelect: "Chọn Tất cả Màu 💧Trả phí",
    allButtonpaidUnselect: "Bỏ chọn Tất cả Màu 💧Trả phí",
    zoom: "Thu phóng",
    scale: "Tỷ lệ",
    transparentButton: "Ẩn Pixel Bán trong suốt",
    transparentButtonTitle: "Khi được kích hoạt, các pixel bán trong suốt sẽ trở nên hoàn toàn trong suốt, ngược lại sẽ hoàn toàn đục.",
    footerTitle: "Công cụ Wplace Pixel",
    footerDescription: "Bộ chuyển đổi pixel art tốt nhất cho nền tảng Wplace",
    linksTitle: "Liên kết",
    legalTitle: "Pháp lý",
    copyright: "© 2024 Wplace Pixel Tool. Đã đăng ký bản quyền.",
    introTitle: "Tạo Pixel Art Chuyên nghiệp cho Wplace",
    introDescription: "Công cụ Wplace Pixel là giải pháp tối ưu của bạn để tạo pixel art. Bộ chuyển đổi nâng cao của chúng tôi đảm bảo hình ảnh của bạn được tối ưu hóa hoàn hảo cho nền tảng Wplace.",
    featureTitle1: "Chuyển đổi Pixel Art Nâng cao",
    featureDesc1: "Chuyển đổi bất kỳ hình ảnh nào thành pixel art chính xác với công cụ chuyển đổi chuyên nghiệp của chúng tôi. Căn chỉnh pixel hoàn hảo và độ phân giải tùy chỉnh cho Wplace.",
    featureTitle2: "Hệ thống Màu Wplace",
    featureDesc2: "Truy cập hệ thống bảng màu đầy đủ của Wplace. Tạo ra các tác phẩm pixel art với màu sắc miễn phí và cao cấp, đảm bảo tương thích hoàn hảo với Wplace.",
    featureTitle3: "Công cụ Pixel-Perfect",
    featureDesc3: "Sử dụng các công cụ pixel art chuyên nghiệp bao gồm tỷ lệ chính xác, điều chỉnh pixel-perfect và tích hợp liền mạch với Wplace."
  },
  pl: {
    title: "Narzędzie Wplace",
    subtitle: "Twórz Doskonały Pixel Art dla Wplace",
    description: "Przekształć swoje obrazy w doskonały pixel art za pomocą profesjonalnego konwertera Wplace. Precyzyjne dostosowanie kolorów i potężne narzędzia pikselowe.",
    freeColors: "Darmowe Kolory:",
    paidColors: "Płatne Kolory (2000💧każdy):",
    download: "Pobierz Obraz",
    clipboard: "Kopiuj do Schowka",
    goto: "Przejdź do Wplace",
    pixelsAmount: "Ilość Pikseli:",
    width: "Szerokość:",
    height: "Wysokość:",
    area: "Powierzchnia:",
    imageCopied: "Obraz skopiowany do schowka!",
    copyFailed: "Nie udało się skopiować obrazu.",
    imageNotFound: "Nie znaleziono obrazu",
    allButtonfreeSelect: "Zaznacz Wszystkie Darmowe Kolory",
    allButtonfreeUnselect: "Odznacz Wszystkie Darmowe Kolory",
    allButtonpaidSelect: "Zaznacz Wszystkie 💧Płatne Kolory",
    allButtonpaidUnselect: "Odznacz Wszystkie 💧Płatne Kolory",
    zoom: "Powiększenie",
    scale: "Skala",
    transparentButton: "Ukryj Półprzezroczyste Piksele",
    transparentButtonTitle: "Gdy aktywne, półprzezroczyste piksele staną się całkowicie przezroczyste, w przeciwnym razie będą całkowicie nieprzezroczyste.",
    footerTitle: "Narzędzie Wplace Pixel",
    footerDescription: "Najlepszy konwerter pixel art dla platformy Wplace",
    linksTitle: "Linki",
    legalTitle: "Informacje Prawne",
    copyright: "© 2024 Wplace Pixel Tool. Wszelkie prawa zastrzeżone.",
    introTitle: "Profesjonalne Tworzenie Pixel Art dla Wplace",
    introDescription: "Narzędzie Wplace Pixel to twoje ostateczne rozwiązanie do tworzenia pixel art. Nasz zaawansowany konwerter zapewnia, że twoje obrazy są idealnie zoptymalizowane dla platformy Wplace.",
    featureTitle1: "Zaawansowana Konwersja Pixel Art",
    featureDesc1: "Przekształć dowolny obraz w precyzyjny pixel art za pomocą naszego profesjonalnego silnika konwersji. Idealne wyrównanie pikseli i dostosowywalna rozdzielczość dla Wplace.",
    featureTitle2: "System Kolorów Wplace",
    featureDesc2: "Uzyskaj dostęp do pełnego systemu palety kolorów Wplace. Twórz arcydzieła pixel art z darmowymi i premium kolorami, zapewniając idealną kompatybilność z Wplace.",
    featureTitle3: "Narzędzia Pixel-Perfect",
    featureDesc3: "Korzystaj z profesjonalnych narzędzi pixel art, w tym precyzyjnego skalowania, pixel-perfect dostosowań i bezproblemowej integracji z Wplace."
  },
  ja: {
    title: "Wplaceツール",
    subtitle: "Wplace用の完璧なピクセルアートを作成",
    description: "Wplaceのプロフェッショナルコンバーターで画像を完璧なピクセルアートに変換。正確な色調整とパワフルなピクセルツール。",
    freeColors: "無料カラー：",
    paidColors: "有料カラー（各2000💧）：",
    download: "画像をダウンロード",
    clipboard: "クリップボードにコピー",
    goto: "Wplaceへ移動",
    pixelsAmount: "ピクセル数：",
    width: "幅：",
    height: "高さ：",
    area: "面積：",
    imageCopied: "画像をクリップボードにコピーしました！",
    copyFailed: "画像のコピーに失敗しました。",
    imageNotFound: "画像が見つかりません",
    allButtonfreeSelect: "すべての無料カラーを選択",
    allButtonfreeUnselect: "すべての無料カラーの選択を解除",
    allButtonpaidSelect: "すべての💧有料カラーを選択",
    allButtonpaidUnselect: "すべての💧有料カラーの選択を解除",
    zoom: "ズーム",
    scale: "スケール",
    transparentButton: "半透明ピクセルを非表示",
    transparentButtonTitle: "有効にすると、半透明ピクセルは完全に透明になり、無効の場合は完全に不透明になります。",
    footerTitle: "Wplaceピクセルツール",
    footerDescription: "Wplaceプラットフォーム用の最高のピクセルアートコンバーター",
    linksTitle: "リンク",
    legalTitle: "法的情報",
    copyright: "© 2024 Wplace Pixel Tool. All rights reserved.",
    introTitle: "Wplace用プロフェッショナルピクセルアート作成",
    introDescription: "Wplaceピクセルツールは、ピクセルアート作成のための究極のソリューションです。高度なコンバーターが、画像をWplaceプラットフォームに最適化します。",
    featureTitle1: "高度なピクセルアート変換",
    featureDesc1: "プロフェッショナルな変換エンジンで、あらゆる画像を精密なピクセルアートに変換。Wplace用の完璧なピクセル配置とカスタマイズ可能な解像度。",
    featureTitle2: "Wplaceカラーシステム",
    featureDesc2: "Wplaceの完全なカラーパレットシステムにアクセス。無料カラーとプレミアムカラーでピクセルアートの傑作を作成し、Wplaceとの完璧な互換性を確保。",
    featureTitle3: "ピクセルパーフェクトツール",
    featureDesc3: "正確なスケーリング、ピクセルパーフェクトな調整、Wplaceとのシームレスな統合を含む、プロフェッショナルなピクセルアートツールを使用。"
  },
  de_CH: {
    title: "Wplace Wärkzüüg",
    subtitle: "Perfekti Pixel Art für Wplace erstelle",
    description: "Verwandle dini Bilder i perfekti Pixel Art mit em professionelle Wplace-Konverter. Präzisi Farbaapasse und starchii Pixel-Wärkzüüg.",
    freeColors: "Gratisfarbe:",
    paidColors: "Zahligs-Farbe (2000💧pro Stück):",
    download: "Bild abelade",
    clipboard: "I d'Zwüscheablag kopiere",
    goto: "Zu Wplace gah",
    pixelsAmount: "Aazahl Pixel:",
    width: "Breiti:",
    height: "Höchi:",
    area: "Flächi:",
    imageCopied: "Bild i d'Zwüscheablag kopiert!",
    copyFailed: "Kopiere vom Bild het nöd funktioniert.",
    imageNotFound: "Bild nöd gfunde",
    allButtonfreeSelect: "Alli Gratisfarbe uswähle",
    allButtonfreeUnselect: "Alli Gratisfarbe abwähle",
    allButtonpaidSelect: "Alli 💧Zahligs-Farbe uswähle",
    allButtonpaidUnselect: "Alli 💧Zahligs-Farbe abwähle",
    zoom: "Zoom",
    scale: "Grössi",
    transparentButton: "Halbtransparenti Pixel verstecke",
    transparentButtonTitle: "Wenn aktiviert, werded halbtransparenti Pixel ganz transparent, suscht werded si ganz undurchsichtig.",
    footerTitle: "Wplace Pixel Wärkzüüg",
    footerDescription: "De bescht Pixel Art Konverter für d'Wplace Plattform",
    linksTitle: "Links",
    legalTitle: "Rechtlichs",
    copyright: "© 2024 Wplace Pixel Tool. Alli Rächt vorbehalte.",
    introTitle: "Professionelli Pixel Art Erstellig für Wplace",
    introDescription: "S'Wplace Pixel Wärkzüüg isch dini ultimativ Lösig für s'Erstelle vo Pixel Art. Üse fortschrittlich Konverter stellt sicher, dass dini Bilder perfekt für d'Wplace-Plattform optimiert sind.",
    featureTitle1: "Fortgschritteni Pixel Art Konvertierig",
    featureDesc1: "Verwandle jedes Bild i präzisi Pixel Art mit üsem professionelle Konvertierigsmotor. Perfekti Pixel-Usrichtig und apassbari Uflösig für Wplace.",
    featureTitle2: "Wplace Farbsystem",
    featureDesc2: "Griff uf s'komplette Farbpalettesystem vo Wplace zue. Erstell Pixel Art Meisterwerk mit Gratis- und Premium-Farbe, wo perfekt mit Wplace kompatibel sind.",
    featureTitle3: "Pixel-Perfect Wärkzüüg",
    featureDesc3: "Nutz professionelli Pixel Art Wärkzüüg, inklusive präzisi Skalierig, pixel-perfekti Apassige und nahtlosi Integration mit Wplace."
  },
  nl: {
    title: "Wplace Gereedschap",
    subtitle: "Maak Perfecte Pixel Art voor Wplace",
    description: "Transformeer je afbeeldingen naar perfecte pixel art met de professionele Wplace-converter. Nauwkeurige kleuraanpassingen en krachtige pixelgereedschappen.",
    freeColors: "Gratis Kleuren:",
    paidColors: "Betaalde Kleuren (2000💧per stuk):",
    download: "Afbeelding Downloaden",
    clipboard: "Kopiëren naar Klembord",
    goto: "Ga naar Wplace",
    pixelsAmount: "Aantal Pixels:",
    width: "Breedte:",
    height: "Hoogte:",
    area: "Oppervlakte:",
    imageCopied: "Afbeelding gekopieerd naar klembord!",
    copyFailed: "Kopiëren van afbeelding mislukt.",
    imageNotFound: "Afbeelding niet gevonden",
    allButtonfreeSelect: "Selecteer Alle Gratis Kleuren",
    allButtonfreeUnselect: "Deselecteer Alle Gratis Kleuren",
    allButtonpaidSelect: "Selecteer Alle 💧Betaalde Kleuren",
    allButtonpaidUnselect: "Deselecteer Alle 💧Betaalde Kleuren",
    zoom: "Zoom",
    scale: "Schaal",
    transparentButton: "Verberg Semi-transparante Pixels",
    transparentButtonTitle: "Wanneer actief worden semi-transparante pixels volledig transparant, anders worden ze volledig ondoorzichtig.",
    footerTitle: "Wplace Pixel Gereedschap",
    footerDescription: "De beste pixel art converter voor het Wplace platform",
    linksTitle: "Links",
    legalTitle: "Juridisch",
    copyright: "© 2024 Wplace Pixel Tool. Alle rechten voorbehouden.",
    introTitle: "Professionele Pixel Art Creatie voor Wplace",
    introDescription: "Het Wplace Pixel Gereedschap is je ultieme oplossing voor het maken van pixel art. Onze geavanceerde converter zorgt ervoor dat je afbeeldingen perfect geoptimaliseerd zijn voor het Wplace platform.",
    featureTitle1: "Geavanceerde Pixel Art Conversie",
    featureDesc1: "Transformeer elke afbeelding naar nauwkeurige pixel art met onze professionele conversiemotor. Perfecte pixel-uitlijning en aanpasbare resolutie voor Wplace.",
    featureTitle2: "Wplace Kleursysteem",
    featureDesc2: "Krijg toegang tot het complete kleurpaletsysteem van Wplace. Maak pixel art meesterwerken met gratis en premium kleuren, met perfecte compatibiliteit met Wplace.",
    featureTitle3: "Pixel-Perfect Gereedschappen",
    featureDesc3: "Gebruik professionele pixel art gereedschappen, inclusief nauwkeurige schaling, pixel-perfecte aanpassingen en naadloze integratie met Wplace."
  },
  ru: {
    title: "Инструмент Wplace",
    subtitle: "Создавайте Идеальный Пиксель-арт для Wplace",
    description: "Преобразуйте ваши изображения в идеальный пиксель-арт с помощью профессионального конвертера Wplace. Точная настройка цветов и мощные инструменты для работы с пикселями.",
    freeColors: "Бесплатные Цвета:",
    paidColors: "Платные Цвета (2000💧каждый):",
    download: "Скачать Изображение",
    clipboard: "Копировать в Буфер Обмена",
    goto: "Перейти к Wplace",
    pixelsAmount: "Количество Пикселей:",
    width: "Ширина:",
    height: "Высота:",
    area: "Площадь:",
    imageCopied: "Изображение скопировано в буфер обмена!",
    copyFailed: "Не удалось скопировать изображение.",
    imageNotFound: "Изображение не найдено",
    allButtonfreeSelect: "Выбрать Все Бесплатные Цвета",
    allButtonfreeUnselect: "Отменить Выбор Всех Бесплатных Цветов",
    allButtonpaidSelect: "Выбрать Все 💧Платные Цвета",
    allButtonpaidUnselect: "Отменить Выбор Всех 💧Платных Цветов",
    zoom: "Масштаб",
    scale: "Размер",
    transparentButton: "Скрыть Полупрозрачные Пиксели",
    transparentButtonTitle: "Когда активно, полупрозрачные пиксели станут полностью прозрачными, иначе будут полностью непрозрачными.",
    footerTitle: "Инструмент Wplace Pixel",
    footerDescription: "Лучший конвертер пиксель-арта для платформы Wplace",
    linksTitle: "Ссылки",
    legalTitle: "Правовая информация",
    copyright: "© 2024 Wplace Pixel Tool. Все права защищены.",
    introTitle: "Профессиональное Создание Пиксель-арта для Wplace",
    introDescription: "Инструмент Wplace Pixel - это ваше идеальное решение для создания пиксель-арта. Наш продвинутый конвертер обеспечивает оптимальную подготовку ваших изображений для платформы Wplace.",
    featureTitle1: "Продвинутое Преобразование Пиксель-арта",
    featureDesc1: "Преобразуйте любое изображение в точный пиксель-арт с помощью нашего профессионального конвертера. Идеальное выравнивание пикселей и настраиваемое разрешение для Wplace.",
    featureTitle2: "Система Цветов Wplace",
    featureDesc2: "Получите доступ к полной системе цветовой палитры Wplace. Создавайте шедевры пиксель-арта с бесплатными и премиум цветами, обеспечивая идеальную совместимость с Wplace.",
    featureTitle3: "Инструменты Pixel-Perfect",
    featureDesc3: "Используйте профессиональные инструменты пиксель-арта, включая точное масштабирование, пиксельно-точные настройки и безупречную интеграцию с Wplace."
  },
  tr: {
    title: "Wplace Aracı",
    subtitle: "Wplace için Mükemmel Piksel Sanatı Oluşturun",
    description: "Görüntülerinizi Wplace'in profesyonel dönüştürücüsü ile mükemmel piksel sanatına dönüştürün. Hassas renk ayarları ve güçlü piksel araçları.",
    freeColors: "Ücretsiz Renkler:",
    paidColors: "Ücretli Renkler (her biri 2000💧):",
    download: "Görüntüyü İndir",
    clipboard: "Panoya Kopyala",
    goto: "Wplace'e Git",
    pixelsAmount: "Piksel Sayısı:",
    width: "Genişlik:",
    height: "Yükseklik:",
    area: "Alan:",
    imageCopied: "Görüntü panoya kopyalandı!",
    copyFailed: "Görüntü kopyalanamadı.",
    imageNotFound: "Görüntü bulunamadı",
    allButtonfreeSelect: "Tüm Ücretsiz Renkleri Seç",
    allButtonfreeUnselect: "Tüm Ücretsiz Renklerin Seçimini Kaldır",
    allButtonpaidSelect: "Tüm 💧Ücretli Renkleri Seç",
    allButtonpaidUnselect: "Tüm 💧Ücretli Renklerin Seçimini Kaldır",
    zoom: "Yakınlaştırma",
    scale: "Ölçek",
    transparentButton: "Yarı Saydam Pikselleri Gizle",
    transparentButtonTitle: "Etkinleştirildiğinde, yarı saydam pikseller tamamen saydam olacak, aksi takdirde tamamen opak olacaktır.",
    footerTitle: "Wplace Piksel Aracı",
    footerDescription: "Wplace platformu için en iyi piksel sanatı dönüştürücüsü",
    linksTitle: "Bağlantılar",
    legalTitle: "Yasal",
    copyright: "© 2024 Wplace Pixel Tool. Tüm hakları saklıdır.",
    introTitle: "Wplace için Profesyonel Piksel Sanatı Oluşturma",
    introDescription: "Wplace Piksel Aracı, piksel sanatı oluşturmak için nihai çözümünüzdür. Gelişmiş dönüştürücümüz, görüntülerinizin Wplace platformu için mükemmel şekilde optimize edilmesini sağlar.",
    featureTitle1: "Gelişmiş Piksel Sanatı Dönüşümü",
    featureDesc1: "Herhangi bir görüntüyü profesyonel dönüştürme motorumuzla hassas piksel sanatına dönüştürün. Wplace için mükemmel piksel hizalama ve özelleştirilebilir çözünürlük.",
    featureTitle2: "Wplace Renk Sistemi",
    featureDesc2: "Wplace'in eksiksiz renk paleti sistemine erişin. Ücretsiz ve premium renklerle piksel sanatı başyapıtları oluşturun, Wplace ile mükemmel uyumluluk sağlayın.",
    featureTitle3: "Piksel-Mükemmel Araçlar",
    featureDesc3: "Hassas ölçekleme, piksel-mükemmel ayarlamalar ve Wplace ile sorunsuz entegrasyon dahil olmak üzere profesyonel piksel sanatı araçlarını kullanın."
  }
};

// Language selector change event
document.getElementById("lang-select").addEventListener("change", function () {
  const lang = this.value;
  applyTranslations(lang);
  localStorage.setItem("lang", lang);
});

// Load saved or detected language on page load
document.addEventListener("DOMContentLoaded", () => {
  let savedLang = localStorage.getItem("lang");
  console.log("Language applied to site:", savedLang);

  if (!savedLang) {
    // Detect browser language
    let browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    console.log("Browser language detected:", browserLang);

    // First try full match (e.g. "pt-BR")
    if (translations[browserLang]) {
      savedLang = browserLang;
    } else {
      // Then try first two letters (e.g. "pt-BR" → "pt")
      let shortLang = browserLang.split("-")[0];
      if (translations[shortLang]) {
        savedLang = shortLang;
      } else {
        // Default to English if not found
        savedLang = "en";
      }
    }
  }

  // Apply language and store it
  document.getElementById("lang-select").value = savedLang;
  applyTranslations(savedLang);
  localStorage.setItem("lang", savedLang);
});

// Global variables for image size
let currentImageWidth = null;
let currentImageHeight = null;
let fileName = "";

// Helper to get current language from selector
function getCurrentLang() {
  const langSelect = document.getElementById('lang-select');
  return (langSelect && langSelect.value) || 'en';
}

// Show image info with translation
function showImageInfo(width, height) {
  const lang = getCurrentLang();
  const t = translations[lang];
  if (!width || !height) return;
  document.getElementById("width").textContent = `${t.width} ${width} px`;
  document.getElementById("height").textContent = `${t.height} ${height} px`;
  document.getElementById("area").textContent = `${t.area} ${width * height} px`;
}

// Refresh width/height/area display
showImageInfo(currentImageWidth, currentImageHeight);

// When loading an image, update the global size variables
upload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  fileName = file.name;
  const reader = new FileReader();
  reader.onload = evt => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      currentImageWidth = img.width;
      currentImageHeight = img.height;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      processarImagem();

      // Show info for the loaded image
      showImageInfo(currentImageWidth, currentImageHeight);
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

// Transparent button functionality
document.getElementById('transparentButton').addEventListener('click', function () {
  this.classList.toggle('active');
  localStorage.setItem('transparentHide', this.classList.contains('active'));

  updatePadraoFromActiveButtons();

  if (originalImage) {
    applyScale();
    applyPreview();
  }
});

function applyTranslations(lang) {
  // Update meta tags
  const metaTags = {
    title: {
      en: "Wplace Tool Help Paint Easily",
      pt: "Ferramenta Wplace para Pintar Facilmente",
      es: "Herramienta Wplace para Pintar Fácilmente",
      fr: "Outil Wplace pour Peindre Facilement",
      de: "Wplace Werkzeug zum einfachen Malen",
      ja: "Wplaceで簡単にペイントできるツール",
      uk: "Інструмент Wplace для Легкого Малювання",
      vi: "Công cụ Wplace Giúp Vẽ Dễ Dàng",
      pl: "Narzędzie Wplace do Łatwego Malowania",
      de_CH: "Wplace Wärkzüüg zum eifache Male",
      nl: "Wplace Gereedschap voor Eenvoudig Schilderen",
      ru: "Инструмент Wplace для Удобного Рисования",
      tr: "Wplace Kolay Boyama Aracı"
    },
    keywords: {
      en: "wplace live, wplace tool, wplace extension, wplace script, wplace pixel, blue marble, wplace pixel maker, wplace pixel converter, wplace colors palette",
      pt: "wplace ao vivo, ferramenta wplace, extensão wplace, script wplace, pixel wplace, mármore azul, criador de pixels wplace, conversor de pixels wplace, paleta de cores wplace",
      es: "wplace en vivo, herramienta wplace, extensión wplace, script wplace, píxel wplace, mármol azul, creador de píxeles wplace, convertidor de píxeles wplace, paleta de colores wplace",
      fr: "wplace en direct, outil wplace, extension wplace, script wplace, pixel wplace, marbre bleu, créateur de pixels wplace, convertisseur de pixels wplace, palette de couleurs wplace",
      de: "wplace live, wplace-werkzeug, wplace-erweiterung, wplace-script, wplace-pixel, blauer marmor, wplace-pixel-maker, wplace-pixel-konverter, wplace-farbpalette",
      ja: "wplace ライブ, wplace ツール, wplace 拡張機能, wplace スクリプト, wplace ピクセル, 青い大理石, wplace ピクセル作成ツール, wplace ピクセル変換ツール, wplace カラーパレット",
      uk: "wplace наживо, інструмент wplace, розширення wplace, скрипт wplace, піксель wplace, блакитний мармур, генератор пікселів wplace, перетворювач пікселів wplace, палітра кольорів wplace",
      vi: "wplace trực tiếp, công cụ wplace, tiện ích mở rộng wplace, tập lệnh wplace, pixel wplace, đá cẩm thạch xanh, trình tạo pixel wplace, trình chuyển đổi pixel wplace, bảng màu wplace",
      pl: "wplace na żywo, narzędzie wplace, rozszerzenie wplace, skrypt wplace, piksel wplace, niebieski marmur, twórca pikseli wplace, konwerter pikseli wplace, paleta kolorów wplace",
      de_CH: "wplace live, wplace wärkzüüg, wplace-erwyterig, wplace script, wplace pixel, blauer marmor, wplace pixel maker, wplace pixel konverter, wplace farbpalette",
      nl: "wplace live, wplace gereedschap, wplace extensie, wplace script, wplace pixel, blauw marmer, wplace pixelmaker, wplace pixelconverter, wplace kleurenpalet",
      ru: "wplace в прямом эфире, инструмент wplace, расширение wplace, скрипт wplace, пиксель wplace, голубой мрамор, создатель пикселей wplace, конвертер пикселей wplace, палитра цветов wplace",
      tr: "wplace canlı, wplace aracı, wplace uzantısı, wplace betiği, wplace piksel, mavi mermer, wplace piksel oluşturucu, wplace piksel dönüştürücü, wplace renk paleti"
    },
    description: {
      en: "Wplace pixel art converter & generator & maker & extension & script. Transform your images into perfect pixel",
      pt: "Conversor e gerador de pixel art Wplace & extensão & script. Transforme suas imagens em pixels perfeitos",
      es: "Conversor y generador de pixel art Wplace & extensión & script. Transforma tus imágenes en píxeles perfectos",
      fr: "Convertisseur et générateur de pixel art Wplace & extension & script. Transformez vos images en pixels parfaits",
      de: "Wplace Pixel Art Konverter & Generator & Maker & Erweiterung & Skript. Verwandle deine Bilder in perfekte Pixel",
      ja: "Wplaceピクセルアートコンバーター＆ジェネレーター＆メーカー＆拡張機能＆スクリプト。画像を完璧なピクセルに変換",
      uk: "Конвертер і генератор піксельного мистецтва Wplace & розширення & скрипт. Перетворіть ваші зображення в ідеальні пікселі",
      vi: "Bộ chuyển đổi và tạo pixel art Wplace & tiện ích mở rộng & script. Chuyển đổi hình ảnh của bạn thành pixel hoàn hảo",
      pl: "Konwerter i generator pixel art Wplace & rozszerzenie & skrypt. Przekształć swoje obrazy w idealne piksele",
      de_CH: "Wplace Pixel Art Konverter & Generator & Maker & Erwiiterig & Skript. Verwandle dini Bilder i perfekti Pixel",
      nl: "Wplace pixel art converter & generator & maker & extensie & script. Transformeer je afbeeldingen naar perfecte pixels",
      ru: "Конвертер и генератор пиксельного искусства Wplace & расширение & скрипт. Преобразуйте ваши изображения в идеальные пиксели",
      tr: "Wplace piksel sanatı dönüştürücü & üretici & yapıcı & eklenti & script. Görüntülerinizi mükemmel piksellere dönüştürün"
    }
  };

  // Update meta tags
  document.title = metaTags.title[lang] || metaTags.title.en;
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTags.title[lang] || metaTags.title.en);
  document.querySelector('meta[property="og:description"]').setAttribute('content', metaTags.description[lang] || metaTags.description.en);
  document.querySelector('meta[name="description"]').setAttribute('content', metaTags.description[lang] || metaTags.description.en);
  // Update visible elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const titleKey = el.getAttribute('data-i18n-title');

    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
    if (titleKey && translations[lang]?.[titleKey]) el.title = translations[lang][titleKey];
  });

  // Update dynamic info if present
  if (currentImageWidth && currentImageHeight) {
    const t = translations[lang];
    document.getElementById("width").textContent = `${t.width} ${currentImageWidth}`;
    document.getElementById("height").textContent = `${t.height} ${currentImageHeight}`;
    document.getElementById("area").textContent = `${t.area} ${currentImageWidth * currentImageHeight}`;
  }

  // Call any additional UI update
  showImageInfo(currentImageWidth, currentImageHeight);
}

