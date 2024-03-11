import Moralis from "moralis";
import Search from "./Search";
require('dotenv').config()
import dynamic from "next/dynamic";

Moralis.start({
    apiKey: process.env.MORALIS_API
});

async function getGas() {
    try {
        const response = await fetch(
            `https://api.etherscan.io/api` +
            `?module=proxy` +
            `&action=eth_gasPrice` +
            `&apikey=${process.env.ETHERSCAN_API}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch gas price');
        }

        const data = await response.json();
        return data.result;
      } catch (error) {
        console.error('Error fetching gas price:', error);
      }
}
  

async function getEthPrice() {
    try {
        

        const response = await Moralis.EvmApi.token.getTokenPrice({
          "chain": "0x1",
          "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        });
      
        return("$" + (response.raw.usdPrice).toFixed(2));
      } catch (e) {
        console.error(e);
      }
}

const NavBar = async () => {
    const gasPrice = (parseInt((await getGas()), 16) / 1e9).toFixed(2);
    const ethPrice = await getEthPrice();

    return (
        <>
        <nav className='fixed w-full backdrop-blur-sm backdrop-brightness-50 shadow-2xl shadow-black justify-start border-b-2 text-lg border-gray-900 flex gap-5'>
            <a href={"/"}>
                <section className="flex text-center bold relative cursor-pointer">
                    <div className="transition-all duration-1000 text-transparent bg-clip-text bg-gradient-to-r to-purple-950 from-blue-500 p-5">
                        Wallet Scan  
                    </div>
                </section>
            </a>
            <div className="">
                <Search />
            </div>

            <section className="ml-auto flex"> 
                <div className="p-5 flex justify-end">
                    {gasPrice !== null ? (
                        <p>Ethereum Price: {ethPrice}</p>
                    ) : (
                        <p>Loading ethereum price...</p>
                    )}
                </div>

                <div className="p-5 flex justify-end">
                    {gasPrice !== null ? (
                        <p>Gas Price: {gasPrice} Gwei</p>
                    ) : (
                        <p>Loading gas price...</p>
                    )}
                </div>
            </section>
        </nav>

        <nav className="relative bg-indigo-500 opacity-100 blur-md"></nav>

        </>
    ); 
};

export default dynamic (() => Promise.resolve(NavBar), {ssr: false})