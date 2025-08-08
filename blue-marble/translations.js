const translations = {
  en: {
    // Meta and SEO
    pageTitle: "How to Use Blue Marble - Wplace Plugin Guide | Blue Marble Tutorial",
    metaDescription: "Complete guide on how to use Blue Marble plugin for Wplace. Learn to install and use this powerful Wplace hack for template overlays, pixel placement, and enhanced gameplay.",
    metaKeywords: "Blue Marble, how to use Blue Marble, wplace plugins, wplace hack, Blue Marble tutorial, Blue Marble guide, wplace userscript, wplace template, wplace tools, Blue Marble installation, wplace extension, pixel art tools",
    
    // Navigation
    navHome: "Home",
    navBlueMarble: "Blue Marble",
    navGitHub: "GitHub",
    
    // Main Content
    mainTitle: "How To Use Blue Marble - Complete Wplace Plugin Guide",
    overviewTitle: "What is Blue Marble Plugin?",
    overviewText1: "Blue Marble is the most popular wplace plugin and powerful wplace hack that enhances your wplace.live experience. This comprehensive Blue Marble tutorial will guide you through installation and usage of this essential wplace userscript.",
    overviewText2: "Blue Marble provides advanced features like template overlays, coordinate tracking, and pixel placement assistance - making it the go-to choice for serious wplace players. Learn how to use Blue Marble effectively with our step-by-step guide.",
    overviewText3: "Looking for more wplace tools? Also check out our Wplace Pixel Art Converter to transform your images into perfect pixel art for wplace.",
    
    // What You'll Learn
    whatYouLearnTitle: "🎯 What You'll Learn",
    learnItem1: "Blue Marble installation on Chrome, Firefox, and Edge",
    learnItem2: "How to use Blue Marble plugin for template management",
    learnItem3: "Advanced wplace hack techniques and coordinates",
    learnItem4: "Template settings and transparent pixel handling",
    learnItem5: "Troubleshooting common wplace plugins issues",
    
    // Installation
    installationTitle: "Blue Marble Installation Guide - Step by Step",
    installationText1: "This Blue Marble installation guide covers all major browsers. The Blue Marble plugin works on desktop and mobile devices. Follow these detailed instructions to install this powerful wplace hack on your browser.",
    installationText2: "Supported Browsers: Chrome (recommended), Firefox, Microsoft Edge, and mobile browsers. Choose your browser below and follow the step-by-step Blue Marble tutorial.",
    
    // Installation Steps
    installChrome: "Install Chrome (Computer)",
    installEdge: "Install Edge (Computer)", 
    installFirefox: "Install Firefox (Computer)",
    clickToExpand: "(Click to Expand)",
    
    // Template Instructions
    templateTitle: "Template Instructions",
    templateText1: "Blue Marble will display your template as the same size. If your image is 500 pixels tall and 300 pixels wide, the template will be 500 pixels tall and 300 pixels wide. Here is the instructions to display a template image on the canvas:",
    templateStep1: "Find the pixel of the top left corner. Fill in Tl X, Tl Y, Px X, and Px Y with the coordinates. You can use the \"Pin\" icon to auto-fill the coordinates after clicking the pixel.",
    templateStep2: "Upload a PNG or WEBP image.",
    templateStep3: "Click the \"Enable\" button.",
    
    // Settings
    scriptSettingsTitle: "Script Settings",
    scriptSettingsText: "There are many settings available for the Blue Marble userscript! Through these settings, you can control how the script behaves.",
    
    templateSettingsTitle: "Template Settings",
    transparentPixelsTitle: "Transparent Pixels",
    transparentPixelsText: "Templates for Blue Marble work slightly different from normal. Since there is a \"Transparent\" color, and transparent pixels in templates are typically ignored, your template should have a custom color to signify \"Transparent\" colored pixels. If a specific pixel can be any color, it should be transparent in the template. If a specific pixel should be \"Transparent\" color, it should have the #deface hex color. Any #deface colored pixel in your template will be interpereted as the \"Transparent\" color. Any transparent colored pixel in your template will be interpereted as ignored.",
    
    coordinatesTitle: "Coordinates",
    tileCoordinatesTitle: "Tile Coordinates",
    tileCoordinatesText: "The coordinate system for wplace.live is unique. Instead of all pixels having a global coordinate number (x, y), the coordinate number is relative to the tile. This means you need to know the tile number and the coordinate number to do anything. In Blue Marble, the tile coordinates and the pixel coordinates are displayed when you click on a pixel. These are the coordinates you should use for aligning a template.",
    
    templateCoordinatesTitle: "Template Coordinates",
    templateCoordinatesText: "The template is aligned from the top left corner of the template. You can auto-fill this position using the \"pin\" icon next to the coordinate input boxes.",
    
    // Versioning
    versioningTitle: "How Versioning Works",
    versioningText: "The versioning system for this userscript follows the Semantic Versioning rules. As such, it is formatted in an X.Y.Z format where:",
    versioningItem1: "X is the major version. This is incremented when a non-backward compatible update is pushed. This is for new features that break previous versions of the userscript. Additionally, if wplace.live breaks the userscript, this will be incremented.",
    versioningItem2: "Y is the minor version. This is incremented whenever I push to GitHub. This is for stable bug-fixes and new (non-breaking) features.",
    versioningItem3: "Z is the patch version. This is incremented whenever I launch a development version of the userscript to test a patch. This is for unstable bug-fixes/features.",
    
    // Licenses
    licensesTitle: "Licenses",
    licensesText: "(Below, all mentions of the \"userscript\" refer to the \"Blue Marble\" userscript made by SwingTheVine) Most of this userscript is licensed under the Mozilla Public License Version 2.0 (MPL-2.0). All software, code, and libraries in this repository are licensed under the MPL-2.0 license. However, the \"Blue Marble\" image in this userscript is owned by NASA and is licensed under the Creative Commons 0 1.0 Universal (CC0 1.0) license.",
    
    // FAQ
    faqTitle: "Frequently Asked Questions - Blue Marble Plugin",
    faqSafeTitle: "Is Blue Marble Plugin Safe to Use?",
    faqSafeAnswer: "Yes, Blue Marble is completely safe. This wplace plugin contains no malicious code. The entire Blue Marble source code is available in the src/ folder on GitHub. If you have concerns about this wplace hack, you can review the code and build it yourself using the provided tools.",
    
    faqAutoTitle: "Does Blue Marble Auto-Place Pixels?",
    faqAutoAnswer: "No, Blue Marble plugin does not automatically place pixels. This wplace userscript is designed to assist with template overlays and coordinate tracking, but requires manual pixel placement to comply with wplace.live terms of service.",
    
    faqHideTitle: "How to Hide Blue Marble Overlay?",
    faqHideAnswer: "To hide the Blue Marble overlay, simply turn off the userscript in your TamperMonkey dashboard and refresh the wplace.live page. You can re-enable this wplace plugin anytime.",
    
    faqNotificationTitle: "Why Do Notifications Appear Over Blue Marble?",
    faqNotificationAnswer: "Game notifications from wplace.live appear on top of the Blue Marble plugin overlay because they require immediate user attention. This wplace hack is designed to work harmoniously with the main game interface.",
    
    faqTroubleshootTitle: "Blue Marble Not Working - Troubleshooting",
    faqTroubleshootAnswer: "If your Blue Marble plugin isn't working, try these steps: 1) Refresh wplace.live, 2) Check if TamperMonkey is enabled, 3) Verify the Blue Marble userscript is active in your dashboard, 4) Clear browser cache, 5) Reinstall the wplace plugin."
  },
  
  pt: {
    // Meta and SEO
    pageTitle: "Como Usar Blue Marble - Guia do Plugin Wplace | Tutorial Blue Marble",
    metaDescription: "Guia completo sobre como usar o plugin Blue Marble para Wplace. Aprenda a instalar e usar este poderoso hack do Wplace para sobreposições de templates, colocação de pixels e gameplay aprimorado.",
    metaKeywords: "Blue Marble, como usar Blue Marble, plugins wplace, hack wplace, tutorial Blue Marble, guia Blue Marble, userscript wplace, template wplace, ferramentas wplace, instalação Blue Marble, extensão wplace, ferramentas pixel art",
    
    // Navigation
    navHome: "Início",
    navBlueMarble: "Blue Marble",
    navGitHub: "GitHub",
    
    // Main Content
    mainTitle: "Como Usar Blue Marble - Guia Completo do Plugin Wplace",
    overviewTitle: "O que é o Plugin Blue Marble?",
    overviewText1: "<strong>Blue Marble</strong> é o <strong>plugin wplace</strong> mais popular e <strong>hack wplace</strong> poderoso que melhora sua experiência no <a href=\"https://wplace.live/\" target=\"_blank\" rel=\"noopener noreferrer\">wplace.live</a>. Este <strong>tutorial Blue Marble</strong> abrangente irá guiá-lo através da instalação e uso deste <strong>userscript wplace</strong> essencial.",
    overviewText2: "Blue Marble fornece recursos avançados como sobreposições de templates, rastreamento de coordenadas e assistência de colocação de pixels - tornando-se a escolha preferida para jogadores sérios do wplace. Aprenda <strong>como usar Blue Marble</strong> efetivamente com nosso guia passo a passo.",
    overviewText3: "Procurando por mais <strong>ferramentas wplace</strong>? Também confira nosso <a href=\"https://wplace.wiki\" target=\"_blank\" rel=\"noopener noreferrer\">Conversor de Pixel Art Wplace</a> para transformar suas imagens em pixel art perfeita para wplace.",
    
    // What You'll Learn
    whatYouLearnTitle: "🎯 O que Você Vai Aprender",
    learnItem1: "<strong>Instalação do Blue Marble</strong> no Chrome, Firefox e Edge",
    learnItem2: "Como usar o <strong>plugin Blue Marble</strong> para gerenciamento de templates",
    learnItem3: "Técnicas avançadas de <strong>hack wplace</strong> e coordenadas",
    learnItem4: "Configurações de templates e manipulação de pixels transparentes",
    learnItem5: "Solução de problemas comuns dos <strong>plugins wplace</strong>",
    
    // Installation
    installationTitle: "Guia de Instalação Blue Marble - Passo a Passo",
    installationText1: "Este <strong>guia de instalação do Blue Marble</strong> cobre todos os principais navegadores. O <strong>plugin Blue Marble</strong> funciona em dispositivos desktop e móveis. Siga estas instruções detalhadas para instalar este poderoso <strong>hack wplace</strong> em seu navegador.",
    installationText2: "<strong>Navegadores Suportados:</strong> Chrome (recomendado), Firefox, Microsoft Edge e navegadores móveis. Escolha seu navegador abaixo e siga o <strong>tutorial Blue Marble</strong> passo a passo.",
    
    // Installation Steps
    installChrome: "Instalar Chrome (Computador)",
    installEdge: "Instalar Edge (Computador)",
    installFirefox: "Instalar Firefox (Computador)",
    clickToExpand: "(Clique para Expandir)",
    
    // Template Instructions
    templateTitle: "Instruções de Template",
    templateText1: "Blue Marble exibirá seu template no mesmo tamanho. Se sua imagem tem 500 pixels de altura e 300 pixels de largura, o template terá 500 pixels de altura e 300 pixels de largura. Aqui estão as instruções para exibir uma imagem de template no canvas:",
    templateStep1: "Encontre o pixel do canto superior esquerdo. Preencha Tl X, Tl Y, Px X e Px Y com as coordenadas. Você pode usar o ícone \"Pin\" para preencher automaticamente as coordenadas após clicar no pixel.",
    templateStep2: "Carregue uma imagem PNG ou WEBP.",
    templateStep3: "Clique no botão \"Ativar\".",
    
    // Settings
    scriptSettingsTitle: "Configurações do Script",
    scriptSettingsText: "Existem muitas configurações disponíveis para o userscript Blue Marble! Através dessas configurações, você pode controlar como o script se comporta.",
    
    templateSettingsTitle: "Configurações de Template",
    transparentPixelsTitle: "Pixels Transparentes",
    transparentPixelsText: "Templates para Blue Marble funcionam de forma ligeiramente diferente do normal. Como existe uma cor \"Transparente\", e pixels transparentes em templates são tipicamente ignorados, seu template deve ter uma cor personalizada para significar pixels de cor \"Transparente\". Se um pixel específico pode ser de qualquer cor, deve ser transparente no template. Se um pixel específico deve ser da cor \"Transparente\", deve ter a cor hex #deface. Qualquer pixel de cor #deface em seu template será interpretado como a cor \"Transparente\". Qualquer pixel transparente em seu template será interpretado como ignorado.",
    
    coordinatesTitle: "Coordenadas",
    tileCoordinatesTitle: "Coordenadas de Tile",
    tileCoordinatesText: "O sistema de coordenadas para wplace.live é único. Em vez de todos os pixels terem um número de coordenada global (x, y), o número da coordenada é relativo ao tile. Isso significa que você precisa saber o número do tile e o número da coordenada para fazer qualquer coisa. No Blue Marble, as coordenadas do tile e as coordenadas do pixel são exibidas quando você clica em um pixel. Essas são as coordenadas que você deve usar para alinhar um template.",
    
    templateCoordinatesTitle: "Coordenadas de Template",
    templateCoordinatesText: "O template é alinhado a partir do canto superior esquerdo do template. Você pode preencher automaticamente esta posição usando o ícone \"pin\" próximo às caixas de entrada de coordenadas.",
    
    // Versioning
    versioningTitle: "Como o Versionamento Funciona",
    versioningText: "O sistema de versionamento para este userscript segue as regras de Versionamento Semântico. Como tal, é formatado em um formato X.Y.Z onde:",
    versioningItem1: "X é a versão principal. Isso é incrementado quando uma atualização não compatível com versões anteriores é enviada. Isso é para novos recursos que quebram versões anteriores do userscript. Além disso, se wplace.live quebrar o userscript, isso será incrementado.",
    versioningItem2: "Y é a versão menor. Isso é incrementado sempre que eu envio para o GitHub. Isso é para correções de bugs estáveis e novos recursos (não quebram).",
    versioningItem3: "Z é a versão de patch. Isso é incrementado sempre que eu lanço uma versão de desenvolvimento do userscript para testar um patch. Isso é para correções de bugs/recursos instáveis.",
    
    // Licenses
    licensesTitle: "Licenças",
    licensesText: "(Abaixo, todas as menções do \"userscript\" se referem ao userscript \"Blue Marble\" feito por SwingTheVine) A maior parte deste userscript está licenciada sob a Licença Pública Mozilla Versão 2.0 (MPL-2.0). Todo software, código e bibliotecas neste repositório estão licenciados sob a licença MPL-2.0. No entanto, a imagem \"Blue Marble\" neste userscript é propriedade da NASA e está licenciada sob a Creative Commons 0 1.0 Universal (CC0 1.0).",
    
    // FAQ
    faqTitle: "Perguntas Frequentes - Plugin Blue Marble",
    faqSafeTitle: "O Plugin Blue Marble é Seguro de Usar?",
    faqSafeAnswer: "Sim, <strong>Blue Marble</strong> é completamente seguro. Este <strong>plugin wplace</strong> não contém código malicioso. Todo o código fonte do <strong>Blue Marble</strong> está disponível na pasta <code>src/</code> no GitHub. Se você tem preocupações sobre este <strong>hack wplace</strong>, pode revisar o código e construí-lo você mesmo usando as ferramentas fornecidas.",
    
    faqAutoTitle: "Blue Marble Coloca Pixels Automaticamente?",
    faqAutoAnswer: "Não, o <strong>plugin Blue Marble</strong> não coloca pixels automaticamente. Este <strong>userscript wplace</strong> foi projetado para auxiliar com sobreposições de templates e rastreamento de coordenadas, mas requer colocação manual de pixels para cumprir os termos de serviço do wplace.live.",
    
    faqHideTitle: "Como Ocultar a Sobreposição do Blue Marble?",
    faqHideAnswer: "Para ocultar a sobreposição do <strong>Blue Marble</strong>, simplesmente desligue o userscript em seu painel TamperMonkey e atualize a página wplace.live. Você pode reativar este <strong>plugin wplace</strong> a qualquer momento.",
    
    faqNotificationTitle: "Por Que as Notificações Aparecem Sobre o Blue Marble?",
    faqNotificationAnswer: "As notificações do jogo do wplace.live aparecem em cima da sobreposição do <strong>plugin Blue Marble</strong> porque requerem atenção imediata do usuário. Este <strong>hack wplace</strong> foi projetado para funcionar harmoniosamente com a interface principal do jogo.",
    
    faqTroubleshootTitle: "Blue Marble Não Funciona - Solução de Problemas",
    faqTroubleshootAnswer: "Se seu <strong>plugin Blue Marble</strong> não estiver funcionando, tente estes passos: 1) Atualize wplace.live, 2) Verifique se TamperMonkey está ativado, 3) Verifique se o <strong>userscript Blue Marble</strong> está ativo em seu painel, 4) Limpe o cache do navegador, 5) Reinstale o <strong>plugin wplace</strong>."
  }
};