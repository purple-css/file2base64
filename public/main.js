const stylesheets = ['src/css/fonts.css', 'src/css/originalText-andBase64-Fonts.css', 'src/css/styles.css'];
for (const href of stylesheets) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.append(link);
}
import './src/js/script.js';
