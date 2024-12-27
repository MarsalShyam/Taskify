import React from 'react'

const Navbar = () => {
  return (

      <>
      <nav className='flex justify-around bg-[#312e8141] text-white py-2 sticky'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTasks</span>
        </div>
        <div className="flex gap-8 mx-9 list-none">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>My Tasks</li>
        </div>
      </nav>
      </>

  )
}

export default Navbar
