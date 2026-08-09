import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    // find user based on email
    const user = await User.findOne({ email });

    // check if user exist
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // send a token for validation, this is forgetPasswordToken
    sendEmail({
      email: email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({ message: "Email found", success: true, user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
