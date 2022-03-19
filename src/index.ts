import "reflect-metadata";
import * as typegql from "type-graphql";
import { GraphQLServer } from "graphql-yoga";

import { createCtx } from "./schema/context";

import { AuthResolver } from "./schema/resolvers/auth.resolver";
import { PostResolver } from "./schema/resolvers/post.resolver";

const app = async () => {
  const schema = await typegql.buildSchema({
    resolvers: [AuthResolver, PostResolver],
  });

  new GraphQLServer({
    schema,
    context: createCtx,
  }).start(() => console.log(`🚀 Server ready at: http://localhost:4000`));
};

app();
