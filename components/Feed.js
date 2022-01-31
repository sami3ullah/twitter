import React from 'react';
import { SparklesIcon } from '@heroicons/react/outline';
import Input from "./Input";

function Feed() {
    return (
        <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            {/* page's heading */}
            <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black">
                <h2 className="text-lg sm:text-xl font-bold">Home</h2>
                <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:p-0 ml-auto'>
                    <SparklesIcon className="h-5 text-white"/>
                </div>
            </div>

            {/* post input */}
            <Input />
        </div>
    );
}

export default Feed;
