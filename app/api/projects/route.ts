import { NextResponse } from "next/server"
import { sql } from "@/lib/db"


export const runtime = "edge"


// GET semua todos
export async function GET() {
  try {
    const rows = await sql`SELECT * FROM todos ORDER BY created_at DESC`
    return NextResponse.json(rows)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


// POST tambah todo baru
export async function POST(req: Request) {
  try {
    const { title, description, due_date, priority } = await req.json()
    const rows = await sql`
      INSERT INTO todos (title, description, due_date, priority)
      VALUES (${title}, ${description}, ${due_date}, ${priority})
      RETURNING *
    `
    return NextResponse.json(rows[0], { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


// PUT update todo
export async function PUT(req: Request) {
  try {
    const { id, title, description, is_completed, due_date, priority } = await req.json()
    const rows = await sql`
      UPDATE todos
      SET title = ${title},
          description = ${description},
          is_completed = ${is_completed},
          due_date = ${due_date},
          priority = ${priority},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


// DELETE hapus todo
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    await sql`DELETE FROM todos WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


