const http = require('http');

const routes = [
  '/',
  '/search',
  '/search?category=Chips',
  '/product/prod-001',
  '/login',
  '/register',
  '/profile'
];

async function run() {
  console.log('Testing SalesPoint Routes against localhost:4173...\n');
  let allPass = true;
  for (const r of routes) {
    await new Promise((resolve) => {
      http.get('http://localhost:4173' + r, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const isHttpOk = res.statusCode >= 200 && res.statusCode < 400;
          const hasInternalError = body.includes('Internal Error') || body.includes('Internal Server Error') || body.includes('500: Internal');
          const passed = isHttpOk && !hasInternalError;
          console.log(`[${passed ? 'PASS' : 'FAIL'}] HTTP ${res.statusCode} -> ${r} (${body.length} bytes)`);
          if (!passed) {
            console.error(`  Failure reason on ${r}: status=${res.statusCode}, hasInternalError=${hasInternalError}`);
            allPass = false;
          }
          resolve();
        });
      }).on('error', (err) => {
        console.error(`[FAIL] ${r} -> ${err.message}`);
        allPass = false;
        resolve();
      });
    });
  }
  console.log('\nAll routes passed: ' + allPass);
  process.exit(allPass ? 0 : 1);
}

run();
