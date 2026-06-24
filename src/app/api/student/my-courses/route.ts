import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";



export async function GET(req:Request){


const user:any =
getUserFromToken(req);



if(!user){

return NextResponse.json(
{error:"Unauthorized"},
{status:401}
);

}



const courses =
await prisma.enrollment.findMany({

where:{

userId:user.id

},


include:{

course:{

include:{

instructor:{

select:{

email:true,
name:true

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