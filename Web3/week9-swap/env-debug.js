// env-debug.js
require('dotenv').config();
const path = require('path');
const fs = require('fs');

console.log('Debugging environment variables...');

// 1. Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
console.log(`Looking for .env file at: ${envPath}`);
if (fs.existsSync(envPath)) {
    console.log('.env file found');
    console.log('File contents:');
    const envContents = fs.readFileSync(envPath, 'utf8');
    console.log(envContents);
} else {
    console.log('.env file NOT found');
}

// 2. Check process.env
console.log('\nEnvironment variables loaded:');
console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY ? 'Found (length: ' + process.env.PRIVATE_KEY.length + ')' : 'Not found');
console.log('ENDPOINT:', process.env.ENDPOINT || 'Not found');

// 3. Show all environment variables (be careful with sensitive data)
console.log('\nAll available environment variables:');
console.log(Object.keys(process.env));