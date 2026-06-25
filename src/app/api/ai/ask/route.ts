import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  console.log("🔥 AI API HIT");

  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "Gemini API key is missing."
        },
        {
          status: 500
        }
      );
    }

    const body = await req.json();

    if (!body.question?.trim()) {
      return NextResponse.json(
        {
          error: "Question is required."
        },
        {
          status: 400
        }
      );
    }

    const chunks = await prisma.contentChunk.findMany({
      take: 5,
      where: {
        content: {
          contains: body.question,
          mode: "insensitive"
        }
      }
    });

    const context =
      chunks.length > 0
        ? chunks.map((c) => c.content).join("\n\n")
        : "No relevant course notes found.";

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are ScholarFlow AI Tutor.

Instructions:

1. Answer using the COURSE NOTES whenever possible.
2. If the notes are insufficient, answer using your general knowledge.
3. If you use knowledge outside the notes, clearly mention:
   "This explanation includes additional knowledge beyond your course notes."
4. Never invent course content.
5. Keep answers concise but educational.

-------------------------
COURSE NOTES
-------------------------

${context}

-------------------------
QUESTION
-------------------------

${body.question}
`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 600
      }
    });

    const answer =
      result.response.text() ||
      "Sorry, I couldn't generate an answer.";

    return NextResponse.json({
      answer,
      sources: chunks
    });
  } catch (error: any) {

  console.error("🔥 AI ERROR:", error);

  const message =
    error?.message || "";

  if (
    message.includes("429") ||
    message.toLowerCase().includes("quota")
  ) {

    return NextResponse.json(
      {
        error:
          "Gemini AI is currently busy because of free-tier limits. Please wait a few seconds and try again."
      },
      {
        status: 429
      }
    );

  }

  return NextResponse.json(
    {
      error:
        "AI service is temporarily unavailable. Please wait a few seconds and try again."
    },
    {
      status: 500
    }
  );

}

    return NextResponse.json(
      {
        error:
          "AI service is temporarily unavailable. Please try again in a few seconds."
      },
      {
        status: 500
      }
    );
  }
}
