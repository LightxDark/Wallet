import React from 'react';
import Image from 'next/image';

interface BalanceData {
    tokenAddress: string,
    name: string,
    symbol: string,
    logo: string | null,
    balance: string,
    possibleSpam: string,
    price: string | null
    value: string
}

interface BalanceListProps {
  balance: BalanceData[];
}
//Does not display balances under 1 cent, fix later!!
const formatLargeNumber = (string: string) => {
  let number = parseFloat(string);
  const quadrillion = 1e15;
  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (number >= quadrillion) {
    return (number / quadrillion).toFixed(1) + 'Q';
  } else if (number >= trillion) {
    return (number / trillion).toFixed(1) + 'T';
  } else if (number >= billion) {
    return (number / billion).toFixed(1) + 'B';
  } else if (number >= million) {
    return (number / million).toFixed(1) + 'M';
  } else if (number >= thousand) {
    return (number / thousand).toFixed(1) + 'K';
  } else if (number < (thousand / 10)) {
    return (number).toFixed(3);
  } else {
    return number.toString();
  }
};

const format = (number: any) => {
  if(number < 0.01){
    return number
  }



  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(number));

  return formattedNumber
}

const TransactionList: React.FC<BalanceListProps> = ({ balance }) => {
  const filteredData = balance.filter(item => !item.possibleSpam && !(item.symbol === "") && !(item.price === null) && !(parseFloat(item.balance) > 1e12)&& !(parseFloat(item.value) < 0.01) && !(parseFloat(item.price) < 0.01));

  

  return (
    <main className='text-sm justify-start items-center'>
      <div className='flex text-stone-300 px-2 justify-between pb-4'>    
          <div className='flex-1'>Token</div>
          <div className='flex-1'>Price</div>
          <div className='flex-1'>Balance</div>  
          <div className='flex-1'>Value</div>
      </div>      
    {filteredData.map((b, index) => (
    <div key={index} className='flex px-2  cursor-default justify-between transition-all duration-200 hover:bg-zinc-800 border-t border-gray-300 py-4'>
      <div className='flex-1 flex items-center '>
        {b.logo ? (
          <Image alt="" src={b.logo} width={32} height={32} draggable={false} />
        ) : (
          <div className='placeholder-image' />
        )}
        <div className='pl-2 font-bold bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:to-purple-950 hover:from-blue-500 cursor-pointer'>{b.symbol}</div>
      </div>

      <div className='flex-1'>{format(b.price)}</div>
      <div className='flex-1'>{formatLargeNumber(b.balance)}</div>
      <div className='flex-1'>{format(b.value)}</div>
    </div>
))}

  </main>
  );
};

export default TransactionList;