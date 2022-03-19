import "reflect-metadata";
import { Ctx, Arg, Resolver, Mutation } from "type-graphql";
import { hash, verify } from "argon2";

import { Context } from "../context";
import { signToken } from "../../lib/jwt";

import { LoginInput } from "../inputs/login.input";
import { RegisterInput } from "../inputs/register.input";

import { User } from "../object-types/user.object-type";
import { AuthPayload } from "../object-types/auth-payload.object-type";

@Resolver(User)
export class AuthResolver {
  @Mutation(() => AuthPayload)
  async login(@Arg("data") input: LoginInput, @Ctx() ctx: Context) {
    const { email, password } = input;

    const user = await ctx.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`User not found.`);
    }

    const passwordVerified = await verify(user.password, password);

    if (!passwordVerified) {
      throw new Error(`Invalid password.`);
    }

    const token = signToken({
      userId: user.id,
    });

    return {
      token,
    };
  }

  @Mutation(() => User)
  async register(@Arg("data") input: RegisterInput, @Ctx() ctx: Context) {
    const { email, password } = input;

    if (
      await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      })
    ) {
      throw new Error(`User already registered.`);
    }

    const user = await ctx.prisma.user.create({
      data: {
        email,
        password: await hash(password),
      },
    });

    return user;
  }
}
