import { useState } from "react";
import Dalle from "./Dalle";
import Gpt from "./Gpt";

function App() {
  const [page, setPage] = useState(true);
  const gptClicked = () => {
    if (page) {
      return;
    }
    setPage(!page);
  };
  const dalleClicked = () => {
    if (!page) {
      return;
    }
    setPage(!page);
  };
  return (
    <div className='max-h-screen'>
      <div className='tabs tabs-boxed justify-center gap-2'>
        <a
          className={`tab w-24 ${page ? "tab-active" : ""}`}
          onClick={gptClicked}
        >
          Davinci
        </a>
        <a
          className={`tab w-24 ${page ? "" : "tab-active"}`}
          onClick={dalleClicked}
        >
          DALL·E
        </a>
      </div>
      {page ? <Gpt /> : <Dalle />}
    </div>
  );
}

export default App;
