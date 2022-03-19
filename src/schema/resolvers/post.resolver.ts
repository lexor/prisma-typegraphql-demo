import "reflect-metadata";
import {
  Ctx,
  Root,
  Query,
  Arg,
  Int,
  Mutation,
  Resolver,
  FieldResolver,
} from "type-graphql";

import { Context } from "../context";

import { Post } from "../object-types/post.object-type";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() ctx: Context) {
    return ctx.prisma.post.findMany();
  }

  @FieldResolver()
  async author(@Root() post: Post, @Ctx() ctx: Context) {
    const { id } = post;

    return ctx.prisma.post
      .findFirst({
        where: {
          id,
        },
      })
      .author();
  }

  @Mutation(() => Post)
  async markAsPublished(@Arg("id", () => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.update({
      where: { id },
      data: { published: true },
    });
  }

  @Mutation(() => Post)
  async markAsDraft(@Arg("id", () => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.update({
      where: { id },
      data: { published: false },
    });
  }
}
