"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bip39_1 = require("bip39");
// Generate a 12-word mnemonic
const mnemonic = (0, bip39_1.generateMnemonic)();
console.log('Generated Mnemonic:', mnemonic);
