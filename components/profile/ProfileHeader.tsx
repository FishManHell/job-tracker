import { Card, Avatar, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { ApplicationStats } from "@/lib/data/applications";
import { PROFILE_STATS } from "@/lib/profile-stats";
import { getInitials, formatMemberSince } from "./ProfileHeader.utils";
import StatCard from "./StatCard";

interface ProfileHeaderProps {
  name: string;
  email: string;
  createdAt: string;
  stats: ApplicationStats;
}

function ProfileHeader({ name, email, createdAt, stats }: ProfileHeaderProps) {
  return (
    <Card styles={{ body: { padding: 0 } }}>
      <div className="h-24 rounded-t-lg" style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #1a1d2e 100%)" }} />
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-8 mb-5">
          <Avatar size={72} style={{ backgroundColor: "#6366f1", fontSize: 24, fontWeight: 700, border: "3px solid white" }}>
            {getInitials(name || email)}
          </Avatar>
          <div className="flex items-center gap-2">
            <Tag color="green" icon={<CheckCircleOutlined />}>Active</Tag>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          <p className="text-gray-500 text-sm">{email}</p>
          <p className="text-gray-400 text-xs mt-1">Member since {formatMemberSince(createdAt)}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROFILE_STATS.map((stat) => (
            <StatCard key={stat.key} config={stat} value={stats[stat.key]} />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default ProfileHeader;
