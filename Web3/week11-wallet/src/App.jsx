 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { http, createConfig, WagmiProvider, useConnect, useAccount, useDisconnect, useBalance, useSendTransaction } from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { parseEther } from "viem";
import { useRef } from "react";

const projectId = "<WALLETCONNECT_PROJECT_ID>";
const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnect />
          <Account />
          <EthSend />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

function WalletConnect() {
  const { connectors, connect } = useConnect(); // hook that wagmi provides
// understood this code, amazing
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}


// import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()

    const balance = useBalance({
      address
    })
    console.log("Bal is " + balance);

    return (
      <div>
        {address && <div>
          Your address - {address} <br/>
          Your balance - {balance?.data?.formatted}
        </div>}
        
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

function EthSend() {
  const { data: hash, sendTransaction } = useSendTransaction()    // hook
  const refTo = useRef();
  const refValue = useRef();

    async function sendTx() {
        const to = refTo.current.value; // document.getElementById("to").value;
        const value = refValue.current.value; // document.getElementById("value").value;
        sendTransaction({ to, value: parseEther(value) });
    }

    // Todo: use refs here
    return <div>
      <input ref={refTo} id="to" placeholder="0xA0Cf…251e" required />
      <input ref={refValue} id="value" placeholder="0.05" required />
      <button onClick={sendTx}>Send</button> <br/>
      {hash && <div>Transaction Hash: {hash}</div>}
    </div>
}

export default App;
