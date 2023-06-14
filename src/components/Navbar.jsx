import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 flex justify-between items-center p-4">
      <div>
        <Link href="/">
          <h1 className="font-bold text-xl">Stories Lab</h1>
        </Link>
      </div>

      <nav className="flex items-center list-none">
        <Link href="/">
          <li className="mr-4">Home</li>
        </Link>
        <Link href="/about">
          <li className="mr-4">About</li>
        </Link>
        <Link href="/contact">
          <li className="mr-4">Contact</li>
        </Link>
        <ConnectButton />
      </nav>
    </nav>
  )
}
