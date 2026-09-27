import { Contact } from "@/components/contact";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const data = await prisma.contactHero.findFirst();
  return <Contact hero={data} />;
}
