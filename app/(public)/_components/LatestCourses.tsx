import prisma from "@/lib/prisma";
import Link from "next/link";
import { PublicCourseCard } from "./PublicCourseCard";

export default async function LatestCourses() {
  const courses = await prisma.course.findMany({
    orderBy: [
      { createdAt: "desc" }
    ],
    take: 4
  });

  return (
    <section className="py-6">
                <div className="max-w-7xl mx-auto px-0">
    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">
                            Latest courses 
                        </h2>
    
                        <Link href="/courses" className=" font-medium hover:underline">
                            Explore all →
                        </Link>
                    </div>
    
                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-cols-fr">
                    {courses.map((course) => (
                        <PublicCourseCard
                        key={course.id}
                        data={course}
                        />
                    ))}
                    </div>
    
                </div>
            </section>
  );
}