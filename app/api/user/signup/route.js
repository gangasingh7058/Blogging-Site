// import client from "@/Prisma Client/prisma_client";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client=new PrismaClient();

export async function POST(req){
    const body=await req.json();

    try {
        const response=await client.User.create({
            data:{
                email:body.email,
                password:body.password,
                name:body.username
            },
            select:{
                id:true
            }
        })

        return NextResponse.json({
            success:true,
            msg:"User Created Successfully",
            userid:response.id,
            error:null
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            msg:"Error While Creating user",
            userid:0,
            error:error.message

        })
    }
}

export function GET(){
    return NextResponse.json({
        msg:"----------WELCOME----------"
    })
}