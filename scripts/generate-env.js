const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envFile = path.resolve(__dirname, '../src/environments/environment.ts');

const environment = {
  production: false,
  apiUrl: process.env.API_URL || 'http://localhost:5053',
  auth0: {
    domain: process.env.AUTH0_DOMAIN || '',
    clientId: process.env.AUTH0_CLIENT_ID || ''
  }
};

const fileContent = `export const environment = ${JSON.stringify(environment, null, 2)};\n`;

fs.writeFileSync(envFile, fileContent);
console.log('Generated environment.ts from .env');
