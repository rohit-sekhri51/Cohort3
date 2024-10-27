const {
    clusterApiUrl,
    Connection,
    Keypair,
    Transaction,
    SystemProgram,
    PublicKey,
    TransactionInstruction,
    LAMPORTS_PER_SOL,
    SYSVAR_RENT_PUBKEY,
  } = require("@solana/web3.js");
   
  (async () => {
    // program id
    const programId = new PublicKey(
      "7ZP42kRwUQ2zgbqXoaXzAFaiQnDyp6swNktTSv8mNQGN",
    );
   
    // connection
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
   
    // setup fee payer
    const feePayer = Keypair.generate();
    const feePayerAirdropSignature = await connection.requestAirdrop(
      feePayer.publicKey,
      LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(feePayerAirdropSignature); 
   
    // const fromFee = new PublicKey("DnDm1Aii8TAacpraLuv2HYqJHxGSCN4RdcRTe5Q1KjF7");
    /* const feePayer = Keypair.fromSecretKey(
        Uint8Array.from([
            214,213,195,67,186,61,190,163,100,106,8,214,131,252,171,191,54,67,170,18,97,51,121,134,48,95,78,19,243,226,78,140,6,171,246,198,214,191,70,249,40,39,11,101,174,173,162,180,161,58,211,39,3,110,202,97,86,231,202,21,38,184,89,139
        ])
      ); */

    // setup pda
    let [pda, bump] = await PublicKey.findProgramAddress(
      [feePayer.publicKey.toBuffer()],
      programId,
    );
    console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);
    console.log("PDA is on the curve: " + PublicKey.isOnCurve(pda.toBytes()));
   
    const data_size = 0;
   
    let tx = new Transaction().add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: feePayer.publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: pda,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        data: Buffer.from(new Uint8Array([data_size, bump])),
        programId: programId,
      }),
    );
   
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  })();