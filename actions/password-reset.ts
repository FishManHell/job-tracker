"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import type { ActionState } from "@/types/auth";

// ─── Request reset ────────────────────────────────────────────────────────────

export async function requestPasswordReset(email: string): Promise<ActionState> {
  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to avoid email enumeration
  if (!user || !user.password) return undefined;

  // Delete any existing token for this email
  await prisma.passwordResetToken.deleteMany({ where: { email } });

  const token     = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({ data: { email, token, expiresAt } });

  await sendPasswordResetEmail(email, token);

  return undefined;
}

// ─── Reset password ───────────────────────────────────────────────────────────

export async function resetPassword(token: string, password: string): Promise<ActionState> {
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!record)                        return { error: "Invalid or expired reset link." };
  if (record.expiresAt < new Date())  return { error: "Reset link has expired." };

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { email: record.email },
    data:  { password: hashed },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return undefined;
}
