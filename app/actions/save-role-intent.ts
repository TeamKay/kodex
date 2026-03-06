"use server";

import prisma from "@/lib/prisma";

export async function saveRoleIntent(email: string, role: string) {
  await prisma.roleIntent.upsert({
    where: { email },
    update: { role },
    create: { email, role },
  });
}