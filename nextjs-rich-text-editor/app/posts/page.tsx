import { prisma } from "@/libs/prisma";

export default async function Posts() {
  const posts = await prisma.post.findMany();
  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}
