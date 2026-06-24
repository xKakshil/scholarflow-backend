import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { GoogleGenerativeAI }
from "@google/generative-ai";





const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY!
);






export async function POST(req:Request){


try{


const body =
await req.json();





const chunks =
await prisma.contentChunk.findMany({

take:5,

where:{

content:{

contains:
body.question,

mode:"insensitive"

}

}

});






const context =
chunks
.map(c=>c.content)
.join("\n");






const model =
genAI.getGenerativeModel({

model:"gemini-2.5-flash-lite"

});







const result =
await model.generateContent(`


You are an AI tutor inside ScholarFlow LMS.


Rules:

1. First use course material.
2. Explain concepts clearly.
3. If course material is incomplete,
use your own knowledge.
4. Tell if extra knowledge is used.
5. Never invent fake course content.



COURSE MATERIAL:

${context}



STUDENT QUESTION:

${body.question}


Give a helpful educational answer.

`);







const answer =
result.response.text();






return NextResponse.json({

answer,


sources:
chunks

});





}



catch(error){



console.log(
"AI ERROR",
error
);



return NextResponse.json(
{
error:"AI failed"
},
{
status:500}
);



}


}