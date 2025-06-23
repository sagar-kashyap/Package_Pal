
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PackageSuggestion } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will prevent the app from running if API_KEY is not set.
  // In a real scenario, this might be handled by the build process or runtime environment.
  console.error("API_KEY environment variable not set. Application functionality will be limited.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" }); // Fallback to avoid crash if not set, but API calls will fail.

export const findSimilarPackages = async (
  sourcePackage: string,
  sourceLang: string,
  targetLang: string
): Promise<PackageSuggestion[]> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = `
    I am looking for packages in ${targetLang} that are similar in functionality to the ${sourceLang} package named "${sourcePackage}".
    Please provide a list of up to 5 such packages, ordered from most relevant to least relevant.
    For each package, provide its name and a brief one-sentence description of its primary purpose.
    Format the output as a JSON array of objects, where each object has "name" (string) and "description" (string) keys. For example:
    [
      {"name": "PackageA", "description": "Description of PackageA."},
      {"name": "PackageB", "description": "Description of PackageB."}
    ]
    If you cannot find any relevant packages or are unsure, return an empty JSON array [].
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3, // Lower temperature for more factual/deterministic output
      },
    });

     const textOutput = response.text;
    if (!textOutput) {
      console.warn("Gemini API response did not contain text output.");
      return [];
    }
    
    let jsonStr = textOutput.trim();
    
    // Remove potential markdown fences (```json ... ```)
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData)) {
      return parsedData.filter(
        (item: any): item is PackageSuggestion =>
          typeof item === 'object' &&
          item !== null &&
          typeof item.name === 'string' &&
          typeof item.description === 'string'
      ).slice(0, 5); // Ensure max 5 results
    }
    
    console.warn("Gemini response was not a valid array:", parsedData);
    return [];

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch package suggestions: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching package suggestions.");
  }
};
    