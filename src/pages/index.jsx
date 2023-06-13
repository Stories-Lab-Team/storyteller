import { useState } from 'react'

export default function Home() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
  ])

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-gray-100">
      <header className="flex justify-center w-full">
        <img src="logo_path" alt="Logo" className="h-12" />
      </header>

      <section className="flex flex-wrap justify-center">
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow-md m-2 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
            <p>Card content goes here...</p>
          </div>
        ))}
      </section>

      <footer className="w-full flex justify-center">
        <button className="btn btn-primary">Create</button>
      </footer>
    </main>
  )
}
