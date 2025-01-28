import Image from "next/image";
import { FaCommentDots } from "react-icons/fa";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";

type FeedPostType = PostType & { user: User } & { _count: { comments: number } };

const Post = async ({ post }: { post: FeedPostType }) => {

  const { userId } = await auth()
  return (
    <div className="flex flex-col gap-4">
      {/* Usuario */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      {/* Descripción */}
      <div className="flex flex-col gap-4">
        <p>{post.desc}</p>
      </div>
      {/* Cantidad de comentarios */}
      <div className="flex items-center gap-4 text-sm my-4">
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
          <FaCommentDots width={16} height={16} />
          <span className="text-gray-500">
            {post._count.comments} {post._count.comments === 1 ? "Comentario" : "Comentarios"}
          </span>
        </div>
      </div>
      <Comments postId={post.id} />
    </div>
  );
};

export default Post;