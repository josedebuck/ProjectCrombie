import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export async function GET() {
  const post = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return new Response(JSON.stringify(post), { status: 200 });
}

export async function POST(req: Request) {
  const { content, title, author, slug } = await req.json();

  const newPost = await prisma.post.create({
    data: {
      content,
      title,
      slug, 
      author,
    },
  });

  return new Response(JSON.stringify(newPost), { status: 201 });
}
