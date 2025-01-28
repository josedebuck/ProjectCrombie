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

type Post = {
  id: number;
  desc: string;
  img: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  _count: {
    comments: number;
  };
};

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();

  let posts: Post[] = [];

  // If username is provided, get posts for that user
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
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // If no username but user is authenticated
  if (!username && userId) {
    posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
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
        "No posts found!"
      )}
    </div>
  );
};

export default Feed;