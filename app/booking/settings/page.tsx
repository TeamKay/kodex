import { SettingsForm } from "@/app/_components/SettingsForm";
import { requireUser } from "@/app/actions/require-student";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


async function getData(id: string){
    const data = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
            image: true,
        },
    });

    if(!data) {
        return notFound();
    }

    return data;
}

export default async function SettingsRoute(){
    const session = await requireUser();
    const data = await getData(session.id as string);
    return (
        <SettingsForm fullname={data.name} email={data.email} profileImage={data.image as string}/>
    )
}