import { useState } from 'react'
import Canvas from '@/components/Canvas'
export default function Dashboard() {
  const [theme, setTheme] = useState('Selected Theme')
  const [story, setStory] = useState('')
  const [preview, setPreview] = useState(false)
  const [name, setCreatorname] = useState('name')
  const [projectType, setProjectType] = useState('individual') // 'individual' or 'group'
  const [components, setComponents] = useState({
    writing: false,
    imageGen: false,
    mangaTemplate: false,
  })

  const handleStoryChange = (event) => {
    setStory(event.target.value)
  }

  const handlePreview = () => {
    setPreview(!preview)
  }

  const handleCreate = async () => {
    console.log('Creating NFT...')

    // connect to the user's wallet
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    // connect to the smart contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    try {
      const transaction = await contract.mint(userAddress)
      await transaction.wait()

      console.log('NFT minted successfully!')
    } catch (error) {
      console.error('An error occurred while trying to mint the NFT:', error)
    }
  }

  const handleProjectTypeChange = (type) => {
    setProjectType(type)
  }

  const handleComponentToggle = (component) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [component]: !prevComponents[component],
    }))
  }

  return (
    <main className="flex flex-col items-center p-12 bg-gray-100 min-h-screen">
      <div>
        <button onClick={() => handleProjectTypeChange('individual')}>
          Individual Project
        </button>
        <button onClick={() => handleProjectTypeChange('group')}>
          Group Project
        </button>
      </div>
      <div>
        <button onClick={() => handleComponentToggle('writing')}>
          Toggle Writing Component
        </button>
        <button onClick={() => handleComponentToggle('imageGen')}>
          Toggle Image Generator
        </button>
        <button onClick={() => handleComponentToggle('mangaTemplate')}>
          Toggle Manga Template
        </button>
      </div>
      // Show/Hide components based on state
      {components.writing && <WritingComponent />}
      {components.imageGen && <ImageGenerator />}
      {components.mangaTemplate && <MangaTemplate />}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="card w-full md:w-2/3 mb-6 bg-white p-4">
        <h2 className="text-xl mb-4">Theme: {theme}</h2>
        <h3 className="text-lg mb-4">By {name}</h3>
      </div>
      <textarea
        className="border rounded p-2 w-full md:w-2/3 h-64 mb-6"
        value={story}
        onChange={handleStoryChange}
        placeholder="Write your story here..."
      />
      <button className="btn btn-primary mr-2 mb-2" onClick={handlePreview}>
        {preview ? 'Hide' : 'Preview'}
      </button>
      {preview && (
        <div className="bg-white border rounded p-4 w-full md:w-2/3 mb-6">
          <h3 className="text-lg font-semibold mb-2">Story Preview</h3>
          <p>{story}</p>
        </div>
      )}
      <Canvas className="w-1/2 flex flex-col"></Canvas>
      <button className="btn btn-primary" onClick={handleCreate}>
        Create NFT
      </button>
    </main>
  )
}

function WritingComponent() {
  // Your component logic here
  return <div>Writing Component</div>
}

function ImageGenerator() {
  // Your component logic here
  return <div>Image Generator</div>
}

function MangaTemplate() {
  // Your component logic here
  return <div>Manga Template</div>
}
