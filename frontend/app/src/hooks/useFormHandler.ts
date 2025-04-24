// hooks/useFormHandler.js
import { useState } from "react";
import axios from "axios";

const useFormHandler = () => {


  const apiModel = 'llama';


  const [input, setInput] = useState("");
  const [showText, setShowText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setShowText(input);
    await requestLLM(input, apiModel, setResult, setLoading);


  };

  return { showText, setInput, result, loading, handleChange, handleSubmit };
}



async function requestLLM(input: string, apiModle: string, setResult: React.Dispatch<React.SetStateAction<string>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  const formData = new FormData();
  formData.append("text", input);
  try {
    const response = await axios.post(`/api/${apiModle}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setResult(response.data);
  } catch (error) {
    console.error("Error uploading the file:", error);
  } finally {
    setLoading(false);
  }
}


export { useFormHandler };
