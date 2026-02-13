
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const generateLoveLetter = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Returning default message.");
    return "The stars shine brighter when we're together. I love you.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // Updated to clearer model name if needed, or keep existing
      contents: `Write a sweet, romantic, and short love note or poem based on the following context: ${prompt}. Keep it under 60 words and make it sound personal and sincere.`,
      config: {
        systemInstruction: "You are a romantic poet who writes sincere and heartwarming love letters for couples.",
        temperature: 0.9,
      }
    });
    return response.text() || "Love is the greatest thing of all...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stars shine brighter when we're together. I love you.";
  }
};