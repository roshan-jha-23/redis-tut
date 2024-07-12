import { redis } from "@/lib/redis";
import Link from "next/link";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const commentIds = await redis.lrange("comments", 0, 4);
  const comments = await Promise.all(
    commentIds.map(async (commentId) => {
      const comment: any = await redis.hgetall(`comment_details:${commentId}`);
      const tags: any = await redis.smembers(`tags:${commentId}`);

      return {
        commentId,
        comment,
        tags,
      };
    })
  );

  return (
    <div>
      <Link href="/">Homepage</Link>
      {comments.map((comment) => (
        <div key={comment.commentId} className="flex flex-col gap-2">
          <h1>{comment.comment.text}</h1>
          <h1>{comment.comment.author}</h1>
          <h1>{new Date(comment.comment.timeStamp).toLocaleString()}</h1>
          <h1>{comment.tags.join(", ")}</h1>
        </div>
      ))}
    </div>
  );
};

export default Page;
