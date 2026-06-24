import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";



export async function GET(req: Request) {


try {


const user:any =
getUserFromToken(req);



if (!user || user.role !== "INSTRUCTOR") {


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


where:{


instructorId:user.id


},


include:{


lessons:true,


enrollments:{


include:{


user:{


select:{


name:true,


email:true


}


}


}


},


payments:true,


progress:true


}


});







let students = 0;


let revenue = 0;


let totalProgress = 0;


let progressCount = 0;







courses.forEach((course)=>{


students += course.enrollments.length;



course.payments.forEach((payment)=>{


if(payment.status==="SUCCESS"){


revenue += payment.amount;


}


});






course.progress.forEach((p)=>{


totalProgress += p.percentage;


progressCount++;


});


});








return NextResponse.json({



totalCourses:courses.length,


totalStudents:students,


revenue,


avgProgress:
progressCount
?
Math.round(totalProgress/progressCount)
:
0,




courses:
courses.map((c)=>({


id:c.id,


title:c.title,


lessons:c.lessons.length,


students:c.enrollments.length,


learners:
c.enrollments.map(e=>e.user)



}))


});







} catch(error){



console.log(
"ANALYTICS ERROR",
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