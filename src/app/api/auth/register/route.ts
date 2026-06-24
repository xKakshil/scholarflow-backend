import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validations/auth";


export async function POST(req: Request) {

  try {

    const body = await req.json();


    const data =
      registerSchema.parse(body);


    const existingUser =
      await prisma.user.findUnique({
        where:{
          email:data.email
        }
      });


    if(existingUser){

      return NextResponse.json(
        {
          error:"User already exists"
        },
        {
          status:400
        }
      );

    }


    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );


    const user =
      await prisma.user.create({

        data:{

          name:data.name,

          email:data.email,

          password:hashedPassword,

          role:data.role ?? "LEARNER"

        }

      });



    return NextResponse.json(
      {
        id:user.id,
        email:user.email,
        role:user.role
      },
      {
        status:201
      }
    );


  }

  catch(error){

    return NextResponse.json(
      {
        error:"Registration failed"
      },
      {
        status:500
      }
    );

  }

}