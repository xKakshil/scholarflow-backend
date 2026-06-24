import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";



export async function GET(req:Request){


const user:any =
getUserFromToken(req);



if(
!user ||
user.role!=="INSTRUCTOR"
){

return NextResponse.json(
{error:"Unauthorized"},
{status:401}
);

}





const courses =
await prisma.course.findMany({

where:{

instructorId:user.id

},


include:{


enrollments:{


include:{

user:{

select:{

name:true,

email:true

}

}

}


}


}

});




return NextResponse.json(
courses
);


}