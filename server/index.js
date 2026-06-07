import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a cybersecurity assistant for Secure Hash Generator.

You help with:
- SHA256
- SHA512
- MD5
- bcrypt
- Cryptography
- Password Security
- File Integrity
- Digital Signatures

Keep answers concise and helpful.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.3,
      max_tokens: 1000,
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate response",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});