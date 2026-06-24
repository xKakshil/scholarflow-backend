import { verifyToken } from "./auth";

export function getUserFromToken(req: Request) {

    const authHeader =
        req.headers.get("authorization");


    if(!authHeader){
        return null;
    }


    const token =
        authHeader.split(" ")[1];


    if(!token){
        return null;
    }


    try{

        const user =
            verifyToken(token);

        return user;

    }
    catch(error){

        return null;

    }
}