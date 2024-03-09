import BackgroundWithText from '@/components/WalletBackgroundComponent'
import NavBar from '@/components/NavBar'

const Home = () => {
    return (
        <body className="m-0 p-0 font-Verdana text-white font-bold">
            <div className="w-100 block sticky z-5">
                <NavBar/>
            </div>



            <div className = "pt-16">
                <BackgroundWithText />
            </div>  

            <footer className='fixed bottom-0 text-white font-bold text-lg p-3 w-full bg-zinc-950'>
                Made with <a href= "https://etherscan.io/" target="_blank" className='font-bold bg-gradient-to-b from-purple-950 to-blue-500 text-transparent bg-clip-text'>Etherscan</a>, <a href= "https://www.moralis.io//" target="_blank" className='font-bold bg-gradient-to-r from-purple-950 to-blue-500 text-transparent bg-clip-text'>Moralis</a>, <a href= "https://www.alchemy.com/" target="_blank" className='font-bold bg-gradient-to-r from-purple-950 to-blue-500 text-transparent bg-clip-text'>Alchemy</a>, and <a href= "https://www.spline.design" target="_blank" className='font-bold bg-gradient-to-b from-purple-950 to-blue-500 text-transparent bg-clip-text'>Spline</a>!
            </footer>

        </body>
    );
}

export default Home;