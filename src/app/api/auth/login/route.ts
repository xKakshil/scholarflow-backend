import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/validations/auth";
import { createToken } from "@/lib/auth";


export async function POST(req:Request){

    try{

        const body = await req.json();


        const data =
            loginSchema.parse(body);



        const user =
            await prisma.user.findUnique({

                where:{
                    email:data.email
                }

            });



        if(!user){

            return NextResponse.json(
                {
                    error:"Invalid credentials"
                },
                {
                    status:401
                }
            );

        }



        const valid =
            await bcrypt.compare(
                data.password,
                user.password
            );



        if(!valid){

            return NextResponse.json(
                {
                    error:"Invalid credentials"
                },
                {
                    status:401
                }
            );

        }



        const token =
            createToken({

                id:user.id,

                email:user.email,

                role:user.role

            });



        return NextResponse.json({

            token,

            user:{
                id:user.id,
                email:user.email,
                role:user.role
            }

        });



    }

    catch(error){

    console.log("LOGIN ERROR:", error);

    return NextResponse.json(
        {
            error:"Login failed"
        },
        {
            status:500
        }
    );

}

}