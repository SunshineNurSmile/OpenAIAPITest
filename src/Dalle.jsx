import { useState, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";
import favicon from "/favicon.png";

function Dalle() {
  const input = useRef(null);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(false);
  const [image, setImage] = useState(favicon);
  
  const handleSend = async () => {
    input.current.value = "";
    setProgress(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setImage(response.data.data[0].url);
    setProgress(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='md:w-[720px] w-screen h-full p-4'>
        <div className='flex my-4'>
          <input
            type='text'
            placeholder='Type your description here...'
            className='input input-bordered input-accent w-full mr-4 text-white'
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={input}
          />
          <button className='btn btn-accent' onClick={handleSend}>
            Generate
          </button>
        </div>
        <div className='h-10 flex justify-center items-center mb-4'>
          {progress ? <progress className='progress'></progress> : null}
        </div>
        <div className='flex justify-center items-center'>
          <img src={image} className='w-full h-full' />
        </div>
      </div>
    </div>
  );
}

export default Dalle;
