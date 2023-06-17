import { useState } from 'react';
import Switch from 'react-switch';
import ImageGenerator from '../../components/ImageGenerator'; 

export default function ThemeMaker() {
  const [themeText, setThemeText] = useState('');
  const [anonymous, setAnonymous] = useState(false);

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
        <Switch
          checked={anonymous}
          onChange={toggleAnonymous}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
        <span className="ml-2">{anonymous ? 'Posting as Anonymous' : 'Posting as Me'}</span>
      </label>
      <button className="btn btn-success my-2" onClick={() => window.location.href='/hackathon'}>
        Post as Hackathon
      </button>
      <textarea 
        className="border-2 rounded-lg p-2 w-2/3 h-64 my-2"
        value={themeText} 
        onChange={handleTextChange} 
        placeholder="Enter your theme text here..." 
      />
      <ImageGenerator />
      <button className="btn btn-primary my-2" onClick={handlePostTheme}>
        Post Theme
      </button>
    </div>
  );
}
