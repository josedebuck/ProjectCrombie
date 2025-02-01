import prisma from "@/lib/client";
import CommentList from "./CommentList";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 pt-4">
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
