const {
    PublicKey,
    SystemProgram,
    Keypair,
    Transaction,
    sendAndConfirmTransaction,
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
  } = require("@solana/web3.js");
  
  (async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const fromPubkey = new PublicKey("DnDm1Aii8TAacpraLuv2HYqJHxGSCN4RdcRTe5Q1KjF7");
  
      console.log("Requesting airdrop for:", fromPubkey.toBase58());
      
      // Airdrop SOL for transferring lamports to the created account
      /*const airdropSignature = await connection.requestAirdrop(
        fromPubkey,
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);*/
  
      // amount of space to reserve for the account
      const space = 0;
  
      // Seed the created account with lamports for rent exemption
      const rentExemptionAmount =
        await connection.getMinimumBalanceForRentExemption(space);
  
      const newAccountPubkey = Keypair.generate();
      const createAccountParams = {
        fromPubkey: fromPubkey,
        newAccountPubkey: newAccountPubkey.publicKey,
        lamports: rentExemptionAmount,
        space,
        programId: SystemProgram.programId,
      };
  
      const createAccountTransaction = new Transaction().add(
        SystemProgram.createAccount(createAccountParams)
      );
  
    // You'll need the private key corresponding to fromPubkey to sign the transaction
    // This is just a placeholder - you'll need to provide the actual signer
    const signerKeypair = Keypair.fromSecretKey(Uint8Array.from([
        79,99,48,186,19,111,250,176,73,131,236,172,55,160,40,249,196,131,49,38,103,159,40,41,156,32,16,148,243,85,119,158,189,225,206,72,221,124,179,40,231,8,198,184,28,216,225,208,44,156,127,136,7,169,96,205,238,67,114,2,205,195,198,202
    ]));

    const txHash = await sendAndConfirmTransaction(
      connection, 
      createAccountTransaction, 
      [signerKeypair, newAccountPubkey]
    );
      
      console.log("Transaction successful! Hash:", txHash);
      console.log("New account created:", newAccountPubkey.publicKey.toBase58());
      console.log("PDA is on the curve: " + PublicKey.isOnCurve(newAccountPubkey.publicKey.toBytes()));
    } catch (error) {
      console.error("Error:", error);
    }
  })();