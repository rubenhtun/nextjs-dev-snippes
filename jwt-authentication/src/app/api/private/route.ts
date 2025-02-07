import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // get cookieStore
  const cookieStore = await cookies();
  // get token
  const token = cookieStore.get("_authSecret");

  if (!token)
    return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

  // get value
  const { value } = token;

  // export auth secret
  const secret = process.env.JWT_AUTH_SECRET || "";

  // use try catch to varify token value and secret key
  try {
    verify(value, secret);
    return NextResponse.json({ message: "valid" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "invalid" }, { status: 403 });
  }
}
