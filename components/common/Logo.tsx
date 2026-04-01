interface LogoProps {
  variant?: "light" | "dark";
  size?:    "sm" | "md";
}

export default function Logo({ variant = "light", size = "md" }: LogoProps) {
  const badge = size === "md"
    ? "w-9 h-9 rounded-xl text-sm"
    : "w-8 h-8 rounded-lg text-sm";

  const text = size === "md"
    ? "text-lg"
    : "text-base";

  const textColor = variant === "light" ? "text-white" : "text-gray-900";

  return (
    <div className="flex items-center gap-3">
      <div className={`${badge} bg-indigo-500 flex items-center justify-center font-bold text-white shrink-0`}>
        J
      </div>
      <span className={`font-semibold tracking-wide ${text} ${textColor}`}>
        JobTracker
      </span>
    </div>
  );
}
