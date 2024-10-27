const { Keypair, PublicKey } = require("@solana/web3.js");
const bs58 = require("bs58");
const { getKeypairFromFile } = require("@solana-developers/helpers");

async function main() {
  

const payer1 = await getKeypairFromFile("~/.config/solana/id.json");
console.log("Payer address:", payer1.publicKey.toString());


const payer2 = await getKeypairFromFile("~/keypair/......4ovZGPvNkDWuEoNQrsCt.json");
console.log("Payer address:", payer2.publicKey.toString());

try {
  // Create keypair from base58 encoded secret key
  const keypair1 = Keypair.fromSecretKey(
    bs58.decode(
      "2b4NebvH2......................18thkB7kL7LMyAv9UKNNsRF4kiw6UBy2k9m4VsKX"
    )
  );

  // Create keypair from Uint8Array secret key
  const keypair2 = Keypair.fromSecretKey(
    Uint8Array.from([
        79,99,48,186,19,111,250,176,73,131,236,172,55,160,40,249,196,131,49,38,103,159,40,41,156,32,16,148,243,85,119,158,189,225,206,72,221,124,179,40,231,8,198,184,28,216,225,208,44,156,127,136,7,169,96,205,238,67,114,2,205,195,198,202
    ])
  );

  const publicKey3 = new PublicKey("DnDm1Aii8TAacpraLuv2HYqJHxGSCN4RdcRTe5Q1KjF7");

  // Print public keys
  console.log("PubKey 1 is:", keypair1.publicKey.toBase58());
  console.log("PubKey 2 is:", keypair2.publicKey.toBase58());
  console.log("PubKey 3 is:", publicKey3.toString());

  
  console.log(publicKey3.toString() === keypair2.publicKey.toString());
  // console.log(Object.keys(base58));

  console.log("PubKey3 is on/off the curve:- " + PublicKey.isOnCurve(publicKey3.toBytes()));

  // Valid public key
    const offCurveAddress = new PublicKey(
    "9yyx6tddZTytW5aWwy4441wjm3JPjRk6bcEjjcv9LjKD",
  );
   
  // Not on the ed25519 curve, therefore not suitable for users
  console.log("PubKey4 is on/off the curve:- " + PublicKey.isOnCurve(offCurveAddress.toBytes()));
   
  // Not a valid public key
  // const errorPubkey = new PublicKey("testPubkey");
  // console.log(errorPubkey.toString());

} catch (error) {
  console.error("An error occurred:", error);
}
}
main();