import React from 'react';
import ArrowButton from '../../components/common/ArrowButton.jsx';


export const Hero = () => {
  return (
    <div className="px-12 md:px-24 w-full h-screen flex flex-col py-6 justify-center bg-[url('https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg')] bg-no-repeat bg-cover bg-fixed bg-bottom text-white">
      <p className="text-sm md:text-base">July 15–17, 2024 | Kuching, Sarawak</p>

      <h1 className="text-5xl md:text-8xl font-bold mt-14 leading-tight">
        Summertime Music <br />
        <span className="relative text-transparent bg-white bg-opacity-20 bg-clip-text drop-shadow-[0_0_1px_#fff]">
          Festival 2024
        </span>
      </h1>

      <div className="mt-10">
        <ArrowButton>BUY TICKET</ArrowButton>
      </div>
    </div>
  );
};
