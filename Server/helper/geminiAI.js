const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)

const gemini = async (game) => {

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Please give me a games recomendation based on this ${game} in array of object. Only 5 games and give me in format JSON[{
  "name" : name of games,
  "description" : description of games
  }] 
  
  and please remove open tag \`\`\`json also the close tag \`\`\` for the json data
  `

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text()
  console.log(text)
  return JSON.parse(text)
};
module.exports =  gemini