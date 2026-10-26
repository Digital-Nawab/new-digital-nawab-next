const http = require('http');

function checkPage() {
  http.get('http://localhost:3000/service/graphic-designing-services', (res) => {
    let data = '';
    console.log('Status code:', res.statusCode);
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      // Check title
      const titleMatch = data.match(/<title[^>]*>(.*?)<\/title>/i);
      console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

      // Check meta description
      const descMatch = data.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
      console.log('Meta Description:', descMatch ? descMatch[1] : 'NONE');

      // Check canonical
      const canonicalMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
      console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');

      // Check H1s
      const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
      const h1Matches = [];
      let m;
      while ((m = h1Regex.exec(data)) !== null) {
        h1Matches.push(m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
      }
      console.log('H1 count:', h1Matches.length);
      console.log('H1 tags:', h1Matches);

      // Check H2s
      const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
      const h2Matches = [];
      while ((m = h2Regex.exec(data)) !== null) {
        h2Matches.push(m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
      }
      console.log('H2 count:', h2Matches.length);
      console.log('H2 tags:', h2Matches);

      // Check JSON-LD
      const jsonLdMatch = data.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
      console.log('JSON-LD present:', !!jsonLdMatch);
      if (jsonLdMatch) {
        console.log('JSON-LD snippet:', jsonLdMatch[1].slice(0, 150));
      }
    });
  }).on('error', (err) => {
    console.error('Error fetching page:', err.message);
  });
}

checkPage();
