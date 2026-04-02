import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.APP_URL}/reset-password/${token}`;

  // TODO: uncomment when custom domain is verified in Resend
  // const { error } = await resend.emails.send({
  //   from:    "Job Tracker <noreply@yourdomain.com>",
  //   to:      email,
  //   subject: "Reset your password",
  //   html: `...`,
  // });
  // if (error) throw new Error(`Resend error: ${error.message}`);

  console.log(`[DEV] Password reset URL for ${email}:\n${resetUrl}`);
}
