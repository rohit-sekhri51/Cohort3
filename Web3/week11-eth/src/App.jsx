import { useState } from 'react'
import './App.css'
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "@tanstack/react-query";
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// TanStack query 

// Hook viem for useBalance() for ETH

async function getBalance() {
  const client = createPublicClient({ 
    chain: mainnet, 
    transport: http(), 
  });

  const balance = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"}) 
  return balance.toString();
}
//const blockNumber = await client.getBlockNumber() ;
//const balance = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"})
//console.log(balance);

  const queryClient = new QueryClient();

  // a function from tanstack query library that handles response, loading, error
  async function getter() {     
    const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const response = await data.json();
    return response;
  }

function App() {
  
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
        <Hook />
        <Posts />
        </QueryClientProvider>
      </div>
    </>
  )
}

function Posts() {

  // Access the client
  // Custom hooks which uses Context API which lets you Global queryClient inside this function instead props drilling
  // const queryClient = useQueryClient();

  const {data, isLoading, error}
  // const query
   = useQuery({
    queryKey: ['posts'],
    queryFn: getter,
    refetchInterval: 300 * 1000
  });

  if(error) {
    return <div>
      Error while loading
    </div>
  }

  if(isLoading) {
    return "Loading.................................."
  }

  return <div>
    <ul>
    {data.map((datas) => (
      <li key={datas.id}> <b> <u>Title is: </u></b>{datas.title} </li> ) )}
      </ul>
  </div>
}

function Hook() {
  
  const query = useQuery({
    queryKey: ['hooks'],
    queryFn: getBalance
  });

  return <div>
    Balance is: {query.data}
  </div>
  
}

export default App
