// lib/getCategories.ts

import prisma from "@/lib/prisma";


export async function getCategories() {
  const categories = await prisma.course.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });

  return categories.map((c) => c.category);
}