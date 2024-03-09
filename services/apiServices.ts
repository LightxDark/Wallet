require('dotenv').config()
import Moralis from 'moralis';

export const fetchBalance = async (address: string) => {
  try {
    const apiKey = '8VB3FK1KJ2E42XUCCVMT7MPWNVEUTVS15M'; 
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};

export const fetchHoldings = async (address: string) => {
  try {
  
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      "chain": "0x1",
      "address": address
    });

  } catch (e) {
    console.error(e);
  }
}

export const fetchTransactions = async (address: string) => {
  try {
    const apiKey = '8VB3FK1KJ2E42XUCCVMT7MPWNVEUTVS15M'; 
    const url = `https://api.etherscan.io/api
    ?module=account
    &action=txlist
    &address=${address}
    &startblock=0
    &endblock=99999999
    &page=1
    &offset=10
    &sort=asc
    &apikey=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return data.result;

  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};

export const isENS = async (address:string) => {
  try {
    await Moralis.start({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjIyOTY4NGUyLWNkZmItNGMxOC05OWZjLWE0MTZmMzA3ZDAwYyIsIm9yZ0lkIjoiMzcwODY5IiwidXNlcklkIjoiMzgxMTUxIiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJmMTc0MzE4OS0xZTlmLTQxOGMtODc0Zi1mN2MzNzU2NTg0Y2EiLCJpYXQiOjE3MDQ0MDQyNTgsImV4cCI6NDg2MDE2NDI1OH0.9_KyYl-8uE2rX2FLZ_fMgWJampjMaJUYKvzLAlZ5KRM"
    });
  
    const response = await Moralis.EvmApi.resolve.resolveAddress({
      "address": address
    });
  
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

export const getTokenContractAddress = async (contractaddress: string, address: string) => {
  try{
    const apiKey = '8VB3FK1KJ2E42XUCCVMT7MPWNVEUTVS15M'; 
    const url = `https://api.etherscan.io/api
    ?module=account
    &action=tokenbalance
    &contractaddress=${contractaddress}
    &address=${address}
    &tag=latest
    &apiKey=${apiKey}`
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}
