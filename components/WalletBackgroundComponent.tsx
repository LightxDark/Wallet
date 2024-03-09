'use client'

import React from 'react';
import Spline from '@splinetool/react-spline';

const BackgroundWithText = () => {
return (
    <div className="mt-24 flex items-center justify-center z-0">
        {/* Spline as background */}
        <div>
            <Spline scene="https://prod.spline.design/FZGJk4tuhNPI0hSv/scene.splinecode" />
        </div>
        {/* Text or content overlay */}
        <div>
            <h1 className='text-5xl justify-center'>Jump into <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-br from-slate-950 to-blue-500 border-black">wallets</span> on the Ethereum Blockchain!</h1>
        {/* Add any other content you want */}
        </div>
    </div>
    );
};

export default BackgroundWithText;