import React from 'react';
import Image from 'next/image';
import { CalendarDays, LogIn } from 'lucide-react'

const Navbar = () => {
    return (

        <div>
            <div className='relative flex justify-between max-w-7xl p-5'>
                <div className='flex gap-2 px-20'>
                    <Image src={'/images/Sociallogo.png'} alt='logo' height={50} width={50} className='w-12 h-12 object-contain' />
                    <div className='flex flex-col items-center sm:items-start'>
                        <h1 className='font-bold text-2xl'>SocialCircle</h1>
                        <p className='text-[10px] text-gray-500'>COMMUNITY ACTION</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <span><CalendarDays /></span>
                    <h3>Upcoming Events</h3>
                </div>
                <div className='flex gap-2 px-20 text-sm'>
                    <button className='cursor-pointer hover:bg-gray-200 py-1 px-3 rounded-md'>Signup</button>
                    <button className='flex gap-2 bg-cyan-600 text-white py-2 px-4 rounded-md cursor-pointer'><span><LogIn size={20} /></span>Login</button>
                </div>
            </div>
        </div>
        
    );
};

export default Navbar;