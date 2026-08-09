import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken.js";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model.js";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({ message: "User info fetched", data: user });
    {
      /* data that is beign sent as response has the following structure
      response
      ├── data
      │   ├── message
      │   └── data
      │       ├── _id
      │       ├── username
      │       └── email
      ├── status
      ├── headers
      └── ...
      */
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
