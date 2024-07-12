import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { text, tags } = body;
    const commentId = nanoid();

    //add comment to list

    await redis.rpush("comments", commentId);

    const comment = {
      text,
      tags,
      timeStamp: new Date(),
      author: req.cookies.get("userId")?.value,
    };
    await redis.sadd(`tags:${commentId}`, tags);
   await redis.json.set(`comment:${commentId}`,'$',comment)
    //retrive and store comment details

   

   await redis.hset(`comment_details:${commentId}`,comment)
   // alll three of them are wworking independently7nhence we can exute allo fhtmre independently
    return new Response("ok");
  } catch (error) {
    console.log(error);
  }
};
