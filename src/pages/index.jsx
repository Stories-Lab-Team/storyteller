import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/150' },
  ])

  // assuming hotStories and newThemes are arrays of data
  const hotStories = ['Story 1', 'Story 2', 'Story 3']
  const newThemes = ['Theme 1', 'Theme 2', 'Theme 3']

  return (
    <main className="flex flex-col min-h-screen items-start justify-between p-12 bg-gray-100">
      <section className="flex flex-col justify-start w-full mt-0">
        <h1 className="text-2xl font-bold mb-0 flex flex-col">
          Open Challenges
        </h1>
        <div className="flex-row flex">
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
      <section className="mt-4 mb-4 w-full min-w-screen flex flex-col justify-between items-center w-full mt-0 bg-blue-200 z-10">
        {' '}
        <Link href="/dashboard">
          <button className="m-4 bg-white rounded p-4">
            Create on theme or bluesky
          </button>
        </Link>
      </section>

      <section className="w-full flex mt-8 mb-8">
        <div className="w-1/2 pr-2">
          <h2 className="text-xl font-bold">🔥 Hot Stories </h2>
          <ul>
            {hotStories.map((story, index) => (
              <li key={index}>{story}</li>
            ))}
          </ul>
          <Link href="/stories">
            <p className="btn btn-primary">View All</p>
          </Link>
        </div>

        <div className="w-1/2 pl-2">
          <h2 className="text-xl font-bold">New Theme List</h2>
          <ul>
            {newThemes.map((theme, index) => (
              <li key={index}>{theme}</li>
            ))}
          </ul>
          <Link href="/themes">
            <p className="btn btn-primary">View All</p>
          </Link>
        </div>
      </section>
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Stories Lab</h3>
            <p className="mt-2 text-sm">Creating and sharing unique stories</p>
          </div>

          <ul className="flex space-x-6">
            <li>
              <Link href="/about">
                <p>About</p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p>Contact</p>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <p>Privacy Policy</p>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <p>Terms of Service</p>
              </Link>
            </li>
          </ul>

          <div>
            <h3 className="text-xl font-bold">Follow us:</h3>
            <div className="flex space-x-4 mt-2 ">
              <li href="#" cllissNlime="text-xl">
                <i className="fab fa-facebook"></i>
              </li>
              <div href="#" className="text-xl">
                <li className="fab fa-twitter"></li>
              </div>
              <div href="#" className="text-xl">
                <li className="fab fa-instagram"></li>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
