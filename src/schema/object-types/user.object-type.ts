import "reflect-metadata";
import { ID, ObjectType, Field } from "type-graphql";
import { IsEmail } from "class-validator";

import { Post } from "./post.object-type";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => [Post], {
    nullable: true,
  })
  posts?: [Post] | null;
}
