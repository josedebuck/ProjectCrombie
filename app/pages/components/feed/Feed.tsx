import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";
import Link from "next/link";

// Tipos definidos:
// tipos de TypeScript que definen la estructura de los datos utilizados
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
  username?: string;  
};

// Lógica principal
// Feed: Componente que recibe un objeto FeedProps con la propiedad opcional username
// auth: recupera la informacion del usuario autenticado
const Feed = async ({ username }: FeedProps) => {
  const { userId } = await auth();

// Recupera los posteos de la base de datos con prisma  
  let posts: Post[] = []; // Inicializa la lista de publicaciones vacía

  if (userId) { // solo busca si hay publicaciones con el usuario autenticado
    posts = await prisma.post.findMany({
      where: {
        user: username ? { username } : undefined,
      },
      include: {
        user: true,
        comments: true,
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
  }

  // renderización
  return (
    <div className="p-4 bg-white dark:bg-slate-800 shadow-md rounded-lg flex flex-col gap-12 text-black dark:text-white">
      {posts.length ? (
        posts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        "No se encontraron posteos."
      )}
    </div>
  );
};

export default Feed;
