import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getApplicationStats } from "@/lib/data/applications";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

async function ProfilePage() {
  const session = await auth();
  const userId  = session!.user!.id!;

  const [user, stats] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    getApplicationStats(userId),
  ]);

  const name= user?.name  ?? "";
  const email= user?.email ?? "";
  const createdAt = user?.createdAt.toISOString() ?? new Date().toISOString();
  const hasPassword= !!user?.password;

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings</p>
      </div>

      <div className="flex flex-col gap-5">
        <ProfileHeader name={name} email={email} createdAt={createdAt} stats={stats} />
        <PersonalInfoForm name={name} email={email} />
        {hasPassword && <ChangePasswordForm />}
      </div>
    </div>
  );
}

export default ProfilePage