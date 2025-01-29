import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";
import Link from "next/link";

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

const Feed = async ({ username }: FeedProps) => {
  const { userId } = await auth();

  let posts: Post[] = [];

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
        posts.map((post) => (
          <div key={post.id}>
            <div className="flex items-center gap-2">
              <Link href={`/profile/${post.user.username}`}>
                <span className="font-medium text-blue-500 hover:underline">
                  {post.user.name && post.user.surname
                    ? post.user.name + " " + post.user.surname
                    : post.user.username}
                </span>
              </Link>
            </div>
            <Post key={post.id} post={post} />
          </div>
        ))
      ) : (
        "No se encontraron posteos."
      )}
    </div>
  );
};

export default Feed;
