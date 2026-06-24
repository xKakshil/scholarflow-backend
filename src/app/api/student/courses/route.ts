import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUserFromToken } from "@/lib/getUser";





export async function GET(req:Request){


try{


const user:any =
getUserFromToken(req);





const courses =
await prisma.course.findMany({


include:{


instructor:{


select:{

name:true,

email:true

}

},




lessons:true,




enrollments:{

where:{

userId:user?.id || ""

}

},




_count:{

select:{

enrollments:true

}

}



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
"STUDENT COURSE ERROR",
error
);



return NextResponse.json(
[],
{status:200}
);


}


}