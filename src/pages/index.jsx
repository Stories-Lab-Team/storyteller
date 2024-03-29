import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Make Cyberpunk Story Collections',
      description:
        'A futuristic theme revolving around AI, robotics, life, action, and love. Looking for storywriters, artists, composers, animators. Open to suggestions.',
      image: 'https://via.placeholder.com/150',
      media: 'Manga / Visual Novels',
    },
    {
      id: 2,
      title: 'Make Educational Biology & Genetics Fun to Learn',
      description:
        'Making biology fun and easy to understand. Media open to suggestions.',
      image: 'https://via.placeholder.com/150',
      media: 'Open to suggestions',
    },
    {
      id: 3,
      title: 'Fantasy Mythology: Bring Myths and Make New Series',
      description:
        'A fantasy series based on existing myths. Looking for suggestions and collaboration to kick off as independent series.',
      image: 'https://via.placeholder.com/150',
      media: 'Open to suggestions',
    },
  ])

  //hotStories and newThemes
  const hotStories = [
    {
      title: 'Story 1',
      description: 'An intriguing tale of courage and resilience against odds.',
      collabs: 15,
      imageUrl: 'https://via.placeholder.com/150',
      daysLeft: 4,
    },
    {
      title: 'Story 2',
      description:
        'A heartwarming story about the enduring power of friendship.',
      collabs: 21,
      imageUrl: 'https://via.placeholder.com/150',
      daysLeft: 3,
    },
    {
      title: 'Story 3',
      description:
        'A thrilling mystery that keeps you on the edge of your seat.',
      collabs: 8,
      imageUrl: 'https://via.placeholder.com/150',
      daysLeft: 7,
    },
    {
      title: 'Story 4',
      description: 'A poignant story about loss, grief, and recovery.',
      collabs: 12,
      imageUrl: 'https://via.placeholder.com/150',
      daysLeft: 5,
    },
    {
      title: 'Story 5',
      description:
        'A riveting sci-fi adventure in a world full of possibilities.',
      collabs: 18,
      imageUrl: 'https://via.placeholder.com/150',
      daysLeft: 6,
    },
    // {
    //   title: 'Story 6',
    //   description:
    //     'A hilarious comedy that will keep you laughing till the end.',
    //   collabs: 9,
    //   imageUrl: 'https://via.placeholder.com/150',
    //   daysLeft: 7,
    // },
    // {
    //   title: 'Story 7',
    //   description:
    //     'A chilling horror story that will give you sleepless nights.',
    //   collabs: 14,
    //   imageUrl: 'https://via.placeholder.com/150',
    //   daysLeft: 2,
    // },
    // {
    //   title: 'Story 8',
    //   description:
    //     'A historical drama set in the backdrop of the French Revolution.',
    //   collabs: 20,
    //   imageUrl: 'https://via.placeholder.com/150',
    //   daysLeft: 5,
    // },
    // {
    //   title: 'Story 9',
    //   description:
    //     'A whimsical fairy tale that captures the innocence of childhood.',
    //   collabs: 16,
    //   imageUrl: 'https://via.placeholder.com/150',
    //   daysLeft: 3,
    // },
    // {
    //   title: 'Story 10',
    //   description:
    //     'A psychological thriller with an unexpected twist at the end.',
    //   collabs: 22,
    //   imageUrl: 'https://via.placeholder.com/150',
    //   daysLeft: 4,
    // },
  ]

  const newThemes = [
    { title: 'Nature Resilience', creator: 'UserA', collabs: 7 },
    { title: 'Intricate Relationships', creator: 'UserB', collabs: 15 },
    { title: 'Exploring the Cosmos', creator: 'UserC', collabs: 9 },
    { title: 'Journey Through Time', creator: 'UserD', collabs: 12 },
    { title: 'The Art of Silence', creator: 'UserE', collabs: 5 },
    { title: 'The Power of Music', creator: 'UserF', collabs: 10 },
    { title: 'Reflections on Water', creator: 'UserG', collabs: 8 },
    { title: 'Life in the Desert', creator: 'UserH', collabs: 6 },
    { title: 'Mysteries of the Deep Sea', creator: 'UserI', collabs: 11 },
    { title: 'Forgotten Civilizations', creator: 'UserJ', collabs: 14 },
  ]

  const images = ['starship.png', 'myth.png', 'japan.png', 'drama.png']

  const [index, setIndex] = useState(0)

  // Image preloading
  useEffect(() => {
    images.forEach((image) => {
      new Image().src = image
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 5000) // changes every 5 secs

    return () => clearInterval(timer) // cleanup on unmount
  }, [])
  return (
    <>
      {' '}
      {/* Hero Section */}
      <section className="relative w-full h-96 text-center text-white flex items-center justify-center">
        {images.map((image, i) => (
          <div
            key={image}
            className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === i ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundColor: '#f9fafb',
              backgroundBlendMode: 'multiply',
            }}
          />
        ))}

        <div className="relative z-10">
          <h1 className="text-3xl font-bold my-4">Storytellers, Unite!</h1>
          <p className="text-xl">Fuse your imaginations...</p>
        </div>
      </section>
      <main className="flex flex-col min-h-screen items-start justify-between p-12 bg-gray-950">
        <section className="flex flex-col justify-start w-full mt-0">
          <h1 className="text-2xl text-white font-bold mb-0 flex flex-col">
            Open Challenges
          </h1>
          <h2 className="text-white">
            Creathon<span className="text-white"> (What is Creathon?)</span>
          </h2>
          <div className="flex-row flex">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white shadow-md m-4 p-4 rounded-md flex  md:flex-row items-start space-between w-1/3"
              >
                <img
                  src={card.image}
                  className="m-4 rounded-md w-50 h-auto "
                ></img>
                <div className="flex flex-col items-start">
                  <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                  <p
                    className="mb-2 flex-wrap"
                    style={{ height: '50px', overflow: 'hidden' }}
                  >
                    {card.description}
                  </p>
                  <span className="text-sm text-gray-500 mb-2">
                    #{card.media}
                  </span>
                  <Link href={`/hackathon/${card.id}`}>
                    <button className="btn text-gray-500 bg-gray-950 button-shine">
                      Detail ▶
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-4 mb-4 w-full min-w-screen flex flex-col justify-between items-center w-full mt-0 bg-gray-900 z-10">
          {' '}
          <Link href="/dashboard">
            <button className="m-4 bg-white rounded p-4 button-shine">
              Create on theme or bluesky
            </button>
          </Link>
        </section>

        <section className="w-full flex mt-16 mb-8 ">
          <div className="w-1/2 pr-2 mr-8">
            <h2 className="text-xl font-bold text-white mb-4">
              🔥 Hot Stories{' '}
            </h2>
            {hotStories.map((story, index) => (
              <Link href="/content" key={index}>
                <div
                  key={index}
                  className="card bg-white mb-4 flex items-start flex flex-row cursor-pointer"
                >
                  <img
                    src={story.imageUrl}
                    className="w-20 mr-4"
                    alt={story.title}
                  />
                  <div className="flex">
                    <h3 className="font-bold mb-2">{story.title}</h3>
                    <p className="mb-2">{story.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Collaborations: {story.collabs}
                      </p>
                      <p className="text-sm text-red-500">
                        {story.daysLeft} days left
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/stories">
              <p className="btn border-primary text-gray-200 bg-transparent mt-4">
                View All
              </p>
            </Link>
          </div>

          <div className="w-1/2 pl-2 ml-8">
            <h2 className="text-xl   text-white font-bold mb-4">
              🆕 New Theme List
            </h2>
            <div className="grid grid-cols-3 gap-4 text-sm font-semibold mb-2">
              <p className="col-span-1">Theme</p>
              <p className="col-span-1">Collaborations</p>
              <p className="col-span-1">Creator</p>
            </div>
            {newThemes.map((theme, index) => (
              <div
                key={index}
                className="text-white grid grid-cols-3 gap-6 mb-2 p-2 cursor-pointer shadow hover:shadow-md"
              >
                <p className="col-span-1">{theme.title}</p>

                <p className="col-span-1">{theme.collabs}</p>
                <p className="col-span-1">{theme.creator}</p>
              </div>
            ))}
            <Link href="/themes">
              <p className="btn btn-primary mt-4">View All</p>
            </Link>
          </div>
        </section>
        <footer className="w-full bg-gray-800 text-white py-8">
          <div
            className="container mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center"
            key={index}
          >
            <div>
              <h3 className="text-xl  text-white font-bold">Storytellers</h3>
              <p className="mt-2 text-sm">
                Creating and sharing unique stories
              </p>
            </div>

            <ul className="flex space-x-6 text-white">
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
                <li href="#" cllisslime="text-xl">
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
    </>
  )
}
