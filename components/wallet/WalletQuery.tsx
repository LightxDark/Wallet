'use client'
import React, {useEffect, useState } from 'react';
import Moralis from 'moralis';
import {Alchemy, AssetTransfersCategory, Network, SortingOrder} from 'alchemy-sdk'
import TransactionList from './TransactionList';



interface WalletID {
  walletName: string;
}

const settings = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

const WalletQuery: React.FC<WalletID> = ({ walletName }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  localStorage.setItem("w", walletName)
useEffect(() => {
  const getTransfers = async () => {
    try {
      const fromResponse = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        fromAddress: walletName,
        excludeZeroValue: true,
        category: [AssetTransfersCategory.ERC20],
        order: SortingOrder.DESCENDING,
        maxCount: 10,
        withMetadata: true,
      });

      const toResponse = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        toAddress: walletName,
        excludeZeroValue: true,
        category: [AssetTransfersCategory.ERC20],
        order: SortingOrder.DESCENDING,
        maxCount: 12,
        withMetadata: true,
      });
      const combinedTransactions = [...fromResponse.transfers, ...toResponse.transfers];

      combinedTransactions.sort((a, b) => {
        // Convert timestamps to numbers and compare
        return new Date(b.metadata.blockTimestamp).getTime() - new Date(a.metadata.blockTimestamp).getTime();
      });

      // Merge the arrays of transfers
      setTransactions(combinedTransactions);
      
    } catch (error) {
      console.error('Error fetching transfers:', error);
    }
  };

  getTransfers();
}, [walletName]);
  console.log(transactions)
  const extractedData = transactions.map((transaction) => ({
    asset: transaction.asset,
    category: transaction.category,
    from: transaction.from,
    to: transaction.to,
    value: transaction.value,
    hash: transaction.hash,
    metadata: transaction.metadata.blockTimestamp,
  }));

  return (
    <div className='f'>
      <h2 className='p-4 rounded-xl flex justify-between items-center bg-zinc-900'>Activity
      <span id="hover-tooltip" title="Note: Only the Ethereum mainnet is currently supported by this query.">ℹ</span>

      </h2>

      <TransactionList extractedData={extractedData}/>
    </div>
  );
};

export default WalletQuery;