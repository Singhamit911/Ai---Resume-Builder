
// AIModel.js
import { GoogleGenAI } from "@google/genai";
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const ai = new GoogleGenAI({ apiKey});

async function sendMessage(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No text returned from AI");
  }

  return text;
}

export default { sendMessage };
