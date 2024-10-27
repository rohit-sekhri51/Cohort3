const { getKeypairFromFile } = require("@solana-developers/helpers");
const { TokenMetadata, createUpdateFieldInstruction } = require("@solana/spl-token-metadata");
const { 
    TYPE_SIZE,
    LENGTH_SIZE,
    getMintLen,
    createInitializeMetadataPointerInstruction, 
    createInitializeInstruction,
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

        const payer = await getKeypairFromFile("~/.config/solana/id.json");
        console.log("Payer address:", payer.publicKey.toString());

        /* Request airdrop
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
        */

        // Generate keypairs
        const mintKeypair = Keypair.generate();
        const mint = mintKeypair.publicKey;
        
        console.log("Mint address:", mint.toBase58());

        const metadata = TokenMetadata({
            mint: mint,
            name: "Five Diamond",
            Symbol: "Diamond",
            uri: "",
            additionalMetadata: [
                ["key","value"]
            ]
        })

       
        // Calculate space and rent
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);

        const metaSpace = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metaSpace); // mintLen + metaSpace

        // Create instructions
        const createAccountIx = SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mint,
            space: mintLen,
            lamports: lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        });

        const initMetadataPointerIx = createInitializeMetadataPointerInstruction(
            mint,
            payer.publicKey,
            mint,
            TOKEN_2022_PROGRAM_ID,
        );

        const initMintIx = createInitializeMintInstruction(
            mint,
            9, // decimals
            mintAuthority.publicKey,
            null, // freeze authority
            TOKEN_2022_PROGRAM_ID,
        );

        const initMetadataIx = createInitializeInstruction({
          mint: mint,
          metadata: mint,
          mintAuthority: mint,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          programId: TOKEN_2022_PROGRAM_ID,
          updateAuthority: payer.publicKey,

        });

        const updateMetadataFieldIx = createUpdateFieldInstruction({
            metadata: mint,
            programId: TOKEN_2022_PROGRAM_ID,
            updateAuthority: payer.publicKey,
            field: metadata.additionalMetadata[0][0],
            value: metadata.additionalMetadata[0][1]
        });

        // Create and send transaction
        const transaction = new Transaction().add(
            createAccountIx,
            initMetadataPointerIx,
            initMintIx,
            initMetadataIx,
            updateMetadataFieldIx,
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

        const chainMetadata = await getTokenMetadata(
            connection,
            mint,
        );

        console.log("Chain Metadata: " + chainMetadata);
        
        return {
            mintAddress: mint.toString(),
            txSignature,
            chainMetadata,
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