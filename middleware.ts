import { NextRequest, NextResponse } from "next/server";


const allowedOrigins = [

"http://localhost:3001",

"https://scholarflow-frontend-phi.vercel.app",

"https://scholarflow-frontend-git-main-xkakshils-projects.vercel.app"

];



export function middleware(req: NextRequest) {


const origin =
req.headers.get("origin");



const response =
NextResponse.next();



if(
origin &&
allowedOrigins.includes(origin)
){

response.headers.set(
"Access-Control-Allow-Origin",
origin
);

}



response.headers.set(
"Access-Control-Allow-Methods",
"GET, POST, PUT, DELETE, OPTIONS"
);



response.headers.set(
"Access-Control-Allow-Headers",
"Content-Type, Authorization"
);



response.headers.set(
"Access-Control-Allow-Credentials",
"true"
);



if(req.method==="OPTIONS"){


return new Response(null,{

status:204,

headers:response.headers

});


}




return response;


}




export const config = {

matcher:"/api/:path*"

};
