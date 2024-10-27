
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";


export function Airdrop() {
  const { connection } = useConnection();
    const wallet = useWallet();
    
   async function sendToUser(){
            alert("Hi Rohit" + wallet.publicKey );
        
            if (wallet.publicKey) {
            const am = document.getElementById("Amount").value;
               const signature = await connection.requestAirdrop(wallet.publicKey, am * LAMPORTS_PER_SOL);
               //await  connection.confirmTransaction(signature);
                alert(signature + " After Airdrop ");
        }
   }
  
  return <div>
    
        <br></br>
        <input id="Amount" type="text" placeholder="Amount"></input>
        <button onClick={sendToUser}>Send Airdrop</button>
        
    </div>
}