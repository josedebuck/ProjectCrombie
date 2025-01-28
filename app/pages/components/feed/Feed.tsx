// Feed.tsx
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
  username?: string; // Asegúrate de que 'username' sea opcional
};

const Feed = async ({ username }: FeedProps) => {
  const { userId } = await auth();

  let posts: Post[] = [];

  // Si el usuario está logueado, mostrar los posts de todos los usuarios
  if (userId) {
    posts = await prisma.post.findMany({
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
