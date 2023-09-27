import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export const filepath = "./lib/contacts.json";

// Create a type for the contact object with fields like id, name, email, phone, and address
export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

// GET /api/contacts

export async function GET(req: NextRequest) {
  const contacts = JSON.parse(await fs.readFile(filepath, "utf8"));
  return NextResponse.json(contacts);
}

// POST /api/contacts

export async function POST(req: NextRequest) {
  const contacts = JSON.parse(await fs.readFile(filepath, "utf8"));
  const contact = await req.json();

  contacts.push(contact);

  await fs.writeFile(filepath, JSON.stringify(contacts));

  return NextResponse.json({ message: "Contact added successfully" });
}

// PUT /api/contacts

export async function PUT(req: NextRequest) {
  const contacts = JSON.parse(await fs.readFile(filepath, "utf8"));
  const contact = await req.json();

  const index = contacts.findIndex((c: Contact) => c.id === contact.id);
  contacts[index] = contact;

  await fs.writeFile(filepath, JSON.stringify(contacts));

  return NextResponse.json({ message: "Contact updated successfully" });
}

// DELETE /api/contacts

export async function DELETE(req: NextRequest) {
  const contacts = JSON.parse(await fs.readFile(filepath, "utf8"));
  const contact = await req.json();

  const index = contacts.findIndex((c: Contact) => c.id === contact.id);
  contacts.splice(index, 1);

  await fs.writeFile(filepath, JSON.stringify(contacts));

  return NextResponse.json({ message: "Contact deleted successfully" });
}
