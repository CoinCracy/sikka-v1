/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import "../../build/tailwind.css"
 
function Navbar () {
return (
    <div className="relative bg-black pt-6 px-4 sm:px-6 lg:px-8">
        
    <nav className="relative flex items-center justify-between sm:h-10 lg:justify-end" aria-label="Global">
      <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
        <div className="flex items-center justify-between w-full md:w-auto">
       
          <div className="-mr-2 flex items-center md:hidden">
            <button type="button" className="bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
           
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
        <a href="/app" className="font-medium text-indigo-500 hover:text-white duration-500">App</a>
        <a href="/dex" className="font-medium text-gray-500 hover:text-white duration-500">Exchange</a>
      </div>
      <a href="#">
        <span className="sr-only">Sikka</span>
            <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"></img>
          </a>
    </nav>
  </div>
)
}

export default Navbar