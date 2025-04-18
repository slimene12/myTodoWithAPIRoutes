import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient(); 

type Params = {
    id: string
}


// FETCH GET
export async function GET(_request: Request, props: {params: Promise<Params>}) {
    const params = await props.params;
    const { id } = params;

    // SQL
    // SELECT * FROM todo WHERE id = 43432
    // const todo = await prisma.todo.findUnique({
    //     where: {
    //         id: id
    //     }
    // })

    const todos = await prisma.todo.findMany();
    const todoWithId = todos.find((todo: any) => todo.id === id);

    return NextResponse.json(todoWithId, { status: 200 });
}

// MODIFIER : PATCH
export async function PATCH(request: Request, props: {params: Promise<Params>}) {
    const params = await props.params;
    const { id } = params;
    const {title, date } = await request.json();
    // UPDATE todo SET title = 'acheter des bananes', date = '2024-03-25 WHERE id = 3
    const todo = await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title: title,
            date: date
        }
    })

    return NextResponse.json(todo, { status: 200});
}