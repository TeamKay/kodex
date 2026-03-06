
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getUserWithRole() {
  const session = await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user?.id) return null;

  return await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
}