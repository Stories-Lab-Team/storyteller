import { Inter, Orbitron } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Storytellers',
  description:
    'A place for creative story tellers to collaborate with human, and with AIs',
}

export default function RootLayout({ children, index }) {
  return (
    <html lang="en">
      <body className={inter.className} key={index}>{children}</body>
    </html>
  )
}
