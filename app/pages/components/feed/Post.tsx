import Image from "next/image";
import { FaCommentDots } from "react-icons/fa";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

type FeedPostType = PostType & { user: User } & { _count: { comments: number } };

const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId } = await auth();

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt="Avatar del usuario"
            className="w-12 h-12 rounded-full border border-gray-500 dark:border-gray-600"
          />
          <Link href={`/profile/${post.user.username}`} className="text-blue-500 hover:underline font-medium">
            {post.user.username}
          </Link>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      <p className="text-lg">{post.desc}</p>
      <div className="flex items-center gap-4 text-sm my-4">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border border-gray-400 dark:border-gray-600">
          <FaCommentDots width={16} height={16} />
          <span className="text-gray-700 dark:text-gray-300">
            {post._count.comments} {post._count.comments === 1 ? "Comentario" : "Comentarios"}
            <span className="text-gray-500 text-xs">
                  {new Date(post.createdAt).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
          </span>
        </div>
      </div>
      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
