import React from 'react';
import Moralis from 'moralis';
import {Alchemy, Network} from 'alchemy-sdk'
import Link from 'next/link';

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

interface TransactionData {
  to: string;
  from: string
  value: number;
  asset: string;
  hash: string;
  metadata: string;
}

interface TransactionListProps {
  extractedData: TransactionData[];
}

const formatLargeNumber = (number: number): string => {
  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (number >= trillion) {
    return (number / trillion).toFixed(1) + 'T';
  } else if (number >= billion) {
    return (number / billion).toFixed(1) + 'B';
  } else if (number >= million) {
    return (number / million).toFixed(1) + 'M';
  } else if (number >= thousand) {
    return (number / thousand).toFixed(1) + 'K';
  } 
  
  else if (number < (thousand/10)) {
    return (number).toFixed(2);
  } 
  
  else {
    return number.toString();
  }
};

const TransactionList: React.FC<TransactionListProps> = ({ extractedData }) => {
  const filteredData = extractedData.filter(item => !item.asset.slice(6));

  return (
    <div className='bold text-sm'>
      <ul className='pb-8'>
        {filteredData.map((transaction, index) => (
          <>
            <br />
              <div className='border rounded-xl bg-zinc-900 py-4 hover:bg-zinc-800 cursor-pointer text-lg'>
                  <li key={index} className='px-4  '>
                  <div className='text-sm'>{transaction.metadata.substring(0,10)+ " at "+ transaction.metadata.substring(11,16) + " UTC"}</div>
                  {transaction.to === localStorage.getItem("w") ? (
                    <>
                      <p>Received <span className='bg-clip-text text-transparent bg-gradient-to-l to-purple-950 from-blue-500 cursor-pointer'>{formatLargeNumber(transaction.value)} {transaction.asset}</span > from <Link className='hover:underline' href={`/wallet/${transaction.from}`}>{transaction.from.substring(0,4) + "..." + transaction.from.substring(38)}</Link>
                      </p>
                      <p className='rounded-lg mt-4 bg-zinc-950 cursor-pointer px-4 py-4 w-fit items-center h-fit font-semibold flex text-green-400'>
                        + 
                        <button className='gap-2 overflow-hidden  flex'>{formatLargeNumber(transaction.value)} {transaction.asset}</button>
                        
                      </p>
                    </>
                    
                  
                    ) : (
                      <>
                        <p>Sent <span className='bg-clip-text text-transparent bg-gradient-to-l to-purple-950 from-blue-500 cursor-pointer'>{formatLargeNumber(transaction.value)} {transaction.asset}</span> to <Link className='hover:underline' href={`/wallet/${transaction.to}`}>{transaction.to.substring(0,4) + "..." + transaction.to.substring(38)}</Link></p>
                        <p className='rounded-lg mt-4 bg-zinc-950 cursor-pointer px-4 py-4 w-fit items-center h-fit font-semibold flex text-red-400'>
                        - <button className='gap-2  overflow-hidden  flex'>{formatLargeNumber(transaction.value)} {transaction.asset}</button>
                        </p>
                      </>
                  )}

                  </li>
              </div>
          </>
          

        ))}
      </ul>
    </div>
  );
};

export default TransactionList;