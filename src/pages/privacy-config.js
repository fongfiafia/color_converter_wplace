// 隐私政策页面配置
export const privacyPageConfig = {
  title: 'Privacy Policy | Wplace Pixel Tool',
  description: 'Privacy Policy for Wplace Pixel Tool - Learn how we protect your privacy and handle your data',
  keywords: 'privacy policy, wplace, data protection, privacy',
  canonicalUrl: 'https://www.wplace.wiki/privacy.html',
  pageTitle: 'Privacy Policy',
  template: 'static',
  
  sections: [
    {
      title: 'Introduction',
      content: 'This Privacy Policy explains how Wplace Pixel Tool ("we", "us", or "our") collects, uses, and protects your information when you use our service.'
    },
    {
      title: 'Information We Collect',
      content: 'We collect the following types of information:',
      list: [
        'Usage Data (through Google Analytics)',
        'Images you upload for conversion (not stored)',
        'Browser settings and preferences'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the collected information to:',
      list: [
        'Provide and improve our service',
        'Analyze usage patterns',
        'Fix technical issues',
        'Enhance user experience'
      ]
    },
    {
      title: 'Data Security',
      content: 'We prioritize your data security:',
      list: [
        'Images are processed locally in your browser',
        'We don\'t store your uploaded images',
        'All processing is done client-side'
      ]
    },
    {
      title: 'Third-Party Services',
      content: 'We use the following third-party services:',
      list: [
        'Google Analytics for usage statistics',
        'GitHub for code hosting'
      ]
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us through our GitHub repository.'
    }
  ]
};