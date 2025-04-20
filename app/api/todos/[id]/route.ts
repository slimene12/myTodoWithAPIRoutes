import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

type Params = {
  id: string;
};

// FETCH GET
export async function GET(
  _request: Request,
  props: { params: Promise<Params> }
) {
  try {
    const { id } = await props.params;

    const todos = await prisma.todo.findMany();
    const todoWithId = todos.find((todo: any) => todo.id === id);

    if (!todoWithId) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(todoWithId, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/todo/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH (MODIFIER)
export async function PATCH(
  request: Request,
  props: { params: Promise<Params> }
) {
  try {
    const { id } = await props.params;
    const { title, date } = await request.json();

    const todo = await prisma.todo.update({
      where: { id },
      data: { title, date },
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error('Erreur PATCH /api/todo/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
