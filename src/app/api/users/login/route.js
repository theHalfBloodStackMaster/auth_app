import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

// request is type of NextRequest
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("reqBody from login route = ", reqBody);

    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 },
      );
    }

    // check password
    const validPAssword = await bcrypt.compare(password, user.password);
    if (!validPAssword) {
      return NextResponse.json({ message: "Wrong passowrd" }, { status: 400 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    // return webtoken in cookies
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
