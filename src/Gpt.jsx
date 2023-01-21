import { useState, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";

function Gpt() {
  const chatbox = useRef(null);
  const input = useRef(null);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");

  const handleSend = async () => {
    input.current.value = "";
    createMessage(false, prompt);
    const reply = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 4000,
    });
    createMessage(true, reply.data.choices[0].text);
  };

  const createMessage = (left, msg) => {
    const newMessage = document.createElement("div");
    newMessage.className = left ? "chat chat-start" : "chat chat-end";
    const newMessageBubble = document.createElement("div");
    newMessageBubble.className = left
      ? "chat-bubble chat-bubble-primary"
      : "chat-bubble chat-bubble-accent";
    newMessageBubble.innerHTML = msg;
    newMessage.appendChild(newMessageBubble);
    chatbox.current.appendChild(newMessage);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='md:w-[720px] w-screen h-full p-4'>
        <div
          className='border border-gray-400 rounded-2xl overflow-y-auto p-2 h-[80vh]'
          ref={chatbox}
        ></div>
        <div className='flex mt-4'>
          <input
            type='text'
            placeholder='Type your message here...'
            className='input input-bordered input-accent w-full mr-4 text-white'
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={input}
          />
          <button className='btn btn-accent' onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gpt;
