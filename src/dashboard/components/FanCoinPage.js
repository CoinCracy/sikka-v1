import { Input } from 'antd';
import React, { useState, useEffect } from 'react';

const FanCoinPage = ({
    onClick = () => {}
}) => {
    return (
        <>
            <input  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black mb-5 duration-100 p-2 sm:text-sm border-gray-300 rounded-md" autocomplete="off" placeholder='Enter full name of the coin' type="text" id="Name"></input>
            <input  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black mb-5 duration-100 p-2 sm:text-sm border-gray-300 rounded-md" autocomplete="off"  placeholder='Symbol' type="text" id="Symbol"></input>
            <button className="font-mono font-normal text-indigo-800">Social Links(atleast one is compulsory)</button>
            <input  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black mb-5 duration-100 p-2 sm:text-sm border-gray-300 rounded-md" autocomplete="off"  placeholder='Youtube Link' type="text" id="Youtube Link"></input>
            <input  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black mb-5 duration-100 p-2 sm:text-sm border-gray-300 rounded-md" autocomplete="off"  placeholder='Twitter Link' type="text" id="Twitter Link"></input>
            <input  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black mb-5 duration-100 p-2 sm:text-sm border-gray-300 rounded-md" autocomplete="off"  placeholder='Instagram Link' type="text" id="Instagram Link"></input>
            <button  className = "p-2 mb-30 rounded-md shadow-lg bg-indigo-500 hover:shadow-xl duration-300 hover:bg-indigo-600"  onClick={ onClick }>Create Fancoin</button>

        </>
    )
    
};

export default FanCoinPage;
