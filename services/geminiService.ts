
import { GoogleGenAI } from "@google/genai";

// Always initialize using a named parameter with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveLetter = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a sweet, romantic, and short love note or poem based on the following context: ${prompt}. Keep it under 60 words and make it sound personal and sincere.`,
      config: {
        systemInstruction: "You are a romantic poet who writes sincere and heartwarming love letters for couples.",
        temperature: 0.9,
      }
    });
    // Directly access the .text property of the GenerateContentResponse object
    return response.text || "Love is the greatest thing of all...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stars shine brighter when we're together. I love you.";
  }
};