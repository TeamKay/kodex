"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UserRole } from "@/lib/generated/prisma/client";


export async function verifyAndAssignRole(email: string, otp: string) {

  // 1. Verify the Email OTP
  await auth.api.verifyEmailOTP({ body: { email, otp } });

  // 2. Assign the role from your RoleIntent table
  const roleIntent = await prisma.roleIntent.findUnique({ where: { email }});

  if (roleIntent) {
    await prisma.user.update({
      where: { email },
      data: { role: roleIntent.role as UserRole },
    });
    await prisma.roleIntent.delete({ where: { email }});
  }

  return { success: true };
}
