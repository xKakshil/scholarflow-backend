import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";




export async function GET(req:Request){


try{


const user:any =
getUserFromToken(req);



if(
!user ||
user.role !== "ADMIN"
){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401}
);

}






const courses =
await prisma.course.findMany({


include:{


instructor:{

select:{

id:true,

name:true,

email:true

}

},



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
"ADMIN COURSES ERROR",
error
);



return NextResponse.json(
{
error:"Failed loading courses"
},
{
status:500
}
);



}



}