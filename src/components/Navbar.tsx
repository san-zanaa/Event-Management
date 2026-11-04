import React from 'react';
import Image from 'next/image';
import { CalendarDays } from 'lucide-react'
import Link from 'next/link';
import UserInfo from './UserInfo';
import ToggleButton from './ToggleButton';

const Navbar = () => {
    return (
            <div className='relative flex justify-between max-w-7xl p-5 sticky top-0 z-50 bg-white "bg-white text-gray-900 dark:bg-[#15171D] dark:text-white border-b border-gray-200 dark:border-gray-700 transition-colors duration-300'>
                <div className='flex gap-1 px-20'>
                    <Image src={'/images/Sociallogo.png'} alt='logo' height={50} width={50} className='w-10 h-12 object-contain' />
                    <div className='flex flex-col items-center sm:items-start'>
                        <h1 className='font-bold text-2xl'>Social<span className='text-[#0ead69]'>Circle</span></h1>
                        <p className='text-[10px] text-gray-500'>COMMUNITY ACTION</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <span><CalendarDays size={15}/></span>
                    <Link href="/upcoming-events" className='text-gray-500'>Upcoming Events</Link>
                </div>
                <div className='flex gap-2 px-20 text-sm'>
                    <ToggleButton/>
                    <UserInfo />
                </div>
            </div>     
    );
};

export default Navbar;