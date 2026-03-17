import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/app/_components/ui/button";
import { EmptyState } from "@/app/_components/general/EmptyState";
import { educatorGetCourses } from "@/app/actions/educator-get-courses";
import { EducatorCourseRow, EducatorCourseRowSkeleton } from "../../../_components/EducatorCourseRow";

export default function CoursesPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-0">
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold text-foreground">List of Courses</h1>
                <Link href="/dashboard/educator/courses/create" className={buttonVariants()}>
                    Create New Course
                </Link>
            </div>

            <div className="rounded-md border bg-card overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Course</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enrolled</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <Suspense fallback={<EducatorCourseRowSkeletonLayout />}>
                        <RenderCourses />
                    </Suspense>
                </table>
            </div>
        </div>
    );
}


async function RenderCourses() {
    const data = await educatorGetCourses();

    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={4} className="py-10">
                        <EmptyState
                            title="No courses found"
                            description="Create a new course to get started"
                            buttonText="Create Course"
                            href="/dashboard/educator/courses/create"
                        />
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="divide-y divide-border">
            {data.map((course) => (
                <EducatorCourseRow key={course.id} data={course} />
            ))}
        </tbody>
    );
}

function EducatorCourseRowSkeletonLayout() {
    return (
        <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
                <EducatorCourseRowSkeleton key={index} />
            ))}
        </tbody>
    );
}


// import Link from "next/link";
// import { Suspense } from "react";
// import { buttonVariants } from "@/app/_components/ui/button";
// import { EmptyState } from "@/app/_components/general/EmptyState";
// import { educatorGetCourses } from "@/app/actions/educator-get-courses";
// import { EducatorCourseRow, EducatorCourseRowSkeleton } from "./_components/EducatorCourseRow";

// export default function CoursesPage(){
//     return(
//         <>
//         <div className="flex items-center justify-between max-w-6xl mx-auto pb-5">
//         <h1 className="text-2xl font-bold">List of Courses</h1>
//         <Link href="/dashboard/educator/courses/create" className={buttonVariants()}>
//             Create New Course
//         </Link>
//         </div>
        
//         <Suspense fallback={<EducatorCourseRowSkeletonLayout />}>
//             <RenderCourses />
//         </Suspense>
//         </>
//     ); 
// }


// async function RenderCourses(){
//     const data = await educatorGetCourses();

//     return (
//         <>
//         {data.length === 0 ? (
//             <EmptyState 
//             title="No courses found" 
//             description="Create a new course to get started"
//             buttonText="Create Course"
//             href="/dashboard/educator/courses/create"/>
//         ):(
//             <div className="grid grid-cols-1 max-w-6xl mx-auto sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
//             {data.map((course) => (
//                 <EducatorCourseRow key={course.id} data={course} />
//             ))}

//         </div>
//         )}
//         </>
//     )
// }

// function EducatorCourseRowSkeletonLayout(){
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
//             {Array.from({length: 4}).map((_, index) => (
//                 <EducatorCourseRowSkeleton key={index}/>
//             ))}
//         </div>
//     )
// }