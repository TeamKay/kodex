import Link from "next/link";
import { Suspense } from "react";
import { Plus, Search, Filter } from "lucide-react"; // Assuming you use lucide-react
import { buttonVariants } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input"; // Replace with your UI input path
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/app/_components/ui/select";
import { educatorGetCourses } from "@/app/actions/educator-get-courses";
import { EducatorCourseRow } from "@/app/_components/EducatorCourseRow";

export default function CoursesPage() {
    return (
        <div className="max-w-6xl mx-auto px-0 py-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Courses</h1>
                    <p className="text-muted-foreground">Manage and track your educational content.</p>
                </div>
                <Link href="/dashboard/educator/courses/create" className={buttonVariants({ variant: "default" })}>
                    <Plus className="mr-2 h-4 w-4" /> Create New Course
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search courses..." 
                        className="pl-10 bg-card"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px] bg-card">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table Section */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/30">
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
        </div>
    );
}

async function RenderCourses() {
    const data = await educatorGetCourses();

    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={5} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                                <Search className="h-10 w-10 text-primary/40" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">No courses found</h3>
                            <p className="text-muted-foreground mt-1 max-w-[280px] mx-auto">
                                You haven&apos;t created any courses yet. Get started by clicking the button below.
                            </p>
                            <Link 
                                href="/dashboard/educator/courses/create" 
                                className="mt-6 text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                            >
                                + Create your first course
                            </Link>
                        </div>
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

function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-3/4"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-1/2"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-1/4"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-1/4"></div></td>
            <td className="px-6 py-4"><div className="h-4 bg-muted rounded w-10 ml-auto"></div></td>
        </tr>
    );
}

function EducatorCourseRowSkeletonLayout() {
    return (
        <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={index} />
            ))}
        </tbody>
    );
}
