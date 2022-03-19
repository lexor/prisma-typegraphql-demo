import { db, PrismaClient } from "../prisma";
import { ContextParameters } from "graphql-yoga/dist/types";

export interface Context {
  prisma: PrismaClient;
  request: any;
}

export function createCtx(request: ContextParameters): Context {
  return { request, prisma: db };
}
