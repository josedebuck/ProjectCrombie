import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();

  let posts: any[] = [];

  // Si se proporciona un nombre de usuario, obtener los posts de ese usuario
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        _count: {
          select: {
            comments: true, // Contar solo los comentarios
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Si no hay un nombre de usuario pero el usuario está autenticado
  if (!username && userId) {
    posts = await prisma.post.findMany({
      where: {
        userId: userId, // Solo los posts del usuario autenticado
      },
      include: {
        user: true,
        _count: {
          select: {
            comments: true, // Contar solo los comentarios
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        "No posts found!"
      )}
    </div>
  );
};

export default Feed;
