const { 
    createInitializePermanentDelegateInstruction, 
    getMintLen, 
    ExtensionType, 
    TOKEN_2022_PROGRAM_ID, 
    createInitializeMintInstruction 
} = require("@solana/spl-token");
const { 
    Connection, 
    clusterApiUrl, 
    Keypair, 
    LAMPORTS_PER_SOL, 
    SystemProgram, 
    Transaction, 
    sendAndConfirmTransaction 
} = require("@solana/web3.js");

async function main() {
    try {
        // Initialize connection
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Generate keypair for the payer
        const payer = Keypair.generate();
        console.log("Payer address:", payer.publicKey.toString());

        // Request airdrop
        console.log("Requesting airdrop...");
        const airdropSig = await connection.requestAirdrop(
            payer.publicKey, 
            LAMPORTS_PER_SOL
        );

        await connection.confirmTransaction({
            signature: airdropSig,
            ...(await connection.getLatestBlockhash()),
        });
        console.log("Airdrop confirmed");

        // Generate keypairs
        const mintKeypair = Keypair.generate();
        const mint = mintKeypair.publicKey;
        const mintAuthority = Keypair.generate();
        const permanentAuthority = Keypair.generate();

        console.log("Mint address:", mint.toString());
        console.log("Mint authority:", mintAuthority.publicKey.toString());
        console.log("Permanent authority:", permanentAuthority.publicKey.toString());

        // Calculate space and rent
        const mintLen = getMintLen([ExtensionType.PermanentDelegate]);
        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);

        // Create instructions
        const createAccountIx = SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mint,
            space: mintLen,
            lamports: lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        });

        const initPermDelegateIx = createInitializePermanentDelegateInstruction(
            mint,
            permanentAuthority.publicKey,
            TOKEN_2022_PROGRAM_ID,
        );

        const initMintIx = createInitializeMintInstruction(
            mint,
            9, // decimals
            mintAuthority.publicKey,
            null, // freeze authority
            TOKEN_2022_PROGRAM_ID,
        );

        // Create and send transaction
        const transaction = new Transaction().add(
            createAccountIx,
            initPermDelegateIx,
            initMintIx,
        );

        console.log("Sending transaction...");
        const txSignature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [payer, mintKeypair],
            {
                commitment: 'confirmed',
                preflightCommitment: 'confirmed',
            }
        );

        console.log("Transaction successful!");
        console.log("Transaction signature:", txSignature);
        
        return {
            mintAddress: mint.toString(),
            txSignature,
        };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Run the function
main()
    .then((result) => {
        console.log("Script completed successfully");
        console.log(result);
    })
    .catch((error) => {
        console.error("Script failed:", error);
    });