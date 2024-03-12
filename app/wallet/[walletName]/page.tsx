import NavBar from "@/components/NavBar";
import WalletContent from "@/components/wallet/WalletContent";
import WalletQuery from "@/components/wallet/WalletQuery";

export default async function WalletPage({ params }: { params: { walletName: string } }) {

  return (

    <body className="delay-100 p-0 font-Verdana bg-slate-950 text-white font-bold transition-all ease-in-out">
      <div className="w-100 block sticky z-5">
        <NavBar />
      </div>
      <section className="flex flex-col">

        <div className="bg-zinc-900 flex h-96 px-32 text-xl ">
          <main className="flex justify-center w-full items-center text-center">
            <div className="h-fit w-fit  ">
              Viewing: <span className="transition-all duration-100 hover:bg-inherit bg-clip-text hover:text-transparent">{params.walletName }</span>
            </div>
          </main>
        </div>

        <main className="w-full mx-auto box-border px-32">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className=" shadow-md text-xl my-8">
                <section className="p-4 rounded-xl bg-zinc-900">
                  <WalletContent walletName={params.walletName} />
                </section>
              </div>
              <div className=" shadow-md text-xl my-8">
                <section className="rounded-xl  ">
                  <WalletQuery walletName={params.walletName} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </section>
      <footer className='fixed bottom-0 backdrop-blur-sm  text-white font-bold text-lg p-3 w-full bg-zinc-950'>
      Made with <a href= "https://etherscan.io/" target="_blank" className='font-bold bg-gradient-to-b from-purple-950 to-blue-500 text-transparent bg-clip-text'>Etherscan</a>, <a href= "https://www.moralis.io//" target="_blank" className='font-bold bg-gradient-to-r from-purple-950 to-blue-500 text-transparent bg-clip-text'>Moralis</a>, <a href= "https://www.alchemy.com/" target="_blank" className='font-bold bg-gradient-to-r from-purple-950 to-blue-500 text-transparent bg-clip-text'>Alchemy</a>, and <a href= "https://www.spline.design" target="_blank" className='font-bold bg-gradient-to-b from-purple-950 to-blue-500 text-transparent bg-clip-text'>Spline</a>!
      </footer>
    </body>
  );
}
