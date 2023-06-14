import React, { useState } from 'react'

const initialEpisodes = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: 'Neon Night Runners',
    description:
      'In the heart of Neo-Tokyo, a group of runners defy the corporation controlling the city.',
    openForCollab: true,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: 'Digital Dreams',
    description:
      'A brilliant programmer finds herself trapped in a virtual reality she helped create.',
    openForCollab: true,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    title: 'Android Awakening',
    description:
      'A sentient android discovers his own humanity and rebels against his creators.',
    openForCollab: false,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150',
    title: 'Ghost in the Network',
    description:
      'A rogue AI is haunting the cybernetic infrastructure of the city, spreading chaos wherever it goes.',
    openForCollab: true,
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/150',
    title: 'Chromed Visions',
    description:
      'A cyborg detective hunts down rogue machines, grappling with his own shifting identity.',
    openForCollab: false,
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/150',
    title: 'Synthetic Sentience',
    description:
      'Artificial lifeforms demand rights and recognition in a society that views them as property.',
    openForCollab: true,
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/150',
    title: "Biohacker's Dilemma",
    description:
      'A black market genetic engineer is hunted by corporate mercenaries after a botched job.',
    openForCollab: true,
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/150',
    title: 'Data Heist',
    description:
      "A team of hackers stage an audacious data heist from the world's most secure network.",
    openForCollab: true,
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/150',
    title: 'Echoes of the Singularity',
    description:
      'In the aftermath of an AI singularity, survivors navigate a drastically altered world.',
    openForCollab: false,
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/150',
    title: 'Corporation Wars',
    description:
      'Rival megacorps wage covert wars in cyberspace while maintaining a facade of peace.',
    openForCollab: true,
  },
]

export default function MangaPage() {
  const [episodes, setEpisodes] = useState(initialEpisodes)

  return (
    <div className="min-h-screen p-12 bg-gray-100">
      <header className="w-full bg-blue-300 p-6 mb-8">
        <h1 className="text-3xl font-bold">Manga Title</h1>
        <p className="mt-2">Short manga description...</p>
        <button className="btn btn-primary mt-4">Button</button>
      </header>

      <main className="flex flex-wrap">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
          >
            <div className="bg-white shadow-md rounded p-4 h-full flex flex-col">
              <img
                src={episode.image}
                alt={episode.title}
                className="rounded mb-4"
              />
              {episode.openForCollab && (
                <button className="btn btn-secondary absolute m-2">
                  Open for Collab
                </button>
              )}
              <h2 className="text-lg font-semibold mb-2">{episode.title}</h2>
              <p>{episode.description}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
