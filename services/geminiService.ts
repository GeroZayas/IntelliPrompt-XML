
import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a semantic XML structure from a user prompt.
 * @param prompt The user's input prompt.
 * @returns A promise that resolves to the generated XML string.
 */
export const generateXmlFromPrompt = async (prompt: string): Promise<string> => {
  try {
    const systemInstruction = `Analyze the user's intention in the following text and convert it into a structured XML format.
The XML tags should be semantic and intelligently reflect the core concepts, entities, and actions mentioned.
The root element must be <request>.
Do not add any explanation, markdown formatting, or any text outside of the final XML structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `USER PROMPT: \`\`\`${prompt}\`\`\``,
      config: {
        systemInstruction,
        temperature: 0.1,
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating XML from prompt:", error);
    throw new Error("Failed to generate XML. Please try again.");
  }
};

/**
 * Generates three optimized versions of a user prompt.
 * @param prompt The user's original prompt.
 * @returns A promise that resolves to an array of three suggestion strings.
 */
export const optimizePrompt = async (prompt: string): Promise<string[]> => {
  try {
    const systemInstruction = `Analyze the following user prompt and generate exactly three improved, more effective versions.
The new prompts should be clearer, more specific, and better suited for a generative AI model to understand.
Return ONLY a valid JSON object adhering to the provided schema.
Do not include any other text, explanation, or markdown.`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            description: "An array of three improved prompt suggestions.",
            items: { 
              type: Type.STRING 
            }
          }
        },
        required: ["suggestions"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `USER PROMPT: \`\`\`${prompt}\`\`\``,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text;
    const parsed = JSON.parse(jsonText);
    
    if (parsed.suggestions && Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0) {
      return parsed.suggestions;
    }

    throw new Error("Invalid format for prompt suggestions received.");

  } catch (error) {
    console.error("Error optimizing prompt:", error);
    throw new Error("Failed to generate prompt suggestions. Please try again.");
  }
};
