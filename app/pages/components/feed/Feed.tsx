import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

type User = {
  id: string;
  username: string;
  avatar: string | null;
  cover: string | null;
  name: string | null;
  surname: string | null;
  description: string | null;
  work: string | null;
  createdAt: Date;
};

type Comment = {
  id: number;
  desc: string;
  createdAt: Date;
  postId: number;
  userId: string;
};

type Post = {
  id: number;
  desc: string;
  img: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  comments: Comment[];
  _count: {
    comments: number;
  };
};

type FeedProps = {
  username?: string; // Hacerlo opcional
};

const Feed = async ({ username }: FeedProps) => {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-4 bg-white shadow-md rounded-lg">Inicia sesión para ver el contenido.</div>;
  }

  // Consulta completa con todos los campos requeridos
  const posts: Post[] = await prisma.post.findMany({
    where: {
      user: username ? { username } : undefined, // Filtramos por username si está presente
      userId: userId, // También filtramos por el userId si el usuario está logueado
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
          cover: true,
          name: true,
          surname: true,
          description: true,
          work: true,
          createdAt: true,
        },
      },
      comments: {
        select: {
          id: true,
          desc: true,
          createdAt: true,
          postId: true,
          userId: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        "No se encontraron posteos."
      )}
    </div>
  );
};

export default Feed;
