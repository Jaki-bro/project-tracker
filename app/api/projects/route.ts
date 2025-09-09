import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "edge";

// GET semua project
export async function GET() {
  try {
    const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST tambah project
export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    const rows = await sql`
      INSERT INTO projects (title, description)
      VALUES (${title}, ${description})
      RETURNING *;
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE hapus project
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await sql`DELETE FROM projects WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
