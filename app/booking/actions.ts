import { SettingsSchemaType } from "@/lib/zodSchemas";
import { requireUser } from "../actions/require-student";
import { ApiResponse } from "@/lib/types";
import prisma from "@/lib/prisma";


export async function SettingsAction(values: SettingsSchemaType): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    await prisma.user.update({
      where: {
        id: session.id,
      },
      data: {
        name: values.fullName,
        image: values.profileImage,
      },
    });

    return {
      status: "success",
      message: "Settings updated successfully",
    };
  } catch (error) {
    console.error("Settings update failed:", error);

    return {
      status: "error",
      message: "Failed to update settings",
    };
  }
}