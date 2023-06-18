import { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { useState } from 'react'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi';

export default function Navbar() {
  const { address } = useAccount();

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [resolveENSname, setResolveENSname] = useState('')
  const [dropdownTwoOpen, setDropdownTwoOpen] = useState(false)
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const toggleDropdownTwo = () => setDropdownTwoOpen(!dropdownTwoOpen)


  useEffect(() => {
    getESNResolve()
  }, [])

  const getESNResolve = async () => {
    const { ethereum } = window
    if (ethereum) {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc.ankr.com/eth_goerli',
        'goerli'
      )
      // const address = await signer.getAddress()
      const ens = await provider.lookupAddress(address)
      console.log(ens)
      if (ens !== null) {
        setResolveENSname(ens)
      }
    } else {
      alert('no wallet detected!')
    }
  }


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
        <Link href="/content">
          <li className="mr-4">Stories</li>
        </Link>
        <Link href="/create/theme">
          <li className="mr-4">Challenges</li>
        </Link>



        <li className="relative cursor-pointer">
          <div onClick={toggleDropdownTwo} className="mr-4 text-bold">
            Create
          </div>
          {dropdownTwoOpen && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link href="/dashboard">
                  <li
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Story by Yourself
                  </li>
                </Link>
                <Link href="/dashboard">
                  <li
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Story by Group
                  </li>
                </Link>
              </div>
            </div>
          )}
        </li>
        <li className="ml-2 mr-4">{resolveENSname}</li>
        <ConnectButton />
      </nav>
    </nav>
  )
}