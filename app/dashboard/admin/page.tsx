import { ChartAreaInteractive } from "@/app/_components/sidebar/dashboard-barchart-admin";
import { adminGetEnrollmentStats } from "../../actions/admin-get-enrolment-stats";
import { AdminDashboardSectionCards } from "@/app/_components/sidebar/dashboard-sectioncards-admin";



export default async function AdminDashboardPage(){
  const enrollmentData = await adminGetEnrollmentStats();
  return (
    <div className=" max-w-6xl mx-auto items-center justify-center">
       <>
       <AdminDashboardSectionCards />
            
        <ChartAreaInteractive data={enrollmentData}/>
       </> 
    </div>
  )
}
