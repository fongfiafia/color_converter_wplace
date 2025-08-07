import { freeColors, paidColors } from './color-data.js';

/**
 * Create a color button element
 * @param {Object} color - Color data object
 * @param {string} type - Button type ('free' or 'paid')
 * @returns {HTMLButtonElement} Created button element
 */
function createColorButton(color, type) {
  const { id, name, rgb, textColor } = color;
  const button = document.createElement('button');
  
  button.id = id;
  button.className = `toggle-color${type === 'free' ? ' active' : ''}`;
  button.setAttribute('data-type', type);
  button.style.background = `rgb(${rgb.join(',')})`;
  if (textColor) {
    button.style.color = textColor;
  }
  button.title = `${name}: rgb(${rgb.join(', ')})`;
  button.textContent = name;

  return button;
}

/**
 * Initialize color buttons in the container
 * @param {string} containerId - ID of the container element
 * @param {Array} colors - Array of color data objects
 * @param {string} type - Button type ('free' or 'paid')
 */
function initializeColorButtons(containerId, colors, type) {
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById(containerId);
        if (!container) return;
      
        colors.forEach(color => {
          const button = createColorButton(color, type);
          container.appendChild(button);
        });
    })

}

/**
 * Initialize all color buttons
 */
export function initializeAllColorButtons() {
  initializeColorButtons('free-colors', freeColors, 'free');
  initializeColorButtons('paid-colors', paidColors, 'paid');
}

/**
 * Add event listeners to color buttons
 * @param {Function} updatePadraoFromActiveButtons - Function to update active colors
 * @param {Object} originalImage - Original image object
 * @param {Function} applyScale - Function to apply scale
 * @param {Function} applyPreview - Function to apply preview
 */
export function setupColorButtonEvents(updatePadraoFromActiveButtons, originalImage, applyScale, applyPreview) {
  const buttons = document.querySelectorAll('.toggle-color');
  
  buttons.forEach(btn => {
    if (btn.id === 'unselect-all-free' || btn.id === 'select-all-paid') return;
    
    btn.addEventListener('click', function() {
      btn.classList.toggle('active');
      updatePadraoFromActiveButtons();
      if (originalImage) {
        applyScale();
        applyPreview();
      }
    });
  });

  // Setup select/unselect all buttons
  setupSelectAllButtons(updatePadraoFromActiveButtons, originalImage, applyScale, applyPreview);
}

/**
 * Setup select/unselect all buttons
 * @param {Function} updatePadraoFromActiveButtons - Function to update active colors
 * @param {Object} originalImage - Original image object
 * @param {Function} applyScale - Function to apply scale
 * @param {Function} applyPreview - Function to apply preview
 */
function setupSelectAllButtons(updatePadraoFromActiveButtons, originalImage, applyScale, applyPreview) {
    document.addEventListener("DOMContentLoaded", () => {

    })
  
}