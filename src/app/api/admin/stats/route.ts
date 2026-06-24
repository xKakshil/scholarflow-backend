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







const users =
await prisma.user.findMany({


select:{


id:true,


name:true,


email:true,


role:true,


createdAt:true


},


orderBy:{


createdAt:"desc"


}


});








const courses =
await prisma.course.findMany({


include:{


instructor:{


select:{


email:true


}


},



_count:{


select:{


enrollments:true,


lessons:true


}


}


},


orderBy:{


createdAt:"desc"


}


});








const payments =
await prisma.payment.findMany();





const revenue =
payments.reduce(
(sum,p)=>{

return p.status==="SUCCESS"
?
sum+p.amount
:
sum;

},
0
);









return NextResponse.json({



totalUsers:
users.length,



students:
users.filter(
u=>u.role==="LEARNER"
).length,



instructors:
users.filter(
u=>u.role==="INSTRUCTOR"
).length,



courses:
courses.length,



enrollments:
courses.reduce(
(sum,c)=>
sum+c._count.enrollments,
0
),



revenue,



recentUsers:
users.slice(0,5),



recentCourses:
courses.slice(0,5)



});







}



catch(error){


console.log(
"ADMIN STATS ERROR",
error
);



return NextResponse.json(
{
error:"Failed"
},
{
status:500}
);



}


}