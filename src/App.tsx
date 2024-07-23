import { useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import { AppContext } from "./Context";
import { ModelCard } from "./components/ModelCard";

function App() {
  const [reply, setReply] = useState<{ model: string, response: string }[]>([]);
  const [isLoading, setIsLoading] = useState({ mistral: false, llama3: false, gemma: false, qwen: false });
  return (
    <>
    <AppContext.Provider value={{reply, setReply, isLoading, setIsLoading}}>
      <div className="flex-col h-screen justify-center">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold">AAIOIAA</h1>
        </div>
        <main className="flex justify-center overflow-scroll-y md:flex-wrap">
          <ModelCard model="mistral"/>
          <ModelCard model="llama3"/>
          <ModelCard model="gemma"/>
          <ModelCard model="qwen"/>
        </main>
        <div className="flex justify-center sticky top-[100vh]">
          <ChatBox/>
        </div>
      </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
