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
console.log(document.getElementById("meta-og-title"));
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

