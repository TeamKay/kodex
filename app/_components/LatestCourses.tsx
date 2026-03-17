import prisma from "@/lib/prisma";
import { PublicCourseCard } from "./PublicCourseCard";

export default async function LatestCourses() {
  const courses = await prisma.course.findMany({
    orderBy: [
      { createdAt: "desc" }
    ],
    take: 3
  });

  return (
    <section className="py-6">
        {/* Changed px-0 to responsive padding classes */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-cols-fr">
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
