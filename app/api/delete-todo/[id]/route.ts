import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Tâche supprimée' }, { status: 200 });
  } catch (error) {
    console.error('Erreur DELETE /api/todo/[id]:', error);

    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression' },
      { status: 500 }
    );
  }
}
