import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const codedToken = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(codedToken, process.env.TOKEN_SECRET);

    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
