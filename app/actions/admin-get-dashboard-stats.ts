import "server-only";

import { requireAdmin } from "./require-admin";
import prisma from "@/lib/prisma";

export async function adminGetDashboardStats(){
    await requireAdmin();

    const [totalSignups, totalCustomers, totalCourses, totalLessons] = await Promise.all([
        //total signups
        prisma.user.count(),

        //total customers
        prisma.user.count({
            where: {
                enrollment: {
                    some: {},
                },
            },
        }),

        //total courses
        prisma.course.count(),

        //total lessos
        prisma.lesson.count(),
    ]);

    return {
        totalSignups,
        totalCustomers,
        totalCourses,
        totalLessons,
    }
}