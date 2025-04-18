import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;

  await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ message: 'Tâche supprimée' }, { status: 200 });
}
