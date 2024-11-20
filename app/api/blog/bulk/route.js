import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const client=new PrismaClient();


export async function GET(){

    try {
        const response=await client.post.findMany({
            select:{
                id:true,
               title:true,
               content:true,
               published:true,
               date:true,
               user:{
                select:{
                    name:true,
                    id:true
                }
               }
            }
        });
        return NextResponse.json({
            success:true,
            data:response,
            error:null
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            data:null,
            error:error
        })
    }

}