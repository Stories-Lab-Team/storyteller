import { useState } from 'react'

export default function Dashboard() {
  const [theme, setTheme] = useState('Selected Theme');
  const [story, setStory] = useState('');
  const [preview, setPreview] = useState(false);

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  }

  const handlePreview = () => {
    setPreview(!preview);
  }

  const handleCreate = () => {
    // Here you might call a function to mint an NFT of the user's story
    console.log('Creating NFT...');
  }

  return (
    <main className="flex flex-col items-center p-12 bg-gray-100 min-h-screen">
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>

      <h2 className='text-xl mb-4'>Theme: {theme}</h2>

      <textarea
        className='border rounded p-2 w-full md:w-2/3 h-64 mb-6'
        value={story}
        onChange={handleStoryChange}
        placeholder='Write your story here...'
      />

      <button className='btn btn-primary mr-2 mb-2' onClick={handlePreview}>
        {preview ? 'Hide' : 'Preview'}
      </button>

      {preview &&
        <div className='bg-white border rounded p-4 w-full md:w-2/3 mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Story Preview</h3>
          <p>{story}</p>
        </div>
      }

      <button className='btn btn-primary' onClick={handleCreate}>Create NFT</button>
    </main>
  )
}
