import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

const mnemonic = generateMnemonic();
const seed = mnemonicToSeedSync(mnemonic);

console.log("Seed " + seed);

// for (let i = 0; i < 4; i++) {
const path = `m/44'/501'/0'/0'`; // This is the derivation path
const derivedSeed = derivePath(path, seed.toString("hex")).key;
console.log("DerivedSeed " + derivedSeed);

const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

console.log("Secret " + secret);

console.log(
  "Public Key is " + Keypair.fromSecretKey(secret).publicKey.toBase58(),
);
