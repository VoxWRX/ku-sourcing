import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RxDashboard } from 'react-icons/rx'
import { MdBorderColor } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaListUl } from "react-icons/fa";

const Sidebar = ({ children }) => {
    return (
        <div className='flex z-50'>
            <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
                <div className='flex flex-col items-center'>
                    <Link href='/admin-dashboard'>
                        <div className='bg-gray-100 hover:bg-gray-300 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <RxDashboard size={20} />
                        </div>
                    </Link>
                    <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                    <Link href='/admin-handling'>
                        <div className='bg-blue-700 hover:bg-blue-500 text-gray-100 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <MdBorderColor size={20} />
                        </div>
                    </Link>
                    <Link href='/admin-orders'>
                        <div className='bg-gray-100 hover:bg-gray-300 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <FaListUl size={20} />
                        </div>
                    </Link>

                    <Link href='/admin-settings'>
                        <div className='bg-gray-100 hover:bg-gray-300 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <IoMdSettings size={20} />
                        </div>
                    </Link>
                </div>
            </div>
            <main className='ml-20 w-full'>{children}</main>
        </div>
    )
}

export default Sidebar