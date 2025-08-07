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

import { findClosestColor, colorNames, freeColors, paidColors } from './utils/color-logic.js';
import { translations } from './utils/i18n.js';

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
  const t = translations[lang] || translations['pt'];

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
  const lang = (langSelect && langSelect.value) || 'pt';
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
  const t = translations[lang] || translations['pt'];

  // Start with all free buttons selected
  const freeButtons = document.querySelectorAll('#colors .toggle-color[data-type="free"]');
  freeButtons.forEach(btn => btn.classList.add('active'));
  selectAllFreeBtn.textContent = t.allButtonfreeUnselect;

  selectAllFreeBtn.addEventListener('click', () => {
    const lang = getCurrentLang();
    const t = translations[lang] || translations['pt'];

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
  const t = translations[lang] || translations['pt'];

  selectAllPaidBtn.textContent = t.allButtonpaidSelect;

  selectAllPaidBtn.addEventListener('click', () => {
    const paidButtons = document.querySelectorAll('#colors .toggle-color[data-type="paid"]');
    isAllPaidSelected = !isAllPaidSelected;

    paidButtons.forEach(btn => {
      btn.classList.toggle('active', isAllPaidSelected);
    });

    const currentLang = getCurrentLang();
    const tt = translations[currentLang] || translations['pt'];

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
        // Default to Portuguese if not found
        savedLang = "pt";
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
  return (langSelect && langSelect.value) || 'pt';
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
  document.title = metaTags.title[lang] || metaTags.title.pt;
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTags.title[lang] || metaTags.title.pt);
  document.querySelector('meta[property="og:description"]').setAttribute('content', metaTags.description[lang] || metaTags.description.pt);
  document.querySelector('meta[name="description"]').setAttribute('content', metaTags.description[lang] || metaTags.description.pt);
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

