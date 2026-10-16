#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '.next/server/app');
const pages = [
  { path: '/', file: 'index.html' },
  { path: '/estudio', file: 'estudio.html' },
  { path: '/proyectos', file: 'proyectos.html' },
  { path: '/imaginamos', file: 'imaginamos.html' },
  { path: '/futuros', file: 'futuros.html' },
  { path: '/contacto', file: 'contacto.html' },
  { path: '/404', file: '_not-found.html' }
];

const existingPages = pages.map(p => p.path);
const results = {
  total: 0,
  internal: 0,
  external: 0,
  anchors: 0,
  broken: [],
  valid: []
};

console.log('\n🔍 Verificando links del sitio...\n');

pages.forEach(({ path: pagePath, file }) => {
  const htmlPath = path.join(OUT_DIR, file);
  
  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  Archivo no encontrado: ${file}`);
    return;
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  const links = [];
  
  while ((match = hrefRegex.exec(html)) !== null) {
    links.push(match[1]);
  }
  
  console.log(`📄 ${pagePath} (${links.length} links encontrados)`);
  
  links.forEach(href => {
    if (!href || href === '' || href === '#') return;
    
    results.total++;
    
    if (href.startsWith('#')) {
      results.anchors++;
      const anchorId = href.substring(1);
      const idRegex = new RegExp(`id=["']${anchorId}["']`, 'i');
      
      if (!idRegex.test(html)) {
        results.broken.push({
          page: pagePath,
          link: href,
          type: 'ancla rota'
        });
        console.log(`   ❌ Ancla rota: ${href}`);
      } else {
        results.valid.push({ page: pagePath, link: href, type: 'ancla' });
        console.log(`   ✓ Ancla válida: ${href}`);
      }
    } else if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      results.external++;
      results.valid.push({ page: pagePath, link: href, type: 'externo' });
      
      const targetBlankRegex = new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*target=["']_blank["']`);
      const relNoopenRegex = new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*rel=["'][^"']*noopener[^"']*["']`);
      
      const shouldCheckSecurity = href.startsWith('http');
      
      if (shouldCheckSecurity) {
        const hasTarget = targetBlankRegex.test(html);
        const hasRel = relNoopenRegex.test(html);
        
        if (!hasTarget || !hasRel) {
          console.log(`   ⚠️  Link externo sin seguridad: ${href}`);
        } else {
          console.log(`   ✓ Externo seguro: ${href}`);
        }
      } else {
        console.log(`   ✓ Externo (mail/tel): ${href}`);
      }
    } else if (href.startsWith('/')) {
      if (href.startsWith('/_next/') || href.endsWith('.svg') || href.endsWith('.css') || href.endsWith('.js') || href.endsWith('.woff2') || href.endsWith('.woff') || href.endsWith('.ttf') || href.includes('/static/')) {
        return;
      }
      
      results.internal++;
      const exists = existingPages.includes(href);
      
      if (!exists) {
        results.broken.push({
          page: pagePath,
          link: href,
          type: 'página no encontrada'
        });
        console.log(`   ❌ Link interno roto: ${href}`);
      } else {
        results.valid.push({ page: pagePath, link: href, type: 'interno' });
        console.log(`   ✓ Link interno válido: ${href}`);
      }
    }
  });
  
  console.log('');
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 RESUMEN DE VERIFICACIÓN');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Total de links analizados: ${results.total}`);
console.log(`  • Links internos: ${results.internal}`);
console.log(`  • Links externos: ${results.external}`);
console.log(`  • Anclas: ${results.anchors}`);
console.log(`  • Links válidos: ${results.valid.length}`);
console.log(`  • Links rotos: ${results.broken.length}`);

if (results.broken.length > 0) {
  console.log('\n❌ LINKS ROTOS ENCONTRADOS:');
  results.broken.forEach(({ page, link, type }) => {
    console.log(`   • ${page} → ${link} (${type})`);
  });
  console.log('\n');
  process.exit(1);
} else {
  console.log('\n✅ ¡Todos los links internos están funcionando correctamente!');
  console.log('');
  process.exit(0);
}
