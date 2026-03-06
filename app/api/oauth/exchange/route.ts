import { requireUser } from "@/app/actions/require-student";
import { nylas, nylasConfig } from "@/lib/nylas";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const session = await requireUser();
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if(!code){
        return Response.json("Authorization code was not received", {
            status: 400,
        });
    }


    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey,
            clientId: nylasConfig.clientId,
            redirectUri: nylasConfig.redirectUri,
            code: code
        });

        const {grantId, email} = response;

        await prisma.user.update({
            where: {
                id: session.id,
            },
            data: {
                grantId: grantId,
                grantEmail: email,
            },
        });
    } catch(error) {
        console.log("Error: Something went wrong", error);
    }

    redirect("/booking")
}