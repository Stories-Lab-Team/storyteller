import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { useState } from "react"

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <nav className="navbar bg-gray-950 flex justify-between items-center p-8 ">
      <div>
        <Link href="/">
          <h1 className="font-bold text-xl text-white ">Storytellers</h1>
        </Link>
      </div>

      <nav className="flex items-center list-none text-white ">
        <Link href="/">
          <li className="mr-4">Home</li>
        </Link>
        <Link href="/about">
          <li className="mr-4">About</li>
        </Link>
        <Link href="/contact">
          <li className="mr-4">Contact</li>
        </Link>
        <li className="relative cursor-pointer">
        <div onClick={toggleDropdown} className="mr-4 text-bold">
          Create
        </div>
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link href="/create/theme">
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Theme
                </li>
              </Link>
              <Link href="/create/story-self">
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Story by Yourself
                </li>
              </Link>
              <Link href="/create/story-group">
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Story by Group
                </li>
              </Link>
            </div>
          </div>
        )}
      </li>
        <ConnectButton />
      </nav>
    </nav>
  )
}
