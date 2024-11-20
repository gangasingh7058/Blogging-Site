import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req) {
    // Get 'cid' from the query parameters
    const cid = req.nextUrl.searchParams.get("cid");

    // Validate 'cid' - ensure it's not null and is a valid format (e.g., UUID)
    if (!cid) {
        return NextResponse.json({
            success: false,
            message: "Post ID is required.",
            error: null,
        }, { status: 400 });
    }

    try {
        // Fetch the post from the database
        const response = await client.post.findUnique({
            where: {
                id: cid,
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                date: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        
        
        if (response) {
            return NextResponse.json({
                success: true,
                data: response,
                error: null,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Post not found.",
                data: null,
                error: null,
            }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({
            success: false,
            data: null,
            error: error.message,
        }, { status: 500 });
    } 
}
