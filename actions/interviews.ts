"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ActionState } from "@/types/auth";
import type { InterviewType, InterviewResult } from "@/types/interview";
import { ROUTES } from "@/lib/routes";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

export interface CreateInterviewPayload {
  applicationId: string;
  type:          InterviewType;
  scheduledAt:   string;
  durationMins?: number;
  location?:     string;
  notes?:        string;
  result:        InterviewResult;
}

export async function createInterview(payload: CreateInterviewPayload): Promise<ActionState> {
  const userId = await requireUserId();

  const application = await prisma.application.findFirst({
    where: { id: payload.applicationId, userId },
  });
  if (!application) return { error: "Application not found" };

  await prisma.interview.create({
    data: {
      applicationId: payload.applicationId,
      type:          payload.type,
      scheduledAt:   new Date(payload.scheduledAt),
      durationMins:  payload.durationMins ?? null,
      location:      payload.location     ?? null,
      notes:         payload.notes        ?? null,
      result:        payload.result,
    },
  });

  revalidatePath(ROUTES.INTERVIEWS);
  return undefined;
}

export async function updateInterview(
  id: string,
  payload: Omit<CreateInterviewPayload, "applicationId">,
): Promise<ActionState> {
  const userId = await requireUserId();

  const existing = await prisma.interview.findFirst({
    where: { id, application: { userId } },
  });
  if (!existing) return { error: "Interview not found" };

  await prisma.interview.update({
    where: { id },
    data: {
      type:         payload.type,
      scheduledAt:  new Date(payload.scheduledAt),
      durationMins: payload.durationMins ?? null,
      location:     payload.location     ?? null,
      notes:        payload.notes        ?? null,
      result:       payload.result,
    },
  });

  revalidatePath(ROUTES.INTERVIEWS);
  return undefined;
}

export async function deleteInterview(id: string): Promise<ActionState> {
  const userId = await requireUserId();

  const existing = await prisma.interview.findFirst({
    where: { id, application: { userId } },
  });
  if (!existing) return { error: "Interview not found" };

  await prisma.interview.delete({ where: { id } });

  revalidatePath(ROUTES.INTERVIEWS);
  return undefined;
}
