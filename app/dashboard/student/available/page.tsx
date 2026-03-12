import { PublicCourseCard } from "@/app/(public)/_components/PublicCourseCard";
import { getAllCourses } from "@/app/actions/get-all-courses";
import { getEnrolledCourses } from "@/app/actions/get-enrolled-courses";
import { EmptyState } from "@/components/general/EmptyState";


export default async function AvailableCoursesPage(){
  const [courses, enrolledCourses] = await Promise.all([getAllCourses(), getEnrolledCourses()]);
  return (
    <>
   
     <div className="flex flex-col gap-2">
      <h1 className="text-xl text-muted-foreground font-bold">Available Courses you can purchase</h1>
    </div>

    {courses.filter(
      (course) => !enrolledCourses.some(
        ({Course: enrolled}) => enrolled.id === course.id
      )
    ).length === 0 ? (
      <EmptyState 
         title="No courses available" 
         description="You have already puchased all available courses"
         buttonText="Course creating in progress"
         href="" />
    ):(
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {courses.filter(
      (course) => !enrolledCourses.some(
        ({Course: enrolled}) => enrolled.id === course.id
      )
    ).map((course) => (
      <PublicCourseCard key={course.id} data={course} />
    ))}
      </div>
    )}

    </>
  )
}