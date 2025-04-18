import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const { title, date } = body;

    // Enregistrement en BDD
    // INSERT INTO todo (title, date) VALUES ('test', '2024:02:06')
    const post = await prisma.todo.create({
        data: {
            title, 
            date
        }
    })

    return NextResponse.json(post, { status: 201 })
}