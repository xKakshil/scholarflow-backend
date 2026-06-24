import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";




export async function GET(req:Request){


const user:any =
getUserFromToken(req);



if(
!user ||
user.role!=="ADMIN"
){

return NextResponse.json(
{error:"Unauthorized"},
{status:401}
);

}




const enrollments =
await prisma.enrollment.findMany({

include:{


user:{

select:{

name:true,

email:true

}

},



course:{

select:{

title:true,

price:true

}

}


},


orderBy:{

createdAt:"desc"

}


});




return NextResponse.json(
enrollments
);


}