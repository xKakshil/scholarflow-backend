import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";




export async function GET(req:Request){


try{


const { searchParams } =
new URL(req.url);


const courseId =
searchParams.get("courseId");



if(!courseId){

return NextResponse.json([]);

}



const lessons =
await prisma.lesson.findMany({

where:{

courseId:courseId

},

orderBy:{

createdAt:"asc"

}

});



return NextResponse.json(
lessons
);


}



catch(error){


console.log(
"LESSON GET ERROR",
error
);


return NextResponse.json(
[],
{
status:200
}
);


}


}








export async function POST(req:Request){



try{


const user:any =
getUserFromToken(req);



if(
!user ||
user.role !== "INSTRUCTOR"
){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401}
);

}





const body =
await req.json();





const lesson =
await prisma.lesson.create({

data:{


title:
body.title,


videoUrl:
body.videoUrl || "",


notes:
body.notes || "",


pdfUrl:
body.pdfUrl || "",


courseId:
body.courseId


}


});






if(body.notes){


await prisma.contentChunk.create({

data:{

content:body.notes,

lessonId:lesson.id

}

});


}







return NextResponse.json(
lesson,
{
status:201
}
);



}



catch(error){



console.log(
"LESSON CREATE ERROR =====",
error
);



return NextResponse.json(
{
error:"Lesson creation failed"
},
{
status:500
}
);



}


}