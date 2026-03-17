import { Suspense } from "react";
import { EmptyState } from "@/app/_components/general/EmptyState";
import { EducatorCourseRow, EducatorCourseRowSkeleton } from "../../../_components/EducatorCourseRow";
import { adminGetAllCourses } from "@/app/actions/admin-get-all-courses";
import { SearchAllCoursesTable } from "@/app/_components/SearchAllCoursesTable";

export default async function AdminAllCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query = "" } = await searchParams;

  return (
    <div className="max-w-6xl mx-auto px-0 py-0 space-y-4">
      <div className="flex items-center justify-between">
        <SearchAllCoursesTable defaultValue={query} />
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Course</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Educator</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enrolled</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <Suspense key={query} fallback={<EducatorCourseRowSkeletonLayout />}>
            <RenderCourses query={query} />
          </Suspense>
        </table>
      </div>
    </div>
  );
}

async function RenderCourses({ query }: { query: string }) {
  // 1. Get the data (which now includes educatorName and mapped _count)
  const data = await adminGetAllCourses(query);

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          {/* Ensure colSpan matches your total number of headers (6) */}
          <td colSpan={6} className="py-10">
            <EmptyState
              title={query ? "No matches found" : "No courses found"}
              description={query ? `We couldn't find any courses matching "${query}"` : "Create a new course to get started"}
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
        <EducatorCourseRow 
          key={course.id} 
          // 2. We can now pass 'course' directly because the Action 
          // already formatted the object exactly how we need it!
          data={course} 
        />
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


// import { Suspense } from "react";
// import { EmptyState } from "@/app/_components/general/EmptyState";
// import { EducatorCourseRow, EducatorCourseRowSkeleton } from "../../../_components/EducatorCourseRow";
// import { adminGetAllCourses } from "@/app/actions/admin-get-all-courses";
// import { SearchAllCoursesTable } from "@/app/_components/SearchAllCoursesTable";



// // We add 'searchParams' to the page props
// export default async function AdminAllCoursesPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ q?: string }>;
// }) {
//   const { q: query = "" } = await searchParams;

//   return (
//     <div className="max-w-6xl mx-auto px-0 py-0 space-y-4">
//       <div className="flex items-center justify-between">
//         {/* Replace the old <form> with the Client Component */}
//         <SearchAllCoursesTable defaultValue={query} />
//       </div>

//       <div className="rounded-md border bg-card overflow-hidden">
//         <table className="min-w-full divide-y divide-border">
//           <thead className="bg-muted/50">
//             <tr>
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Course</th>
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</th>
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enrolled</th>
//               <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
//             </tr>
//           </thead>
//           {/* The 'key' prop is crucial here. When 'query' changes, 
//             Next.js treats this as a new navigation, triggers the 
//             Suspense boundary, and shows your skeleton. 
//           */}
//           <Suspense key={query} fallback={<EducatorCourseRowSkeletonLayout />}>
//             <RenderCourses query={query} />
//           </Suspense>
//         </table>
//       </div>
//     </div>
//   );
// }

// async function RenderCourses({ query }: { query: string }) {
//   // Pass the query to the server action for DB-level filtering
//   const data = await adminGetAllCourses(query);

//   if (data.length === 0) {
//     return (
//       <tbody>
//         <tr>
//           <td colSpan={5} className="py-10">
//             <EmptyState
//               title={query ? "No matches found" : "No courses found"}
//               description={query ? `We couldn't find any courses matching "${query}"` : "Create a new course to get started"}
//               buttonText="Create Course"
//               href="/dashboard/educator/courses/create"
//             />
//           </td>
//         </tr>
//       </tbody>
//     );
//   }

// return (
//     <tbody className="divide-y divide-border">
//       {data.map((course) => (
//         <EducatorCourseRow 
//           key={course.id} 
//           data={{
//             ...course,
//             _count: {
//               // Now matching your component's expected type:
//               enrollment: course._count.enrolledStudents 
//             }
//           }} 
//         />
//       ))}
//     </tbody>
//   );
// }

// function EducatorCourseRowSkeletonLayout() {
//   return (
//     <tbody>
//       {Array.from({ length: 4 }).map((_, index) => (
//         <EducatorCourseRowSkeleton key={index} />
//       ))}
//     </tbody>
//   );
// }
