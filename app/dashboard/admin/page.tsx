import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";

import { adminGetEnrollmentStats } from "../../actions/admin-get-enrolment-stats";
import { AdminDashboardSectionCards } from "@/components/sidebar/admin-dashboard-sectioncard";


export default async function AdminDashboardPage(){
  const enrollmentData = await adminGetEnrollmentStats();
  return (
    <div>
       <>
       <AdminDashboardSectionCards />
            
                <ChartAreaInteractive data={enrollmentData}/>

                {/* <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Courses</h2>
                    <Link className={buttonVariants({variant: 'outline'})} href="/dashboard/admin/courses">View All Courses
                    
                    </Link>
                  </div>

                  <Suspense fallback={<RenderRecentCoursesSkeletonLayout />}>
                    <RenderRecentCourses />
                  </Suspense> 
                </div> */}
       </> 
    </div>
  )
}



// async function RenderRecentCourses(){
//   const data = await adminGetRecentCourses();

//   if( data.length === 0){
//     return (
//       <EmptyState 
//          buttonText="Create New Course"  
//          description="You dont have any courses. Create some and see them here."
//          title="You dont have any courses yet!"
//          href="/dashboard/admin/courses/create"/>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       {data.map((course) => (
//         <AdminCourseCard key={course.id} data={course}/>
//       ))}
//     </div>
//   );
// }


// function RenderRecentCoursesSkeletonLayout(){
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       {Array.from({ length: 2}).map((_,index) => (
//         <AdminCourseCardSkeleton key={index} />
//       ))}
//     </div>
//   )
// }