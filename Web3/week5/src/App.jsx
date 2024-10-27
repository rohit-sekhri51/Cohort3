import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

import {Airdrop} from "./Airdrop";
import { ShowSolBalance } from './ShowSolBalance';
import { SignMessage } from './SignMessage';
import { SendTokens } from './SendTokens';

function App() {
  

  return (
    
      <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/UdrcqRr_16cAri1OpQhlkTjAilbXtQ6x"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <WalletMultiButton></WalletMultiButton>
                  <WalletDisconnectButton></WalletDisconnectButton>
      <div>  Hello </div>
      <Airdrop></Airdrop>
      <ShowSolBalance></ShowSolBalance>
      <SignMessage></SignMessage>
      <SendTokens></SendTokens>
      </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider> 
    
  )
}

export default App
