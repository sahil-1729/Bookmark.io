import { sendData } from "@/server-actions/addBookmark";
import { NextRequest, NextResponse } from "next/server";
import urlMetadata from "url-metadata";

export async function POST(request: Request) {
  // console.log(request);

  const res = await request.json();
  console.log(res);

  sendData({ formData: res });
  return Response.json({ message: "hello" });
}

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const name = formData.get("name");
//   const email = formData.get("email");
//   return Response.json({ name, email });
// }
