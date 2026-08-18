import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "admin_session";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set — add it to apps/web/.env.local");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(username: string) {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}
