import { createContext } from 'react';

type AppContextType = {
    reply: { model: string, response: string }[];
    setReply: React.Dispatch<React.SetStateAction<{ model: string, response: string }[]>>;
    isLoading: { mistral: boolean, llama3: boolean, gemma: boolean, qwen: boolean };
    setIsLoading: React.Dispatch<React.SetStateAction<{mistral: boolean, llama3: boolean, gemma: boolean, qwen: boolean}>>;
}

export const AppContext = createContext({} as AppContextType);