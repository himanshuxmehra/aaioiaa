import { useContext, useState } from "react";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import axios from "axios";
import { AppContext } from "../Context.ts";

function ChatBox() {
  const [prompt, setPrompt] = useState("");
  const [tps, setTps] = useState(0);
  const { reply, setReply, setIsLoading, isLoading } = useContext(AppContext);
  let [promptSent, setPromptSent] = useState(false);
  const onClick = async () => {

    console.log(prompt);
    setPromptSent(true);
    setIsLoading({ mistral: true, llama3: true, gemma: true, qwen: true });
    const models = ["mistral", "llama3", "gemma", "qwen"]
    // const models = ["llama3"]
    // setReply([...reply, { model: "llama3", response: `You: ${prompt}` }]);


    for (let i = 0; i < 4; i++) {

      try {
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: models[i], prompt: prompt }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let aiResponse = '';
        let startTime = Date.now();
        let tokenCount = 0;

        while (true) {
          const { done, value } = await reader?.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const parsedChunk = JSON.parse(chunk);
          aiResponse += parsedChunk.response;
          tokenCount += 1;

          const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
          setTps(Math.round((tokenCount / elapsedTime) * 10) / 10);

          // setReply(prev => {
          //   const newMessages = [...prev.[models[i]].messages];
          //   const lastMessage = newMessages[newMessages.length - 1];
          //   newMessages.push(aiResponse);
          //   return newMessages;
          // });
          setReply([...reply, { model: models[i], response: aiResponse }]);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading({ ...isLoading, [models[i]]: false });
        setPrompt("");
        setPromptSent(false);
      }
    };
    // let replyText = "";
    // parsedReplies.pop();
    // parsedReplies.map((item: any, index: number) => {
    //   replyText += item.response;
    // });
    // console.log(replyText);
    // let model = models[i];
    // setReply(((prevObject) => ([...prevObject, { model: models[i], response: replyText }])));
    // console.log('after ', models[i], ' the reply is ', reply);
    // setIsLoading(((prevObject) => ({ ...prevObject, [model]: false })));
  }

return (
  <div className="flex w-full h-[96px] max-w-sm items-center space-x-2">
    <p>Token per seconds: {tps}</p>
    <Input
      type="email"
      placeholder="Enter your prompt here"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
    {promptSent
      ? <Button className="disabled" disabled={true}>Loading</Button>
      : <Button onClick={onClick} className="bg-primary" disabled={!prompt}>
        Send
      </Button>}
  </div>
);
}

export default ChatBox;
