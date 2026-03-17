import AdminViewAllEducators from "@/app/_components/AdminViewAllEducators";
import { adminGetAllCourses } from "@/app/actions/admin-get-all-courses";

export default async function Page() {
    const data = await adminGetAllCourses();
    return <AdminViewAllEducators rawData={data} />;
}

