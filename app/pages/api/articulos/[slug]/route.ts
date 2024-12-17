import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id);

  await prisma.post.delete({
    where: { id: postId.toString() },
  });

  return new Response(JSON.stringify({ message: "Article Delete" }), {
    status: 200,
  });
}