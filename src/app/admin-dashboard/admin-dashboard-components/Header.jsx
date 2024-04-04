import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-between px-4 pt-4'>
            <h2 className='text-balance font-bold text-2xl'>Dashboard</h2>
            <h2 className='font-semibold text-gray-600'>Welcome, Admin</h2>
        </div>
    )
}

export default Header;