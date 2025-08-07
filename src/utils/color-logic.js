// src/utils/color-logic.js

export const colorNames = {
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


    
  
  export const freeColors = [
    // ... 您的 freeColors 数组
  ];
  
  export const paidColors = new Set([
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
  
  export function findClosestColor(r, g, b, palette) {
    // ... 您的 findClosestColor 函数逻辑
  }