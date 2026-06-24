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





const payments =
await prisma.payment.findMany();



const revenue =
payments.reduce(
(sum,p)=>sum+p.amount,
0
);




return NextResponse.json({

revenue,

transactions:
payments.length

});


}