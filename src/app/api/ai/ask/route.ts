import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import {
  GoogleGenerativeAI
} from "@google/generative-ai";





export async function POST(req: Request) {


console.log("🔥 AI API HIT");


try {



if(!process.env.GEMINI_API_KEY){


return NextResponse.json(
{
error:"Gemini API key missing"
},
{
status:500
}
);


}





const body =
await req.json();





if(!body.question){


return NextResponse.json(
{
error:"Question required"
},
{
status:400
}
);


}







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
.map((c)=>c.content)
.join("\n");







const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);






const model =
genAI.getGenerativeModel({


model:"gemini-2.5-flash-lite"


});








const result =
await model.generateContent(`


You are ScholarFlow AI Tutor.


Rules:

1. Use course notes first.
2. Explain in simple educational language.
3. If notes are insufficient, use general knowledge.
4. Clearly mention when external knowledge is used.
5. Never create fake course references.



COURSE NOTES:

${context || "No matching course notes found"}



QUESTION:

${body.question}



Answer:

`);








const answer =
result.response.text();








return NextResponse.json({

answer,

sources:chunks

});





}



catch(error:any){



console.error(
"🔥 AI ERROR FULL:",
error
);




return NextResponse.json(
{

error:
error.message || "AI failed"

},
{
status:500
}
);


}



}
