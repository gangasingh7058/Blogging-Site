import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client=new PrismaClient();


export async function GET(req){
    const userid=await req.headers.get("userid");

    try {
        const response=await client.post.findMany({
            where:{
                userid:userid
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                date:true,
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return NextResponse.json({
            success:true,
            msg:"Found Posts",
            posts:response,
            error:null
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            msg:"Error Finding Posts",
            posts:null,
            error:error
        })
    }
}



export function POST(){
    return NextResponse.json({
        msg:"----------WELCOME TO GET BLOG----------"
    })
}

