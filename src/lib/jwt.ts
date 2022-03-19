import { verify, sign } from "jsonwebtoken";

export const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "change-me";

export type TokenPayload = {
  userId: number;
};

export function verifyToken(token: string): boolean {
  const payload = verify(token, SECRET_KEY) as TokenPayload;

  return Boolean(payload.userId);
}

export function signToken(payload: TokenPayload): string {
  return sign(payload, SECRET_KEY);
}
