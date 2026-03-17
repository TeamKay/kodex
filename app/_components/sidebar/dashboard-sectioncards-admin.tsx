import { IconBook2, IconBookmark, IconCategoryPlus, IconLockHeart, IconUsers } from "@tabler/icons-react"
import { adminGetDashboardStats } from "@/app/actions/admin-get-dashboard-stats"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

export async function AdminDashboardSectionCards() {
  const { totalSignups, totalCustomers, totalCourses, totalLessons } = await adminGetDashboardStats()
  
  return (
    /* Changed grid-cols-1 to grid-cols-2 for tablets, and forced lg:grid-cols-5 for the row effect */
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs">
      
      {/* Total Students */}
      <Card className="@container/card bg-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Students</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[200px]/card:text-3xl">
              {totalSignups}
            </CardTitle>
          </div>
          <IconUsers className="size-10 text-muted-foreground rounded-lg border border-emerald-800 p-2 mr-2 shrink-0" />
        </CardHeader>
      </Card>

      {/* Total Enrollments */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Enrollments</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[200px]/card:text-3xl">
              {totalCustomers}
            </CardTitle>
          </div>
          <IconBook2 className="size-10 text-muted-foreground rounded-lg border border-emerald-800 p-2 mr-2 shrink-0" />
        </CardHeader>
      </Card>

      {/* Total Educators */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Educators</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[200px]/card:text-3xl">
             {totalCustomers}
            </CardTitle>
          </div>
          <IconBookmark className="size-10 text-muted-foreground rounded-lg border border-emerald-800 p-2 mr-2 shrink-0" />
        </CardHeader>
      </Card>
       
      {/* Total Courses */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Courses</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[200px]/card:text-3xl">
              {totalCourses}
            </CardTitle>
          </div>
          <IconCategoryPlus className="size-10 text-muted-foreground rounded-lg border border-emerald-800 p-2 mr-2 shrink-0" />
        </CardHeader>
      </Card>

      {/* Total Lessons */}
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardDescription>Lessons</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[200px]/card:text-3xl">
              {totalLessons}
            </CardTitle>
          </div>
          <IconLockHeart className="size-10 text-muted-foreground rounded-lg border border-emerald-800 p-2 mr-2 shrink-0" />
        </CardHeader>
      </Card>
    </div>
  )
}
