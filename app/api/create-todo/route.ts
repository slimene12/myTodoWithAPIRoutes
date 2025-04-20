import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date } = body;

    // Vérification basique des champs requis
    if (!title || !date) {
      return NextResponse.json(
        { error: 'Le titre et la date sont requis.' },
        { status: 400 }
      );
    }

    // Création dans la base de données
    const post = await prisma.todo.create({
      data: {
        title,
        date,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Erreur POST /api/todo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la tâche.' },
      { status: 500 }
    );
  }
}
