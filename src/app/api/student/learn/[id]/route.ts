import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";





export async function GET(
req:Request,
context:{params:Promise<{id:string}>}
){


try{


const {id} =
await context.params;





const user:any =
getUserFromToken(req);




if(!user){


return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401}
);


}







const enrollment =
await prisma.enrollment.findFirst({


where:{


userId:user.id,


courseId:id


}


});






if(!enrollment){


return NextResponse.json(
{
error:"Not enrolled"
},
{
status:403}
);


}









const course =
await prisma.course.findUnique({



where:{

id:id

},




include:{



instructor:{


select:{


name:true,


email:true


}


},





lessons:{


orderBy:{


createdAt:"asc"


}


}



}



});








return NextResponse.json(
course
);



}




catch(error){



console.log(
"LEARN ERROR",
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