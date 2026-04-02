import type { ProfileStatConfig } from "@/types/application";

interface Props {
  config: ProfileStatConfig;
  value:  number;
}

function StatCard({ config, value }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
      <p className="text-xl font-bold" style={{ color: config.color }}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{config.label}</p>
    </div>
  );
}

export default StatCard;
