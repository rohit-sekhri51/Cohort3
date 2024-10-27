import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";
import * as anchor1 from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {Votingdapp} from '../target/types/votingdapp'
import '@types/jest';
import * as anchor from "@project-serum/anchor";

const { BN } = anchor.default;

const IDL = require('.../target/idl/votingdapp.json');

const votingAddress = new PublicKey("DLw5fJNrrBCWoy75aukoDApBZm4MEvaWCvPJoqtLSg1p");

describe('votingdapp', () => {
  // Configure the client to use the local cluster.
  
 
  it('Initialize Votingdapp', async () => {

    const context = await startAnchor("", [{name: "voting",programId: votingAddress}], []);

    const provider = new BankrunProvider(context);
  
    const votingProgram = new Program<Votingdapp>(
      IDL,
      provider,
    );
  
    await votingProgram.methods.initializePoll(
    new anchor.BN[1],
    "What is your favorites political party",
    new anchor.BN(0), 
    new anchor.BN(1828990709),
  ).rpc();
     
  

  });

});
