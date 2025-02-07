import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Check authentication
    if (email !== "johndoe@gmail.com" || password !== "123456") {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Expire hours
    const MAX_AGE = 60 * 60 * 24 * 30;

    // Jwt secret key
    const secret = process.env.JWT_AUTH_SECRET || "";

    // Create JWT token
    const token = jwt.sign({ email }, secret, {
      expiresIn: MAX_AGE,
    });

    // Create cookie with token
    const serialized = serialize("_authSecret", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    return NextResponse.json(
      { token, message: "Successful Login!" },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialized,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
