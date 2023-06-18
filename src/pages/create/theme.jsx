import { useState } from 'react';
import ImageGenerator from '../../components/ImageGenerator'; 

export default function ThemeMaker() {
    const [themeText, setThemeText] = useState('');
    const [anonymous, setAnonymous] = useState(false);
  const [image, showImage]=useState('')

  function show(){
    showImage("/hacker.png")
    }
    const handleTextChange = (event) => {
      setThemeText(event.target.value);
    };
  
    const toggleAnonymous = () => {
      setAnonymous(!anonymous);
    };
  
    const handlePostTheme = () => {
      // send request to themeText
      console.log('Posting theme:', themeText);
    };
  
    return (
      <div className="theme-maker flex flex-col items-center">
        <h2 className="text-2xl font-bold my-4">Create Your Theme</h2>
        <label className="flex items-center mt-3">
          <input type="checkbox" className="btn-check btn-active-true btn-info" checked={anonymous} onChange={toggleAnonymous} />
          <span className="ml-2">{anonymous ? 'Posting as Anonymous' : 'Posting as Anonymous'}</span>
        </label>
        <button className="btn btn-success my-2" onClick={() => window.location.href='/hackathon'}>
          Post as Hackathon
        </button>
        <div className="flex space-x-4 w-2/3 mb-1">
          <textarea 
            className="border-2 rounded-lg p-2 flex-grow h-48"
            value={themeText} 
            onChange={handleTextChange} 
            placeholder="Enter your theme text here..." 
          />
          <div className="flex-shrink-0 w-1/3 h-48">
            <input placeholder='input your image description'></input>
            <button onClick={show}>Show</button>
            <img src={image}></img>
          </div>
        </div>
        <button className="btn btn-primary flex" onClick={handlePostTheme}>
          Post Theme
        </button>
      </div>
    );
  }

  