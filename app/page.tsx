import AddContactFormDialog from "@/components/add-contact-form-dialog";
import { promises as fs } from "fs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contact } from "./api/contacts/route";
import { Button } from "@/components/ui/button";
import EditContactFormDialog from "@/components/edit-contact-form-dialog";
import DeleteContactDialog from "@/components/delete-contact-dialog";

export const filepath = "./lib/contacts.json";

export default async function Home() {
  const contacts: Contact[] = JSON.parse(await fs.readFile(filepath, "utf8"));

  return (
    <main className="flex min-h-screen flex-col gap-8 items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
        <h1>Contact Management System</h1>

        <AddContactFormDialog />
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.address}</TableCell>
                <TableCell className="space-x-2">
                  <EditContactFormDialog contact={contact} />
                  <DeleteContactDialog contact={contact} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
