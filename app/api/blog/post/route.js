import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client=new PrismaClient();

export async function POST(req){
    console.log("Reached Backend");
    
    const body=await req.json();

    try {
        const response=await client.post.create({
            data:{
                title:body.title,
                content:body.content,
                userid:body.userid
            }
        })

        return NextResponse.json({
            success:true,
            msg:"Blog Created Successfully",
            error:null
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            msg:"Blog Not Created",
            error:error.message
        })
    }
}

export function GET(){
    return NextResponse.json({
        msg:"----------WELCOME TO BLOG----------"
    })
}