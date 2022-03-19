import "reflect-metadata";
import { ID, ObjectType, Field } from "type-graphql";

import { User } from "./user.object-type";

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  content: string | null;

  @Field(() => Boolean, {
    nullable: true,
  })
  published: boolean | null;

  @Field(() => User)
  author: User;
}
