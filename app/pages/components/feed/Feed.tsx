import { auth } from "@clerk/nextjs/server";
import { type Post as PostType, type FeedProps } from "./types";
import Post from "./Post";
import prisma from "@/lib/client";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

async function getPosts(username?: string, userId?: string | null): Promise<PostType[]> {
  if (!userId) return [];
  
  try {
    return await prisma.post.findMany({
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
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function PostsList({ posts }: { posts: PostType[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No se encontraron posteos.
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

function LoadingFeed() {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
    </div>
  );
}

export default async function Feed({ username }: FeedProps) {
  const { userId } = await auth();
  const posts = await getPosts(username, userId);

  return (
    <div className="p-4 bg-white dark:bg-slate-800 shadow-md rounded-lg flex flex-col gap-12 text-black dark:text-white">
      <Suspense fallback={<LoadingFeed />}>
        <PostsList posts={posts} />
      </Suspense>
    </div>
  );
}