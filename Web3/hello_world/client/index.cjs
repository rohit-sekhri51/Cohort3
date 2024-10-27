const {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
  } = require("@solana/web3.js");
  const { getKeypairFromFile } = require("@solana-developers/helpers");
  
  const programId = new PublicKey("D34bCNcUimyrF6haHw3WgSaaet3Ecdbjwz6oWv6XzScC");
  
  // Connect to a solana cluster. Either to your local test validator or to devnet
  // const connection = new Connection("http://localhost:8899", "confirmed");
     const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  
  // We load the keypair that we created in a previous step
  async function main() {
    const keyPair = await getKeypairFromFile("~/.config/solana/id.json");
  
    // Every transaction requires a blockhash
    const blockhashInfo = await connection.getLatestBlockhash();
  
    // Create a new transaction
    const tx = new Transaction({
      ...blockhashInfo,
    });
  
    // Add our Hello World instruction
    tx.add(
      new TransactionInstruction({
        programId: programId,
        keys: [],
        data: Buffer.from([]),
      }),
    );
  
    // Sign the transaction with your previously created keypair
    tx.sign(keyPair);
  
    // Send the transaction to the Solana network
    const txHash = await connection.sendRawTransaction(tx.serialize());
  
    console.log("Transaction sent with hash:", txHash);
  
    await connection.confirmTransaction({
      blockhash: blockhashInfo.blockhash,
      lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
      signature: txHash,
    });
  
    console.log(
      `Congratulations! Look at your 'Hello World' transaction in the Solana Explorer:
      https://explorer.solana.com/tx/${txHash}?cluster=custom`,
    );
  }
  
  main().catch(console.error);