import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

import task from "tasuku";

const prisma = new PrismaClient();

(async () => {
  const { result: user } = await task("Create user", async () => {
    return prisma.user.create({
      data: {
        email: "ben@emre.dev",
        password: await hash("secret"),
      },
    });
  });

  await task("Create post", async () => {
    return Promise.all([
      prisma.post.create({
        data: {
          title: "Lorem ipsum dolor sit amet.",
          content: "...",

          authorId: user.id,
        },
      }),
      prisma.post.create({
        data: {
          title: "Lorem ipsum dolor sit amet.",
          content: "...",
          published: true,

          authorId: user.id,
        },
      }),
    ]);
  });
})();
