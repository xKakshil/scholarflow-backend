import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";





export async function POST(req:Request){


try{


const user:any =
getUserFromToken(req);



if(
!user ||
user.role !== "INSTRUCTOR"
){


return NextResponse.json(
{error:"Unauthorized"},
{status:401}
);


}




const body =
await req.json();





const course =
await prisma.course.create({

data:{

title:
body.title,


description:
body.description,


price:
Number(body.price) || 0,


thumbnail:
body.thumbnail || null,


category:
body.category || "",


level:
body.level || "",


instructorId:
user.id


}

});





return NextResponse.json(
course,
{status:201}
);



}



catch(error){


console.log(
"COURSE CREATE ERROR",
error
);



return NextResponse.json(
{
error:"Course creation failed"
},
{
status:500
}
);


}



}









export async function GET(req:Request){


try{


const user:any =
getUserFromToken(req);




if(
!user ||
user.role!=="INSTRUCTOR"
){


return NextResponse.json(
[],
{status:200}
);

}





const courses =
await prisma.course.findMany({


where:{

instructorId:user.id

},



include:{


lessons:true,


enrollments:true


},



orderBy:{

createdAt:"desc"

}


});






return NextResponse.json(
courses
);



}



catch(error){



console.log(
"COURSE GET ERROR",
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