import "reflect-metadata";
import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
