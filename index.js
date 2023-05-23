const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
let fs = require("fs");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getBlog(topic) {

    // const completion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: topic }],
    // });
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: topic,
        temperature: 0.3,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log(completion.data.choices[0].text);
    let data = completion.data.choices[0].text;
    data = data.trim()
    fs.writeFileSync("./blog.txt", data)
}
//getBlog("write a motivational quote with source. Format: json, quote,source")
getBlog("write a quiz(5 total) of history with 4 option to choose. Format: json array. schema: quiz_title,options,correct_option")
