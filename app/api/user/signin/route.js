// import client from "@/Prisma Client/prisma_client";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client=new PrismaClient();

export async function POST(req){
    console.log();
    
    const body=await req.json();

    try {
        const response=await client.user.findUnique({
            where:{
                email:body.email,
                password:body.password
            },
            select:{
                id:true,
                email:true
            }
        })

        return NextResponse.json({
            success:true,
            msg:"User Found",
            userid:response.id,
            useremail:response.email,
            error:null
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            msg:"Error While Finding user",
            userid:0,
            useremail:null,
            error:error.message

        })
    }
}

export function GET(){
    return NextResponse.json({
        msg:"----------WELCOME----------"
    })
}