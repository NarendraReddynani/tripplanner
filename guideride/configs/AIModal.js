const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate travel plan for Location:{location},for {totalDays} days and {totalNight} night for the {traveler} with a {budget} budget with flight details,flight price with booking url,hotels options list with hotelName,hotel address,price,hotel image url,geo coordinates,rating,descriptions and places to visit nearby with placename,place details,place image url,geo coordinates,ticket pricing,time to travel each of the location for  {totalDays} day and {totalNight} night with each day plan with best time to visit in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I will generate a detailed JSON-formatted travel plan based on your input parameters.  Please provide me with the following information so I can tailor the response:\n\n*   **Location:**  (e.g., \"Paris, France\", \"Tokyo, Japan\", \"Rome, Italy\")\n*   **totalDays:** (e.g., 7)\n*   **totalNight:** (e.g., 7)\n*   **traveler:** (e.g., \"Family with 2 children\", \"Solo traveler\", \"Couple\", \"Group of friends\")\n*   **budget:** (e.g., \"Luxury\", \"Mid-range\", \"Budget\")\n*   **dates:** (e.g,\"Start Date:2024-07-01 End Date:2024-07-07)\n\nOnce you give me this information, I will generate the comprehensive JSON response.\n"},
          ],
        },

      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  
  