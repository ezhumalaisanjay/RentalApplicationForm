const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building rental application for Netlify...');

try {
  // Build the frontend
  console.log('📦 Building frontend...');
  execSync('npx vite build --outDir dist', { stdio: 'inherit' });
  
  // Ensure netlify functions directory exists
  const functionsDir = 'netlify/functions';
  if (!fs.existsSync(functionsDir)) {
    fs.mkdirSync(functionsDir, { recursive: true });
  }
  
  // Copy necessary files for serverless functions
  console.log('📋 Preparing serverless functions...');
  
  if (fs.existsSync('server/storage.ts')) {
    console.log('📄 Compiling TypeScript storage module...');
    execSync('npx esbuild server/storage.ts --bundle --platform=node --format=esm --outfile=netlify/functions/storage.js --external:pg-native', { stdio: 'inherit' });
  }
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Frontend built to: dist/');
  console.log('⚡ Serverless functions ready in: netlify/functions/');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}