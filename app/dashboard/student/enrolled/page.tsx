import { getEnrolledCourses } from "@/app/actions/get-enrolled-courses";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { EmptyState } from "@/app/_components/general/EmptyState";



export default async function EnrolledCoursesPage(){
  const [enrolledCourses] = await Promise.all([getEnrolledCourses()]);
  return (
    <>
    <div className="flex flex-col gap-2">
         <h1 className="text-xl text-muted-foreground font-bold">Enrolled courses</h1>
    </div>
    
    {enrolledCourses.length === 0 ? (
      <EmptyState 
         title="No courses purchased" 
         description="You have not purchased any course yet" 
         buttonText="Browse Courses" 
         href="/dashboard/student/available"/>
    ):(
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> 
        {enrolledCourses.map((course) => (
       <CourseProgressCard key={course.Course.id} data={course}/>
        ))}
      </div>
    )}
   
    </>
  )
}