'use client'
import React, { useEffect, useState } from 'react';
import {Alchemy, Network} from 'alchemy-sdk'
import 'dotenv/config';
import BalanceList from './BalanceList';

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

interface WalletID {
    walletName: string;
}

const WalletContent: React.FC<WalletID> = ({ walletName }) => {
  const [balances, setBalances] = useState<any[]>([]);

  // Use useEffect to fetch transactions when the component mounts
  useEffect(() => {
    const getHoldings = async (address: string) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjIyOTY4NGUyLWNkZmItNGMxOC05OWZjLWE0MTZmMzA3ZDAwYyIsIm9yZ0lkIjoiMzcwODY5IiwidXNlcklkIjoiMzgxMTUxIiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJmMTc0MzE4OS0xZTlmLTQxOGMtODc0Zi1mN2MzNzU2NTg0Y2EiLCJpYXQiOjE3MDQ0MDQyNTgsImV4cCI6NDg2MDE2NDI1OH0.9_KyYl-8uE2rX2FLZ_fMgWJampjMaJUYKvzLAlZ5KRM'
        },
      };
  
      async function fetchData() {
        try {
          const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth&limit=15`, options);
          const data = response.json();
          return data;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
  
      // Call the function and store the result in a variable
      async function getData() {
        const result = await fetchData();
        return result;
      }
  
      const result = await getData();
  
      // Convert data to desired format and update state
      if (Array.isArray(result?.result)) {
        const formattedBalances = result.result.map((holding: any) => {
          return {
            tokenAddress: holding.token_address,
            name: holding.name,
            symbol: holding.symbol,
            logo: holding.logo,
            balance: holding.balance_formatted,
            possibleSpam: holding.possible_spam,
            decimal: holding.decimal,
            price: holding.usd_price,
            value: holding.usd_value,

            // Add more properties as needed
          };
        });
        setBalances(formattedBalances);
      }
    };
  
    // Call the function inside useEffect to ensure it runs only once when the component mounts
    getHoldings(walletName);
  }, [walletName]);
    
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="pb-4">Wallet</div>
        <div className="flex items-center">
            <span id="hover-tooltip" title="Note: Only the Ethereum mainnet is currently supported by this query.">ℹ</span>
        </div>
      </div>

      
      <section className=''>
        <BalanceList balance={balances}></BalanceList>
      </section>

    </div>
  );
};

export default WalletContent;

