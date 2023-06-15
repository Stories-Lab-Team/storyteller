import { useRouter } from 'next/router'

export default function Hackathon() {
  const router = useRouter()
  const { id } = router.query

  // Mock data
  const data = {
    1: {
      image: '/background1.png',
      title: 'Cyberpunk Type Theme',
      description:
        'Futuristic theme, colliving with ai, robotics, life, action and love. Manga / visual novels looking for storywriters, artists, composer, animator, open to suggestion.',
      roles: ['Storywriters', 'Artists', 'Composer', 'Animator'],
      media: 'Open to suggestion',
    },
    2: {
      image: '/biology.png',
      title: 'Education & Biology and Genetics',
      description: 'Making biology fun and easy to understand.',
      roles: ['Storywriters', 'Artists', 'Educators'],
      media: 'Open to suggestion',
    },
    3: {
      image: '/fantasy.png',
      title: 'Fantasy based on existing myth',
      description:
        'Looking for some suggestions and kick off as independent series.',
      roles: ['Storywriters', 'Artists', 'Historians'],
      media: 'Open to suggestion',
    },
  }

  const hackathon = data[id]

  return (
    <div className="m-4">
      <img
        src={hackathon.image}
        alt={hackathon.title}
        className="object-cover w-full h-64 rounded-md"
      />
      <h1 className="text-2xl font-bold mt-4">{hackathon.title}</h1>
      <p className="mt-4">{hackathon.description}</p>
      <h3 className="font-semibold mt-4">Roles:</h3>
      <ul className="list-disc list-inside">
        {hackathon.roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
      <h3 className="font-semibold mt-4">Media:</h3>
      <p>{hackathon.media}</p>
    </div>
  )
}
