"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendContactMessage(formData: z.infer<typeof ContactSchema>) {
  const validated = ContactSchema.safeParse(formData);

  if (!validated.success) {
    return { error: "Invalid form data" };
  }

  try {
    await prisma.contactMessage.create({
      data: validated.data,
    });
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}