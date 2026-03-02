import { NextResponse } from "next/server";
import { CodeRunner } from "@/app/DEV-labs/compiler/utils/codeRunner";

export async function POST(req: Request) {
  const { url } = await req.json();

  const response = await CodeRunner.processUrl({
    url,
    api_key: process.env.API_KEY as string,
    api_model: process.env.API_MODEL as string,
  });

  const data = await response.json();   
  return NextResponse.json(data); 
}