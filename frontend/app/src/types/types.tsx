export interface WordProps {
  text: string;
  className?: string;
}

export interface TypewriterEffectProps {
  words: WordProps[];
  className?: string;
  cursorClassName?: string;
}

export interface TypewriterProps {
  text: string;
  speed?: number;
}


interface Message {
  role: "assistant" | "user" | "system";  
  content: string; 
}

export interface LlamaRequest {
  model: string;
  messages: Message[];
  stream?: boolean;
  format?: string,
}

export interface LlamaResponse {
  model: string;  
  created_at: string;  
  message: Message;  
  done_reason: "stop" | "length" | "error";
  done: boolean;  
  total_duration: number; 
  load_duration: number;  
  prompt_eval_count: number;  
  prompt_eval_duration: number;  
  eval_count: number;  
  eval_duration: number;  
}
