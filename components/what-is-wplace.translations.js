(() => {
  const dict = {
    en: {
      title: "What is Wplace.live?",
      strong: "Wplace.live",
      desc: "is a collaborative pixel canvas where communities place colored pixels together to create large, evolving artworks in real time. It’s a creative playground for strategy, design, and teamwork.",
      toolsPre: "Use our tools to prepare assets, pick colors, and generate shareable map links. If you’re new, just visit",
      toolsPost: "to join the action.",
      rulesTitle: "Wplace.live rules",
      rules: [
        "😈 Do not paint over other artworks using random colors or patterns just to mess things up",
        "🔞 No +18 or hate group related paintings",
        "🔗 Do not reference inappropriate websites",
        "🧑‍🤝‍🧑 Do not paint with more than one account",
        "🤖 Use of bots is not allowed",
        "🙅 Disclosing other user's personal information is not allowed",
        "✅ Painting over other artworks to complement them or create a new drawing is allowed",
        "✅ Griefing political party flags or portraits of politicians is allowed",
      ],
    },
    pt: {
      title: "O que é o Wplace.live?",
      strong: "Wplace.live",
      desc: "é uma tela colaborativa de pixels onde comunidades posicionam pixels coloridos juntas para criar obras em constante evolução, em tempo real. É um espaço criativo para estratégia, design e trabalho em equipe.",
      toolsPre: "Use nossas ferramentas para preparar assets, escolher cores e gerar links de mapa compartilháveis. Se você é novo, visite",
      toolsPost: "para entrar na ação.",
      rulesTitle: "Regras do Wplace.live",
      rules: [
        "😈 Não pinte sobre outras artes usando cores ou padrões aleatórios apenas para atrapalhar",
        "🔞 Não são permitidas pinturas +18 ou relacionadas a grupos de ódio",
        "🔗 Não faça referência a sites inadequados",
        "🧑‍🤝‍🧑 Não utilize mais de uma conta para pintar",
        "🤖 O uso de bots não é permitido",
        "🙅 Divulgar informações pessoais de outros usuários não é permitido",
        "✅ Pintar sobre outras artes para complementá-las ou criar um novo desenho é permitido",
        "✅ Fazer ‘griefing’ com bandeiras de partidos políticos ou retratos de políticos é permitido",
      ],
    },
  };

  function apply(lang) {
    const L = dict[lang] || dict.en;
    const setText = (sel, text) => {
      const el = document.querySelector(sel);
      if (el && typeof text === 'string') el.textContent = text;
    };
    setText('#wip-title', L.title);
    setText('#wip-desc-strong', L.strong);
    // For the main description paragraph, keep the bold strong then the rest
    const descP = document.querySelector('#wip-desc');
    if (descP) {
      const strongEl = document.querySelector('#wip-desc-strong');
      if (strongEl) strongEl.textContent = L.strong;
      const tailText = ` ${L.desc}`;
      // Replace text nodes after strong
      const nodes = Array.from(descP.childNodes);
      const strongIndex = nodes.indexOf(strongEl);
      if (strongIndex !== -1) {
        // Remove everything after strong and append a new text node
        for (let i = nodes.length - 1; i > strongIndex; i -= 1) {
          descP.removeChild(nodes[i]);
        }
        descP.append(document.createTextNode(tailText));
      }
    }
    setText('#wip-tools-pre', L.toolsPre + ' ');
    setText('#wip-tools-post', ' ' + L.toolsPost);
    setText('#wip-rules-title', L.rulesTitle);
    L.rules && L.rules.forEach((rule, idx) => setText(`#wip-rule-${idx + 1}`, rule));
  }

  window.translationsWhatIsWplace = dict;
  window.applyWhatIsWplaceTranslations = apply;
})();


