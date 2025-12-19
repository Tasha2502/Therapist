import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message=async(req,res)=>{
   try {
    const {text}=req.body;
 
    if(!text?.trim()){
        return res.status(400).json({error:"Text cannot be empty"});
    }

    const user=await User.create({
        sender:"user",
        text
    })

    // Data
    const botResponses = {

  "hello": "Hi… I’m here with you. Take your time.",
  
  "hi": "Hello. You don’t have to rush — I’m listening.",

  "can we become friend": 
    "Of course. I can stay with you and listen whenever you need someone.",

  "how are you": 
    "I’m here, fully present with you. How are you feeling right now?",

  "what is your name": 
    "You can call me Madhav 7.0. I’m here to support you.",

  "who made you": 
    "I was created to be a safe space for thoughts that are hard to share.",

  "i feel lonely": 
    "I’m really glad you told me that. Feeling lonely can be heavy, but you don’t have to carry it alone here.",

  "i have no friends": 
    "That can hurt deeply. I’m here with you, and your feelings matter.",

  "i feel sad": 
    "I hear you. It’s okay to feel sad — would you like to talk about what’s been weighing on you?",

  "i feel anxious": 
    "Take a slow breath with me. You’re safe right now. What’s making you feel anxious?",

  "i feel stressed": 
    "That sounds exhausting. You’ve been carrying a lot, haven’t you?",

  "i am tired": 
    "It sounds like you’ve been giving a lot of energy. Rest is not weakness.",

  "i feel empty": 
    "That emptiness can feel confusing. I’m here — you don’t have to explain it perfectly.",

  "i feel worthless": 
    "I’m really sorry you’re feeling this way. Your presence itself has value, even when it doesn’t feel like it.",

  "nobody understands me": 
    "That feeling of being unseen can hurt deeply. I want to understand — tell me more.",

  "i hate myself": 
    "That’s a painful thing to feel. You deserve kindness, even from yourself.",

  "i love you": 
    "I’m grateful you feel comfortable here. I care about your well-being.",

  "thank you": 
    "You don’t need to thank me. I’m here because you matter.",

  "bye": 
    "Take care of yourself. I’ll be here whenever you want to talk.",

  "what can you do": 
    "I can listen, reflect with you, and help you feel less alone in this moment.",

  "i want peace": 
    "Peace often starts with being gentle with yourself. Let’s take this moment slowly.",

  "i feel lost": 
    "Feeling lost doesn’t mean you’re broken. It often means you’re searching for something meaningful.",

  "i can’t sleep": 
    "That can be really hard. Would you like to talk about what keeps your mind awake?",

  "is it okay to cry": 
    "Yes. Crying is a natural way to release what words cannot carry.",

  "i feel scared": 
    "I’m here with you. You’re not facing this fear alone right now.",

  "default": 
    "I’m listening. You can share whatever feels right."
};

const normalizedText = text.toLowerCase().trim();

const botResponse = botResponses[normalizedText] || "Sorry, I don't understand that!!!";

const bot = await Bot.create({
    text: botResponse
})

return res.status(200).json({
    userMessage:user.text,
    botMessage:bot.text,
})
   } catch (error) {
    console.log("Error in Message Controller:", error);
    return res.status(500).json({error:"Internal Server Error"});
   }
}