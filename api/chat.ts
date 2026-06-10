import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("Missing GROQ_API_KEY");

      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey });

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

    const reply = completion.choices[0]?.message?.content;

    return Response.json({
      reply: reply || "Sorry, I could not generate a response.",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}