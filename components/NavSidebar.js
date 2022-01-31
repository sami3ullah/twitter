import React from 'react'
import Image from 'next/image'
import NavLinks from './NavLinks'
import { DotsHorizontalIcon, HomeIcon } from '@heroicons/react/solid'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";

function NavSidebar() {
    return (
      <div className="sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-[100px] ">
          <Image src="https://rb.gy/ogau5a" width={30} height={30} />
        </div>

        {/* nav links */}
        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
          <NavLinks text="Home" Icon={HomeIcon} active />
          <NavLinks text="Explore" Icon={HashtagIcon} />
          <NavLinks text="Notifications" Icon={BellIcon} />
          <NavLinks text="Messages" Icon={InboxIcon} />
          <NavLinks text="Bookmarks" Icon={BookmarkIcon} />
          <NavLinks text="Lists" Icon={ClipboardIcon} />
          <NavLinks text="Profile" Icon={UserIcon} />
          <NavLinks text="More" Icon={DotsCircleHorizontalIcon} />
        </div>

        {/* tweet sidebar button */}
        <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]'>Tweet</button>    
            
        {/* logout section */}
        <div className='text-[#d9d9d9] xl:mb-2 ml-5 flex items-center justify-center xl:-mr-5 xl:ml-auto hoverAnimation mt-auto'>
                <img src="https://yt3.ggpht.com/yti/APfAmoFyA5COiJxi4itHrK9Zpip-iyc0nMPPgWFITZqAtFA=s88-c-k-c0x00ffffff-no-rj-mo" alt="Account profile image" className='h-10 w-10 rounded-full xl:mr-2.5' />
                <div className='hidden xl:inline leading-5'>
                    <h4 className='font-bold text-[13px]'>Muhammad Samiullah</h4>
                    <p className='text-[#6e767d] text-[13px]'>@samistories</p>
                </div>
                <DotsHorizontalIcon className='h-5 xl:inline ml-10' />
        </div>
      </div>
    );
}

export default NavSidebar