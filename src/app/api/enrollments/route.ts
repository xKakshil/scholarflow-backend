import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/getUser";


export async function POST(req:Request){


    const user:any =
        getUserFromToken(req);


    if(!user){

        return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        );

    }



    const body =
        await req.json();



    const existing =
        await prisma.enrollment.findFirst({

            where:{

                userId:user.id,

                courseId:body.courseId

            }

        });



    if(existing){

        return NextResponse.json(
            {
                error:"Already enrolled"
            },
            {
                status:400
            }
        );

    }



    const enrollment =
        await prisma.enrollment.create({

            data:{

                userId:user.id,

                courseId:body.courseId

            },

            include:{

                course:true

            }

        });



    return NextResponse.json(
        enrollment,
        {status:201}
    );

}



export async function GET(req:Request){


    const user:any =
        getUserFromToken(req);



    if(!user){

        return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        );

    }




    const enrollments =
        await prisma.enrollment.findMany({

            where:{

                userId:user.id

            },


            include:{

                course:true

            }

        });



    return NextResponse.json(
        enrollments
    );

}