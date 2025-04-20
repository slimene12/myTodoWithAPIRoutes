import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/todos:', error);

    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
