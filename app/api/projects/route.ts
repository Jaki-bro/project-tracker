import { NextResponse } from "next/server";
import { neon } from "@/lib/db";

export const runtime = "edge";

// GET semua projects
export async function GET() {
  try {
    const rows = await neon`SELECT * FROM projects ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST tambah project baru
export async function POST(req: Request) {
  try {
    const { name, description, status, deadline } = await req.json();
    const rows = await neon`
      INSERT INTO projects (name, description, status, deadline)
      VALUES (${name}, ${description}, ${status}, ${deadline})
      RETURNING *
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
