import { useState } from 'react'
import Link from "next/link"
export default function Home() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/150' },
  ])

  return (
    <main className="flex flex-col min-h-screen items-start justify-between p-12 bg-gray-100">
     
      <section className="flex flex-col justify-start w-full mt-0">
      <h1 className='text-2xl font-bold mb-0 flex flex-col'>Open Challenges</h1>
      <div className='flex-row flex'>
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md m-4 p-4 rounded-md flex  md:flex-row items-start"
          >
            <img
              src={card.image}
              className="m-4 rounded-md w-50 h-auto flex-shrink-0"
            ></img>
            <div className="flex flex-col items-start ml-4">
              <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
              <p className="mb-2">Card content goes here...</p>
              <span className="text-sm text-gray-500 mb-2">#Tag1 #Tag2</span>
              <button className="btn btn-primary">Join</button>
            </div>
          </div>
          
        ))}
        </div>
      </section>

      <footer className="w-full flex justify-center">
        <Link href="/dashboard">
        <button className="btn btn-primary" >Create</button>
        </Link>
      </footer>
    </main>
  )
}
